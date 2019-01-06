import React, { Component } from 'react';
import imgIcon  from './image.svg';



export default class Slide extends Component {

  render(){
    return(

        <div className="slide">
          <div  className="clearfix  main">
            <div className="image">
              <img src={"/wp-content/plugins/WP-plugin-ReactJS/assets/"+imgIcon} />
            </div>
            <div className="inner-content">
              <div className="header">Arrowhead Valley Camp</div>
              <div className="description">
                img
              </div>
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
