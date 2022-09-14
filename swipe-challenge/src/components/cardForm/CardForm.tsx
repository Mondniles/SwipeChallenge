import React, { Component } from "react";
import { ReactComponent as Rectangle } from "../../assets/img/card-rect.svg";
import { CardDetailsModel } from "../../models/CardDetailsModel";
import CardDetails from "./CardDetails";

// card data details will be passed through here

interface IProps {
  cardDetails?: CardDetailsModel;
}

interface IState {}

class CardForm extends Component<IProps, IState> {
  constructor(props: any) {
    super(props);

    this.state = {};
  }

  render() {
    return (
      <div className="card-wrapper">
        <div className="card-content"></div>
        <Rectangle />
      </div>
    );
  }
}

export default CardForm;
