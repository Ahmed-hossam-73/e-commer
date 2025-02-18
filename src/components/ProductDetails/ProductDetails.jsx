import { useQuery } from '@tanstack/react-query';
import axios from 'axios'
import { useContext,} from 'react';
import { useParams } from 'react-router-dom'
import { CartContext } from '../../Context/CartContextProvider';
import toast, { Toaster } from 'react-hot-toast';
import { FadeLoader } from 'react-spinners';

export default function ProductDetails() {
    let {id} =useParams();
    let{addUserCart,setNumsCartItems} = useContext(CartContext)
    let {isLoading,data}=useQuery({
        queryKey:['productDetails',id],
        queryFn:function(){
            return axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`)
        }
    })
    function changeImage(e){
        let imageSrc= e.target.getAttribute('src')
        document.getElementById('myImage').setAttribute('src',imageSrc)
    }
    function addCart(id){
        addUserCart(id)
        .then((req)=>{
                setNumsCartItems(req.data.numOfCartItems)
                toast.success(req.data.message)
              }).catch((err)=>{
                toast.error(err.response.data.message)
        })
      }
    return (
        <>
        <Toaster></Toaster>
        {isLoading ? <div className='bg-slate-300 flex justify-center items-center h-screen' >
    <FadeLoader/>
    </div>: <div className='w-10/12 mx-auto my-5'>
            <div className='flex justify-between items-center'>
                <div className='w-3/12'>
                    <img src={data?.data?.data?.imageCover} id='myImage' className='w-full h-60' alt="" />
                    <div className='flex'>
                    {data?.data?.data?.images.map((image, i) => {
                            return <div key={i}>
                                <img src={image} onClick={changeImage} className='w-full' alt="" />
                            </div>
                        })}
                    </div>
                    {/* <Slider dots>
                        {data?.data?.data?.images.map((image, i) => {
                            return <div key={i}>
                                <img src={image} className='w-full' alt="" />
                            </div>
                        })}
                    </Slider> */}
                </div>
                <div className='w-8/12'>
                    <h2>{data?.data?.data?.title}</h2>
                    <p className='text-gray-500 my-3'>{data?.data?.data?.description}</p>
                    <div className='flex justify-between'>
                        <span>{data?.data?.data?.price}EGP</span>
                        <span><i className='fa-solid fa-star text-yellow-300'></i>{data?.data?.data?.ratingsAverage}</span>
                    </div>
                    <button className='btn mt-5 ' onClick={()=>addCart(id)}>Add To Cart</button>
                </div>
            </div>
        </div>}
        </>
        
    )
}

/*   let [product, setProduct] = useState(null);
    let { id } = useParams()
    function getProductDitails(id) {
        axios.get(``).then((req) => {
            console.log(req);
            setProduct(req.data.data)
        })
    }
    useEffect(() => {
        getProductDitails(id);
    }, [id]);*/