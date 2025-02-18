import axios from 'axios'
import { useContext } from 'react'
import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { CartContext } from '../../Context/CartContextProvider';
import toast, { Toaster } from 'react-hot-toast';
import { FadeLoader } from 'react-spinners';

export default function Home() {
  let { addUserCart, setNumsCartItems } = useContext(CartContext)
  function getAllProducts() {
    return axios.get(`https://ecommerce.routemisr.com/api/v1/products`)
  }
  let { data, isLoading, isError, error } = useQuery({
    queryKey: ['product'],
    queryFn: getAllProducts
  })
  if (isError) {
    return <h2 className='text-red-600'>{error.response.data.message}</h2>
  }
  function addCart(id) {
    addUserCart(id)
      .then((req) => {
        setNumsCartItems(req.data.numOfCartItems)
        toast.success(req.data.message)
      }).catch((err) => {
        toast.error(err.response.data.message)
      })
  }
  return (
    <>
      <Toaster />
      {isLoading ? <div className='bg-slate-300 flex justify-center items-center h-screen' >
        <FadeLoader/>
      </div> : <div className='w-10/12 mx-auto my-6' >
        <div className='flex flex-wrap space-x-8 space-y-4'>
          {data?.data?.data?.map((Product) => {
            let { _id, title, imageCover, price, category, ratingsAverage } = Product
            let { name } = category
            return <div key={_id} className='lg:w-2/12 md:w-3/12 sm:w-6/12 w-full px-2 mb-3'>
              <div className='item group overflow-hidden p-2 hover:shadow-2xl'>
                <Link to={`ProductDetails/${_id}`}>
                  <img src={imageCover} alt={title} className='w-full' />
                  <h5 className='text-main'>{name}</h5>
                  <h2>{title.split(' ').slice(0, 2).join(' ')}</h2>
                  <div className='flex justify-between'>
                    <span>{price}EGP</span>
                    <span><i className='fa-solid fa-star text-yellow-300'></i>{ratingsAverage}</span>
                  </div>

                </Link>
                <button onClick={() => addCart(_id)} className='btn mt-3 duration-500 translate-y-24 group-hover:translate-y-0'>Add To Cart</button>
              </div>
            </div>
          })}


        </div>


      </div>}



    </>
  )
}