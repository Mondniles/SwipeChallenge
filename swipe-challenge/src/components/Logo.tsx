import React from "react";
import LogoImg from "../assets/img/logo.svg";

class Logo implements JSX.Element {
  render() {
    return (
      <div className="header-logo">
        <LogoImg />
      </div>
    );
  }
}

export default Logo;
