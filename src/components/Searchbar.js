import React from 'react';
import {Link} from 'react-router-dom';

class Searchbar extends React.Component {

    handleFormsubmit = (event) => {
        event.preventDefault();
    }

    render() {

        return (
            <form onSubmit={this.handleFormsubmit}>
                <div className="form-row mb-5 mt-5">
                    <div className="col-8">
                        <input
                            onChange={this.props.searchMovie}
                            type="text"
                            className="form-control"
                            placeholder="Search movie"
                        />
                    </div>
                    <div className="col-4">
                        <Link 
                        to="/add"
                        type="button"
                            className="btn btn-md btn-danger"
                            style={{ float: 'left' }}> Add movie
                        </Link>
                    </div>
                </div>
            </form>
        )
    }
}

export default Searchbar