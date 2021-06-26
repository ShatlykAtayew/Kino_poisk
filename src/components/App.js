import React from 'react';
import Searchbar from './Searchbar';
import MovieList from './MovieList';
import axios from 'axios';
import AddMovie from './AddMovie';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import EditMovie from './EditMovie';

class App extends React.Component {

    state = {
        movies: [],
        searchQuery: ""
    }

    /* async componentDidMount() {
        const baseURL = "http://localhost:3002/movies";
        const response = await fetch(baseURL);
        console.log(response);
        const data = await response.json();
        console.log(data);
        this.setState({movies: data})
    } */

    componentDidMount() {
        this.getMovies();
    }

    async getMovies() {
        const response = await axios.get("http://localhost:3002/movies");
        //console.log(response);
        this.setState({ movies: response.data });
    }

    /*     deleteMovie = (movie) => {
            const newMovieList = this.state.movies.filter(
                m => m.id !== movie.id
            );
    
            this.setState(state => ({
                movies: newMovieList
            }))
        } */
    //FETCH API
    /*     deleteMovie = async (movie) => {
            const baseURL = `http://localhost:3002/movies/${movie.id}`
            await fetch(baseURL, {
                method: "DELETE"
            })
            const newMovieList = this.state.movies.filter(
                m => m.id !== movie.id
            );
    
            this.setState(state => ({
                movies: newMovieList
            }))
        } */

    //Axios API
    deleteMovie = async (movie) => {
        axios.delete(`http://localhost:3002/movies/${movie.id}`)

        const newMovieList = this.state.movies.filter(
            m => m.id !== movie.id
        );

        this.setState(state => ({
            movies: newMovieList
        }))
    }
    //SEARCH MOVIE
    searchMovie = (event) => { this.setState({ searchQuery: event.target.value }) }

    //ADD MOVIE
    onAddMovie = async (movie) => {
        await axios.post(`http://localhost:3002/movies/`, movie)
        this.setState(state => ({
            movies: state.movies.concat([movie])
        }))
        this.getMovies();

    }

    EditMovie = async (id, movie) => {
        await axios.put(`http://localhost:3002/movies/${id}`, movie)
        this.getMovies();

    }


    render() {

        let filteredMovies = this.state.movies.filter(
            (movie) => {
                return movie.name.toLowerCase().indexOf(this.state.searchQuery.toLowerCase()) !== -1
            }
        ).sort((a, b) => {
            return a.id < b.id ? 1 : a.id > b.id ? -1 : 0;
        });

        return (
            <Router>
                <div className="container">
                    <Switch>

                        <Route path="/" exact render={() => (
                            <React.Fragment>
                                <div className="row">
                                    <div className="col-lg-12">
                                        <Searchbar
                                            searchMovie={this.searchMovie}
                                        />
                                    </div>
                                </div>

                                <MovieList
                                    movies={filteredMovies}
                                    deleteMovie={this.deleteMovie}
                                />
                            </React.Fragment>
                        )}>

                        </Route>

                        <Route path="/add" render={({ history }) => (

                            <AddMovie

                                onAddMovie={(movie) => {
                                    this.onAddMovie(movie)
                                    history.push("/")

                                }
                                }

                            />
                        )}>

                        </Route>

                        <Route path="/edit/:id" render={(props) => (

                            <EditMovie
                                {...props}
                                onEditMovie={(id, movie) => {
                                    this.EditMovie(id, movie)


                                }
                                }

                            />
                        )}>

                        </Route>

                    </Switch>

                </div>
            </Router>
        )
    }
}

export default App