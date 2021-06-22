import React from 'react';

class Searchbar extends React.Component {

    handleFormsubmit = (event) => {
        event.preventDefault();
    }

    render() {

        return (
            <form onSubmit={this.handleFormsubmit}>
                <div className="form-row mb-5 mt-5">
                    <div className="col-6">
                        <input
                            onChange={this.props.searchMovie}
                            type="text"
                            className="form-control"
                            placeholder="Search movie"
                        />
                    </div>
                </div>
            </form>
        )
    }
}

export default Searchbar