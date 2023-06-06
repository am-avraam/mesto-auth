import React, {useState} from 'react';
import {useNavigate, Link} from "react-router-dom";
import authApi from "utils/api/AuthApi";
import {initFormState} from "utils/constants";

export const Register = ({handleRegister}) => {

  const navigate = useNavigate()

  const [formValue, setFormValue] = useState(initFormState)

  const handleSubmit = (e) => {
    e.preventDefault()
    authApi.register( formValue.email, formValue.password).then((res, err) => {
      if (res.data) {
        // navigate('/login', {replace: true})
        setFormValue(initFormState)
        handleRegister(true)
      } else {
        handleRegister(false)
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
    <div className='login login-register'>
      <div className='login__container_side-top'>
        <h1 className='login__title'>
          Регистрация</h1>
        <form className='login__form' onSubmit={handleSubmit} id='login-form-register' >
          <label>
            <input
              onChange={handleChange}
              id="email"
              name="email"
              type="email"
              value={formValue.email}
              className='login__input'
              placeholder="Email"
              required
              minLength="2"
              maxLength="40"
            />
            <span></span>
          </label>
          <label>
            <input
              onChange={handleChange}
              className='login__input'
              type="password"
              name='password'
              placeholder="Пароль"
              value={formValue.password}
              required
              minLength="2"
              maxLength="200"
            />
            <span></span>
          </label>
        </form>
      </div>

      <div className='login__container_side-bottom'>
        <button type='submit' form='login-form-register' className='login__auth'>Зарегистрироваться</button>
        <Link to='/sign-in' className='login__link'>Уже зарегистрированы? Войти</Link>
      </div>
    </div>
  );
};



