import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const DefaultImg = styled.img`
  object-fit: contain;
  width: 100%;
  height: ${(props) =>
    typeof props.imgHeight === 'number'
      ? `${props.imgHeight}px`
      : props.imgHeight};
`;

const CarouselSlide = ({
  Image,
  imgUrl,
  imgHeight,
  description,
  attribution,
  ...rest
}) => {
  return (
    <figure {...rest}>
      <Image src={imgUrl} imgHeight={imgHeight} />
      <figcaption>
        <strong>{description}</strong> {attribution}
      </figcaption>
    </figure>
  );
};

CarouselSlide.propTypes = {
  Image: PropTypes.elementType,
  imgUrl: PropTypes.string.isRequired,
  imgHeight: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  description: PropTypes.node.isRequired,
  attribution: PropTypes.node,
};

CarouselSlide.defaultProps = {
  Image: DefaultImg,
  imgHeight: 500,
};

export default CarouselSlide;
