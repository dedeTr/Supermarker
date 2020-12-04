import React, { useState , useEffect} from 'react'
import { connect } from 'react-redux'
import './ListKeranjang.css'

function ListKeranjang({nama, harga, count, url, btnHapus, keranjang, efekHapus, totalBelanjaan, handleCount}) {

    let [total, setTotal] = useState(0)
    let [jumlah, setJumlah] = useState(0)

    useEffect(() => {
        totalBelanjaan()
        setJumlah(count)
        setTotal(harga*count)
    }, [])

    const handlePlus = () => {
        setJumlah(++jumlah)
        setTotal(harga*jumlah)
        handleCount(nama, jumlah)
        totalBelanjaan()
    }

    const handleMinus = () => {
        if(jumlah>1){
            setJumlah(--jumlah)
            setTotal(harga*jumlah)
            handleCount(nama, jumlah)
            totalBelanjaan()
        }
    }

    return (
        <tr className="listKeranjang__container">
            <td scope="row" className="product__name">
                <span>{nama}</span><br/><img src={url}></img>
            </td>
            <td className="listKeranjang__counter">
                <div className="btn-group">
                    <button type="button" className="btnCounter btn btn-primary" onClick={handleMinus}>-</button>
                    <input type="text" id="jumlah-barang-input" value={jumlah} />
                    <button type="button" className="btnCounter btn btn-primary" onClick={handlePlus}>+</button>
                </div>
                <button className="btnHapus btn-danger" onClick={() => {
                    console.log(keranjang)
                    btnHapus(nama)
                    efekHapus()
                    console.log(keranjang)
                    }
                    }>Hapus</button>
            </td>
            <td className="Product__cost">Rp.{total}</td>
        </tr>
    )
}

const mapStateToProps = (state) => {
    return {
        keranjang: state.keranjang,
      };
}

const mapDispatchToProps = (dispatch) => {
    return {
        handleHapus: (key) => {
            dispatch({ type: "HAPUS_KERANJANG" , nama : key});
            
        },
        handleCount: (nama, count) => {
            dispatch({type: "UPDATE_COUNT", nama: nama, count: count})
        }
    };
};
 

export default connect(mapStateToProps, mapDispatchToProps)(ListKeranjang)
