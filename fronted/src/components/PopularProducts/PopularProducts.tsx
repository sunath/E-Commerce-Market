import { useEffect, useState } from "react"
import "../../styles/PopularProducts.css"
import { getProductImg, joinURL } from "../../utils"




export const PopularProducts = () => {


    const [products,setProducts] = useState<any[]>([])

    useEffect(() => {
        fetch(joinURL("/products/product")).then(e => e.json()).then(e => setProducts(e))
    },[])

    return (

        <div className="popular-products">

            <div className="popular-products-tags">
                <h2>Popular Tags</h2>

                <div className="popular-tags-tabs">
                    <button>Cameras</button>
                    <button>Laptops</button>
                    <button>Tablets</button>
                    <button>Mouse</button>
                </div>
            </div>


            <div className="popular-products-container">
                {products.map(e => <Product name={e.name} price={e.price} discountPercent={e.discountPercent || 0} photo={e.imageURL} discount={e.discount || false} />)}
            </div>



            <div className="popular-products-pages">
                <span>0</span>
                <span>0</span>
                <span>0</span>
            </div>

        </div>

    )
}


export const Product = (props:{name:string,price:number,photo:string,discount:boolean,discountPercent:number,isCreatings:boolean}) => {


    const getPrice = () => {
        if(props.discount){
            return <>
            <h4 className="product-discount--early-price">${props.price}</h4>
            <br />
            <h4 className="product-discount--after-price">${props.price - (props.price / 100 * props.discountPercent)}</h4>
        </>
        }

        return <h4>${props.price}</h4>
    }
    return (
        <div className="popular-product">
            <div className="popular-product-image-container">
                <img src={props.isCreatings? props.photo : getProductImg(props.photo)}  className="popular-product-image" alt="" />
            </div>

            <h2>{props.name}</h2>    
            {getPrice()}

            <div className="rating">
                <span className="material-symbols-outlined">star</span>
                <span className="material-symbols-outlined">star</span>
                <span className="material-symbols-outlined">star</span>
                <span className="material-symbols-outlined">star</span>
                <span className="material-symbols-outlined">star</span>

            </div>

        </div>
    )
}