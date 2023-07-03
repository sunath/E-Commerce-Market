import { useEffect, useState } from "react"
import { getProductImg, joinURL } from "../../../utils"
import "./AdminProducts.css"


const calculateViewWidth = () => {
    return window.innerWidth / 100 * 90
}

const AdminViewProducts = () => {


    const [products,setProducts] = useState<any>([])

    


    useEffect(() => {
        fetch(joinURL("/products/product")).then(e => e.json()).then(e => setProducts(e))

        document.documentElement.style.setProperty('--tableCellWidth',(calculateViewWidth() / 6)+"px")

        const listener = (e:any) => {
            const cellWidth = calculateViewWidth() / 6
            document.documentElement.style.setProperty('--tableCellWidth',cellWidth+"px")
        }

        window.addEventListener('resize',listener)

        return () => {
            window.removeEventListener('resize',listener)
        }
    },[])

    return (
        <div className="default-admin-view">

            <table className="admin__products">

                <tr className="admin__products--table-header">

                <thead className="admin__products--table-header--elements">
                    <td></td>
                    <td>ProductName</td>
                    <td>Price</td>
                    <td>Items</td>
                    <td>Update</td>
                    <td>Delete</td>
                </thead>

                </tr>
              


                <tbody>
                    
                    {products.map((e:any) => <tr className="admin__products--product">
                        <td className="admin__products--product-img"><img src={getProductImg(e.imageURL)} alt="" /></td>
                        <td><h2>{e.name}</h2></td>
                        <td><h3>{e.price}</h3></td>
                        <td><h4>{e.products}</h4></td>
                        <td><button className="primary-button admin-product-update-button">Update</button></td>
                        <td><button className="primary-button admin-product-delete-button">Delete</button></td>
                    </tr>)}

                </tbody>


            <button className="primary-button admin-new-product-button">Add New Product</button>

            </table>
            
        </div>
    )
}

export default AdminViewProducts