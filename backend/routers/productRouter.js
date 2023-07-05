// Express router
const express = require("express")
const router = express.Router()
const fs = require("fs/promises")

// Data validation
const validation = require("validate-my-express")
const commonValidators = require("validate-my-express/commonValidators")

// 
const {CategoryModel, ProductModel} = require("../models")

// import utils
const uniqueChecker = require("../utils/uniqueChecker")
const { sendInternalServerError,sendRecordCreatedResponse } = require("../utils/commonResponses")
const {checkUniqueness,checkRecordDefined} = require("../utils/uniqueChecker")


// function checkCategory(filter,uniqueness=false){
//     if(uniqueness){
//         return () => uniqueChecker(CategoryModel,filter,{error:"Category is already defined",status:400})
//     }
//    return CategoryModel.fineOne({filter})
// }

const categoryValidation = validation.createValidator([
    {property:"name",validators:[commonValidators.isRequired("Category Name is required")],

    asyncValidators:[e => checkUniqueness(CategoryModel,{name:e},{status:400,error:"Category exists"})] }
    
    ]

,[])
router.post("/category",categoryValidation,(req,res) => {
    const data = req.body

    const newModel = CategoryModel(data)

    newModel.save().then(e => {
       return sendRecordCreatedResponse(res,{product:e})
    }).catch(e => {
        return sendInternalServerError(res)
    })
})



router.get("/category",(req,res) => {
    CategoryModel.find().then(e => {
        res.send(e)
    }).catch(e => {
        return sendInternalServerError(res)
    })
})



const productValidations = validation.createValidator([
    {
        property:"name",
        validators:[commonValidators.isRequired("Name is required"),commonValidators.minLength(2,"Name must have 2 characters")],
        asyncValidators:[(name) => checkUniqueness(ProductModel,{name},{status:400,error:"Name is already used"})]
    },
    {
        property:"category",
        validators:[commonValidators.isRequired("Category is required")],
        asyncValidators:[ (category) => checkRecordDefined(CategoryModel,{name:category},{status:400,error:"Category is not defined"})]
    },
    {
        property:"price",
        validators:[commonValidators.isRequired("Price is required")],
        asyncValidators:[]
    },
    {
        property:"company",
        validators:[commonValidators.isRequired("Company is required")],
        asyncValidators:[]
    }
],[])


router.post("/product-image",async (req,res) => {
    const body = req.body
    await fs.mkdir("assets/products-img",{recursive:true})
    await fs.writeFile("assets/products-img/"+body._id+"."+req.files.dp.mimetype.split("/")[1],req.files.dp.data,{recursive:true})
    await ProductModel.updateOne({_id:body._id},{imageURL:"assets/products-img/"+body._id+"."+req.files.dp.mimetype.split("/")[1],imageOkay:true})
    return res.status(200).send({'hello':"Okay"})
})

// Create a Product
router.post("/product",productValidations,async (req,res) => {
        const body = req.body

        // Throws an error if the dp is not provided
        if(!req.files || !req.files.image){
            return res.status(400).send({'error':"Image is required"})
        }

        try{
            await fs.mkdir("assets/products-img",{recursive:true})
            const imageFile = req.files.image
            const mimeType = imageFile.mimetype.split("/")[1]
            const filename = generateImageName(mimeType)
            await fs.writeFile(filename,imageFile.data,{recursive:true})

            body.imageURL = filename
            body.imageOkay = true
            console.log(body.imageURL)
            const product = ProductModel(body)
            product.save().then( e => {
                return sendRecordCreatedResponse(res,{product:e})
            }).catch(e => {
               return sendInternalServerError(res)
            })
            

        }catch(ex){
            console.log(ex)
            return res.status(500).send({'error':"Failed to save the image.Product will not be saved"})
        }



})

// Get products
router.get("/product",(req,res) => {
    const query = req.query

    const category = query.category
    const from = query.from
    const limit = query.limit
    const name = query.name

    const databaseQuery = {}

    if(name){
        const regex = new RegExp(`${name}`,'i')
        databaseQuery['name'] = {$regex:regex}
    }
    if(category)databaseQuery['category'] = category
    
    ProductModel.find(databaseQuery,null,{skip:from || 0 ,limit: limit || 10}).then(e => {
        return res.status(200).send(e)
    }).catch(e => {
        return sendInternalServerError(res)
    })
})


// Get Product By id
router.get("/product-by-id",(req,res) => {
    const id = req.query.id

    ProductModel.findOne({_id:id}).then(e => {
        return res.status(200).send(e)
    }).catch(ex => {
        return sendInternalServerError(res)
    })
})






const productUpdateValidations = validation.createValidator([
    {
        property:"name",
        validators:[commonValidators.isRequired("Name is required"),
        commonValidators.minLength(2,"Name must have 2 characters")],
        asyncValidators:[]
    },
    {
        property:"category",
        validators:[commonValidators.isRequired("Category is required")],
        asyncValidators:[ (category) => checkRecordDefined(CategoryModel,{name:category},{status:400,error:"Category is not defined"})]
    },
    {
        property:"price",
        validators:[commonValidators.isRequired("Price is required")],
        asyncValidators:[]
    },
    {
        property:"company",
        validators:[commonValidators.isRequired("Company is required")],
        asyncValidators:[]
    }
],[])

router.patch("/product",productUpdateValidations,async (req,res) => {
    const {_id,updatePayload} = req.body
    let  product;
    product = await ProductModel.findOne({_id:_id})
    if(updatePayload && updatePayload.name){

        if(product.name != updatePayload.name){
            const response = await checkUniqueness(ProductModel,{name:updatePayload.name})
            if(response)return res.status(400).send(response)
        }
    }

    // console.log(product)


    // Save the image file if exist
    if(req.files && req.files.dp){
        console.log(product)
        fs.writeFile(product.imageURL,req.files.dp.data)
    }

    // Decode Payload
    const objKeys = Object.keys(req.body).filter(e => e != "_id")
    const obj = {}

    for(let i = 0; i < objKeys.length;i++){
        obj[objKeys[i]] = req.body[objKeys[i]]
    }
    
    // console.log(query,updatePayload)
    ProductModel.updateOne({_id:_id},obj).then(e => {
        return res.status(202).send(e)
    }).catch(e => {
        console.log(e)
        return sendInternalServerError(res)
    })
})



router.delete("/product",(req,res) => {
    const id = req.query.id
    ProductModel.deleteOne({_id:id}).then(e => {
        return res.status(204).send({})
    }).catch(e => {
        return sendInternalServerError(res)
    })
})



const path = require("path")
const generateImageName = require("../utils/generateImgName")

// Get product img
router.get("/product-img",(req,res) => {
    return res.sendFile(path.join(process.cwd(),req.query.img))
})




// Get discount products
router.get("/discount",(req,res) => {
    ProductModel.find({discount:true}).then(e => {
        res.status(200).send(e)
    }).catch(e => {
        return sendInternalServerError(res)
    })
})




// get categories item count 
router.get("/trending-category-item-count",async (req,res) => {
    const categories = req.query.categories.split(" ")
    const jsonObject = []

    for(let i = 0 ; i < categories.length;i++){
       const data = {
        name:categories[i],
        items:0,
        photo:"Trending"+categories[i]+".png"
       }
        data.items = await ProductModel.count({category:categories[i]})
        jsonObject.push(data)
    }

    return res.status(200).json(jsonObject)
})



module.exports = router