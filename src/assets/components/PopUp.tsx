import { Component } from "react";

interface PopUpProps {
  onclick?: () => void;
  data: any;
}

class PopUp extends Component<PopUpProps> {
  render() {
    const { onclick, data } = this.props;
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
        <div className="bg-white p-6 rounded-lg w-[500px]">
          <div
            className="text-black text-end mb-4 font-semibold"
            onClick={onclick}
            style={{ cursor: "pointer" }}
          >
            X
          </div>
          <div className="flex h-full w-full flex-wrap items-center justify-center gap-10">
            <img className="h-96 w-72 " src={data.poster} />
            <div className="flex flex-col justify-between text-black">
              <div className="">
                <span className="font-bold">Title: </span>
                {data.title}
              </div>
              <div>
                <span className="font-bold">Release date: </span>
                {data.release_date}
              </div>
              <div>
                <span className="font-bold">Genre: </span>
                {data.detail.genre.join(", ")}
              </div>
              <div>
                <span className="font-bold">Overview: </span>
                {data.detail.plot}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default PopUp;
