import React, { Component } from 'react';

import Slide from './Slide';

import fetchWP from '../../utils/fetchWP';


export default class Slidebox extends Component {
  constructor(props){
    super(props);
    this.state = {
      name:'',
      isEdit:false,
    }



  }


  componentDidMount(){
    this.setState({
      name: this.props.sname
    });
  }





  toggleEditName = () => {
    this.setState({
      isEdit: !this.state.isEdit
    });
  }

  updateSliderBoxName = () => {
    this.setState({
      name: event.target.value
    });
  }

  submitBoxName = () =>{

    this.props.submitBoxNamed(this.props.kid,this.state.name);
    this.toggleEditName();
  }


  deleteSliderBox = (e) => {
    let datakey = e.target.getAttribute('data-key');
    this.props.deleteBox(datakey);
  }


  addSlide = (e) =>{
    this.props.addSlide(e.target.getAttribute('data-key'));
  }
  delSlide = (e) =>{
    // console.log(e.target.getAttribute('slide-key'));
    this.props.delSlide(e.target.getAttribute('slide-key'));
  }


  modalOpen = (e) =>{

    this.props.openModaled(e.target.getAttribute('data-key'),e.target.getAttribute('slidebox-key'));
  }



  render(){

      let SliderName = this.state.isEdit ? <label><input type="text" onChange={this.updateSliderBoxName}  defaultValue={this.state.name} /><button  className="button" onClick={this.submitBoxName} >Save</button></label> : <label  onClick={this.toggleEditName}>{this.state.name}</label>;

      return (
        <div className="slide-inner-box"  onClick={this.props.onclicked} >
          <div  className="slide_controller">
            <button className="button del"  data-key={this.props.kid}  onClick={this.deleteSliderBox} > DEL </button>
            <button className="button" data-key={this.props.kid} onClick={this.addSlide}> ADD </button>
            {SliderName}
          </div>

          <div  className="content">
            <ul>
                {
                  this.props.slideData.map((sl) =>
                    <li key={sl.id} >
                      <Slide
                        slideBox={this.props.kid}
                        datakey={sl.id}
                        title={sl.title}
                        desc={sl.descx}
                        url={sl.url}
                        delSlided={this.delSlide}
                        modalopend={this.modalOpen}
                        />
                    </li>
                  )
                }
            </ul>
          </div>
        </div>
      )
  }
}
