import React, { useState, useEffect } from 'react';
import list from './tasksList.module.scss';

import { BiMinus, BiPlus } from 'react-icons/bi';

export const TasksList = ({ pagitasks, testik }) => {
    const [showanswer, setShowanswer] = useState(false);
    const [icon, setIcon] = useState('');

    useEffect(() => {
        setShowanswer(testik)
    }, [testik])

    useEffect(() => {
        const check = () => {
            if (pagitasks.attemp === 1) {
                setIcon('1')
                return;
            }
            if (pagitasks.attemp === 2) {
                setIcon('2')
                return;
            }
            if (pagitasks.attemp === 3) {
                setIcon('3')
                return;
            }
        }
        check()
    }, [pagitasks]);

    const showHandler = () => {
        setShowanswer(!showanswer)
    }
    return (
        <div className={`${list.task} w100`}>
            <div className={`${list.top} w100 df`}
                style={!showanswer ? { borderBottom: '0px solid white' } : { borderBottom: '2px dashed white' }}>
                <div className={`${list.left} df aic fdc jcc`}>
                    <div className={`${list['left-time']} w100`}>
                        <p>{`Время: ${pagitasks.time.hours}ч ${pagitasks.time.minutes}м`}</p>
                    </div>
                    <div className={`${list['left-attemp']} w100`}>
                        <p className='w100 tac'>Попытки:</p>
                        <div className={`${list['left-attemps']} df fww jcsb`}>
                            <div className='df aic jcc'>
                                {icon === '1' ? <BiPlus size={20} /> : <BiMinus size={20} />}
                            </div>
                            <div className='df aic jcc'>
                                {icon === '2' ? <BiPlus size={20} /> : <BiMinus size={20} />}
                            </div>
                            <div className='df aic jcc'>
                                {icon < 3 ? <></> : <BiPlus size={20} />}
                            </div>
                        </div>
                    </div>
                </div>
                <div className={`${list.right} df fdc jcsb w100`}>
                    <p className={`${list.title} w100`}>Задача {pagitasks.text}</p>
                    <div className={`${list.image} w100 df jcc`}>
                        {pagitasks.error ? <h1 style={{ textAlign: "center" }}>IMAGE ERROR</h1> : <img src={pagitasks.image} alt='Your finished task' />}
                    </div>
                    <div className={`${list['right-footer']} df jcsb w100`}>
                        <div className={list['right-footer-left']}>
                            <p>Ответ: {pagitasks.grade}</p>
                        </div>
                        <div className={`${list['right-footer-right']} df aic fww`}>
                            <div className={list.difficulty}>
                                <p>{pagitasks.difficulty}% сложности</p>
                            </div>
                            <div
                                className={`${list.show} df aic jcsb cp`}
                                onClick={() => showHandler()}>
                                <p>Решение</p>
                                <div className='df aic jcc'>
                                    {showanswer ? <BiMinus size={20} /> : <BiPlus size={20} />}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div
                className={`${list.bottom} ${showanswer ? 'show' : ''} df aic w100`}
                style={showanswer ? { transform: 'translateY(0%)', display: 'block' } : { color: 'white', display: 'none' }}>
                <p className='tac'>{pagitasks.answer}</p>
            </div>
        </div>
    )
}
