import { styled, Typography } from "@mui/material";
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

interface IProps {
  cardNumber: number;
  data?: Array<CardDetailsModel>;
}

interface IState {
  cards?: Array<CardDetailsModel>;
  likedCards: Array<CardDetailsModel>;
  dislikedCards: Array<CardDetailsModel>;
  activeCardNumber?: number;
  cardsRated: boolean;
}

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
    if (!this.props.data) return null;

    let loadedCards = this.props.data;

    let liked: Array<CardDetailsModel> = [];

    let disliked: Array<CardDetailsModel> = [];

    const updateStatus = () => {
      this.setState({
        cards: loadedCards,
      });
    };

    const votingEvent = (xCoordinate: number, card: CardDetailsModel): void => {
      //Depending on drag ending coordination, cast vote and reload next card

      if (loadedCards.length <= 1) {
        this.setState({
          cardsRated: true,
        });
        return;
      }

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

    return (
      <div className="card-stack">
        <>
          <Typography>Thanks for rating!</Typography>
          <span>
            Liked cards:{" "}
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
            Disliked cards:
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
