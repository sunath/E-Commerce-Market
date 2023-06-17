import { useEffect, useState } from "react"
import "../../styles/PopularProducts.css"




export const PopularProducts = () => {


    const [products,setProducts] = useState<any[]>([])

    useEffect(() => {
        fetch("src/assets/popular.json").then(e => e.json()).then(e => setProducts(e))
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
                {products.map(e => <PopularProduct name={e.name} price={e.price} photo={e.photo} />)}
            </div>



            <div className="popular-products-pages">
                <span>0</span>
                <span>0</span>
                <span>0</span>
            </div>

        </div>

    )
}


const PopularProduct = (props:{name:string,price:number,photo:string}) => {
    return (
        <div className="popular-product">
            <div className="popular-product-image-container">
                <img src={props.photo}  className="popular-product-image" alt="" />
            </div>

            <h2>{props.name}</h2>    
            <h4>${props.price}</h4>

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