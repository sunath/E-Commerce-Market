import "../../styles/DiscountProducts.css"

import SaleLaptop from "../../assets/SaleLaptop.png"

export const TopSale = () => {
    return (
        <div className="top-sale">
                <div className="top-sale-details">
                    <button className="primary-button">New Laptop</button>
                    <h2 className="text-blue-dark">Sale up to 50% off</h2>
                    <h5>12 inch hd display</h5>
                    <button className="primary-button">Shop now</button>
                </div>
        </div>
    )
}