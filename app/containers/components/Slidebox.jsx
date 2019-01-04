import React, { Component } from 'react';

import Slide from './Slide';

export default class Slidebox extends Component {








  render(){
      return (
        <div className="slide"  onClick={this.props.onclicked} >
          <button className="button"> ADD </button>
          <div  className="content">
            <ul>
              <li><Slide /></li>
              
            </ul>
          </div>
        </div>
      )
  }
}
