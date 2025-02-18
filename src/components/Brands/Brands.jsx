import { FadeLoader } from 'react-spinners';
import useApi from '../../Context/Hooks/useApi'

export default function Brands() {
     let {data,isLoading}=useApi('brands')
      if(isLoading){
          return <div className='bg-slate-300 flex justify-center items-center h-screen' >
          <FadeLoader/>
          </div>
      }
    return (
      <>
      <div className='flex flex-wrap'>
      {data?.data?.data?.map((brands)=>{
          return(
              <div key={brands._id} className='w-3/12'>
                  <img src={brands.image} className='h-48 w-full object-cover object-top' alt="" />
                  <h5>{brands.name}</h5>
              </div>
          );
      })}
      </div>
      </>
    )
}
