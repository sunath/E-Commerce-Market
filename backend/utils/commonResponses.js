

/**
 * Send an error to the user if we have a problem with our system
 * If the database is broken or anything else is broken this is the common error we would like to throw
 * @param  res :  Express Response Object
 * @returns null
 */
function sendInternalServerError(res){
    return res.status(500).send({'error':"Internal Server error"})
}


/**
 * Send a response when a new record is created in our database
 * The common response is {'success':true,...yourpayload}
 * You can customize these by changing the payload
 * @param  res : Express Response Object
 * @param payload: Javascript Jsonable Object
 * @returns 
 */
function sendRecordCreatedResponse(res,payload={}){
    return res.status(201).send({'success':true,...payload})
}



module.exports = {
    sendInternalServerError,
    sendRecordCreatedResponse
}