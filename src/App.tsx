import { Component } from "react";
import Layout from "./assets/components/Layout";
import Card from "./assets/components/Card";
import data from "./assets/dummy/movie.json";
import PopUp from "./assets/components/PopUp";

interface AppState {
  shownPopUp: boolean;
  movieData: any;
}

export class App extends Component<{}, AppState> {
  constructor(props: {}) {
    super(props);
    this.state = {
      shownPopUp: false,
      movieData: {},
    };

    // Binding the event handler in the constructor
    this.handleOpenPopUp = this.handleOpenPopUp.bind(this);
    this.handleClosePopUp = this.handleClosePopUp.bind(this);
  }

  handleOpenPopUp(data: any) {
    this.setState({ shownPopUp: true, movieData: data });
  }

  handleClosePopUp() {
    this.setState({ shownPopUp: false });
  }
  render() {
    const { shownPopUp, movieData } = this.state;

    return (
      <Layout>
        <div className="flex flex-col gap-10 items-center">
          <h1 className="text-7xl">THE MOVIE LIST</h1>
          <div className="grid grid-cols-4 justify-items-center text-center gap-8 overflow-hidden">
            {data &&
              data.map((item: any, index: number) => {
                return <Card key={index} data={item} onPopUp={this.handleOpenPopUp} />;
              })}
          </div>
        </div>
        {shownPopUp && <PopUp data={movieData} onclick={this.handleClosePopUp} />}
      </Layout>
    );
  }
}

export default App;
