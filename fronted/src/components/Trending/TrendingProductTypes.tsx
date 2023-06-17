import { useEffect, useState } from "react"

import "../../styles/TrendingProducts.css"


export const TrendingPopularProducts =  () => {


    const [products,setProducts] = useState<any[]>([])


    useEffect(() => {
        fetch("src/assets/trending.json").then(e => e.json()).then(e => {setProducts(e)})
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
        <img src={props.photo} alt="" />

        <div className="trending-product-details">
            <h3>{props.name}</h3>
            <h5>({props.items} items)</h5>
        </div>
        </div>
    )
}