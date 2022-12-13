import React, { Component } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import CardComp from "./Card";
import styled from "styled-components";

const StyledCardListWrapper = styled.div`
  max-width: initial;
  margin-left: initial;
  @media (min-width: 600px) {
    max-width: 90%;
    margin-left: 20px;
  }

  & .card {
    margin: 10px;
  }
`;

function SampleNextArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div className={className} style={{ background: "#fff" }} onClick={onClick}>
      <img
        style={{ width: "20px" }}
        src="https://www.pngfind.com/pngs/m/302-3023323_arrow-pointing-to-right-comments-right-arrow-png.png"
      />
    </div>
  );
}

function SamplePrevArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div className={className} style={{ background: "#fff" }} onClick={onClick}>
      <img
        style={{ width: "20px" }}
        src="https://toppng.com/uploads/preview/arrow-pointing-to-the-left-115501167743epfu1fapc.png"
      />
    </div>
  );
}

const CardList = (props) => {
  const { items } = props;

  var settings = {
    className: "center",
    centerMode: false,
    centerPadding: "60px",
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    //slidesToScroll: 5,
    initialSlide: 0,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    responsive: [
      {
        breakpoint: 600,
        settings: {
          centerPadding: "60px",
          nextArrow: null,
          prevArrow: null,
          centerMode: true,
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          centerPadding: "60px",
          nextArrow: null,
          prevArrow: null,
          centerMode: true,
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <StyledCardListWrapper>
      <Slider {...settings}>
        {items.map((item) => (
          <CardComp
            key={item._id}
            className="card"
            imgSrc={item.image}
            tags={item.tags}
            recipe={item}
          />
        ))}
      </Slider>
    </StyledCardListWrapper>
  );
};

export default CardList;
