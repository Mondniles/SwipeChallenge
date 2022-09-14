import React, { Component } from "react";
import { ReactComponent as Rectangle } from "../../assets/img/card-rect.svg";
import { CardDetailsModel } from "../../models/CardDetailsModel";

// card data details will be passed through here

export function CardForm(isInstruction?: boolean) {
  return (
    <div className="card-wrapper">
      <div className="card-content">
        <div className="card-details-form">
          <a className="card-title">
            {" "}
            {isInstruction
              ? "SWIPE TO EITHER SIDE TO LIKE OR DISLIKE THE CARD"
              : " "}
          </a>
        </div>
      </div>
      <Rectangle />
    </div>
  );
}

export default CardForm;
