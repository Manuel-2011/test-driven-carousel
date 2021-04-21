import React from 'react';
import CarouselButton from './CarouselButton';
import CarouselSlide from './CarouselSlide';
import PropTypes from 'prop-types';

class Carousel extends React.PureComponent {
  static propTypes = {
    defaultImage: CarouselSlide.propTypes.Image,
    defaultImgHeight: CarouselSlide.propTypes.imgHeight,
    slides: PropTypes.arrayOf(PropTypes.shape(CarouselSlide.propTypes))
      .isRequired,
  };

  static defaultProps = {
    defaultImage: CarouselSlide.defaultProps.Image,
    defaultImgHeight: CarouselSlide.defaultProps.imgHeight,
  };

  state = {
    slideIndex: 0,
  };

  handlePrevClick = () => {
    this.setState(({ slideIndex }, { slides }) => ({
      slideIndex: (slideIndex - 1 + slides.length) % slides.length,
    }));
  };

  handleNextClick = () => {
    this.setState(({ slideIndex }, { slides }) => ({
      slideIndex: (slideIndex + 1 + slides.length) % slides.length,
    }));
  };

  render() {
    const { defaultImage, defaultImgHeight, slides, ...rest } = this.props;
    return (
      <div {...rest}>
        <CarouselSlide
          Image={defaultImage}
          imgHeight={defaultImgHeight}
          {...slides[this.state.slideIndex]}
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

export default Carousel;
