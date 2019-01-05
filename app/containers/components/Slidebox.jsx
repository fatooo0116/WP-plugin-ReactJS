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




  render(){


      let SliderName = this.state.isEdit ? <label><input type="text"  defaultValue={this.props.sname} /><button  className="button" onClick={this.toggleEditName} >Save</button></label> : <label  onClick={this.toggleEditName}>{this.props.sname}</label>;


      return (
        <div className="slide-inner-box"  onClick={this.props.onclicked} >
          <div  className="slide_controller">
            <button className="button"> ADD </button>
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
