import { Component } from "react";

interface CardProps {
  data: any;
  onPopUp: (data: any) => void;
}

class Card extends Component<CardProps> {
  render() {
    const { data, onPopUp } = this.props;
    return (
      <div className="bg-amber-100 w-80 text-gray-800 flex flex-col items-center">
        <img
          onClick={() => onPopUp(data)}
          src={data.poster}
          alt="Movie Poster"
          className="aspect-[2/3] object-cover"
        />

        <div className="h-16 font-bold text-lg flex justify-center items-center">{data.title}</div>
      </div>
    );
  }
}

export default Card;
