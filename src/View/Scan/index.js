import React, {useState, useEffect} from 'react';
import './Scan.css';
import {dbStorage, ClarifaiAPP, clarifaiID, clarifaiVersion} from '../../Controller'
import firebase from 'firebase'
import { connect } from "react-redux";
import { Redirect  } from 'react-router-dom';
import buttonTambah from '../../Asset/buttontambah.png'


function Scan(props) {
  const [isRedirect, setRedirect] = useState(false)
  const [load, setLoad] = useState(0)
  const [imgURL, setImgURL] = useState(buttonTambah)

  const predictImage = () => {
    ClarifaiAPP.models.initModel({id: clarifaiID, version: clarifaiVersion})
      .then(generalModel => {
        return generalModel.predict(imgURL);
      })
      .then(response => {
        var concepts = response['outputs'][0]['data']['concepts'];
        // setPredict(concepts)
        props.handleProduct(concepts[0].name)
        setRedirect(true)
      })
  }

  useEffect(()=>{
    props.handleURL(imgURL);
  })

  const uploadToFirebase = (e) => {
    if(e.target.files[0] != null){
      const file = e.target.files[0]
      // const bucketName = Math.random().toString(36).substring(7)
      const storageRef = dbStorage.ref()
      var uploadTask = storageRef.child(`images/${file.name}.jpg`).put(file);
      uploadTask.on('state_changed', function(snapshot){
        setLoad((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
        switch (snapshot.state) {
          case firebase.storage.TaskState.PAUSED: // or 'paused'
            console.log('Upload is paused');
            break;
          case firebase.storage.TaskState.RUNNING: // or 'running'
            console.log('Upload is running');
            break;
        }
      }, function(error) {
        console.log(error)
      }, function() {
        uploadTask.snapshot.ref.getDownloadURL().then(function(downloadURL) {
          setImgURL(downloadURL);
          console.log(downloadURL)
        });
      });
    }
  }

  if(!isRedirect){
    return (
      <div className="App">
        <nav className="navbar justify-content-start navtop">
          <a className="navbar-brand">
            <a className="judul">SUPERMARKER</a>
          </a>
        </nav>
        <div className="container">
          <div className="row">
              <div className="col-sm-12">
                  <h5 className>Pilih file yang ingin discan <br/>terlebih dahulu!</h5>
              </div>
          </div>
          <div className="row mt-3">
              <div className="col-sm-12">
                  <div className="image-upload">
                      <label for="file-input">
                          <img id="output" src={imgURL}/>
                      </label>
                      <input type="file" id="file-input" onChange={(e) => uploadToFirebase(e)} acccept="image/*" capture/>
                  </div>
              </div>
          </div>
          <div className="row align-center mt-5">
            {/* <p>Progress: {load}%</p>  */}
            <div className="col-sm-12" onClick={predictImage}>
                <p className="scan" >Scan</p>
            </div>
          </div>
        </div>
      </div>
    );
  }else{
    return <Redirect to="/detail" />
  }

 
}

const mapStateToProps = (state) => {
  return {
    choosedProduct: state.choosedProduct
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    handleProduct: (produkName) => {
      dispatch({ type: "CHOOSED_PRODUCT" , produk : produkName});
    },
    handleURL: (url) => {
      dispatch({type: "SET_URL_PRODUCT", url: url})
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Scan);


