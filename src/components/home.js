import React from "react";
import NewsItem from './newsitem';
import SearchBar from './searchbar';
require('dotenv').config();

class Home extends React.Component { 
    state = {
        newsItems: [],
    }
    handleSubmit = () => {
        console.log('function called')
        this.setState({newsItems: []})
        const api_key = process.env.NEWS_API_KEY || "4df3ca7aebe0417f8d9fde4516eda581";
        const search_value = document.getElementById('search_result').value;
        console.log(search_value);
        console.log(api_key)
        const url = `http://newsapi.org/v2/everything?q=${search_value}&apiKey=${api_key}`

        fetch(url)
        .then(data => data.json())
        .then(data => {
            console.log(data)
            this.setState({newsItems: data.articles})
        })
    }

    render(){
        return (
        <div>
            <div className="search_container">
                <div className="input-value">
                    <input id="search_result" type="text" placeholder="type something here ..."></input>
                </div>
                <div className="search-button" onClick ={this.handleSubmit}>
                    <div className="submit-button">
                        <div> Search </div>
                    </div>
                </div>
            </div>
            <div className="grid">
                {this.state.newsItems.map((el, index) => <NewsItem key={index + el.author} {...el} />)}
            </div>
        </div>
  
        )
    }

}
export default Home;
