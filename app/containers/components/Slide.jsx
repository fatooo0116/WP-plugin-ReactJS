import React, { Component } from 'react';

import panel  from './activity.svg';

export default class Slide extends Component {


  render(){
    return(

        <div className="slide">
          <div className="ui tiny image">{panel}</div>
          <div className="content">
            <div className="header">Arrowhead Valley Camp</div>
            <div className="meta">
              <span className="price">$1200</span>
              <span className="stay">1 Month</span>
            </div>
            <div className="description">
              img
            </div>
          </div>
          <div className="REST_Controller">
            <button  className="button">Edit</button>
            <button  className="button">Delete</button>
          </div>
        </div>

    )
  }
}
