import React, { Fragment } from 'react';
import logo from '../images/filter_icon2.jpeg';

class SearchBar extends React.Component {
    state = {
        displayFilters: null,
        highlightButtonClick: null,
        clearAllFilters: null
    }

    componentDidMount = () => {
        this.setState({displayFilters: this.props.displayFilters});
        this.setState({highlightButtonClick: this.props.highlightButtonClick});
        this.setState({clearAllFilters: this.props.clearAllFilters})
    }

    render() {

        return (
            <Fragment>
                <div className="search_filter_wrap">
                    <div className="search_container">
                        <div className="input-value">
                            <input id="search_result" type="text" placeholder="type something here ..."></input>
                        </div>
                        <div className="search-button" name="submit">
                            <div className="submit-button" name="submit">
                                <div name="submit"> Search </div>
                            </div>
                        </div>
                    </div>
                    <div className="filter_section"  data-filters="false" onClick={this.state.displayFilters}>
                        <img src={logo}></img>
                    </div>
                </div>

                <div className="filter_buttons">
                    <div className="button_section">
                        <div className="button" name="popularity" onClick={this.state.highlightButtonClick}>
                            <input type="radio" name="popularity"></input>
                            Popularity
                        </div>
                        <div className="button" name="date" onClick={this.state.highlightButtonClick}>
                            <input type="radio" name="date"></input>
                            Date
                        </div>
                        <div className="button" name="relevance" onClick={this.state.highlightButtonClick}>
                            <input type="radio" name="relevance"></input>
                            Relevance
                        </div>
                        <div className="button" name="clear_filter" onClick={this.state.clearAllFilters}>
                            <div className="clear-filter" name="clear_filter" id ="clear_filter">
                            No Filters
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    )
    }
}

export default SearchBar;