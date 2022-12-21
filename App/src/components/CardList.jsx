/* eslint-disable jsx-a11y/alt-text */
import React, { Component } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import CardComp from "./Card";
import styled from "styled-components";

const StyledCardListWrapper = styled.div`
  max-width: initial;

  .slick-arrow {
    display: none;
  }
  @media (min-width: 600px) {
    max-width: 90%;
    padding: 18px 0;
    margin: auto;
    background: linear-gradient(95deg, #c03c0349 20%, #f68c134c 25%, #0ed28758 100%);
    border-radius: 20px;

    .slick-arrow {
      display: block;
      color: red;
      margin: 0 -20px;
    }
  }

  & .card {
    margin: 10px;
  }
`;

const StyledArrow = styled.div`
  ::before {
    color: whitesmoke;
  }
`;

function SampleNextArrow(props) {
  const { className, style, onClick } = props;

  return (
    <StyledArrow className={className} onClick={onClick} style={{ width: "30px" }}>
      <img src="https://res.cloudinary.com/drh0lkvxh/image/upload/v1671413223/Group_2454_bubkx7.png" />
    </StyledArrow>
  );
}

function SamplePrevArrow(props) {
  const { className, style, onClick } = props;
  return (
    <StyledArrow className={className} onClick={onClick} style={{ width: "30px" }}>
      <img src="https://res.cloudinary.com/drh0lkvxh/image/upload/v1671413113/Group_2417_r4xkcz.png" />
    </StyledArrow>
  );
}

const CardList = (props) => {
  const { items, width, heigth, type, setChangeValue, showFavorite } = props;

  var settings = {
    className: "center",
    centerMode: false,
    centerPadding: "60px",
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 4,
    initialSlide: 0,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    responsive: [
      {
        breakpoint: 1400,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
        },
      },
      {
        breakpoint: 1000,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          nextArrow: null,
          prevArrow: null,
        },
      },
    ],
  };

  return (
    <StyledCardListWrapper>
      <Slider {...settings}>
        {items &&
          items.map((item) => (
            <CardComp
              showFavorite={showFavorite}
              setChangeValue={setChangeValue}
              key={item._id}
              item={item}
              width={width}
              heigth={heigth}
              type={type}
            />
          ))}
      </Slider>
    </StyledCardListWrapper>
  );
};

export default CardList;
