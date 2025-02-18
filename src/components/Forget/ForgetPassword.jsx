import axios from "axios";
import { useFormik } from "formik";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import * as Yup from "yup";
export default function ForgetPassword() {
    let [errorMessage, setError] = useState(null);
    let [formDisplay, setformDisplay] = useState(true);
    let navg = useNavigate ();
    const baseUrl = "https://ecommerce.routemisr.com";
    let validYup = Yup.object({
        email: Yup.string().required("Email Required").email("Enter Valid Email"),
    });
    let valid2Yup = Yup.object({
        resetCode: Yup.string().required("resetCode Required"),
    });
    let initialValues = {
        email: "",
    };
    let ForgetForm = useFormik({
        initialValues,
        onSubmit: ForgetPasswordApi,
        validationSchema: validYup,
    });
    let verifyResetCodeForm = useFormik({
        initialValues: {
            resetCode: "",
        },
        onSubmit: verifyResetCodeApi,
        validationSchema: valid2Yup,
    });
    function verifyResetCodeApi(data) { 
        axios.post(`${baseUrl}/api/v1/auth/verifyResetCode`, data)
        .then((req) => {
            console.log(req.data);
            if(req.data.status == 'Success')
                navg('/updatepassword')
        })
        .catch((err) => {
            setError(err.response.data.message);
        });
    }
    function ForgetPasswordApi(data) {
        axios
            .post(`${baseUrl}/api/v1/auth/forgotPasswords`, data)
            .then((req) => {
                console.log(req.data);
                if (req.data.statusMsg == "success") {
                    setformDisplay(false)
                }
            })
            .catch((err) => {
                setError(err.response.data.message);
            });
    }
    return (
        <>
            {formDisplay ? (
                <div>
                    <h2 className="w-7/12 mx-auto text-4xl mb-2">please enter your verification code</h2>

                    {errorMessage ? (
                        <div
                            className="p-4 mb-4 w-1/2 mx-auto text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
                            role="alert"
                        >
                            {errorMessage}
                        </div>
                    ) : (
                        ""
                    )}

                    <form onSubmit={ForgetForm.handleSubmit} className="w-7/12 mx-auto">
                        <div className="mb-5">
                            <label
                                htmlFor="email"
                                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                            >
                                Your Email
                            </label>
                            <input
                                type="email"
                                onChange={ForgetForm.handleChange}
                                onBlur={ForgetForm.handleBlur}
                                value={ForgetForm.values.email}
                                id="email"
                                name="email"
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                placeholder="Email"
                            />
                            {ForgetForm.touched.email && ForgetForm.errors.email ? (
                                <p className="text-red-950">{ForgetForm.errors.email}</p>
                            ) : (
                                ""
                            )}
                        </div>
                        <button
                            disabled={!(ForgetForm.isValid && ForgetForm.dirty)}
                            type="submit"
                            className="text-white bg-active hover:bg-active focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-active dark:hover:bg-active dark:focus:ring-blue-800 disabled:border-active disabled:opacity-25"
                        >
                            Send
                        </button>
                    </form>
                </div>
            ) : (
                <div>
                    <h2>Reset Code</h2>

                    {errorMessage ? (
                        <div
                            className="p-4 mb-4 w-1/2 mx-auto text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
                            role="alert"
                        >
                            {errorMessage}
                        </div>
                    ) : (
                        ""
                    )}
                    <form
                        onSubmit={verifyResetCodeForm.handleSubmit}
                        className="w-7/12 mx-auto"
                    >
                        <div className="mb-5">
                            <label
                                htmlFor="resetCode"
                                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                            >
                                Your resetCode
                            </label>
                            <input
                                type="string"
                                onChange={verifyResetCodeForm.handleChange}
                                onBlur={verifyResetCodeForm.handleBlur}
                                value={verifyResetCodeForm.values.resetCode}
                                id="resetCode"
                                name="resetCode"
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                placeholder="name@flowbite.com"
                            />
                            {verifyResetCodeForm.touched.resetCode &&
                                verifyResetCodeForm.errors.resetCode ? (
                                <p className="text-red-950">
                                    {verifyResetCodeForm.errors.resetCode}
                                </p>
                            ) : (
                                ""
                            )}
                        </div>
                        <button
                            disabled={
                                !(verifyResetCodeForm.isValid && verifyResetCodeForm.dirty)
                            }
                            type="submit"
                            className="text-white bg-active hover:bg-active focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-active dark:hover:bg-active dark:focus:ring-blue-800 disabled:border-active disabled:opacity-25"
                        >
                            Verify Code
                        </button>
                    </form>
                </div>
            )}
        </>
    );
}
