import React, { Component } from 'react';
import imgIcon  from './image.svg';


export default class Slide extends Component {

  render(){




    let oidUpBtn, oidDownBtn,imgTag;
    let btnUpShow = 'hideMe';
    let btnDownShow = 'hideMe';
    if(this.props.slideNum >1){
      btnUpShow='';
      btnDownShow='';
    }

    if(this.props.oid=='1'){
      btnUpShow = 'hideMe';
    }
    if(this.props.oid==this.props.slideNum){
      btnDownShow = 'hideMe';
    }

    if(this.props.slideNum>1){
      oidUpBtn = <button   data-key={this.props.datakey} dx="up" onClick={this.props.changeOided} className={"button up "+btnUpShow}></button>;
    }

    if(this.props.slideNum>1){
      oidDownBtn = <button   data-key={this.props.datakey}  dx="down" onClick={this.props.changeOided}  className={"button down "+btnDownShow}></button>;
    }

    if(this.props.url){
      imgTag = <a href={this.props.url}  target="_blank" ><img src={this.props.url} /></a>;
    }else{
      imgTag = <img src={"/wp-content/plugins/WP-plugin-ReactJS/assets/"+imgIcon} />
    }


    return(
        <div className="slide">
          <div  className="clearfix  main">
            <div className="image">
              {imgTag}
            </div>
            <div className="inner-content">
              <div className="header">{this.props.title}</div>
              <div className="description">
                {this.props.desc} 
              </div>
            </div>
          </div>

          <div className="REST_Controller">
            <button   data-key={this.props.datakey}  slidebox-key={this.props.slideBox}  onClick={this.props.modalopend} className="button edit">Edit</button>
            <button   slide-key={this.props.datakey} slidebox-key={this.props.slideBox} onClick={this.props.delSlided} className="button del">Del</button>
            {oidUpBtn}
            {oidDownBtn}
          </div>
        </div>

    )
  }
}
