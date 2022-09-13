import React, { Component } from "react";
import CardForm from "./CardForm";

type Props = {};

type State = {};

class CardFormStack extends Component<Props, State> {
  state = {};

  render() {
    return (
      <div className="card-stack">
        <div className="front-card">
          <CardForm />
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

export default CardFormStack;
