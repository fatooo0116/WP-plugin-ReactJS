import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Slidebox from './components/Slidebox';

import SliderOuter from './components/Sliderouter';



import fetchWP from '../utils/fetchWP';


export default class Admin extends Component {
  constructor(props) {
    super(props);

    this.state = {
      exampleSetting: '',
      savedExampleSetting: '',
      slider:[]
    };

  }



  render() {
    return (
      <div id="sliderDom" className="wrap">

        <SliderOuter wpObject={window.wpr_object}  />

      </div>
    );
  }
}

Admin.propTypes = {
  wpObject: PropTypes.object
};
