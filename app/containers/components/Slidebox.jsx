import React, { Component } from 'react';

import Slide from './Slide';

import fetchWP from '../../utils/fetchWP';


export default class Slidebox extends Component {
  constructor(props){
    super(props);
    this.state = {
      isEdit:false,
    }
  }


  componentDidMount(){
    /*
    this.setState({
      slideDate: this.props.
    });
    */
  }





  toggleEditName = () => {
    this.setState({
      isEdit: !this.state.isEdit
    });
  }


  updateSliderBoxName = () => {
      this.toggleEditName();
  }


  deleteSliderBox = (e) => {
    let data-key = e.target.getAttribute('data-key');
    this.props.deleteBox(data-key);
  }


  addSlide = () =>{
    console.log("add_slide");
  }


  render(){


      let SliderName = this.state.isEdit ? <label><input type="text"  defaultValue={this.props.sname} /><button  className="button" onClick={this.updateSliderBoxName} >Save</button></label> : <label  onClick={this.toggleEditName}>{this.props.sname}</label>;


      return (
        <div className="slide-inner-box"  onClick={this.props.onclicked} >
          <div  className="slide_controller">
            <button className="button del"  data-key={this.props.kid}  onClick={this.deleteSliderBox } > DEL </button>
            <button className="button" kid={this.props.kid} onClick={this.addSlide}> ADD </button>
            {SliderName}
          </div>

          <div  className="content">
            <ul>
              <li><Slide /></li>
            </ul>
          </div>
        </div>
      )
  }
}
