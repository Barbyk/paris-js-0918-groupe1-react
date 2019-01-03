import React from 'react';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';
import './NewsCarousel.css';
import moment from 'moment'

class NewsCarousel extends React.Component {
    render() {
        console.log(this.props.news);
        
        return (
            <Carousel autoPlay infiniteLoop={true} showThumbs={false} useKeyboardArrows={true}>
                {this.props.news.map(e => {
                    return ( <div className='item'>
                                <img className='img' src={e.images} alt="" />
                                <p style={{backgroundColor: 'transparent'}} className='legend'><span className='title'>{e.title} - {new Intl.DateTimeFormat().format(new Date(e.date))}</span><br/><br/><span className='text'>{e.text}</span></p>
                                <img style={{height:"300px" }} className='img' alt="caroussel" src={e.img_url} />
                                <p style={{backgroundColor: 'transparent' }} className='legend'>
                                <span className='title'>{e.title} </span><br/>
                                <span className='date'>{moment(e.date).format('DD/MM/YYYY')}</span><br/>
                                <span className='text'>{e.text}</span></p>
                                

                            </div> )  
                })}
            </Carousel>
        );
    }
};
 
export default NewsCarousel;