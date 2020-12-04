import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import ListKeranjang from '../../Components/molecules/ListKeranjang';
import './Keranjang.css'

function Keranjang(props) {
    let [barang, setBarang] = useState(Object.keys(props.keranjang));
    let [totalHarga, setTotalHarga] = useState(0);

    // useEffect(() => {
    //     setBarang(Object.keys(props.keranjang))
    // })

    // const barang = Object.keys(props.keranjang)
    // let total = 0
    // for(let barang in props.keranjang){
    //     total += props.keranjang[barang]     
    // }

    const refreshPage = () => {
        
        setBarang(Object.keys(props.keranjang))
        props.totalHarga()
    }
    

    return (
        <div>
            <nav className="navbar justify-content-start navtop">
                <a className="navbar-brand" href="#">
                <a className="judul">SUPERMARKER</a>
                </a>
            </nav>
            <div  className="container">
                <div className="row">
                    <h5>Keranjang saya</h5>
                </div>
                <table className="table table_width">
                    <tr >
                        <th scope="col">Barang</th>
                        <th scope="col">Jumlah</th>
                        <th scope="col">Total</th>
                    </tr>
                    {
                    barang.map(list => {
                        return (<ListKeranjang 
                            nama={list} 
                            harga={props.keranjang[list].harga} 
                            count={props.keranjang[list].count}
                            url={props.keranjang[list].URLProduct}
                            btnHapus={props.handleHapus}
                            efekHapus={refreshPage}
                            totalBelanjaan={props.totalHarga}
                            />)
                        })
                    }
                </table>
                <div className="jumlah__keranjang">
                    <div class="ta-center bg-primary text-white">Jumlah</div>
                <div class="ta-center bg-primary text-white" colspan="2">Rp.{props.jumlahHarga}</div>
                </div>
                <div class="row align-center mt-5">
                    <div class="col-sm-12">
                        <Link to="/scan">
                            <a class="kembali">Scan</a>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        keranjang: state.keranjang,
        jumlahHarga: state.totalHarga
      };
}

const mapDispatchToProps = (dispatch) => {
    return {
        handleHapus: (key) => {
            dispatch({ type: "HAPUS_KERANJANG" , nama : key});
        },
        totalHarga: () => {
            dispatch({ type: "TOTAL_HARGA" });
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Keranjang)
