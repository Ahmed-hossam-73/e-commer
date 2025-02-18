import Slider from 'react-slick'
import useApi from '../../Context/Hooks/useApi'

export default function CategorySlider() {
    let {data} = useApi('categories')
  return (
    <div className='my-5'>
    <Slider slidesToShow={6} infinite autoplay speed={500} slidesToScroll={6}>
        {data?.data?.data?.map((category)=>{
            return(
                <div key={category._id}>
                    <img src={category.image} className='h-48 w-full object-cover object-top' alt="" />
                    <h5>{category.name}</h5>
                </div>
            );
        })}
    </Slider>
    </div>
  )
}
