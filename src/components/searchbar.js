import React from 'react'

class SearchBar extends React.Component {

    render() {
        console.log(this.props)
        return (
            <div className="search_container">
                <div className="input-value">
                    <input type="text" placeholder="type something here ..."></input>
                </div>
                <div className="search-button" onClick ={this.props.props.handleSubmit}>
                    <div className="submit-button">
                        <div> Search </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default SearchBar;