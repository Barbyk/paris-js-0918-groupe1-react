import React from "react";
import "../../node_modules/react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import "./NewsCarousel.css";
import moment from "moment";

class NewsCarousel extends React.Component {
  render() {
    return (
      <div className="carousel-global">
        <Carousel
          autoPlay
          infiniteLoop={true}
          showThumbs={false}
          useKeyboardArrows={true}
        >
          {this.props.news.map(e => {
            return (
              <div className="item">
                <img className="imgcarousel" alt="caroussel" src={e.img_url} />
                <div className="news">
                  <div className="container-fluid">
                    <span className="date">
                      {moment(e.date).format("DD/MM/YYYY")}
                    </span>

                    <span className="text">{e.text}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </Carousel>
      </div>
    );
  }
}

export default NewsCarousel;
