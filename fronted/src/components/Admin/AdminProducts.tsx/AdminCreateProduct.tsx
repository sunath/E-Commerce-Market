import { useEffect, useRef, useState } from "react";
import "../../../styles/AdminCreateProduct.css"

import {Input,Text,Select, Alert, AlertIcon, Checkbox} from "@chakra-ui/react"
import { getProductImg, getStaticFile, joinURL } from "../../../utils";
import { Product } from "../../PopularProducts/PopularProducts";

import axios from 'axios'
import { useNavigate, useRoutes } from "react-router-dom";
import { useQueryParms } from "../../../hooks/useQueryParms";



// Payload for the form data
interface AdminProductFormData {
    name:string,
    price:number,
    category:string,
    items:number,
    company:string,
    image:Blob | string,
    discount?:boolean,
    discountPercent?:Number
}

interface AdminProductProps {
    update?:boolean
    updateInfo?:any
}

const AdminProduct = () => {



    // Request error will set if an error occurred during the posting of the data
    // The error will be throwns by the server
    const [requestError,setRequestError] = useState('')

    // If the product is created the success message will appear
    const [successMessage,setSuccessMessage] = useState('')

    const route = useNavigate()
    const parms = useQueryParms()
    const [updatings,setUpdatings] = useState(false)


    // Made an request to the server in order to save the data
    const postForm = async () => {
        const id = parms.get("id")
        if(id){

            const transformFormData = (form:AdminProductFormData,id:string) => {
                const f:any = {_id:id}
               
                // const f:any = {}
                let keys = Object.keys(form)
                for(let i = 0;i < keys.length;i++){
                    if(keys[i] == "image" && form.image){
                        f["dp"] = form.image
                    }else{
                        // @ts-ignore
                        f[keys[i]] = form[keys[i]]
                    }
                  
                }
                return f
    
            };

            const data = (await axios.patch(joinURL("/products/product"),transformFormData(formData,id),{
                headers:{
                    "Content-Type":"multipart/form-data"
                }
            })).data
            setSuccessMessage("Product Updated")

            setTimeout(() => {
                setSuccessMessage('')
                route("/admin")
            })
            return;
        }

        try{
            // Make an call to the sever and post the data
            const response = (await axios.post(joinURL("/products/product"),formData,{
                headers:{
                    "Content-Type":"multipart/form-data"
                }
            })).data
            // If it is success then show an success message
            setSuccessMessage("Product is created.All done.")

            // After n seconds it will disappear
            setTimeout(() => {
                setSuccessMessage('')
                // Then  after t seconds admin will redirect to /admin 
                setTimeout(() => {
                    route("/admin")
                },500)
            },1000)
        }catch(ex){

            // Show the error message to the user
            // It will pop and will be appear for n time
            const {response} = ex as {response:any}
            setRequestError(response.data.error)
            setTimeout(() => {
                setRequestError('')
            },2000)

        }
    }


    // Categories that admin can choose from
    // It has to be one of these categories
    const [categories,setCategories] = useState<any[]>([]);


    // image file input reference is used to choose the file
    // Due to the fact that user can't see the input file 
    // we use a button and call the file input ref via the button
    // so we have to get the reference and save it during life time
    const fileInputRef = useRef<any>(null)

    const [formData,setFormData] = useState<AdminProductFormData>({
        name:"",
        price:0,
        category:'',
        items:0,
        company:'',
        image:'',
        discount:false
    })

    // This is use to show a preview for the user
    // We use URL api to create an virtual image
    const [imageTempPhoto,setImageTempPhoto] = useState<any>(null)


    // Only make an request to the get the categories 
    useEffect(() => {
        fetch(joinURL("/products/category")).then(e => e.json()).then(e => setCategories(e))
        if(parms.get("id")){
            setUpdatings(true)
            fetch(joinURL("/products/product-by-id?id="+parms.get("id"))).then(e => e.json()).then(e => {
                setFormData(e)
                setImageTempPhoto(getProductImg(e.imageURL))
                setFormData({...e,discount:e.discount})
            })
        }
    },[])


    /**
     * Set the property value in the form data
     * @param prop Name of the property (Must be in AdminProductFormData)
     * @returns an event hanlder for the onChange event
     */
    const createOnChangeHandler = (prop:string) => {
        // console.log("hello")
        return (e:any) => {

            const data = Object.assign({},formData)

            if(e.target.type == "checkbox"){
                // @ts-ignore
                data[prop]  = e.target.checked
                setFormData(data)
            }else{
               
                // @ts-ignore
                data[prop] = e.target.value
              setFormData(data)
            }
           
        }
    }
    
    return (

        <>


<div className="admnin__create__product">


        
        <form className="admnin__create__product--form">

            
        {requestError && <Alert className="text-md formInvalidErrorAlert" status="error">
               <AlertIcon />
               {requestError}
            </Alert>}

        {
            successMessage && <Alert className="text-md" status="success">
                <AlertIcon />
                {successMessage}
            </Alert>
        }

            <Text fontSize="4xl" className="admnin__create__product--form-title">Add new Product</Text>

        <div className="form-field">
            <Input placeholder="Product Name" value={formData.name} onChange={createOnChangeHandler("name")} size="lg"/>
        </div>

        <div className="form-field">
            <Input placeholder="Price" size="lg" value={formData.price}  onChange={createOnChangeHandler("price")}/>
        </div>

        <div className="form-field">
            <Select placeholder="Category" value={formData.category}  onChange={createOnChangeHandler("category")}>
                {categories.map(e => <option value={e.name}>{e.name}</option>)}
            </Select>
        </div>

        <div className="form-field">
            <Input placeholder="Items" value={formData.items}  onChange={createOnChangeHandler("items")}/>
        </div>

        <div className="form-field">
            <Input placeholder="Company" value={formData.company}  onChange={createOnChangeHandler("company")}/>
        </div>


        {updatings && 
            <>
                <div className="form-field text-align-left">

                    <Checkbox onChange={createOnChangeHandler("discount")} isChecked={formData.discount}>
                        Add Discount
                    </Checkbox>
                </div>

                <div className="form-field">
                    {/* @ts-ignore */}
                    <Input disabled={!formData.discount} arial-label="Discount Percent" value={formData.discountPercent ? formData.discountPercent : ""} onChange={createOnChangeHandler("discountPercent")} placeholder="Discount Percent"/>
                </div>
            </>
        }

        <div className="form-field">
            <input type="file" accept="image/png,image/jpeg" className="admin__create__product--form--img" ref={fileInputRef} onChange={ e => {
                
                if(e.target.files){
                    const url = URL.createObjectURL(e.target.files[0])
                    setImageTempPhoto(url)
                    formData.image = e.target.files[0]
                    setFormData(formData)
                }

            }}/>
            <button className="button-primary" onClick={e => {
                e.preventDefault()
                fileInputRef.current.click()
                }}>Select Image</button>
        </div>





        <button className="button-primary" onClick={e => {
            e.preventDefault()
            postForm()
        }}>Save Product</button>


        </form>




        <Product name={formData.name} price={formData.price} photo={imageTempPhoto} isCreatings discount={formData.discount ? formData.discount : false} discountPercent={formData.discountPercent ? formData.discountPercent : 0 }/>


    </div>
        
        

        
        {/* {JSON.stringify(formData)} */}

    </>

    )
}


export default AdminProduct