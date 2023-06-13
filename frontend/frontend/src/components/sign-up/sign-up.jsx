import React, { useState } from 'react';
import mylogo from '../../pages/main-page/images/logo.jpg'
import mainDark from '../../pages/main-page/images/bgc.png'
import mainLight from '../../pages/main-page/images/mainLight.png'
import './sign-up.scss';

import { NavLink } from 'react-router-dom';
import { BiLeftArrowAlt } from 'react-icons/bi';
import { CiDark, CiLight } from 'react-icons/ci'
import { SlSocialVkontakte, SlSocialGoogle } from 'react-icons/sl'
import { nanoid } from 'nanoid';

import { useTheme } from '../../hooks/usetheme'

export const SignUp = () => {
  const { setTheme } = useTheme();

  const mateDiv = document.querySelector(".regwindow__bar-mate")
  const teacherDiv = document.querySelector(".regwindow__bar-teacher")
  const parentDiv = document.querySelector(".regwindow__bar-parent")
  const [mateAnim, setMateAnim] = useState(true);
  const [mateBg, setMateBg] = useState(false);
  const [teacherAnim, setTeacherAnim] = useState(true);
  const [teacherBg, setTeacherBg] = useState(false);
  const [parentAnim, setParentAnim] = useState(true);
  const [parentBg, setParentBg] = useState(false);
  const ifNone = "Поле не может быть пустым"

  // VALIDATION TRUE/FALSE
  const [loginError, setLoginError] = useState(false)
  const [loginErrorText, setLoginErrorText] = useState('')
  const [loginValid, setLoginValid] = useState(false)
  const [passwordError, setPasswordError] = useState(false)
  const [passwordErrorText, setPasswordErrorText] = useState('')
  const [repeatError, setRepeatError] = useState(false)
  const [repeatErrorText, setRepeatErrorText] = useState('')
  const [repeatValid, setRepeatValid] = useState(false)
  const [human, setHuman] = useState('')
  const [humanValid, setHumanValid] = useState(false)

  // [API] FOR CHECKING IF AUTH CONST'S:
  const [authError, setAuthError] = useState(false)

  const handleSumbit = (e) => { if (e.key === "Enter") { document.querySelector(".regwindow__logbtn-text").click() } }
  
  const loginHandler = (e) => {
    setAuthError(false)
    if (e.length === 0) {
      setLoginValid(false)
      const loginInp = document.querySelector(".regwindow__inp1")
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
    setAuthError(false)
    const firstPassValue = document.querySelector(".regwindow__inp2").value
    const secondPassValue = document.querySelector(".regwindow__inp3").value
    if (e.length === 0) {
      setRepeatError(false)
      const passwordInp = document.querySelector(".regwindow__inp2")
      passwordInp.placeholder = ifNone
      setPasswordError(false)
    }
    if (e.length < 6) {
      setPasswordErrorText("Пароль не мог быть меньше 6")
      setPasswordError(true)
    } else { setPasswordError(false) }
    if (e.length === 0) { setPasswordError(false) }
    if (e.length >= 6 && e.indexOf(' ') !== -1) {
      setPasswordErrorText("Пароль имеет пробелы")
      setPasswordError(true)
    }
    if (e.length >= 6 && !/[!@#$&*%+-]/.test(e)) {
      setPasswordErrorText("Пароль должен иметь символы: !@#$&*%+-")
      setPasswordError(true)
    }
    if (e.length >= 6 && /[!@#$&*%+-]/.test(e) && e.indexOf(' ') === -1 && firstPassValue !== secondPassValue) {
      setRepeatErrorText("Пароли не совпадают")
      setRepeatError(true)
    } else if (e.length >= 6 && /[!@#$&*%+-]/.test(e) && e.indexOf(' ') === -1 && firstPassValue === secondPassValue) {
      setRepeatValid(true)
    }
  }

  const repeatHandler = (e) => {
    setAuthError(false)
    const firstPassValue = document.querySelector(".regwindow__inp2").value
    const secondPassValue = document.querySelector(".regwindow__inp3").value
    if (e.length === 0) {
      setRepeatError(false)
      setRepeatValid(false)
      const repeatInp = document.querySelector(".regwindow__inp3")
      repeatInp.placeholder = ifNone
      setRepeatError(false)
    }
    if (e.length < 6) {
      setRepeatValid(false)
      setRepeatErrorText("Пароль не мог быть меньше 6")
      setRepeatError(true)
    } else { setRepeatError(false) }
    if (e.length === 0) { setRepeatError(false) }
    if (e.length >= 6 && e.indexOf(' ') !== -1) {
      setRepeatValid(false)
      setRepeatErrorText("Пароль имеет пробелы")
      setRepeatError(true)
    }
    if (e.length >= 6 && !/[!@#$&*%+-]/.test(e)) {
      setRepeatValid(false)
      setRepeatErrorText("Пароль должен иметь символы: !@#$&*%+-")
      setRepeatError(true)
    }
    if (e.length >= 6 && /[!@#$&*%+-]/.test(e) && e.indexOf(' ') === -1 && firstPassValue !== secondPassValue) {
      setRepeatErrorText("Пароли не совпадают")
      setRepeatError(true)
    } else if (e.length >= 6 && /[!@#$&*%+-]/.test(e) && e.indexOf(' ') === -1 && firstPassValue === secondPassValue) {
      setRepeatValid(true)
    }
  }

  // ВЫБОР ЛИЧНОСТИ
  const mateHandler = () => {
    setHuman('mate');
    setHumanValid(false)
    setMateAnim(false)
    setMateBg(true)
    setTeacherAnim(true)
    setTeacherBg(false)
    setParentAnim(true)
    setParentBg(false)
  }

  const teacherHandler = () => {
    setHuman('teacher');
    setHumanValid(false)
    setTeacherAnim(false)
    setTeacherBg(true)
    setParentAnim(true)
    setParentBg(false)
    setMateAnim(true)
    setMateBg(false)
  }

  const parentHandler = () => {
    setHuman('parent');
    setHumanValid(false)
    setParentAnim(false)
    setParentBg(true)
    setMateAnim(true)
    setMateBg(false)
    setTeacherAnim(true)
    setTeacherBg(false)
  }

  // КНОПКА ВХОДА
  const btnHandler = () => {
    if (mateDiv.className.indexOf("bg") !== -1 || teacherDiv.className.indexOf("bg") !== -1 || parentDiv.className.indexOf("bg") !== -1) {
      if (loginValid === true && repeatValid === true) {
        const logVal = document.querySelector(".regwindow__inp1").value
        const repeatPassVal = document.querySelector(".regwindow__inp3").value
        const randomid = nanoid(8)
        const regObj = {
          "email": `${logVal}@riman.com`,
          "password": repeatPassVal,
          "password2": repeatPassVal,
          "first_name": "user_test",
          "last_name": "user_test",
          "type": human,
          "id": randomid
        }
        sendData('http://178.21.8.81/api/accounts/register', regObj)
      }
    } else {
      setHumanValid(true)
    }
  }

  // ФУНКЦИЯ ДЛЯ ОТПРАВКИ ПОЛУЧЕННЫХ ДАННЫХ
  const sendData = async (url, data) => {
    const responce = await fetch(url, {
      headers: { 'Content-Type': 'application/json' },
      method: 'POST',
      body: JSON.stringify(data)
    });
    if (responce.status === 400) {
      setAuthError(true)
    } else if (responce.status === 201) {
      window.location.replace("/tasks");
      localStorage.setItem("logged", true);
    }
    if (!responce.ok) { throw new Error(`Ошибка по адресу: ${url} статус ошибки: ${data}`) }
    return await responce.json()
  };

  // useEffect(() => {
  //   if (localStorage.getItem("logged")) {
  //     window.location.replace("/tasks");
  //   }
  // })

  const themeBtn = (val) => {
    if (val === "dark") {
      setTheme('dark')
      localStorage.setItem("app-theme", 'dark')
      return;
    }
    setTheme('light')
    localStorage.setItem("app-theme", 'light')
  }

  return (
    <>
      <img className='sign-background' src={localStorage.getItem("app-theme") === 'light' ? mainLight : mainDark} alt="background of sign-page" />
      <div className="main-logo">
        <img src={mylogo} alt="#" className='main-logo__logo' />
      </div>
      <div className="regcontainer">
        <div className="regwindow__forarrow">
          <div className="regwindow__wrapper">
            <div className="regwindow">
              <div className="regwindow__leftarrowdiv">
                <div className="regwindow__leftarrow">
                  <NavLink to="/"><BiLeftArrowAlt size={25} className="regwindow__leftarrowico" /></NavLink>
                </div>
                <div className="sign-rightbar__list-theme">
                  <CiLight onClick={() => themeBtn("light")} className={`tasks-rightbar__list-theme__ico taskslight ${localStorage.getItem("app-theme") === 'dark' ? '' : 'themeico-hide'}`} size={25} />
                  <CiDark onClick={() => themeBtn("dark")} className={`tasks-rightbar__list-theme__ico tasksdark ${localStorage.getItem("app-theme") === 'dark' ? 'themeico-hide' : ''}`} size={25} />
                </div>
              </div>
              <div className="regwindow__elements">
                <div className="regwindow__titlediv">
                  <p className='regwindow__title'>Рад тебя видеть!</p>
                </div>
                <div className="regwindow__bar">
                  <button onClick={mateHandler} className={`regwindow__bar-mate regbar ${mateAnim ? "regwindow__bar-mateanim" : ""} ${mateBg ? "regwindow__bar-matebg" : ""}`}><p className="people peoplemate">Ученик</p></button>
                  <button onClick={teacherHandler} className={`regwindow__bar-teacher ${teacherAnim ? "regwindow__bar-teacheranim" : ""} ${teacherBg ? "regwindow__bar-teacherbg" : ""}`}><p className="people">Учитель</p></button>
                  <button onClick={parentHandler} className={`regwindow__bar-parent regbar ${parentAnim ? "regwindow__bar-parentanim" : ""} ${parentBg ? "regwindow__bar-parentbg" : ""}`}><p className="people">Родитель</p></button>
                </div>
                {(humanValid && true) && <div className='human__error'><p className='human__errorText'>Выберите подходящий вариант</p></div>}
                <div className="regwindow__forms">
                  <div className="regwindow__formwrap">
                    <div className="regwindow__form">
                      <input autoComplete="off" onChange={e => loginHandler(e.target.value)} name='login' placeholder='Логин' className='regwindow__inp1 inpcss2 inptext' type="text" onKeyPress={e => handleSumbit(e)} />
                    </div>
                    {(loginError && true) && <div className='inp__errorlog'><p className='inp__errorlogText'>{loginErrorText}</p></div>}
                  </div>
                  <div className="regwindow__formlastchild regwindow__formadd">
                    <input autoComplete="off" onChange={e => passwordHandler(e.target.value)} name='password' placeholder='Пароль' className='regwindow__inp2 inpcss2' type="password" onKeyPress={e => handleSumbit(e)} />
                  </div>
                  {(passwordError && true) && <div className='inp__error2'><p className='inp__errorText2'>{passwordErrorText}</p></div>}
                  <div className="regwindow__formlast regwindow__formadd">
                    <input autoComplete="off" onChange={e => repeatHandler(e.target.value)} name='repeat' placeholder='Повторите пароль' className='regwindow__inp3 inpcss2' type="password" onKeyPress={e => handleSumbit(e)} />
                  </div>
                  {(repeatError && true) && <div className='inp__error3'><p className='inp__errorText3'>{repeatErrorText}</p></div>}
                  {(authError && true) && <div className='inp__error3'><p className='inp__errorText3'>Данный логин уже занят</p></div>}
                </div>
                <div className="regwindow__regbtn">
                  <form className='regform-btn'>
                    <button onClick={btnHandler} type="button" className='regwindow__regbtn-text'>Зарегистрироваться</button>
                  </form>
                </div>
                <div className="regwindow__socials">
                  <div className="regwindow__socials-vk socdiv">
                    <SlSocialVkontakte style={{fontSize: '25px'}} className='vk socico'/>
                  </div>
                  <div className="regwindow__socials-google socdiv">
                    <SlSocialGoogle className="google socico" />
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
