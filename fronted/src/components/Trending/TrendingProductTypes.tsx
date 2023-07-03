import { useEffect, useState } from "react"

import "../../styles/TrendingProducts.css"
import { getStaticFile, joinURL } from "../../utils"


export const TrendingPopularProducts =  () => {


    const [products,setProducts] = useState<any[]>([])


    useEffect(() => {
        fetch(joinURL("/products/trending-category-item-count?categories=Laptop Camera Speaker")).then(e => e.json()).then(e => {setProducts(e)})
        // setProducts()
    },[])

    return (
        <div className="trending-products">
            {products.map(e => <TredingPoupularProduct items={e.items} name={e.name} photo={e.photo} key={'de'+e.name} />)}
        </div>
    )
}


const TredingPoupularProduct = (props:{name:string,items:number,photo:string}) => {
    return (
        <div className="trending-product"> 
        <img src={getStaticFile(props.photo)} alt="" />

        <div className="trending-product-details">
            <h3>{props.name}</h3>
            <h5>({props.items} items)</h5>
        </div>
        </div>
    )
}