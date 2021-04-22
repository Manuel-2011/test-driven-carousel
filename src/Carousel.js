import React from 'react';
import CarouselButton from './CarouselButton';
import CarouselSlide from './CarouselSlide';
import HasIndex from './HasIndex';
import PropTypes from 'prop-types';

export class Carousel extends React.PureComponent {
  static propTypes = {
    defaultImage: CarouselSlide.propTypes.Image,
    defaultImgHeight: CarouselSlide.propTypes.imgHeight,
    slides: PropTypes.arrayOf(PropTypes.shape(CarouselSlide.propTypes))
      .isRequired,
    slideIndex: PropTypes.number.isRequired,
    slideIndexDecrement: PropTypes.func.isRequired,
    slideIndexIncrement: PropTypes.func.isRequired,
  };

  static defaultProps = {
    defaultImage: CarouselSlide.defaultProps.Image,
    defaultImgHeight: CarouselSlide.defaultProps.imgHeight,
  };

  state = {
    slideIndex: 0,
  };

  handlePrevClick = () => {
    const { slideIndexDecrement, slides } = this.props;
    slideIndexDecrement(slides.length);
  };

  handleNextClick = () => {
    const { slideIndexIncrement, slides } = this.props;
    slideIndexIncrement(slides.length);
  };

  render() {
    const {
      defaultImage,
      defaultImgHeight,
      slides,
      slideIndex,
      slideIndexDecrement: _slideIndexDecrement,
      slideIndexIncrement: _slideIndexIncrement,
      ...rest
    } = this.props;
    return (
      <div {...rest}>
        <CarouselSlide
          Image={defaultImage}
          imgHeight={defaultImgHeight}
          {...slides[slideIndex]}
        />
        <CarouselButton data-action="prev" onClick={this.handlePrevClick}>
          Prev
        </CarouselButton>
        <CarouselButton data-action="next" onClick={this.handleNextClick}>
          Next
        </CarouselButton>
      </div>
    );
  }
}

export default HasIndex(Carousel, 'slideIndex');
