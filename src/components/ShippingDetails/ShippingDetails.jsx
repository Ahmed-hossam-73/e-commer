import axios from 'axios'
import { useFormik } from 'formik'
import { useParams } from 'react-router-dom'
import * as Yup from 'yup'

export default function ShippingDetails() {
    let { id } = useParams()
    const headerOptions ={
        headers:{
            token:localStorage.getItem('token')
        },
    }
    let validYup = Yup.object({
        city: Yup.string().required('City is required').matches(/^[A-Za-zÀ-ÖØ-öø-ÿ\s'-]+$/, 'Enter a valid city name'),
            phone: Yup.string().required("Phone Required").matches(/^(20)?01[1250][0-9]{8}$/, 'Enter Valid Phone Number'),
            details: Yup.string().required('Payment details are required').matches(/^[a-zA-Z0-9\s-.,]+$/, 'Enter valid payment details'),
              })
    let shippingFormik = useFormik({
        initialValues: {
            city: '',
            details: '',
            phone: '',
        },
        onSubmit: checkOutSession,
        validationSchema: validYup,
    })
    function checkOutSession(values) {
        console.log(values);
        
        let data ={
            shippingAddress:values
        }
        axios.post(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/67b47b40851e223def98613c?url=http://localhost:3000`,data,headerOptions)
        .then((req)=>{
            console.log(req);
            
            window.open(req.data.session.url)
        }).catch((err)=>{
            console.log(err);
            
        })
    }
    return (

        <div className='w-7/12 mx-auto'>
            <h1>ShippingDetails</h1>
            <form onSubmit={shippingFormik.handleSubmit}>
                <div className="mb-5">
          <label htmlFor="details" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your details</label>
          <input type="text" onChange={shippingFormik.handleChange} onBlur={shippingFormik.handleBlur} value={shippingFormik.values.details} id="details" name="details" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@flowbite.com" />
          {shippingFormik.touched.details && shippingFormik.errors.details ? <p className="text-red-950">{shippingFormik.errors.details}</p> : ''}
        </div>
                <div className="mb-5">
          <label htmlFor="city" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your city</label>
          <input type="text" onChange={shippingFormik.handleChange} onBlur={shippingFormik.handleBlur} value={shippingFormik.values.city} id="city" name="city" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@flowbite.com" />
          {shippingFormik.touched.city && shippingFormik.errors.city ? <p className="text-red-950">{shippingFormik.errors.city}</p> : ''}
        </div>
                <div className="mb-5">
          <label htmlFor="phone" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your phone</label>
          <input type="tel" onChange={shippingFormik.handleChange} onBlur={shippingFormik.handleBlur} value={shippingFormik.values.phone} id="phone" name="phone" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@flowbite.com" />
          {shippingFormik.touched.phone && shippingFormik.errors.phone ? <p className="text-red-950">{shippingFormik.errors.phone}</p> : ''}
        </div>
        <button className='btn'>Pay</button>
            </form>
        </div>
    )
}
