import {db} from '../../Controller'


export const getDataProduk = (produk) => new Promise((resolve, reject) => {  
    const ref = db.ref(`produk/${produk}`);
    ref.on('value', (data) => {
        const info = data.val();
        resolve(info)
    })
})

 
   
  