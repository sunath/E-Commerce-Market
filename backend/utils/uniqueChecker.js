


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


module.exports = checkUniqueness