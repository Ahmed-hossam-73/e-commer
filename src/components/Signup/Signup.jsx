import axios from "axios";
import { useFormik } from "formik";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import * as Yup from 'yup'
export default function Signup() {
  let [errorMessage, setError] = useState(null);
  let navg = useNavigate ();
  const baseUrl = 'https://ecommerce.routemisr.com'
  let validYup = Yup.object({
    name: Yup.string().required('Name Required').min(3, 'min char 2').max(20, 'max char 20'),
    email: Yup.string().required('Email Required').email('Enter Valid Email'),
    password: Yup.string().required('Password Required').matches(/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/, "Password Invalid"),
    rePassword: Yup.string().required('RePassword Required').oneOf([Yup.ref('password')], "Repassword Not Match Password"),
    phone: Yup.string().required("Phone Required").matches(/^(20)?01[1250][0-9]{8}$/, 'Enter Valid Phone Number')
  })
  let initialValues = {
    name: "",
    email: "",
    password: "",
    rePassword: "",
    phone: "",
  };
  let registerForm = useFormik({
    initialValues,
    onSubmit: regsiterApi,
    validationSchema: validYup,
  });
  async function regsiterApi(data) {
    axios
    .post(`${baseUrl}/api/v1/auth/signup`, data)
    .then((req) => {
      if(req.data.message == 'success'){
        navg('/login');
      }
    })
      .catch((err) => {
        setError(err.response.data.message)
      })

  }
  return (
    <div>
      <h2 className="w-7/12 mx-auto text-4xl mb-2">Register Now</h2>

      {errorMessage ?
      <div className="p-4 mb-4 w-1/2 mx-auto text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
        {errorMessage}
    </div> :''}

      <form onSubmit={registerForm.handleSubmit} className="w-7/12 mx-auto">
        <div className="mb-5">
          <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your Name</label>
          <input type="text" onChange={registerForm.handleChange} onBlur={registerForm.handleBlur} value={registerForm.values.name} id="name" name="name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Name" />
          {registerForm.touched.name && registerForm.errors.name ? <p className="text-red-950">{registerForm.errors.name}</p> : ''}
        </div>
        <div className="mb-5">
          <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your Email</label>
          <input type="email" onChange={registerForm.handleChange} onBlur={registerForm.handleBlur} value={registerForm.values.email} id="email" name="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Email" />
          {registerForm.touched.email && registerForm.errors.email ? <p className="text-red-950">{registerForm.errors.email}</p> : ''}
        </div>
        <div className="mb-5">
          <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your Password</label>
          <input type="password" onChange={registerForm.handleChange} onBlur={registerForm.handleBlur} value={registerForm.values.password} id="password" name="password" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Password" />
          {registerForm.touched.password && registerForm.errors.password ? <p className="text-red-950">{registerForm.errors.password}</p> : ''}
        </div>
        <div className="mb-5">
          <label htmlFor="rePassword" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your rePassword</label>
          <input type="password" onChange={registerForm.handleChange} onBlur={registerForm.handleBlur} value={registerForm.values.rePassword} id="rePassword" name="rePassword" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Repassword" />
          {registerForm.touched.rePassword && registerForm.errors.rePassword ? <p className="text-red-950">{registerForm.errors.rePassword}</p> : ''}
        </div>
        <div className="mb-5">
          <label htmlFor="phone" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your Phone</label>
          <input type="tel" onChange={registerForm.handleChange} onBlur={registerForm.handleBlur} value={registerForm.values.phone} id="phone" name="phone" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Phone" />
          {registerForm.touched.phone && registerForm.errors.phone ? <p className="text-red-950">{registerForm.errors.phone}</p> : ''}
        </div>
        <div className="flex justify-end">
        <button disabled={!(registerForm.isValid && registerForm.dirty)} type="submit"  className=" disabled:border-black disabled:border-2 disabled:bg-white disabled:text-btn focus:ring-4 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center bg-active text-white disabled:opacity-40">register now</button>
        </div>
      </form>


    </div>
  )
}
