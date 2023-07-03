import { prodctionMode } from "./vite-env.d"



/**
 * Returns the suitable return url base on the production mode
 * if it is in production it returns '' otherwise "http://localhost://8000"
 * @returns 
 */
export const getBaseURL = () => {
    console.log(prodctionMode)
    return prodctionMode ? "" : "http://localhost:8000"
}


export const joinURL = (url:string) => {
    return getBaseURL() + (url.startsWith("/") ? url : "/"+url)
}


export const getProductImg = (url:string) => {
    return getBaseURL() + "/" + "products/product-img?img="+url
}


export const getStaticFile = (file:string) => {
    return getBaseURL() + "/static/" + file
}