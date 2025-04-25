import { useFormik } from 'formik';
import React, { useEffect, useState } from 'react';
import { array, date, mixed, number, object, string } from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser, registerUser, verifyOTP } from '../../redux/slice/auth.slice';
import { useNavigate } from 'react-router-dom';

function Auth(props) {
  const [type, setType] = useState('login');
  const [userEmail, setuserEmail] = useState('');

  useEffect(() => {
    let localEmail = localStorage.getItem("userEmail");

    if (localEmail) {
      setType("OTP");
      setuserEmail(localEmail);
    }
  }, [])

  const dispatch = useDispatch();

  const auth = useSelector(state => state.auth);

  console.log(auth);


  let initialValues = {}, validationSchema = {};

  if (type === 'login') {
    initialValues = {
      email: '',
      password: ''
    }

    validationSchema = {
      email: string().required().email(),
      password: string().required()
    }
  } else if (type === 'register') {
    initialValues = {
      name: '',
      email: '',
      password: ''
    }

    validationSchema = {
      name: string().required(),
      email: string().required().email(),
      password: string().required()
    }
  } else if (type === 'OTP') {
    initialValues = {
      otp: ''
    }

    validationSchema = {
      otp: string().required()
    }

  } else {
    initialValues = {
      email: ''
    }

    validationSchema = {
      email: string().required().email()
    }
  }

  let authSchema = object(validationSchema);

  const formik = useFormik({
    initialValues: initialValues,
    enableReinitialize: true,
    validationSchema: authSchema,
    onSubmit: async (values, { resetForm }) => {
      console.log(values);

      if (type === 'login') {
        dispatch(loginUser(values));
      } else if (type === 'register') {
        const res = await dispatch(registerUser({ ...values, role: 'user' }));

        console.log(res);

        if (res.type === "auth/registerUser/fulfilled") {
          setType("OTP");
          setuserEmail(values.email);
        }
      } else if (type === 'OTP') {
        console.log(values);
        const res = await dispatch(verifyOTP({email: userEmail, otp: values.otp}));

        if (res.type === 'auth/verifyOTP/fulfilled') {
          setType("login");
          setuserEmail('');
          localStorage.removeItem("userEmail");
        }
      }


      resetForm();
    },
  });

  console.log(type, userEmail, initialValues, validationSchema);


  const { handleSubmit, handleChange, handleBlur, values, errors, touched, setValues, resetForm, setFieldValue } = formik;

  const navigate = useNavigate();

  if (auth.isValidate) {
    navigate("/");
  }

  const googleLogin = () => {
    try {
      window.location.href = "http://localhost:8000/api/v1/users/google"
    } catch (error) {
      console.log("error while login with google", error);

    }
  }

  return (
    <div>
      <div className="container-fluid page-header py-5">
        <h1 className="text-center text-white display-6">
          {
            type === 'login' ? 'Login' :
              type === 'password' ? 'Forgot Password' :
                type === "OTP" ? "Verify OTP" :
                  'Register'
          }
        </h1>
        <ol className="breadcrumb justify-content-center mb-0">
          <li className="breadcrumb-item"><a href="#">Home</a></li>
          <li className="breadcrumb-item"><a href="#">Pages</a></li>
          <li className="breadcrumb-item active text-white">
            {
              type === 'login' ? 'Login' :
                type === 'password' ? 'Forgot Password' :
                  type === "OTP" ? "Verify OTP" :
                    'Register'
            }
          </li>
        </ol>
      </div>
      {/* Single Page Header End */}
      {/* Contact Start */}
      <div className="container-fluid contact py-5">
        <div className="container py-5">
          <div className="p-5 bg-light rounded">
            <div className="row g-4">
              <div className="col-lg-7">
                <form onSubmit={handleSubmit} className>
                  {
                    type === 'register' ?
                      <>
                        <input
                          name='name'
                          type="text"
                          className="w-100 form-control border-0 py-3 mb-4"
                          placeholder="Your Name"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.name}
                        />
                        <span>
                          {errors.name && touched.name ? errors.name : null}
                        </span>
                      </>
                      : null
                  }

                  {
                    type !== 'OTP' ?
                      <>
                        <input
                          name='email'
                          type="email"
                          className="w-100 form-control border-0 py-3 mb-4"
                          placeholder="Enter Your Email"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.email}
                        />
                        <span>
                          {errors.email && touched.email ? errors.email : null}
                        </span>
                      </> : null
                  }

                  {
                    type === 'login' || type == 'register' ?
                      <>
                        <input
                          name='password'
                          type="password"
                          className="w-100 form-control border-0 py-3 mb-4"
                          placeholder="Enter Your password"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.password}
                        />
                        <span>
                          {errors.password && touched.password ? errors.password : null}
                        </span>
                      </>
                      : null
                  }

{
                    type === 'OTP' ?
                      <>
                        <input
                          name='otp'
                          type="text"
                          className="w-100 form-control border-0 py-3 mb-4"
                          placeholder="Enter OTP"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.otp}
                        />
                        <span>
                          {errors.otp && touched.otp ? errors.otp : null}
                        </span>
                      </>
                      : null
                  }

                  <button className="w-100 btn form-control border-secondary py-3 bg-white text-primary " type="submit">
                    {type === 'login' ? 'Login' :
                      type === 'register' ? 'Register' : 'Submit'}</button>
                </form>
                {
                  type === 'login' ?
                    <>
                      <a href='#' onClick={() => setType("password")}>Forgot Password?</a> <br></br>
                      <span>Create an account: </span><a href='#' onClick={() => setType('register')}>Signup</a>
                    </> :
                    <><span>Already have an account?</span><a href='#' onClick={() => setType('login')}>Login</a></>
                }

              </div>
              <button onClick={googleLogin} className="btn form-control border-secondary py-3 bg-white text-primary " type="submit">Login with Google</button>
            </div>
          </div>
        </div>
      </div>
    </div>

  );
}

export default Auth;