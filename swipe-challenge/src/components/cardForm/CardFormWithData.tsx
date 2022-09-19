import React from "react";

import { ReactComponent as Rectangle } from "../../assets/img/card-rect.svg";
import { CardDetailsModel } from "../../models/CardDetailsModel";

// Displaying card data within card

export default function CardFormWithData(
  cardDetails?: CardDetailsModel,
  checkStatus?: (card: CardDetailsModel) => boolean | null
) {
  if (cardDetails) {
    const details: CardDetailsModel = {
      id: cardDetails.id || 0,
      body: cardDetails.body || "",
      image: cardDetails.image || "",
      title: cardDetails.title || "Not found",
    };

    return (
      <React.Fragment>
        <div className="card-wrapper">
          <div className="card-content">
            <div className="card-details-form">
              <a className="card-title">{details.title}</a>
              <a className="card-body">{details.body}</a>
            </div>
          </div>
          <Rectangle />
        </div>
      </React.Fragment>
    );
  }
}
