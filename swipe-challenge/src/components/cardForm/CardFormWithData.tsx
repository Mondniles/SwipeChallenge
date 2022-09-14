import React, { Component } from "react";
import { ReactComponent as Rectangle } from "../../assets/img/card-rect.svg";
import { CardDetailsModel } from "../../models/CardDetailsModel";
import CardDetails from "./CardDetails";

// card data details will be passed through here

interface IProps {
  cardDetails?: CardDetailsModel;
}

interface IState {}

class CardFormWithData extends Component<IProps, IState> {
  constructor(props: any) {
    super(props);

    this.state = {};
  }

  render() {
    if (this.props.cardDetails) {
      const details: CardDetailsModel = {
        id: this.props.cardDetails.id || 0,
        body: this.props.cardDetails.body || "",
        image: this.props.cardDetails.image || "",
        title: this.props.cardDetails.title || "Not found",
      };

      return (
        <div className="card-wrapper">
          <div className="card-content">
            <CardDetails data={details} />
          </div>
          <Rectangle />
        </div>
      );
    }
    return null;
  }
}

export default CardFormWithData;
