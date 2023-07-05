


/**
 * Throws an error if the record is defined in the table
 * @param {MongooseTable} table 
 * @param {{}} filter 
 * @param {{}} error 
 * @returns 
 */
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


/**
 * A helper validator for check to wether a record is in the database
 * @param {MongooseTable} table 
 * @param {{}} filter 
 * @param {{}} error 
 * @returns 
 */
const checkRecordDefined = (table,filter,error) => {
    return new Promise( (resolve,reject) => {
        table.findOne(filter).then(e => {
            // console.log(filter,e)
            if(e)resolve(null)
            else resolve({status:error['status'] || 400 , ...error})
        }).catch(e => {
            resolve({status:500,error:"Internal Server Error"})
        })
    })
}

module.exports = {checkUniqueness,checkRecordDefined}