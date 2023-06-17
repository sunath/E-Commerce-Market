import "../styles/Sponsers.css"

import Sponser1 from "../assets/sponser-1.png"
import Sponser2 from "../assets/sponser2.png"
import Sponser3 from "../assets/sponser-3.png"
import Sponser4 from "../assets/sponser-4.png"
import Sponser5 from "../assets/sponser-5.png"

export const Sponsers = () => {
    return (
        <div className="sponsers">
                <div className="sponser">
                    <img src={Sponser1} alt="" />
                </div>
                <div className="sponser">
                    <img src={Sponser2} alt="" />
                </div>

                <div className="sponser">
                    <img src={Sponser3} alt="" />
                </div>

                <div className="sponser">
                    <img src={Sponser4} alt="" />
                </div>

                <div className="sponser">
                    <img src={Sponser5} alt="" />
                </div>
        </div>
    )
}