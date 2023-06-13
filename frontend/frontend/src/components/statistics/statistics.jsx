import React, { useState } from 'react'
import './statistics.scss'

// БИБЛЫ
import { Link, Routes, Route } from 'react-router-dom';

// КОМПОНЕНТЫ
import { StatVariant } from './Components/stat-variant/statVariant';
import { StatMain } from './Components/stat-main/statMain';
import { StatAchiv } from './Components/stat-achiv/statAchiv';
import { StatActiv } from './Components/stat-activ/statActiv';
import { StatTheme } from './Components/stat-theme/statTheme';

export const Statistics = () => {

    // CONST'S
    const [firBtn, setFirBtn] = useState(false)
    const [secBtn, setSecBtn] = useState(true)

    // ARROW FUNCTIONS
    const firBtnHandler = () => {setSecBtn(false)
    setFirBtn(true)}
    const secBtnHandler = () => {setFirBtn(false)
    setSecBtn(true)}

    return (
        <div className="stat__container">
            <div className="stat__navbar">
                <div className="stat__navbar-rate"><p>Рейтинг: ???</p></div>
                <div className="stat__navbar-btns oh">
                    <Link onClick={firBtnHandler} className={`tdn stat__navbar-btn1 ${firBtn ? 'stat-btn-selected' : ''} oh toe wsnw`} to={firBtn ? '' : "./variant"}>
                            Статистика варианта
                    </Link>
                    <Link onClick={secBtnHandler} className={`tdn stat__navbar-btn2 ${secBtn ? 'stat-btn-selected' : ''} oh toe wsnw`} to={secBtn ? '' : "."}>
                        Общая статистика
                    </Link>
                </div>
            </div>
            <Routes>
                <Route path="/" element={<StatMain />} />
                <Route path="/variant" element={<StatVariant />} />
                <Route path="activity/*" element={<StatActiv />} />
                <Route path="themes/*" element={<StatTheme />} />
                <Route path="achievements/*" element={<StatAchiv />} />
            </Routes>
        </div>
    )
}