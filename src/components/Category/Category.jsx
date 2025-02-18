import { FadeLoader } from 'react-spinners';
import useApi from '../../Context/Hooks/useApi'

export default function Category() {
    let {data,isLoading}=useApi('categories')
    if(isLoading){
        return <div className='bg-slate-300 flex justify-center items-center h-screen' >
        <FadeLoader/>
        </div>
    }
  return (
    <>
    <div className='flex flex-wrap'>
    {data?.data?.data?.map((category)=>{
        return(
            <div key={category._id} className='w-3/12'>
                <img src={category.image} className='h-48 w-full object-cover object-top' alt="" />
                <h5>{category.name}</h5>
            </div>
        );
    })}
    </div>
    </>
  )
}
