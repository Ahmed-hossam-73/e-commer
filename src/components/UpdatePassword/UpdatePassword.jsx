import axios from "axios";
import { useFormik } from "formik";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import * as Yup from 'yup'
export default function UpdatePassword() {
  let [errorMessage, setError] = useState(null);
  let navg = useNavigate ();
  const baseUrl = 'https://ecommerce.routemisr.com'
  let validYup = Yup.object({
    email: Yup.string().required('Email Required').email('Enter Valid Email'),
    newPassword: Yup.string().required('New Password Required').matches(/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/, "New Password Invalid"),
  })
  let initialValues = {
    email: "",
    newPassword: "",
  };
  let LoginForm = useFormik({
    initialValues,
    onSubmit: updatePassword,
    validationSchema: validYup,
  });
  async function updatePassword(data) {
    axios
    .put(`${baseUrl}/api/v1/auth/resetPassword`, data)
    .then((req) => {
     if(req.data.token)
        navg('/login')
    })
      .catch((err) => {
        setError(err.response.data.message)
      })

  }
  return (
    <div>
      <h2>Update Password</h2>

      {errorMessage ?
      <div className="p-4 mb-4 w-1/2 mx-auto text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
      {errorMessage}
    </div> :''}

      <form onSubmit={LoginForm.handleSubmit} className="w-7/12 mx-auto">
        <div className="mb-5">
          <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your Email</label>
          <input type="email" onChange={LoginForm.handleChange} onBlur={LoginForm.handleBlur} value={LoginForm.values.email} id="email" name="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@flowbite.com" />
          {LoginForm.touched.email && LoginForm.errors.email ? <p className="text-red-950">{LoginForm.errors.email}</p> : ''}
        </div>
        <div className="mb-5">
          <label htmlFor="newPassword" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your New Password</label>
          <input type="password" onChange={LoginForm.handleChange} onBlur={LoginForm.handleBlur} value={LoginForm.values.newPassword} id="newPassword" name="newPassword" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@flowbite.com" />
          {LoginForm.touched.newPassword && LoginForm.errors.newPassword ? <p className="text-red-950">{LoginForm.errors.newPassword}</p> : ''}
        </div>
        <button disabled={!(LoginForm.isValid && LoginForm.dirty)} type="submit" className="text-white bg-active hover:bg-active focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-active dark:hover:bg-active dark:focus:ring-blue-800 disabled:border-active disabled:opacity-25">Update</button>
      </form>


    </div>
  )
}
