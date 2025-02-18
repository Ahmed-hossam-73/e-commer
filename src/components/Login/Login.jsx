import axios from "axios";
import { useFormik } from "formik";
import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import * as Yup from 'yup'
import { AuthContext } from "../../Context/AuthContextProvider";
export default function Login() {
  let {setToken,decodeData}=useContext(AuthContext)
  let [errorMessage, setError] = useState(null);
  let navg = useNavigate ();
  const baseUrl = 'https://ecommerce.routemisr.com'
  let validYup = Yup.object({
    email: Yup.string().required('Email Required').email('Enter Valid Email'),
    password: Yup.string().required('Password Required').matches(/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/, "Password Invalid"),
  })
  let initialValues = {
    email: "",
    password: "",
  };
  let LoginForm = useFormik({
    initialValues,
    onSubmit: LoginApi,
    validationSchema: validYup,
  });
  async function LoginApi(data) {
    axios
    .post(`${baseUrl}/api/v1/auth/signin`, data)
    .then((req) => {
      if(req.data.message == 'success'){
        setToken(req.data.token)
        localStorage.setItem('token',req.data.token)
        decodeData(req.data.token)
        navg('/');
      }
    })
      .catch((err) => {
        setError(err.response.data.message)
      })

  }
  return (
    <div>
      <h2 className="w-7/12 mx-auto text-4xl mb-2">Login Now</h2>

      {errorMessage ?
      <div className="p-4 mb-4 w-1/2 mx-auto text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
        {errorMessage}
    </div> :''}

      <form onSubmit={LoginForm.handleSubmit} className="w-7/12 mx-auto">
        <div className="mb-5">
          <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your Email</label>
          <input type="email" onChange={LoginForm.handleChange} onBlur={LoginForm.handleBlur} value={LoginForm.values.email} id="email" name="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Email" />
          {LoginForm.touched.email && LoginForm.errors.email ? <p className="text-red-950">{LoginForm.errors.email}</p> : ''}
        </div>
        <div className="mb-5">
          <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your Password</label>
          <input type="password" onChange={LoginForm.handleChange} onBlur={LoginForm.handleBlur} value={LoginForm.values.password} id="password" name="password" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Password" />
          {LoginForm.touched.password && LoginForm.errors.password ? <p className="text-red-950">{LoginForm.errors.password}</p> : ''}
        </div>
        <div className="flex justify-between">
        <Link to='/forgetpassword'><h2 className="hover:text-main text-2xl">Forget Password ?</h2></Link>
        <br/>
        <button disabled={!(LoginForm.isValid && LoginForm.dirty)} type="submit" className="disabled:border-black disabled:border-2 disabled:bg-white disabled:text-btn focus:ring-4 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center bg-active text-white disabled:opacity-40">Login now</button>
        </div>
      </form>


    </div>
  )
}
