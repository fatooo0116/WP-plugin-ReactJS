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
              <div className="header">{this.props.title}</div>
              <div className="description">
                {this.props.desc}
              </div>
            </div>
          </div>

          <div className="REST_Controller">
            <button   data-key={this.props.datakey}  slidebox-key={this.props.slideBox}  onClick={this.props.modalopend} className="button">Edit</button>
            <button   slide-key={this.props.datakey} onClick={this.props.delSlided} className="button">Del</button>
          </div>
        </div>

    )
  }
}
