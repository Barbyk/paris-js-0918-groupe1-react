import React from 'react';
import "../../node_modules/react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';
import './NewsCarousel.css';
import moment from 'moment'

class NewsCarousel extends React.Component {
    render() {
        
        return (
            <div class="carousel-global">
            <Carousel autoPlay infiniteLoop={true} showThumbs={false} useKeyboardArrows={true}>
                {this.props.news.map(e => {
                    return ( <div className='item'>
                            
                                <img class='imgcarousel' alt="caroussel" src={e.img_url} />
                                <div class='news'>
                                <div class="container-fluid">
                                <div className='date'>{moment(e.date).format('DD/MM/YYYY')}</div>
                                <div className='text'>{e.text}</div>
                                </div>
                                </div>
                            </div> )  
                })}
            </Carousel>
            </div>
        );
    }
};
 
export default NewsCarousel;