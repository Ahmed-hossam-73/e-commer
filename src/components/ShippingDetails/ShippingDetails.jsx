import axios from 'axios'
import { useFormik } from 'formik'
import React from 'react'
import { useParams } from 'react-router-dom'

export default function ShippingDetails() {
    const headerOptions ={
        headers:{
            token:localStorage.getItem('token')
        },
    }
    let { id } = useParams()
    let shippingFormik = useFormik({
        initialValues: {
            city: '',
            details: '',
            phone: '',
        },
        onSubmit: checkOutSession
    })
    function checkOutSession(values) {
        let data ={
            shippingAddress:values
        }
        axios.post(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/66c91634ed0dc0016c217bb3?url=http://localhost:3000`,data,headerOptions)
        .then((req)=>{
            window.open(req.data.session.url)
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
