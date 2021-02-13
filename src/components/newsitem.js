import React from "react";

class NewsItem extends React.Component { 
    render(){
        const prop = this.props
        const date = new Date(prop.publishedAt);
        const date_string = `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`;
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
                        <a href={prop.url}>learn more</a>
                    </p>
                </div>
                <div className="author-container">
                    <div className="flexer">
                        <div>Author Name: {prop.author} </div>
                        <div>Published At: {date_string} </div>
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
