import React, { Component } from 'react';
import Slidebox from './Slidebox';
import Modal from 'react-modal';




const customStyles = {
  content : {
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)'
  }
};



export default class Slideouter extends Component {
  constructor(props){
    super(props);

    this.state = {
      modalIsOpen: false,
    }

    this.props.init();

    this.openModal = this.openModal.bind(this);
    this.afterOpenModal = this.afterOpenModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }


  openModal() {
    this.setState({modalIsOpen: true});
  }

  afterOpenModal() {
    // references are now sync'd and can be accessed.
    this.subtitle.style.color = '#f00';
  }

  closeModal() {
    this.setState({modalIsOpen: false});
  }



  componentDidMount(){
    /*  get all slider data */
  }


  addSlider = () =>{
    this.setState({
      slider:[...this.props.sliderData,Math.random()]
    });
    console.log(this.props.sliderData);
  }



  render(){
      return (
        <div  className="slideBox">
          <div className="inner">
            {
              this.props.sliderData.map((sl) =>
                <li key={sl.toString()}  ><Slidebox   onclicked={this.openModal} /></li>
              )
            }
          </div>
          <button className="button" onClick={this.addSlider}>Add Slider</button>


              <Modal
                    isOpen={this.state.modalIsOpen}
                    onAfterOpen={this.afterOpenModal}
                    onRequestClose={this.closeModal}
                    style={customStyles}
                    contentLabel="Example Modal"
                  >

                    <h2 ref={subtitle => this.subtitle = subtitle}>Hello</h2>
                    <button onClick={this.closeModal}>close</button>
                    <div>I am a modal</div>
                    <form>
                      <button>the modal</button>
                    </form>
                  </Modal>

        </div>
      )
  }
}
