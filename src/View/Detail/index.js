import React, {useEffect, useState} from 'react'
import { connect } from "react-redux"
import "./Detail.css"
import { Link } from 'react-router-dom';
import { getDataProduk } from '../../Model';
import back from './back.png'


function Detail(props) {
    const [harga, setHarga] = useState(0);
    const [diskon, setDiskon] = useState(0);
    const [komposisi, setKomposisi] = useState("");
    let [counter, setCounter] = useState(1)

    useEffect(() => {
        dataProduk(props.choosedProduct)
        
    },[])

    const handleTambah = () => {
        setCounter(++counter)
    }

    const handleKurang = () => {
        if(counter>1){
            setCounter(--counter)
        }
    }

    const dataProduk = async (produk) => {
        const info = await getDataProduk(produk)
        if(info!=null){
            setDiskon(info.diskon)
            setHarga(info.harga)
            setKomposisi(info.komposisi)
        }
    }

    return (
        <div className="detail">
            <nav className="navbar justify-content-start navtop">
                <a className="navbar-brand" href="/scan">
                    <img src={back} width="30" height="30" class="d-inline-block align-top" alt="" loading="lazy" />
                    <a className="judul">SUPERMARKER</a>
                </a>
            </nav>
        <div class="container">
            <div class="row">
                <div class="col-sm-12">
                    <img class="gambar" src={props.URLImage} />
                </div>
            </div>
            <div class="row">
                <div class="col-sm-12 d-flex justify-content-between">
                    <h6>Nama item:</h6>
                    <h6>{props.choosedProduct}</h6>
                </div>
            </div>
            <div class="row">
                <div class="col-sm-12 d-flex justify-content-between">
                    <h6>Harga item:</h6>
                    <h6>Rp.{harga}</h6>
                </div>
            </div>
            <div class="row">
                <div class="col-sm-12 d-flex justify-content-between">
                    <h6>Diskon:</h6>
                    <h6>{diskon*100}%</h6>
                </div>
            </div>
            <div class="row">
                <div class="col-sm-12">
                    <h6 class="mt-2"><a class="fw-bold">Komposisi:</a><br/>
                         {komposisi}
                    </h6>
                </div>
            </div>
        </div>
        <div class="container mt-5">
        <div class="row">
            <div class="col-sm-12 d-flex justify-content-between">
                <h6>Masukkan jumlah barang:</h6>
                <div class="btn-group">
                    <button type="button" class="btn btn-primary" onClick={handleKurang}>-</button>
                    <input type="text" id="jumlah-barang" value={counter} />
                    <button type="button" class="btn btn-primary" onClick={handleTambah}>+</button>
                </div>
            </div>
        </div>
        <div class="row align-center mt-5 mb-5">
            <div class="col-sm-12">
            <Link to="/keranjang">
                <a class="scan" onClick={props.handleKeranjang(props.choosedProduct, harga, counter, props.URLImage)}>Tambah ke keranjang</a>
                </Link>
            </div>
        </div>
    </div>

        </div>
    )
}

const mapStateToProps = (state) => {
    return {
      choosedProduct: state.choosedProduct,
      URLImage : state.URLProduct
    };
  };
  
const mapDispatchToProps = (dispatch) => {
    return {
        handleKeranjang: (produkName, harga, count, url) => {
        const obj = {}
        obj[produkName] = {
            harga:harga,
            count: count,
            URLProduct: url
        }
        dispatch({ type: "MASUK_KERANJANG" , barang : obj});
        }
    };
};
 
  export default connect(mapStateToProps, mapDispatchToProps)(Detail);
