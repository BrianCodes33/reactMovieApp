import React, {
  Component
} from 'react';
import './App.css';
import axios from 'axios';

class App extends Component {
  constructor() {
    super()
    this.state = {
      poster: '',
      title: '',
      description: '',
      genre: '',
      year: '',
      rated: '',
      query: '',
      runtime: '',
      ratings: [],
      url: 'http://www.omdbapi.com/?t=',
      isClicked: false,
      display: 'none'

    }
  }

  handleChange(e) {
    this.setState({
      query: e.target.value
    })
  }

  handleClick(e) {
    this.setState({
      isClicked: true,
      display: 'flex'
    })
    axios.get(`${this.state.url}${this.state.query}`)
      .then((res) => {
        this.setState({
          title: res.data.Title,
          poster: res.data.Poster,
          description: res.data.Plot,
          runtime: res.data.Runtime,
          genre: res.data.Genre,
          rated: res.data.Rated,
          year: res.data.Year,
          ratings: res.data.Ratings,
          query:  ''
        })
        console.log(res.data);
      })
      .catch((error) => {
        console.log(error);
      })
  }

  render() {
    const styles = {
      display: this.state.display
    }

    return (
      <div className="container">
        <div className="user-input">
          <input type="text" onChange={this.handleChange.bind(this)} placeholder="Search for a Movie" />
          <input type="submit" name = "Send" onClick= {this.handleClick.bind(this)} />
          <h1>Brians Movies</h1>
        </div>
         <div style={styles} className="content-container">
           <div className="poster-container">
             <h1 className="title">{this.state.title}</h1>
              {this.state.poster ?  <img src={this.state.poster} alt="poster" / >  : ''}
           </div>
           <div className="description-container">
             <p className="description">Description: {this.state.description}</p>
             <p className="genre">Genre: {this.state.genre}</p>
             <p className="rated">Rated: {this.state.rated}</p>
             <p className="yearReleased">Year Released: {this.state.year}</p>
             <p className="runtime">Run Time: {this.state.runtime}</p>
             </div>
         </div>
        </div>
  );
}
}

export default App;
