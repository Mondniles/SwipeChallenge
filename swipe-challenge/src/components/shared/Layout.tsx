import React, { Component } from "react";

import { ReactComponent as AppLogo } from "../../assets/img/appLogo.svg";
import { ReactComponent as ArrowLeft } from "../../assets/img/arrow-left.svg";
import { ReactComponent as ArrowRight } from "../../assets/img/arrow-right.svg";
import { ReactComponent as ThumbDown } from "../../assets/img/thumb-down.svg";
import { ReactComponent as ThumbUp } from "../../assets/img/thumb-up.svg";

import { Container, Grid } from "@mui/material";
import CardFormStack from "../cardForm/CardFormStack";

import "../../scss/SC.css";
import { CardDetailsModel } from "../../models/CardDetailsModel";

interface IProps {}

interface IState {
  loading?: boolean;
  error?: boolean;
  data?: Array<CardDetailsModel>;
}

class Layout extends React.Component<IProps, IState> {
  constructor(props: any) {
    super(props);

    this.state = {};
  }

  render() {
    return (
      <Container maxWidth="xl" className="main-container">
        <Grid container className="main-grid">
          <Grid item xs={12} className="layout-header">
            <Grid item xs={4}>
              <header className="App-header">
                <div className="header-logo">
                  <AppLogo />
                </div>
              </header>
            </Grid>
            <Grid item xs={4}></Grid>
            <Grid item xs={4}></Grid>
          </Grid>
          <Grid item xs={12} className="layout-cards">
            <Grid item xs={1} />
            <Grid item className="dislike-btn-wrapper" xs={2}>
              <Grid item className="dislike-btn" xs={6}>
                <div className="thumbs-down">
                  <ThumbDown />
                </div>
              </Grid>
              <Grid item className="dislike-btn-arrow" xs={6}>
                <div className="arrow-thumbs-down">
                  <ArrowLeft />
                </div>
              </Grid>
            </Grid>
            <Grid item className="card-stack" xs={6}>
              <CardFormStack data={this.state.data} />
            </Grid>
            <Grid item xs={1} />
            <Grid item className="like-btn-wrapper" xs={2}>
              <Grid item className="like-btn-arrow" xs={6}>
                <div className="arrow-thumbs-down">
                  <ArrowRight />
                </div>
              </Grid>
              <Grid item className="dislike-btn" xs={6}>
                <div className="thumbs-up">
                  <ThumbUp />
                </div>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12} className="layout-spacer"></Grid>
        </Grid>
      </Container>
    );
  }

  loadData() {
    fetch("https://creative-tech-code-quest.vercel.app/api/swipe")
      .then((res) => res.json())
      .then((res: Array<CardDetailsModel>) => {
        this.setState({
          data: res,
        });
        console.log(this.state.data);
      })
      .catch();
  }

  componentDidMount(): void {
    this.loadData();
  }
}

export default Layout;
