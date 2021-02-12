import React from "react";

class NewsItem extends React.Component { 
    render(){
        const prop = this.props
        console.log(prop)
        return (
            
            <div className="newsItem">
                
                <div className="news-title">
                    <a href={prop.url}>
                        <p>{prop.title}</p>
                    </a>
                </div> 
                <div className="newsDesc">
                    <p>
                        {prop.description}
                        <a href='/news_details'>learn more</a>
                    </p>
                </div>
                <div className="author-container">
                    <div className="flexer">
                        <div>Author Name: {prop.author} </div>
                        <div>Published At: {prop.publishedAt} </div>
                        <div> Source: {prop.source.name}</div>
                    </div>
                    <div className="flexer">
                        <img src={prop.urlToImage}></img>
                    </div>
                </div>
        </div>)
    }

}
export default NewsItem;
