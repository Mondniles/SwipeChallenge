import { styled } from "@mui/material";
import { motion } from "framer-motion";
import React from "react";
import { CardDetailsModel } from "../../models/CardDetailsModel";
import CardFormWithData from "./CardFormWithData";

export const FrontCard = styled(motion.div)`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -30%);
`;

export function CardFormStack(cardNumber: number, data?: CardDetailsModel[]) {
  if (!data) {
    return null;
  }

  const cards = data;

  let liked: Array<CardDetailsModel> = [];

  let disliked: Array<CardDetailsModel> = [];

  let lock: boolean = false;

  let currentCard = cardNumber;

  const votingEvent = (xCoordinate: number, card: CardDetailsModel): void => {
    //Depending on drag ending coordination, cast vote and reload next card

    if (xCoordinate < 450) {
      if (!disliked.includes(card)) {
        cards[currentCard].status = false;
        disliked.push(card);

        const index = cards.indexOf(card, 0);
        if (index > -1) {
          cards.splice(index, 1);
        }
      }
    }

    if (xCoordinate > 1300) {
      if (!liked.includes(card)) {
        cards[currentCard].status = false;
        liked.push(card);

        const index = cards.indexOf(card, 0);
        if (index > -1) {
          cards.splice(index, 1);
        }
      }

      console.log("LIKED", liked);
    }
  };

  const checkStatus = (card: CardDetailsModel): boolean | null => {
    if (liked.includes(card)) return true;
    if (disliked.includes(card)) return false;

    return null;
  };

  let setLabel = (card: CardDetailsModel): string => {
    if (checkStatus(card)) {
      return "LIKED";
    }
    if (!checkStatus(card)) {
      return "DISLIKED";
    }
    return "UNKNOWN";
  };

  return (
    <div className="card-stack">
      <>
        {cards.map((card) => {
          return (
            <FrontCard
              key={card.id}
              drag="x"
              dragConstraints={{
                left: -600,
                right: 500,
                top: 0,
                bottom: 0,
              }}
              onDragEnd={(e, info) => {
                votingEvent(info.point.x, card);
                setLabel(card);
                console.log(info.point.x, info.point.y);
              }}
              className="front-card"
            >
              <a>{setLabel(card)}</a>
              {CardFormWithData(cards[card.id - 1])}
            </FrontCard>
          );
        })}
      </>
    </div>
  );
}

export default CardFormStack;
