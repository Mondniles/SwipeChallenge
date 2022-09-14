import React, { Component } from "react";
import { CardDetailsModel } from "../../models/CardDetailsModel";

//Shows data in card

type Props = {
  data: CardDetailsModel;
};

type State = {};

class CardDetails extends Component<Props, State> {
  state = {};

  render() {
    return (
      <div className="card-details-form">
        <a>{this.props.data.title}</a>
        <a>{this.props.data.body}</a>
        {/* <img src={this.props.data.image}></img> CANT ADD IMAGES */}
      </div>
    );
  }
}

export default CardDetails;
