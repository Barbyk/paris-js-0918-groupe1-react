import React from 'react';
import "../../node_modules/react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';
import './NewsCarousel.css';
import moment from 'moment'

class NewsCarousel extends React.Component {
    render() {
        
        return (
            <div className="carousel-global">
            <Carousel autoPlay infiniteLoop={true} showThumbs={false} useKeyboardArrows={true}>
                {this.props.news.map(e => {
                    return ( <div className='item'>
                                <img className='img' alt="caroussel" src={e.img_url} />
                                <p className='legend'><span className='title'>{e.title}</span><br/>
                                
                                
                                <span className='date'>{moment(e.date).format('DD/MM/YYYY')}</span><br/>
                                <span className='text'>{e.text}</span></p>

                            </div> )  
                })}
            </Carousel>
            </div>
        );
    }
};
 
export default NewsCarousel;