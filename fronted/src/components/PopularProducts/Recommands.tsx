import JBLImage from "../../assets/Jbl.png"
import HeadPhone from "../../assets/popular-headphone.jpg"
import Playstation from "../../assets/XBox.png"
import Laptop from "../../assets/HpLaptop.png"

export const Recommands = () => {
    return (
        <div className="recommand-products">

        <div className="recommand-product">
            <img src={JBLImage} alt="" />
            <div className="recommand-product-details">
                <h4>Music on</h4>
                <h5>$1,170</h5>

                <div>
                <span className="material-symbols-outlined">star</span>
                <span className="material-symbols-outlined">star</span>
                <span className="material-symbols-outlined">star</span>
                <span className="material-symbols-outlined">star</span>
                <span className="material-symbols-outlined">star</span>
                </div>

            </div>

        </div>





        <div className="recommand-product">
            <img src={HeadPhone} alt="" />
            <div className="recommand-product-details">
                <h4>Music on</h4>
                <h5>$370</h5>

                <div>
                <span className="material-symbols-outlined">star</span>
                <span className="material-symbols-outlined">star</span>
                <span className="material-symbols-outlined">star</span>
                <span className="material-symbols-outlined">star</span>
                <span className="material-symbols-outlined">star</span>
                </div>

            </div>

        </div>




        

        <div className="recommand-product">
            <img src={Playstation} alt="" />
            <div className="recommand-product-details">
                <h4>Play Games</h4>
                <h5>$499</h5>

                <div>
                <span className="material-symbols-outlined">star</span>
                <span className="material-symbols-outlined">star</span>
                <span className="material-symbols-outlined">star</span>
                <span className="material-symbols-outlined">star</span>
                <span className="material-symbols-outlined">star</span>
                </div>

            </div>

        </div>




        <div className="recommand-product">

            <div className="recommand-product-image-container">
            <img src={Laptop} alt="" />
            </div>
            
            <div className="recommand-product-details">
                <h4>Play Games</h4>
                <h5>$999</h5>

                <div>
                <span className="material-symbols-outlined">star</span>
                <span className="material-symbols-outlined">star</span>
                <span className="material-symbols-outlined">star</span>
                <span className="material-symbols-outlined">star</span>
                <span className="material-symbols-outlined">star</span>
                </div>

            </div>

        </div>


            
        </div>
    )
}