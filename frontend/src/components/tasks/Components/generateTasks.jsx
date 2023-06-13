import React, { useState } from 'react'

export const GenerateTasks = ({ setShowgeneration }) => {

    const [containerStates, setContainerStates] = useState({
        Var1: false,
        Var2: false,
        Var3: false,
        Var4: false,
        Var5: false,
        Var6: false,
        Var7: false,
        Var8: false,
    });

    const [containerStates2, setContainerStates2] = useState({
        Var1: false,
        Var2: false,
        Var3: false,
        Var4: false,
        Var5: false,
        Var6: false,
        Var7: false,
        Var8: false,
    });

    const [containerStates3, setContainerStates3] = useState({
        Var1: false,
        Var2: false,
        Var3: false,
        Var4: false,
        Var5: false,
        Var6: false,
        Var7: false,
        Var8: false,
    });

    const [containerStates4, setContainerStates4] = useState({
        Var1: false,
        Var2: false,
        Var3: false,
        Var4: false,
        Var5: false,
        Var6: false,
        Var7: false,
        Var8: false,
    });

    const handleClick = (variable) => {
        setContainerStates((prevContainerStates) => ({
            ...prevContainerStates,
            [variable]: !prevContainerStates[variable],
        }));
    };

    const handleClick2 = (variable) => {
        setContainerStates2((prevContainerStates) => ({
            ...prevContainerStates,
            [variable]: !prevContainerStates[variable],
        }));
    };

    const handleClick3 = (variable) => {
        setContainerStates3((prevContainerStates) => ({
            ...prevContainerStates,
            [variable]: !prevContainerStates[variable],
        }));
    };

    const handleClick4 = (variable) => {
        setContainerStates4((prevContainerStates) => ({
            ...prevContainerStates,
            [variable]: !prevContainerStates[variable],
        }));
    };

    const setGeneric = () => {
        setShowgeneration(false);
        console.log(containerStates)
        console.log(containerStates2)
        console.log(containerStates3)
        console.log(containerStates4)
    }

    return (
        <>
            <div className="tasks-rightbar-generation df fww aic jcc w100">
                <p>Укажи параметри и нажми кнопку "создать"</p>
                <div className="tasks-leftbarcontent__top-filters-item__generation" onClick={() => setGeneric()}>
                    <p>Создать</p>
                </div>
            </div>
            <div className="tasks-rightbar-filters">
                <div className="filters-text w100">
                    <p>Вы можете выбрать один из заранее созданых вариантов. Они обновляются каждую неделю.</p>
                    <p>Варианты отсортированны по сложности и достоверности, чем больше номер - тем сложнее.</p>
                </div>
                <div className="filters-mid df">
                    <div className="toptext">
                        Варианты
                    </div>
                    <div className="filters-midleft w50">
                        <div className="filters-title w100 df jcc">
                            <div>
                                <p>ЕГЭ:</p>
                            </div>
                        </div>
                        <div className="filters-midleft-contents">
                            {Object.entries(containerStates).map(([variable, isClicked]) => (
                                <div
                                    key={variable}
                                    className='filters-midleft-content'
                                    onClick={() => handleClick(variable)}
                                    style={{ background: isClicked ? 'rgba(217, 217, 217, 0.1)' : 'none' }}
                                >
                                    <p>Вариант {variable.slice(3)}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="filters-midright w50">
                        <div className="filters-title w100 df jcc">
                            <div>
                                <p>ОГЭ:</p>
                            </div>
                        </div>
                        <div className="filters-midright-contents">
                            {Object.entries(containerStates2).map(([variable, isClicked]) => (
                                <div
                                    key={variable}
                                    className='filters-midleft-content'
                                    onClick={() => handleClick2(variable)}
                                    style={{ background: isClicked ? 'rgba(217, 217, 217, 0.1)' : 'none' }}
                                >
                                    <p>Вариант {variable.slice(3)}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
                <div className="filters-mid df">
                    <div className="toptext">
                        <select name="item" className='tasks-leftbarcontent__top-filters-item__select'>
                            <option className='tasks-leftbarcontent__top-filters-item__select-option' selected>10 класс</option>
                            <option className='tasks-leftbarcontent__top-filters-item__select-option'>11 класс</option>
                        </select>
                    </div>
                    <div className="filters-midleft w50">
                        <div className="filters-title w100 df jcc">
                            <div>
                                <p>ЕГЭ:</p>
                            </div>
                        </div>
                        <div className="filters-midleft-contents">
                            {Object.entries(containerStates3).map(([variable, isClicked]) => (
                                <div
                                    key={variable}
                                    className='filters-midleft-content'
                                    onClick={() => handleClick3(variable)}
                                    style={{ background: isClicked ? 'rgba(217, 217, 217, 0.1)' : 'none' }}
                                >
                                    <p>Вариант {variable.slice(3)}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="filters-midright w50">
                        <div className="filters-title w100 df jcc">
                            <div>
                                <p>ОГЭ:</p>
                            </div>
                        </div>
                        <div className="filters-midright-contents">
                            {Object.entries(containerStates4).map(([variable, isClicked]) => (
                                <div
                                    key={variable}
                                    className='filters-midleft-content'
                                    onClick={() => handleClick4(variable)}
                                    style={{ background: isClicked ? 'rgba(217, 217, 217, 0.1)' : 'none' }}
                                >
                                    <p>Вариант {variable.slice(3)}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
