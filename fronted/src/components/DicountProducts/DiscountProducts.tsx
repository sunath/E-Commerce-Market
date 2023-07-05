import { useEffect, useRef, useState } from "react"

import "../../styles/DiscountProducts.css"
import { getProductImg, joinURL } from "../../utils"

export const DiscountProducts = () => {


    const [products,setProducts ]  = useState<any[]>([])
    const [activeProdcutId,setActiveProductId] = useState(1)

    const changeActiveProduct = (id:number) => {
        setActiveProductId(id)
    }

    useEffect(() => {
        fetch(joinURL("/products/discount")).then(e => e.json()).then(e => setProducts(e))
        // fetch("src/assets/discounts.json").then(e => e.json()).then(e => setProducts(e))
    },[])
    return (

        <div className="discount-products">
        
        {products.map((e,i) => <Product photo={getProductImg(e.imageURL)} name={e.name} discount={Math.ceil(e.price - (e.price / 100 * e.discountPercent))} key={e.imageURL} index={i} activeIndex={activeProdcutId}/>)}


        <div className="discount-product-selector">
            {products.map((e,i) => <ProductScorller activeIndex={activeProdcutId} index={i} changeActiveProduct={changeActiveProduct}/>)}
        </div>

        </div>
    )
}


const ProductScorller = (props:{index:number,activeIndex:number,changeActiveProduct:any}) => {

    return <div onClick={() => {props.changeActiveProduct(props.index)}} style={{backgroundColor:`${props.activeIndex == props.index ? 'var(--color-primary)'  : 'transparent'}`}}>0</div>
}

const Product = (props:{photo:string,name:string,discount:number,index:number,activeIndex:number}) => {


    return <div className={`discount-product ${props.activeIndex == props.index ? 'discount-product-show' : ''}`}>
        
        <div className="discount-product-details">
        {/* <h2>{props.name.split(" ").map(e => <span> {e}</span>)}</h2> */}
        <h2>{[props.name]}</h2>

        <div className="discount-product-actions">
            <button onClick={() => {console.log("show")}}>Show now</button>
            <button>View More</button>
        </div>

        </div>

        <div className="discount-product-discount">
            <img src={props.photo} alt="Cannon Camera" />
            <span>Only <br />${props.discount}</span>
        </div>
        
    </div>
}