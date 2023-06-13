import React, { useState, useEffect } from 'react'
import mylogo from '../../pages/main-page/images/logo.jpg'
import mainDark from '../../pages/main-page/images/bgc.png'
import mainLight from '../../pages/main-page/images/mainLight.png'
import './sign-in.css';

import { NavLink } from 'react-router-dom';
import { Icon24LogoVk } from '@vkontakte/icons';
import { AiOutlineGoogle } from 'react-icons/ai';
import { BiLeftArrowAlt } from 'react-icons/bi';
import { CiDark, CiLight } from 'react-icons/ci'

import { useTheme } from '../../hooks/usetheme'

export const LogIn = () => {
  const { setTheme } = useTheme();
  const [bg, setBg] = useState()

  const [login, setLogin] = useState('')
  const [password, setPassword] = useState('')
  const ifNone = "Поле не может быть пустым"

  // VALIDATION TRUE/FALSE
  const [loginError, setLoginError] = useState(false)
  const [loginErrorText, setLoginErrorText] = useState('')
  const [loginValid, setLoginValid] = useState(false)
  const [passwordError, setPasswordError] = useState(false)
  const [passwordErrorText, setPasswordErrorText] = useState('')
  const [passwordValid, setPasswordValid] = useState(false)

  // [API] FOR CHECKING IF AUTH CONST'S:
  const [notauth, setNotAuth] = useState(false)
  const [authError, setAuthError] = useState('')

  const handleSumbit = (e) => { if (e.key === "Enter") { document.querySelector(".logwindow__logbtn-text").click() } }
  const loginHandler = (e) => {
    setNotAuth(false)
    setLogin(e)
    if (e.length === 0) {
      setLoginValid(false)
      const loginInp = document.querySelector(".logwindow__inp1")
      loginInp.placeholder = ifNone
    }
    if (e.length < 3) {
      setLoginValid(false)
      setLoginErrorText("Логин не мог быть меньше 3")
      setLoginError(true)
    } else { setLoginError(false) }
    if (e.length === 0) { setLoginError(false) }
    if (e.length >= 3 && !/^[а-яА-ЯA-Za-z\s0-9]*$/.test(e)) {
      setLoginValid(false)
      setLoginErrorText("Логин мог иметь только буквы и цифры")
      setLoginError(true)
    }
    if (e.length >= 3 && e.indexOf(' ') !== -1) {
      setLoginValid(false)
      setLoginErrorText("Логин имеет пробелы")
      setLoginError(true)
    }
    if (!e.length < 3 && /^[а-яА-ЯA-Za-z\s0-9]*$/.test(e) && e.indexOf(' ') === -1) { setLoginValid(true) }
  }

  const passwordHandler = (e) => {
    setNotAuth(false)
    setPassword(e)
    if (e.length === 0) {
      setPasswordValid(false)
      const passwordInp = document.querySelector(".logwindow__inp2")
      passwordInp.placeholder = ifNone
      setPasswordError(false)
    }
    if (e.length < 6) {
      setPasswordValid(false)
      setPasswordErrorText("Пароль не мог быть меньше 6")
      setPasswordError(true)
    } else { setPasswordError(false) }
    if (e.length === 0) { setPasswordError(false) }
    if (e.length >= 6 && e.indexOf(' ') !== -1) {
      setPasswordValid(false)
      setPasswordErrorText("Пароль имеет пробелы")
      setPasswordError(true)
    }
    if (e.length >= 6 && !/[!@#$&*%+-]/.test(e)) {
      setPasswordValid(false)
      setPasswordErrorText("Пароль должен иметь символы: !@#$&*%+-")
      setPasswordError(true)
    }
    if (e.length >= 6 && /[!@#$&*%+-]/.test(e) && e.indexOf(' ') === -1) { setPasswordValid(true) }
  }

  // КНОПКА ВХОДА
  const btnHandler = () => {
    if (loginValid === true && passwordValid === true) {
      const loginObj =
      {
        "email": `${login}@riman.com`,
        "password": password
      }
      setData('http://178.21.8.81/api/accounts/token', loginObj)
    }
  }

  // ФУНКЦИЯ ДЛЯ ОТПРАВКИ ПОЛУЧЕННЫХ ДАННЫХ
  const setData = async (url, data) => {
    const responce = await fetch(url, {
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'POST',
      body: JSON.stringify(data)
    });
    if (responce.status === 401) {
      setAuthError('Логин не существует, либо неверный пароль')
      setNotAuth(true)
    }
    if (responce.status === 200) {
      localStorage.setItem("logged", true);
      window.location.replace("/tasks");
    }
    if (!responce.ok) { throw new Error(`Ошибка по адресу: ${url} статус ошибки: ${data}`) }
    return await responce.json()
  };

  useEffect(() => {
    const dark = document.querySelector(".tasksdark");
    const light = document.querySelector(".taskslight");
    const currentTheme = localStorage.getItem("app-theme")
    console.log(currentTheme)
    if (currentTheme === "light") {
      light.classList.toggle("themeico-hide");
      dark.classList.toggle("themeico-hide");
      setBg(false)
    }
    if (currentTheme === "dark") {
      setBg(true)
    }
  }, [])
  const themeBtn = (val) => {
    const dark = document.querySelector(".tasksdark");
    const light = document.querySelector(".taskslight");
    dark.classList.toggle("themeico-hide");
    light.classList.toggle("themeico-hide");
    console.log(val)
    if (val === "dark") {
      setTheme('dark')
      setBg(true)
    } else {
      setTheme('light')
      setBg(false)
    }
  }

  return (
    <>
    <img className='signin-background' src={bg ? mainDark : mainLight} alt="background of sign-page" />
      <div className="main-logo">
        <img src={mylogo} alt="#" className='main-logo__logo' />
      </div>
      <div className="logcontainer">
        <div className="logwindow__forarrow">
          <div className="logwindow__wrapper">
            <div className="logwindow">
              <div className="logwindow__leftarrowdiv">
                <div className="logwindow__leftarrow">
                  <NavLink to="/"><BiLeftArrowAlt size={25} className="logwindow__leftarrowico" /></NavLink>
                </div>
                <div className="signin-rightbar__list-theme">
                  <CiLight onClick={() => themeBtn("light")} className='tasks-rightbar__list-theme__ico taskslight' size={25} />
                  <CiDark onClick={() => themeBtn("dark")} className='tasks-rightbar__list-theme__ico tasksdark themeico-hide' size={25} />
                </div>
              </div>
              <div className="logwindow__elements">
                <div className="logwindow__titlediv">
                  <p className='logwindow__title'>Рад тебя видеть!</p>
                </div>
                <div className="logwindow__forms">
                  <div className="logwindow__formwrap">
                    <div className="logwindow__form">
                      <input autoComplete="off" onChange={e => loginHandler(e.target.value)} value={login} name='login' placeholder='Логин' className='logwindow__inp1 inpcss inptext' type="text" maxLength={20} onKeyPress={e => handleSumbit(e)} />
                    </div>
                    {(loginError && true) && <div className='inp__error'><p className='inp__errorText'>{loginErrorText}</p></div>}
                  </div>
                  <div className="logwindow__formlastchild logwindow__formadd">
                    <input autoComplete='off' onChange={e => passwordHandler(e.target.value)} value={password} name='password' placeholder='Пароль' className='logwindow__inp2 inpcss' type="password" maxLength={20} onKeyPress={e => handleSumbit(e)} />
                  </div>
                  {(passwordError && true) && <div className='inppass__error'><p className='inppass__errorText'>{passwordErrorText}</p></div>}
                  {(notauth && true) && <div className='inppass__error'><p className='inppass__errorText' href=''>{authError}</p></div>}
                </div>
                <div className="logwindow__logbtn logwindow__logbtn-margin">
                  <form className="logform-btn">
                    <button type='button' onClick={btnHandler} className='logwindow__logbtn-text'>Войти</ button>
                  </form>
                </div>
                <div className="logwindow__socials">
                  <div className="logwindow__socials-vk socdiv">
                    <Icon24LogoVk className="vkc socico" />
                  </div>
                  <div className="logwindow__socials-google socdiv">
                    <AiOutlineGoogle className="google socico" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
