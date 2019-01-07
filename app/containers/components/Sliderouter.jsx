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


 // Modal.setAppElement(document.getElementById('#wp-reactivate-admin'));


export default class Slideouter extends Component {
  constructor(props){
    super(props);

      this.state = {
        modalIsOpen: false,
        slider:[],
        modalTitle:'',
        modalDesc:'',
        modalUrl:''
      }

      this.fetchWP = new fetchWP({
        restURL: this.props.wpObject.api_url,
        restNonce: this.props.wpObject.api_nonce,
      });





    this.openModal = this.openModal.bind(this);
    this.afterOpenModal = this.afterOpenModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  componentDidMount(){
    /*  get all slider data */
    this.getAllSlider();
  }







  openModal(slide_id,slideBoxId) {
    /*
    let curid = this.state.modalCurSliderId;
    let curSlide = [...this.state.slider];
    console.log(curid);
    console.log(curSlide);
    */

    console.log('slide_id=>'+slide_id);
    console.log('slideBoxId=>'+slideBoxId);

    let curState = {... this.state};
    let curSlideBox = curState.slider.filter((e) => e.id === slideBoxId);
    let curSlide = curSlideBox[0].xslide.filter((e) => e.id === slide_id);

    console.log(curSlide[0]);
    curState.modalUrl = curSlide[0].url;
    curState.modalTitle = curSlide[0].title;
    curState.modalDesc = curSlide[0].descx;
    curState.modalIsOpen = true;
    curState.modalCurSliderId = slide_id;
    curState.modalCurSliderBoxId = slideBoxId;

    this.setState(curState);

  }

  afterOpenModal() {
    // references are now sync'd and can be accessed.
    // this.subtitle.style.color = '#f00';
  }

  closeModal() {
    this.setState({
      modalCurSliderId:0,
      modalCurSliderBoxId:0,
      modalIsOpen: false
    });
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




  addSliderBox = () =>{
    console.log("ADD");

    this.fetchWP.post( 'myslider', {
      name: 'Slider Name' } )
    .then(
      (json) => this.processOkResponse(json, 'saved'),
      (err) => console.log('error', err)
    );
  }


  deleteBox = (dataKey) => {

    this.fetchWP.delete( 'myslider',{
      'datakey':dataKey
    })
    .then(
      (json) => this.processOkResponse(json, 'saved'),
      (err) => console.log('error', err)
    );
  }


  submitBoxNameHandler = (sboxid,Newname) =>{
    console.log("XX");
    this.fetchWP.put( 'myslider',
    { sboxid:sboxid, name: Newname } )
    .then(
      (json) => this.processOkResponse(json, 'saved'),
      (err) => console.log('error', err)
    );
  }



  processOkResponse = (json, action) => {
    if (json.success) {
      console.log(json);
      this.setState({
        slider: json.value,
      });
      /*
      this.setState({
        exampleSetting: json.value,
        savedExampleSetting: json.value,
      });
      */
    } else {
      console.log(`Setting was not ${action}.`, json);
    }
  }




  /* ============= slide =================  */

  addSlideHandler = (slider) =>{

    this.fetchWP.post( 'myslide', {
      slider: slider })
    .then(
      (json) => this.processOkResponse(json, 'saved'),
      (err) => console.log('error', err)
    );
  }

  delSlideHandler = (slide) =>{
    this.fetchWP.delete( 'myslide',{
      'slide':slide
    })
    .then(
      (json) => this.processOkResponse(json, 'saved'),
      (err) => console.log('error', err)
    );
  }

  editSlideHandler = () =>{
  }


  /* =============  Modal Form  ============= */
  formTitlehandle = (event) =>{

    let title = event.target.value;
    this.setState((prevState,props) =>({
      modalTitle : title
    }));
    console.log(this.state);
  }


  formDescehandle = (event) =>{
    let desc = event.target.value;
    this.setState((prevState,props) =>({
      modalDesc : desc
    }));
    console.log(this.state);
  }



  formUrlhandle = (event) =>{
    let url= event.target.value;
    this.setState((prevState,props) =>({
      modalUrl : url
    }));
    console.log(this.state);
  }



  formSubmit  = (e) =>{
    e.preventDefault();
    //console.log("sx");


    let slide_id = this.state.modalCurSliderId;
    let slideBoxId = this.state.modalCurSliderBoxId;

    let curState = [...this.state.slider];
    let curSlideBox = curState.filter((e) => e.id === slideBoxId);
    let curSlide = curSlideBox[0].xslide.filter((e) => e.id === slide_id)[0];
    let modal_form = this.state;

    curSlide.id=curSlide.id;
    curSlide.title=modal_form.modalTitle;
    curSlide.url=modal_form.modalUrl;
    curSlide.descx=modal_form.modalDesc;

    this.fetchWP.put( 'myslide', {slider: curSlide })
    .then((json) => {
        console.log(json);
        /*
        this.setState((prevState,props) =>({
          slider :curState
        }));
        */
      },
      (err) => console.log('error', err));



  }



  render(){
      return (
        <div>
        <div   className="app-header">
          <div><img src={"/wp-content/plugins/WP-plugin-ReactJS/assets/"+panel} /></div>
          <div><h3> Slider Setting</h3></div>
        </div>
        <div  className="slideBox">
          <div className="inner">
            {
              this.state.slider.map((sl) =>
                <li key={sl.id.toString()}  >
                  <Slidebox
                      sname={sl.name}
                      kid={sl.id.toString()}
                      slideData={sl.xslide}
                      deleteBox={ this.deleteBox }
                      addSlide={this.addSlideHandler}
                      delSlide={this.delSlideHandler}
                      submitBoxNamed={this.submitBoxNameHandler}
                      openModaled={this.openModal}
                      />
                </li>
              )
            }
          </div>
          <button className="button btnAdd" onClick={this.addSliderBox}>Add Slider</button>
              <Modal
                    isOpen={this.state.modalIsOpen}
                    onAfterOpen={this.afterOpenModal}
                    onRequestClose={this.closeModal}
                    style={customStyles}
                    contentLabel="Example Modal"
                  >

                    <button onClick={this.closeModal}>close</button>
                    <form onSubmit={this.formSubmit}>
                      <div className="slider_image"></div>
                      <div className="input-form">
                          <input type="text"  name="url" onChange={this.formUrlhandle}  value={this.state.modalUrl}   />
                      </div>
                      <div className="input-form">
                        <input type="text" onChange={this.formTitlehandle} value={this.state.modalTitle}   />
                      </div>
                      <div className="input-form">
                        <textarea  onChange={this.formDescehandle} value={this.state.modalDesc}  />
                      </div>
                      <div className="input-form">
                        <input type="submit" className="button"  value="Submit" />
                      </div>
                    </form>
                  </Modal>


        </div>
      </div>
      )
  }
}
