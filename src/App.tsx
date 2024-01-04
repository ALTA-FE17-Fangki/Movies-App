import { Component } from "react";
import Layout from "./assets/components/Layout";
import Card from "./assets/components/Card";
import data from "./assets/dummy/movie.json";
import PopUp from "./assets/components/PopUp";
import axios from "axios";

interface AppState {
  shownPopUp: boolean;
  movieData: any;
  genres: any;
}

interface nowPlayingState {
  datas: [];
  content: [];
}

export class App extends Component<{}, AppState & nowPlayingState> {
  constructor(props: {}) {
    super(props);
    this.state = {
      shownPopUp: false,
      movieData: {},
      datas: [],
      genres: [],
      content: [],
    };

    this.handleOpenPopUp = this.handleOpenPopUp.bind(this);
    this.handleClosePopUp = this.handleClosePopUp.bind(this);
  }

  handleOpenPopUp(data: any) {
    this.setState({ shownPopUp: true, movieData: data });
  }

  handleClosePopUp() {
    this.setState({ shownPopUp: false });
  }

  getGenreNames(genreIds: number[], dataGenre: any[]) {
    return genreIds.map((genreId) => {
      const genre = dataGenre.find((item: any) => item.id === genreId);
      return genre ? genre.name : "";
    });
  }

  getData(id: string) {
    axios
      .get(`https://api.themoviedb.org/3/movie/${id}`, {
        headers: {
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmOGFiNzBhNTZkYWQ0OTIwOWEwN2EyMTk1YjQwMGIwZiIsInN1YiI6IjY1Njk4MjAxZDM5OWU2MDBjNDBmYjRhYyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.qkFPicxaue4i1QpZiZWCrV4uEaJCsWQlnmCgzjmP8Vw",
        },
      })
      .then((response) => {
        this.setState({ content: response.data.results });
        console.log("got by id: ", response.data.results);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  getAllNowPlaying() {
    axios
      .get("https://api.themoviedb.org/3/movie/now_playing", {
        headers: {
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmOGFiNzBhNTZkYWQ0OTIwOWEwN2EyMTk1YjQwMGIwZiIsInN1YiI6IjY1Njk4MjAxZDM5OWU2MDBjNDBmYjRhYyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.qkFPicxaue4i1QpZiZWCrV4uEaJCsWQlnmCgzjmP8Vw",
        },
      })
      .then((response) => {
        const movies = response.data.results;

        axios
          .get("https://api.themoviedb.org/3/genre/movie/list", {
            headers: {
              Authorization:
                "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmOGFiNzBhNTZkYWQ0OTIwOWEwN2EyMTk1YjQwMGIwZiIsInN1YiI6IjY1Njk4MjAxZDM5OWU2MDBjNDBmYjRhYyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.qkFPicxaue4i1QpZiZWCrV4uEaJCsWQlnmCgzjmP8Vw",
            },
          })
          .then((resGenre) => {
            const movieDataWithGenres = movies.map((movie: any) => {
              const genreNames = this.getGenreNames(movie.genre_ids, resGenre.data.genres);
              return { ...movie, genre_Names: genreNames };
            });
            this.setState({ datas: movieDataWithGenres });
          })
          .catch((error) => {
            console.log(error);
          });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  componentDidMount() {
    this.getAllNowPlaying();
  }

  render() {
    const { shownPopUp, movieData, datas } = this.state;
    return (
      <Layout>
        <div className="flex flex-col gap-10 items-center">
          <h1 className="text-7xl">MOVIE KITA</h1>
          <div className="self-start pl-7 text-5xl">Now Playing</div>
          <div className="grid grid-cols-4 justify-items-center text-center gap-8 overflow-hidden">
            {datas &&
              datas.slice(0, 8).map((item: any) => {
                return (
                  <Card
                    key={item.id}
                    title={item.title}
                    data={item}
                    poster={`https://image.tmdb.org/t/p/w500${item.poster_path}`}
                    onPopUp={this.handleOpenPopUp}
                  />
                );
              })}
          </div>
          <div className="self-start pl-7 text-5xl">Movies</div>
          <div className="grid grid-cols-4 justify-items-center text-center gap-8 overflow-hidden">
            {data &&
              data.map((item: any, index: number) => {
                return (
                  <Card
                    key={index}
                    data={item}
                    title={item.title}
                    poster={item.poster}
                    onPopUp={this.handleOpenPopUp}
                  />
                );
              })}
          </div>
        </div>
        {shownPopUp && <PopUp data={movieData} onclick={this.handleClosePopUp} />}
      </Layout>
    );
  }
}

export default App;
