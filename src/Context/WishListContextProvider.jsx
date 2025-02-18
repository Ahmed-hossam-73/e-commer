import axios from 'axios';
import { createContext } from 'react'

export let WishContext = createContext();
export default function WishListContextProvider({children}) {
    const baseUrl = 'https://ecommerce.routemisr.com/api/v1/wishlist'
    const headerOptions ={
        headers:{
            token:localStorage.getItem('token')
        },
    }
    function getUserWish(){
        return axios.get(baseUrl,headerOptions)
    }
    function addUserWish(id){
        let data={
            productId:id
        }
        return axios.post(baseUrl,data,headerOptions)
    }
    function deleteUserWish(id){
        return axios.delete(`${baseUrl}/${id}`,headerOptions)
    }
    function clearUserWish(){
        return axios.delete(`${baseUrl}`,headerOptions)
    }
  return <WishContext.Provider value={{getUserWish,addUserWish,deleteUserWish,clearUserWish}}>{children}</WishContext.Provider>
}
