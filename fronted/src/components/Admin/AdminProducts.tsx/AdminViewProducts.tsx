import { useEffect, useRef, useState } from "react"
import { getProductImg, joinURL } from "../../../utils"
import "../../../styles/AdminProducts.css"

import axios from "axios"
import { useNavigate } from "react-router-dom"
import { AlertDialog, AlertDialogBody, AlertDialogContent, AlertDialogFooter, AlertDialogHeader, AlertDialogOverlay, Button, useDisclosure } from "@chakra-ui/react"


// The root width will be calculated through this
// This width is equal to width of default-admin-view class width or the first div of the component
const calculateViewWidth = () => {
    return window.innerWidth / 100 * 90
}

/**
 * Renders the every product that database has.
 * 
 * By default it renders the first n numbers of products
 * 
 * then the admin can navigate through our data table to find the product he need 
 * 
 * A product can be deleted or updated via this table
 * 
 * Also this page navigates the admin to the product creation page if the user wants to 
 * 
 */
const AdminViewProducts = () => {

    // Products that on the table
    const [products,setProducts] = useState<any>([])

    // Make an request the server and gets the products
    const getProducts = () => {
         fetch(joinURL("/products/product")).then(e => e.json()).then(e => setProducts(e))
    }

    const navigate = useNavigate()
    

    /**
     * Delete Event handler for every product
     * The product will be deleted base on the id
     * @argument {string} id : Id of the product
     *  
    */
    const deleteProduct =  (id:any) => {
        return async() => {
            await axios.delete(joinURL("/products/product?id="+id))
            getProducts()
        }
    }


    // Delete alert props
    const { isOpen, onOpen, onClose } = useDisclosure()
    const deleteCancelRef = useRef()
    const [deleteProductId,setDeleteProductId] = useState('')

    const updateProduct = (id:any) => () => navigate("/admin/update-product?id="+id)

    useEffect(() => {
        getProducts()

        // Set the normal cell width of our table 
        // It will be calculated by the formula of fullWidth / 6
        document.documentElement.style.setProperty('--tableCellWidth',(calculateViewWidth() / 6)+"px")

        // Listener for the window resize event
        // this will detect when ever the user change the size of the page 
        // and it changes the cell width dynamically 
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

                        {/* Product Info */}
                        <td className="admin__products--product-img"><img src={getProductImg(e.imageURL)} alt="" /></td>
                        <td><h2>{e.name}</h2></td>
                        <td><h3>{e.price}</h3></td>
                        <td><h4>{e.items}</h4></td>

                        {/* Action Buttons */}
                        <td><button className="primary-button admin-product-update-button" onClick={updateProduct(e._id)}>Update</button></td>
                        {/* <td><button className="primary-button admin-product-delete-button" onClick={deleteProduct(e._id)}>Delete</button></td> */}
                        <td><button className="primary-button admin-product-delete-button" onClick={() => {
                            onOpen()
                            setDeleteProductId(e._id)
                        }}>Delete</button></td>
                    </tr>)}

                </tbody>


            <button className="primary-button admin-new-product-button" onClick={() => navigate("/admin/create-product")}>Add New Product</button>
            </table>



            {/*  Dialog that asks wether user want to delete the produt or not */}
            <AlertDialog
            // @ts-ignore
            leastDestructiveRef={deleteCancelRef}
            isOpen={isOpen}
            onClose={onClose}
            isCentered
            >
                <AlertDialogOverlay>

                    <AlertDialogContent>

                    <AlertDialogHeader>Delete product</AlertDialogHeader>
                    <AlertDialogBody>Are you sure you want to delete this product?</AlertDialogBody>
                    <AlertDialogFooter>
                        {/* @ts-ignore */}
                        <Button className="margin-small" ref={deleteCancelRef} onClick={() => {
                            onClose()
                            setDeleteProductId('')
                        }}>No</Button>
                        <Button colorScheme="red" onClick={async () => {
                            console.log("delete")
                            await deleteProduct(deleteProductId)()
                            onClose()
                            
                        }}>YES</Button>
                    </AlertDialogFooter>

                    </AlertDialogContent>


                 
                </AlertDialogOverlay>
            </AlertDialog>
            
        </div>
    )
}

export default AdminViewProducts