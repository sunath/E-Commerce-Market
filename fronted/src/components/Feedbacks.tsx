import "../styles/Feedbacks.css";

import FeedBackOne from "../assets/Feedback1.png";
import FeedBackTwo from "../assets/Feedback2.jpg";
import FeedBackThree from "../assets/Feedback3.jpg";

export const FeedBacks = () => {
  return (
    <div className="feedbacks">
      <div className="feedback">
        <div className="feedback-top">
          <div className="feedback-img-container">
            <img src={FeedBackOne} alt="" />
          </div>

          <h3>Savannah Nguyen</h3>
        </div>

        <p>
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Expedita,
          impedit tempora unde ullam reiciendis optio vitae rerum voluptatem
          labore iusto.
        </p>
      </div>

      <div className="feedback">
        <div className="feedback-top">
          <div className="feedback-img-container">
            <img src={FeedBackTwo} alt="" />
          </div>

          <h3>Esther Howard</h3>
        </div>

        <p>
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Expedita,
          impedit tempora unde ullam reiciendis optio vitae rerum voluptatem
          labore iusto.
        </p>
      </div>

      <div className="feedback">
        <div className="feedback-top">
          <div className="feedback-img-container">
            <img src={FeedBackThree} alt="" />
          </div>

          <h3>John Doe</h3>
        </div>

        <p>
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Expedita,
          impedit tempora unde ullam reiciendis optio vitae rerum voluptatem
          labore iusto.
        </p>
      </div>
    </div>
  );
};
