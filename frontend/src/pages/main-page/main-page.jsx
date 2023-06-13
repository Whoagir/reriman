import React from 'react';
import { NavLink } from 'react-router-dom';
import './main-page.scss';
import mylogo from '../../pages/main-page/images/logo.jpg';
import mainDark from './images/bgc.png'
import mainLight from './images/mainLight.png'

export const MainPage = () => {
  return (
    <>
      <img className='main-background' src={localStorage.getItem("app-theme") === 'light' ? mainLight : mainDark} alt="background of main-page" />
      <div className="w100 h100vh df fdc jcsb">
        <div className="main-logo">
          <img src={mylogo} alt="#" className='main-logo__logo' />
        </div>
        <div className="wrap">
          <div className="main-elements">
            <div className="main-elementswrap">
              <div className="main-elements__title">
                <span className="main-elements__title-p">Удачного Путешествия</span>
              </div>
              <div className="main-elements__btns">
                <NavLink className='main-elements_btn' to="/signin"><p className='main-elements_btn-text'>вход</p></NavLink>
                <NavLink className='main-elements_btn' to='/signup'><p className='main-elements_btn-text'>регистрация</p></NavLink>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}