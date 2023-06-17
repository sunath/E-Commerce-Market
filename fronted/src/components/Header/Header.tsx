
import "../../styles/Header.css"

import { HeaderTop } from "./HeaderTop"

import Logo from "../../assets/logo.png"



export const Header = () => {
    return (
        <>
        
        <HeaderTop></HeaderTop>

        <div className="header">

        


        <div className="header-logo">
        <img src={Logo} alt="" className="header-logo-img"/>
        </div>



        <div className="header-search-box">
            <input type="text" placeholder="Search any things" />
            <button>Search</button>
        </div>

    

        <div className="header-navigations">


                <div className="header-nav-box">
                    <span className="material-symbols-outlined">person</span>
                    <h5>Sign in</h5>
                </div>


                <div className="header-nav-box">
                    <span className="material-symbols-outlined">favorite</span>
                    <span className="header-nav-box-item-count">0</span>
                    <h5>Favorite</h5>
                </div>


                <div className="header-nav-box">
                    <span className="material-symbols-outlined">shopping_cart</span>
                    <span className="header-nav-box-item-count">2</span>
                    <h5>Cart</h5>
                </div>


        </div>

        </div>



        <div className="header-bottom">


        <button className="header-bottom-browse-button">Browse Categories
         <span className="material-symbols-outlined">
    expand_more
        </span></button>
        <ul className="header-bottom-browse-categories">
            <li className="header-bottom-expand-item">Home    <span className="material-symbols-outlined">
    expand_more
        </span>
        </li>
            <li className="header-bottom-expand-item">Catalog
            <span className="material-symbols-outlined">
    expand_more
        </span>

            </li>
            <li>Blog</li>
            <li className="header-bottom-expand-item">Pages
            <span className="material-symbols-outlined">
    expand_more
        </span>

            </li>
            <li>About Us</li>
        </ul>
        <div>30 Days free Return</div>

        </div>

      
        
        </>
    )
}