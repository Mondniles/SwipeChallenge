import React from "react";
import { styled } from "@mui/material";
import { motion } from "framer-motion";

import { CardDetailsModel } from "../../models/CardDetailsModel";
import CardFormWithData from "./CardFormWithData";

export const FrontCard = styled(motion.div)`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -30%);
`;

interface IProps {
  cardNumber: number;
  data?: Array<CardDetailsModel>;
}

interface IState {
  cards?: Array<CardDetailsModel>;
  likedCards: Array<CardDetailsModel>;
  dislikedCards: Array<CardDetailsModel>;
  result?: Array<CardDetailsModel>;
  activeCardNumber?: number;
  cardsRated: boolean;
}

/// WILL RENDER CARD BY CARD ON STACK AND SEND DATA TO API AFTER ALL CARDS HAD BEEN RATED

class CardFormStack extends React.Component<IProps, IState> {
  constructor(props: any) {
    super(props);

    this.state = {
      cardsRated: false,
      likedCards: [],
      dislikedCards: [],
      activeCardNumber: this.props.cardNumber,
    };
  }

  render() {
    // DEFINE VARIABLES

    if (!this.props.data) return null;

    let loadedCards = this.props.data;

    let liked: Array<CardDetailsModel> = [];

    let disliked: Array<CardDetailsModel> = [];

    // SWIPING CARDS PART

    const votingEvent = (xCoordinate: number, card: CardDetailsModel): void => {
      //Depending on drag ending coordination, cast vote and reload next card
      // I'm using framer as the library for moving parts
      // At the start had to use functional components, but I found some incompatabilities withing loaded dependencies, that doesnt allow me to use hooks.

      if (xCoordinate < 450) {
        if (!disliked.includes(card)) {
          disliked = this.state.dislikedCards;
          loadedCards[card.id - 1].status = false;
          disliked.push(card);

          const index = loadedCards.indexOf(card, 0);
          if (index > -1) {
            loadedCards.splice(index, 1);
          }
        }

        this.setState({
          dislikedCards: disliked,
        });
      }

      if (xCoordinate > 1300) {
        if (!this.state.likedCards.includes(card)) {
          liked = this.state.likedCards;

          loadedCards[card.id - 1].status = true;
          liked.push(card);

          const index = loadedCards.indexOf(card, 0);
          if (index > -1) {
            loadedCards.splice(index, 1);
          }
        }

        this.setState({
          likedCards: liked,
        });
      }

      if (loadedCards.length <= 0) {
        this.setState({
          cardsRated: true,
        });
        return;
      }
    };

    if (!this.state.cardsRated) {
      return (
        <div className="card-stack">
          <>
            {loadedCards.map((card) => {
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
                  }}
                  className="front-card"
                >
                  {CardFormWithData(loadedCards[card.id - 1])}
                </FrontCard>
              );
            })}
          </>
        </div>
      );
    }

    ///

    // POST REQUEST part

    function handleDataSend(
      liked: Array<CardDetailsModel>,
      disliked: Array<CardDetailsModel>
    ) {
      let result: Array<CardDetailsModel> = [];

      result.concat(liked, disliked);

      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ result }),
      };
      fetch(
        "https://creative-tech-code-quest.vercel.app/api/swipe/1",
        requestOptions
      ).then((response) => response.json());
    }

    // I assumed, that the part of url ".../swipe/1 - that the last number is
    // the id of card that needs to be updated, but I didnt have time to finish :("

    // Once all cards has been rated, execute post request.
    if (this.state.cardsRated === true) {
      handleDataSend(this.state.likedCards, this.state.dislikedCards);
    }

    ///

    /// RENDER PART

    return (
      <div className="card-stack">
        <>
          <h1>Thanks for rating!</h1>
          <span>
            <h2>Liked cards: </h2>
            {this.state.likedCards.map((card) => {
              return (
                <div key={card.id}>
                  <span>{card.title}</span>
                  <br />
                </div>
              );
            })}
          </span>
          <br />
          <span>
            <h2>Disliked cards: </h2>
            {this.state.dislikedCards.map((card) => {
              return (
                <div key={card.id}>
                  <span>{card.title}</span>
                  <br />
                </div>
              );
            })}
          </span>
        </>
      </div>
    );
  }
}

export default CardFormStack;
