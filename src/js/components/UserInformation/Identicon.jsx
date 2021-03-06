import React, {Component} from 'react';
import PropTypes from 'prop-types';
import IdenticonJS from 'identicon.js';
import {zeroAddress} from '../../utils/address';

class Identicon extends Component {
  render() {
    let {className, seed, scale} = this.props;
    if (!seed) {
      seed = zeroAddress;
    }
    const size = 8 * (scale || 4);
    const options = {
        background: [255, 255, 255, 255],
        margin: 0.24,
        size: size,
        format: 'svg'
      };

    const data = new IdenticonJS(seed, options).toString();
    return <img alt="identicon" width={size} height={size} className={className} src={'data:image/svg+xml;base64,' + data} />;
  }
}

Identicon.propTypes = {
  className: PropTypes.string,
  seed: PropTypes.string,
  scale: PropTypes.number
};

export default Identicon;
