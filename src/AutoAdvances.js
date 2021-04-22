import React from 'react';
import PropTypes from 'prop-types';

export default (Component, propName, upperBoundPropName) =>
  class ComponentWithAuthoAdvance extends React.PureComponent {
    static displayName = `AutoAdvances(${Component.displayName ||
      Component.name})`;

    static defaultProps = {
      autoAdvancedelay: 10e3,
    };

    static propTypes = {
      [propName]: PropTypes.number.isRequired,
      [`${propName}Increment`]: PropTypes.func.isRequired,
      autoAdvancedelay: PropTypes.number.isRequired,
      [upperBoundPropName]: PropTypes.oneOfType([
        PropTypes.number,
        PropTypes.array,
      ]).isRequired,
    };

    componentDidMount() {
      this.startTimer();
    }

    componentDidUpdate(prevProps) {
      if (
        prevProps[propName] !== this.props[propName] ||
        prevProps[upperBoundPropName] !== this.props[upperBoundPropName]
      ) {
        this.startTimer();
      }
    }

    componentWillUnmount() {
      clearTimeout(this._timer);
    }

    startTimer() {
      clearTimeout(this._timer);
      if (!this.props.autoAdvancedelay) return;

      let upperBound;
      if (typeof this.props[upperBoundPropName] === 'number') {
        upperBound = this.props[upperBoundPropName];
      } else if (this.props[upperBoundPropName] !== null) {
        upperBound = this.props[upperBoundPropName].length;
      }

      this._timer = setTimeout(() => {
        this.props[`${propName}Increment`](upperBound);
      }, this.props.autoAdvancedelay);
    }

    render() {
      const { autoAdvancedelay: _autoAdvanceDelay, ...rest } = this.props;
      return <Component {...rest} />;
    }
  };
