import React, { Component } from "react";
import { CardDetailsModel } from "../../models/CardDetailsModel";
import CardForm from "./CardForm";
import CardFormWithData from "./CardFormWithData";

interface IProps {
  data?: CardDetailsModel[];
}

interface IState {
  cardNumber: number;
}

class CardFormStack extends Component<IProps, IState> {
  constructor(props: any) {
    super(props);

    this.state = {
      cardNumber: 0,
    };
  }
  onSwipe() {}

  render() {
    const cards = this.props.data;

    if (cards) {
      return (
        <div className="card-stack">
          <div className="front-card">
            <CardFormWithData cardDetails={cards[this.state.cardNumber]} />
          </div>
          <div className="bg-card-1">
            <CardForm />
          </div>
          <div className="bg-card-2">
            <CardForm />
          </div>
          <div className="bg-card-3">
            <CardForm />
          </div>
        </div>
      );
    }
  }
}

export default CardFormStack;
