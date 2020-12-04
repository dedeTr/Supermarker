import { createStore } from "redux";

const globalStore = {
    choosedProduct: "",
    URLProduct: "",
    totalHarga: 0,
    keranjang: {}
  };
  
  const rootReducer = (state = globalStore, action) => {
    switch(action.type){
      case "CHOOSED_PRODUCT":
        return {
          ...state,
          choosedProduct: action.produk
        }
      case "SET_URL_PRODUCT":
        return{
          ...state,
          URLProduct: action.url
        }
      case "UPDATE_COUNT":
        let objek = state.keranjang
        objek[action.nama].count = action.count
        return{
          ...state,
          keranjang: objek
        }
      case "HAPUS_KERANJANG":
        let obj = state
        delete obj.keranjang[action.nama]
        return obj
      case "MASUK_KERANJANG":
          return {
            ...state,
            keranjang: {
              ...state.keranjang,
              ...action.barang
            }
          }
      case "TOTAL_HARGA":
        let jml = 0
        let objState = state.keranjang
        for(let key in objState){
          
          jml += objState[key].count * objState[key].harga
        }
        console.log(jml)
        return {
          ...state,
          totalHarga: jml
        }   
      default:
        return state;
    }
  };
  
const storeRedux = createStore(rootReducer);
export default storeRedux;
  