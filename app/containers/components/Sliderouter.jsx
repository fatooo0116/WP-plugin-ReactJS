import React, { Component } from 'react';
import Slidebox from './Slidebox';
import Modal from 'react-modal';
import panel  from './coffee.svg';

import fetchWP from '../../utils/fetchWP';


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
        slider:[]
      }

      this.fetchWP = new fetchWP({
        restURL: this.props.wpObject.api_url,
        restNonce: this.props.wpObject.api_nonce,
      });

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








  getAllSlider = () => {
    this.fetchWP.get( 'myslider' )
    .then(
      (json) => {
          console.log(json);
          this.setState({
            slider: json.value,
          });
        },
      (err) => console.log( 'error', err )
    );
  };


  componentDidMount(){
    /*  get all slider data */
    this.getAllSlider();
  }








  render(){
      return (
        <div>
        <div  className="app-header">
          <div><img src={"/wp-content/plugins/wp-reactivate-master/assets/"+panel} /></div>
          <div><h3> Slider Setting</h3></div>
        </div>
        <div  className="slideBox">
          <div className="inner">
            {
              this.state.slider.map((sl) =>
                <li key={sl.id.toString()}  >
                  <Slidebox sname={sl.name}  slideData={sl.xslide} />
                </li>
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
      </div>
      )
  }
}
