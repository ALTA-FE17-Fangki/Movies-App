import { Component } from "react";

interface CardProps {
  title: string;
  poster: string;
  data?: any;
  onPopUp: (data: any) => void;
}

class Card extends Component<CardProps> {
  render() {
    const { data, poster, title, onPopUp } = this.props;
    return (
      <div className="bg-amber-100 w-80 text-gray-800 flex flex-col items-center">
        <img
          style={{ cursor: "pointer" }}
          onClick={() => onPopUp(data)}
          src={poster}
          alt="Movie Poster"
          className="aspect-[2/3] object-cover"
        />

        <div
          style={{ cursor: "pointer" }}
          onClick={() => onPopUp(data)}
          className="h-16 font-bold text-lg flex justify-center items-center"
        >
          {title}
        </div>
      </div>
    );
  }
}

export default Card;
