


// 
const checkUniqueness = (table,filter,error) => {
    return new Promise(  (resolve,reject) => { 
        table.findOne(filter).then(e => {
            // console.log(`Email `+e , filter)
            if(e){
                resolve(error)
            }else{
                resolve(null)
            }
        })
    })
}


const checkRecordDefined = (table,filter,error) => {
    return new Promise( (resolve,rejetc) => {
        table.findOne(filter).then(e => {
            if(e)resolve(null)
            else resolve({status:error['status'] || 400 , ...error})
        }).catch(e => {
            resolve({status:500,error:"Internal Server Error"})
        })
    })
}

module.exports = {checkUniqueness,checkRecordDefined}