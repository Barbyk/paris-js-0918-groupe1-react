import React from 'react';
import axios from 'axios';
import NewsCarousel from './NewsCarousel';


class Home extends React.Component {

    state = {
        news: [],
    }


    componentDidMount() {
        this.getNews()
    }

    getNews() {
        axios.get('/news')
        .then(res => this.setState({news: res.data}))
        
        
    }

    render() {
        if (this.state.news.length === 0) {
            return "Loading..."
        }
        else {
        return(
            <div>
                <NewsCarousel news={this.state.news} />    
            </div>
        )}
    }
}

export default Home;