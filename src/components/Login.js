import React, {useState} from 'react';
import {useNavigate} from "react-router-dom";
import authApi from "utils/api/AuthApi";
import {initFormState} from "utils/constants";


export const Login = ({handleRegister, handleLogin, setUserEmail}) => {

  const navigate = useNavigate()

  const [formValue, setFormValue] = useState(initFormState)

  const handleSubmit = (e) => {
    e.preventDefault()
    authApi.authorize(formValue.email, formValue.password).then(token => {
      if (token) {
        handleLogin(true)
        setUserEmail(formValue.email)
        navigate('/', {replace: true})
        setFormValue(initFormState)
        localStorage.setItem('token', token);
      } else {
        handleRegister(false)
        setFormValue(initFormState)
      }

    })
  }

  const handleChange = (e) => {
    const {name, value} = e.target

    setFormValue({
      ...formValue,
      [name]: value
    })
  }

    return (
        <div className='login'>
          <div className='login__container_side-top'>
          <h1 className='login__title'>
            Войти</h1>
            <form className='login__form' id='login-form-auth' onSubmit={handleSubmit}>
          <label>
            <input
              onChange={handleChange}
              value={formValue.email}
              className='login__input'
              name="email"
              type="text"
              placeholder="Email"
              required
              minLength="2"
              maxLength="40"
            />
            {/*<span></span>*/}
          </label>
          <label>
            <input
              onChange={handleChange}
              value={formValue.password}
              className='login__input'
              name="password"
              placeholder="Пароль"
              type="password"
              required
              minLength="2"
              maxLength="200"
            />
            {/*<span></span>*/}
          </label>
            </form>
          </div>

          <div className='login__container_side-bottom'>
            <button type='submit' form='login-form-auth' className='login__auth'>Войти</button>
          </div>
        </div>
    );
};

