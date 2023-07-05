
const fs = require("fs")
const uuid = require("uuid")

/**
 * 
 * @param {string} mimetype  Extenion type of the image
 * @returns {string}
 */
function generateImageName(mimetype){
    while(true){
        const filename = uuid.v4() +"."+ mimetype
        const file = "assets/products-img/"+filename
        if(!fs.existsSync(file)){
            return file
        }
    }

    fs.open()
}


module.exports = generateImageName