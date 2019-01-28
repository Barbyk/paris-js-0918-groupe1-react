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
        axios.get('/api/news')
        .then(res => this.setState({news: res.data}))
        
        
    }

    render() {
        if (this.state.news.length === 0) {
            return <div style={{ margin: '30px 30px', fontFamily: 'Josefin Sans'}}><i className="fa fa-spinner fa-spin" /><h3>Chargement ...</h3></div>
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