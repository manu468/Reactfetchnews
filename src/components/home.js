import React from "react";
import { renderIntoDocument } from "react-dom/test-utils";
import Loading from './loadingSpinner';
import NewsItem from './newsitem';
import SearchBar from './searchbar';
import logo from '../images/filter_icon2.jpeg';

require('dotenv').config();

class Home extends React.Component { 
    state = {
        newsItems: [],
        search_query: "",
        api_key: process.env.NEWS_API_KEY || "4df3ca7aebe0417f8d9fde4516eda581",
        filters: {
            relevance: null,
            popularity: null,
            date: null
        },
        currentPage: 1,
        nextPageAvailable: false,
        loading: false
    }
    handleSubmit = () => {
       
        const search_value = document.getElementById('search_result').value;

        if(this.state.search_query !== search_value) {
            this.setState({
                search_query: search_value
            });

            this.fetchNewsData();
        }

    }


    highlightButtonClick = (event) => {
        const input_element = event.target.children.length >0 ? event.target.children[0] : null;

        if(input_element) {
            const is_checked = input_element.checked;
            input_element.checked = !is_checked;
        }
        
    }

    clearAllFilters = () => {
        const allCheckedBoxes = document.querySelectorAll("input[type=radio]");
        allCheckedBoxes.forEach( checkbox => {
            checkbox.checked = false;
        })
    }

    displayFilters = (event) => {
        const filter_section = document.querySelector(".filter_buttons");
        const data_filters = document.querySelector("div[data-filters]");
        const status = data_filters.getAttribute("data-filters")

        if(filter_section && status == "false") {
            filter_section.style = "display:block";
            data_filters.setAttribute("data-filters", "true");
        } else if(filter_section && status == "true"){
            filter_section.style = "display:none";
            data_filters.setAttribute("data-filters", "false");
        }

    }

    componentDidMount = () => {
        const queryElement = document.querySelector("#search_result");
      
        //This is for Enter key event
        document.addEventListener('keypress', e => {
            const search_query = queryElement.value
            if(e.key == "Enter") {
                if(search_query !== this.state.search_query) {
                    this.setState({search_query})
                    this.fetchNewsData();

                }
            }
        });

        document.addEventListener('click', e => {
            if(e.target.className == "button" || e.target.className == "clear-filter") {
                const filter_name = e.target.getAttribute("name");
                let canSendRequest = false;
                switch(filter_name) {
                    case "popularity":
                        this.setState({filters:{
                            ...this.state.filters,
                            popularity: this.state.filters.popularity == null ? "popularity" : null,
                        }});
                        canSendRequest = true;
                        break;
                    case "date":
                        const items = this.state.newsItems;
                        items.sort((news1, news2) => new Date(news2.publishedAt) - new Date(news1.publishedAt));
                        this.setState({newsItems: items});
                        if(this.state.filters.date) {
                            this.setState({filters:{
                                ...this.state.filters,
                                date: null,
                            }});
                            canSendRequest = true;
                        } else {
                            const date = new Date();
                            const date_string = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
                            this.setState({filters:{
                                ...this.state.filters,
                                date: date_string 
                            }});
                        }

                        break;
                    case "relevance":
                        this.setState({filters:{
                            ...this.state.filters,
                            relevance: this.state.filters.popularity == null ? "relevance" : null,
                        }});
                        canSendRequest = true;
                        break;
                    case "clear_filter":
                        this.setState({filters:{
                            popularity: null,
                            date: null,
                            relevance: null
                        }});
                        canSendRequest = true;
                        break;
                    default: 
                        break;
                }
                const search_query = queryElement.value;
                if(search_query && canSendRequest) {
                    this.fetchNewsData();
                }
                
            }
        });
    }

    fetchNewsData = () => { 
        //Build Fetch URL
        const urlString = new URL('http://newsapi.org/v2/everything/');
        urlString.searchParams.append('q', this.state.search_query)
      
        const filters = this.state.filters;
        for(const[key, value] of Object.entries(filters)) {
            if(value) {
                if (key == 'date') {
                    // urlString.searchParams.append('from', value);
                } else {
                    urlString.searchParams.append('sortBy', value)
                }
            } else {
                if(key =='date') {
                    urlString.searchParams.delete("from");
                } else {
                    urlString.searchParams.delete("sortBy");
                }
            }
        }

        //For Pagination
        console.log(this.state, 'from URL build')
        if(this.state.currentPage > 1) {
            urlString.searchParams.append('page', this.state.currentPage)
        }
        urlString.searchParams.append('apiKey', this.state.api_key)

        // document.body.appendChild(document.createElement('Loading'))
        this.setState({loading: true});
        fetch(urlString.href)
        .then(data => data.json())
        .then(data => {
            this.setState({newsItems: []})
            if(data.totalResults >0) {
                this.setState({nextPageAvailable: data.totalResults > this.state.currentPage * 20});
                this.setState({newsItems: data.articles});
                document.querySelector('#pagination').style = "display:block";
            } else {
                document.querySelector('#pagination').style = "display:none";
            }

            this.setState({loading: false})
        })
    }

    handlePagination = (event) => {
        const page_label = event.target.getAttribute('name');
        let canSendRequest = false;
        let count =  this.state.currentPage;

        if(page_label === "prev") {
            if(count <= 1) {
                //Do nothing
            } else {
                canSendRequest = true;
                this.setState({currentPage: --this.state.currentPage });
            }
        }

        else if(page_label === "next") {
            console.log(this.state)
            if(this.state.nextPageAvailable) {
                canSendRequest = true;
                this.setState({currentPage: ++this.state.currentPage });
                console.log(this.state, "this is after increment")
            }

        }
        if(canSendRequest) {
            // setTimeout(() => this.fetchNewsData, 500);
            this.fetchNewsData();
        }
    }

    render(){
        return (
        <div>
             <SearchBar
                handleSubmit={this.handlePagination}
                displayFilters={this.displayFilters}
                highlightButtonClick={this.highlightButtonClick}
                clearAllFilters={this.clearAllFilters}
             />
   
            {this.state.newsItems && this.state.newsItems.length == 0 ? <div className="no-results">No results to display...</div> : <div></div>}
            
            <div className="grid">
                {this.state.newsItems && this.state.newsItems.map((el, index) => <NewsItem key={index + el.author} {...el} />)}    
            </div>
            <div className="page-nav" id="pagination">
                <div className="pagination-buttons">
                    <div className="prev-button" name="prev" onClick={this.handlePagination}>
                        &lt; Previous Page
                    </div>
                    <div className="cur-button">
                        Page {this.state.currentPage}
                    </div>
                    <div className="next-button" name="next" onClick={this.handlePagination}>
                       Next Page &gt; 
                    </div>
                </div>
            </div>
            {this.state.loading ? <Loading /> : <div />}
        </div>
  
        )
    }

}
export default Home;
