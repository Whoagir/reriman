import React from 'react';
import { NavLink } from 'react-router-dom';

import { FiCopy, } from 'react-icons/fi'
import { IoMdAddCircleOutline, } from 'react-icons/io'
import { TfiReload, } from 'react-icons/tfi'

export const TasksList = ({ pagitasks }) => {
    return (
        <div className='tasks-rightbar__navbar-tasks__wrapper'>
            <div className='tasks-rightbar__navbar-tasks'>
                <div className='tasks-rightbar__navbar-tasks__navbar'>
                    <div className='tasks-rightbar__navbar-tasks__navbar-title'>
                        <span className='tasks-rightbar__navbar-tasks__navbar-title__text'>
                            Задание {pagitasks.text}
                        </span>
                    </div>
                    <div className='tasks-rightbar__navbar-tasks__navbar-btns'>
                        <NavLink className='tasks-ico'><FiCopy size={23} /></NavLink>
                        <NavLink className='tasks-ico tasks-add'><IoMdAddCircleOutline size={26.5} /></NavLink>
                        <NavLink className='tasks-ico'><TfiReload size={22} /></NavLink>
                    </div>
                </div>
                <div className='tasks-rightbar__navbar-tasks__imagediv'>
                    {pagitasks.error ? <h1 style={{ textAlign: "center" }}>IMAGE ERROR</h1> : <img src={pagitasks.image} alt='#' />}
                </div>
                <div className='tasks-rightbar__navbar-tasks__navbar-bottom'>
                    <input
                        type='text'
                        className='inp tasks-rightbar__navbar-tasks__navbar-bottom__input'
                        placeholder='Ответ:'
                        maxLength={50}
                    />
                    <div className='tasks-rightbar__navbar-tasks__navbar-bottom__difficulty'>
                        <p style={{ color: 'white' }}>??? %</p>
                    </div>
                </div>
            </div>
        </div>
    );
};
