import React, { useState, useEffect } from 'react'
import { AiOutlineMinus, AiOutlinePlus, AiOutlineClose, } from 'react-icons/ai'
import { MdClose } from 'react-icons/md'
import { useToggle } from '../../../hooks/useToggle'
import { nanoid } from 'nanoid'
// import PodtipMenu from './tasksPodtip'

function FilterTasks({ id, onDeleteTasks }) {
    const [tasksNumber, setTasksNumber] = useState(parseInt(localStorage.getItem("tasks")) || 18)
    const tasksBtn = (which) => {
        if (which === "minus") {
            if (tasksNumber > 1) {
                setTasksNumber(tasksNumber => parseInt(tasksNumber) - 1)
                localStorage.setItem("tasks", parseInt(tasksNumber) - 1);
            }
        }
        if (which === "plus") {
            if (tasksNumber < 60) {
                setTasksNumber(tasksNumber => parseInt(tasksNumber) + 1)
                localStorage.setItem("tasks", parseInt(tasksNumber) + 1);
            }
        }
    }
    const tasksHandler = (e) => {
        if (!/^[0-9]*$/.test(e)) { return; }
        if (parseInt(e) > 40 || parseInt(e) < 1) {
            setTasksNumber('')
            return;
        }
        setTasksNumber(e)
    }

    const tasksBlur = () => {
        if (tasksNumber === '') {
            setTasksNumber(1);
            localStorage.setItem("tasks", parseInt(tasksNumber));
        }
    }
    return (
        <div className="tasks-leftbarcontent__top-filters-item" id={id}>
            <select name="item" className='tasks-leftbarcontent__top-filters-item__select'>
                <option className='tasks-leftbarcontent__top-filters-item__select-option' selected>1 задание</option>
                <option className='tasks-leftbarcontent__top-filters-item__select-option'>2 задание</option>
            </select>
            <div className="tasks-leftbarcontent__top-filters-item__floor2">
                <div className="tasks-leftbarcontent__top-filters-item__plusbtn-timer" onClick={onDeleteTasks}>
                    <span><AiOutlineClose size={15} /></span>
                </div>
                <div className="tasks-leftbarcontent__top-filters__maxtasks-btn__podtip">
                    <span className='tasks-leftbarcontent__top-filters__maxtasks-btn__minus' onClick={() => tasksBtn('minus')}><AiOutlineMinus size={20} /></span>
                    <input className='tasks-leftbarcontent__top-filters__maxtasks-btn__text' type="text" onChange={e => tasksHandler(e.target.value)} value={tasksNumber} onBlur={tasksBlur} />
                    <span className='tasks-leftbarcontent__top-filters__maxtasks-btn__plus' onClick={() => tasksBtn('plus')}><AiOutlinePlus size={20} /></span>
                </div>
            </div>
        </div>
    );
}

function FilterPodtip({ id, onDeletePodtip }) {
    const [podtipNumber, setPodtipNumber] = useState(parseInt(localStorage.getItem("podtip")) || 18)
    const podtipBtn = (which) => {
        if (which === "minus") {
            if (podtipNumber > 1) {
                setPodtipNumber(podtipNumber => parseInt(podtipNumber) - 1)
                localStorage.setItem("podtip", parseInt(podtipNumber) - 1);
            }
        }
        if (which === "plus") {
            if (podtipNumber < 60) {
                setPodtipNumber(podtipNumber => parseInt(podtipNumber) + 1)
                localStorage.setItem("podtip", parseInt(podtipNumber) + 1);
            }
        }
    }
    const podtipHandler = (e) => {
        if (!/^[0-9]*$/.test(e)) { return; }
        if (parseInt(e) > 40 || parseInt(e) < 1) {
            setPodtipNumber('')
            return;
        }
        setPodtipNumber(e)
    }

    const podtipBlur = () => {
        if (podtipNumber === '') {
            setPodtipNumber(1)
            localStorage.setItem("podtip", parseInt(podtipNumber));
        }
    }
    return (
        <div className="tasks-leftbarcontent__top-filters-item" id={id}>
            <select name="item" className='tasks-leftbarcontent__top-filters-item__select'>
                <option className='tasks-leftbarcontent__top-filters-item__select-option' selected>Треугольники</option>
                <option className='tasks-leftbarcontent__top-filters-item__select-option'>Квадраты</option>
            </select>
            <div className="tasks-leftbarcontent__top-filters-item__floor2">
                <div className="tasks-leftbarcontent__top-filters-item__plusbtn-timer" onClick={onDeletePodtip}>
                    <span><AiOutlineClose size={15} /></span>
                </div>
                <div className="tasks-leftbarcontent__top-filters__maxtasks-btn__podtip">
                    <span className='tasks-leftbarcontent__top-filters__maxtasks-btn__minus' onClick={() => podtipBtn('minus')}><AiOutlineMinus size={20} /></span>
                    <input className='tasks-leftbarcontent__top-filters__maxtasks-btn__text' type="text" onChange={e => podtipHandler(e.target.value)} value={podtipNumber} onBlur={podtipBlur} />
                    <span className='tasks-leftbarcontent__top-filters__maxtasks-btn__plus' onClick={() => podtipBtn('plus')}><AiOutlinePlus size={20} /></span>
                </div>
            </div>
        </div>
    );
}
// function FilterIstochnik({ id, onDeleteIst }) {
//     return (
//         <div className="tasks-leftbarcontent__top-filters-item__istochnik" id={id}>
//             <div className="tasks-leftbarcontent__top-filters-item__plusbtn-timer" onClick={onDeleteIst}>
//                 <span><AiOutlineClose size={15} /></span>
//             </div>
//             <select name="item" className='tasks-leftbarcontent__top-filters-item__istochnik-select'>
//                 <option className='tasks-leftbarcontent__top-filters-item__select-option' selected>fipi</option>
//                 <option className='tasks-leftbarcontent__top-filters-item__select-option'>1</option>
//                 <option className='tasks-leftbarcontent__top-filters-item__select-option'>2</option>
//             </select>
//         </div>
//     );
// }
//  
// function FilterDir({ id, onDeleteDir }) {
//     return (
//         <div className="tasks-leftbarcontent__top-filters-item__dir" id={id}>
//             <select name="item" className='tasks-leftbarcontent__top-filters-item__select-dir w100'>
//                 <option className='tasks-leftbarcontent__top-filters-item__select-option' selected>Экзамен</option>
//             </select>
//         </div>
//     )
// }

export const TasksFilters = ({ visibletext }) => {
    // const [maxVal, setMaxVal] = useState(parseInt(localStorage.getItem("maxTasks")) || 2)
    const [timerHours, setTimerHours] = useState(parseInt(localStorage.getItem("timerHours")) || 0)
    const [timerMinutes, setTimerMinutes] = useState(parseInt(localStorage.getItem("timerMinutes")) || 0)
    if (timerHours === 0 && timerMinutes === 0) {
        setTimerMinutes(0)
        setTimerHours(12)
    }

    const [timerHide, setTimerHide] = useToggle(false);
    const [timerIcon, setTimerIcon] = useToggle(true)

    // const [tasksMax, setTasksMax] = useState()

    // ДЛЯ ФИЛЬТРОВ
    const [filtersTasks, setFiltersTasks] = useState([]);
    const [filtersPodtip, setFiltersPodtip] = useState([]);
    const [filtersIst, setFiltersIst] = useState([]);
    const [filtersType, setFiltersType] = useState([]);
    const [filtersDir, setFiltersDir] = useState([]);
    const [dostover, setDostover] = useState(20);
    const [difficul, setDifficul] = useState(20);

    // ЛОГИКА ФИЛЬТРОВ ЗАДАНИЙ
    const handleAddTasks = () => {
        const id = nanoid();
        setFiltersTasks([...filtersPodtip, { id }]);
    };
    const handleDeleteTasks = (id) => {
        setFiltersTasks(filtersTasks.filter(task => task.id !== id));
    };
    // ЛОГИКА ФИЛЬТРОВ ПОДТИПА
    const handleAddPodtip = () => {
        const id = nanoid();
        setFiltersPodtip([...filtersPodtip, { id }]);
    };
    const handleDeletePodtip = (id) => {
        setFiltersPodtip(filtersPodtip.filter(filter => filter.id !== id));
    };
    // ЛОГИКА ФИЛЬТРОВ ИСТОЧНИКА
    const handleAddIst = () => {
        const id = nanoid();
        setFiltersIst([...filtersIst, { id }]);
    };
    const handleDeleteIst = (id) => {
        setFiltersIst(filtersIst.filter(filter => filter.id !== id));
    };

    // ЛОГИКА ДЛЯ ТИПОВ ЗАДАЧ
    const handleAddType = () => {
        const id = nanoid();
        setFiltersType([...filtersType, { id }]);
    };
    const handleDeleteType = (id) => {
        setFiltersType(filtersType.filter(filter => filter.id !== id));
    };

    // ЛОГИКА ДЛЯ НАПРАВЛЕНИЯ
    const handleAddDir = () => {
        const id = nanoid();
        setFiltersDir([...filtersDir, { id }]);
    };
    const handleDeleteDir = (id) => {
        setFiltersDir(filtersDir.filter(filter => filter.id !== id));
    };

    // ТАЙМЕР
    const timerBtnMinus = () => {
        if (timerMinutes === 1) { return; }
        if (timerHours > 3) {
            setTimerHours(timerHours => timerHours - 1)
            return;
        }
        if (timerHours < 2 && timerHours >= 0 && timerMinutes === 0) {
            setTimerHours(timerHours => timerHours - 1)
            setTimerMinutes(50)
            return;
        }
        if (timerMinutes <= 5 && timerHours === 0) {
            setTimerMinutes(timerMinutes => timerMinutes - 1)
            return;
        }
        if (timerHours === 0 && timerMinutes <= 30) {
            setTimerMinutes(timerMinutes => timerMinutes - 5)
            return;
        }
        if (timerHours === 3) {
            setTimerHours(2)
            setTimerMinutes(30)
            return;
        }
        if (timerHours === 2 && timerMinutes === 30) {
            setTimerMinutes(0)
            return;
        }
        if (timerHours === 2 && timerMinutes === 0) {
            setTimerHours(1)
            setTimerMinutes(50)
        }
        if (timerHours < 2) { setTimerMinutes(timerMinutes => timerMinutes - 10) }
    }
    const timerBtnPlus = () => {
        if (timerHours === 12) { return; }
        if (timerMinutes < 5 && timerHours === 0) { setTimerMinutes(timerMinutes => timerMinutes + 1) }
        if (timerMinutes >= 5 && timerMinutes < 30 && timerHours === 0) { setTimerMinutes(timerMinutes => timerMinutes + 5) }
        if (timerMinutes >= 30 && timerHours === 0) { setTimerMinutes(timerMinutes => timerMinutes + 10) }
        if (timerHours >= 1 && timerHours < 2) { setTimerMinutes(timerMinutes => timerMinutes + 10) }
        if (timerMinutes === 50 && timerHours < 2) {
            setTimerMinutes(0)
            setTimerHours(timerHours => timerHours + 1)
        }
        if (timerMinutes < 30 && timerHours === 2 && timerHours < 3) { setTimerMinutes(timerMinutes => timerMinutes + 30) }
        if (timerMinutes === 30 && timerHours === 2 && timerHours < 3) {
            setTimerMinutes(0)
            setTimerHours(3)
        }
        if (timerMinutes === 0 && timerHours >= 3) { setTimerHours(timerHours => timerHours + 1) }
    }

    useEffect(() => {
        localStorage.setItem("timerHours", timerHours);
        localStorage.setItem("timerMinutes", timerMinutes);
    }, [timerMinutes, timerHours])

    const timerDelete = () => {
        setTimerHide()
        setTimerIcon()
    }

    const deleteAllFilters = () => {
        setFiltersPodtip([])
        setFiltersIst([])
        setFiltersType([])
        setFiltersDir([])
        timerDelete()
    }
    const deleteFilters = () => { deleteAllFilters() }

    const dostoverInput = (e) => {
        setDostover(e.target.value)
    }

    const difficultyInput = (e) => {
        setDifficul(e.target.value)
    }

    return (
        <div className="tasks-leftbarcontent__top">
            <div className="tasks-leftbarcontent__clear-btn" onClick={deleteFilters}>
                <span>Очистить поиск</span>
                <div className='tasks-leftbarcontent__tag-close'><MdClose size={17} /></div>
            </div>
            <div className="tasks-leftbarcontent__title">
                <span className='tasks-leftbarcontent__titlea'>фильтры:</span>
            </div>
            {visibletext ? <></> :
                <>
                    <div className="tasks-leftbarcontent__top-filters">
                        {/* ПРЕДМЕТ */}
                        <div className="tasks-leftbarcontent__top-filters-item">
                            <span className='tasks-leftbarcontent__top-filters__title default-filter-text'>Предмет:</span>
                            <select name="item" className='tasks-leftbarcontent__top-filters-item__select'>
                                <option className='tasks-leftbarcontent__top-filters-item__select-option' selected>Математика</option>
                                <option className='tasks-leftbarcontent__top-filters-item__select-option'>Геометрия</option>
                            </select>
                        </div>
                        {/* НАПРАВЛЕНИЕ */}
                        <span className='tasks-leftbarcontent__top-filters__title default-filter-text'>Направление:</span>
                        <div className="tasks-leftbarcontent__top-filters-item__dir">
                            <select name="item" className='tasks-leftbarcontent__top-filters-item__select-dir w100'>
                                <option className='tasks-leftbarcontent__top-filters-item__select-option' selected>Экзамен</option>
                            </select>
                        </div>
                        {/* {filtersDir.map(({ id }) => (
                            <FilterDir key={id} id={id} onDeleteDir={() => handleDeleteDir(id)} />
                        ))}
                        <div className="tasks-leftbarcontent__top-filters-item__plusbtn-dir" onClick={handleAddDir}>
                            <AiOutlinePlus size={15} />
                        </div> */}
                        {/* ТИП ЗАДАЧИ */}
                        <span className='tasks-leftbarcontent__top-filters__title default-filter-text'>Тип задачи:</span>
                        <div className="tasks-leftbarcontent__top-filters-item__type">
                            <select name="item" className='tasks-leftbarcontent__top-filters-item__select-type'>
                                <option className='tasks-leftbarcontent__top-filters-item__select-option' selected>ЕГЭ</option>
                                <option className='tasks-leftbarcontent__top-filters-item__select-option'>ОГЭ</option>
                                <option className='tasks-leftbarcontent__top-filters-item__select-option'>ВПР</option>
                            </select>
                        </div>
                        {/* ДОСТОВЕРНОСТЬ */}
                        <span className='tasks-leftbarcontent__top-filters__title default-filter-text'>Достоверность:</span>
                        <div className="dostover">
                            <div className='w100 df aic'>
                            <input onChange={(e) => dostoverInput(e)} id="dostoverRange" type="range" min="0" max="100" step="1" value={dostover} />
                            </div>
                        </div>
                        {/* СЛОЖНОСТЬ */}
                        <span className='tasks-leftbarcontent__top-filters__title default-filter-text'>Сложность:</span>
                        <div className="difficulty">
                            <div className='w100 df aic'>
                            <input onChange={(e) => difficultyInput(e)} id="difficultyRange" type="range" min="0" max="100" step="1" value={difficul} />
                            </div>
                        </div>
                        {/* {filtersType.map(({ id }) => (
                            <FilterType key={id} id={id} onDeleteType={() => handleDeleteType(id)} />
                        ))}
                        <div className="tasks-leftbarcontent__top-filters-item__plusbtn-type" onClick={handleAddType}>
                            <AiOutlinePlus size={15} />
                        </div> */}
                        {/* ИСТОЧНИК */}
                        {/* <span className='tasks-leftbarcontent__top-filters__title default-filter-text'>Источник:</span>
                        {filtersIst.map(({ id }) => (
                            <FilterIstochnik key={id} id={id} onDeleteIst={() => handleDeleteIst(id)} />
                        ))}
                        <div className="tasks-leftbarcontent__top-filters-item__istochnik-plusbtn" onClick={handleAddIst}>
                            <AiOutlinePlus size={15} />
                        </div> */}
                        {/* ЗАДАНИЯ */}
                        <span className='tasks-leftbarcontent__top-filters__title default-filter-text'>Задания:</span>
                        {filtersTasks.map(({ id }) => (
                            <FilterTasks key={id} id={id} onDeleteTasks={() => handleDeleteTasks(id)} />
                        ))}
                        <div className="tasks-leftbarcontent__top-filters-item__plusbtn-podtip" onClick={handleAddTasks}>
                            <AiOutlinePlus size={15} />
                        </div>
                        {/* ПОДТИП */}
                        <span className='tasks-leftbarcontent__top-filters__title default-filter-text'>Подтип:</span>
                        {filtersPodtip.map(({ id }) => (
                            <FilterPodtip key={id} id={id} onDeletePodtip={() => handleDeletePodtip(id)} />
                        ))}
                        <div className="tasks-leftbarcontent__top-filters-item__plusbtn-podtip" onClick={handleAddPodtip}>
                            <AiOutlinePlus size={15} />
                        </div>
                        {/* ТАЙМЕР */}
                        <div className="tasks-leftbarcontent__top-filters-item">
                            <span className='tasks-leftbarcontent__top-filters__title default-filter-text'>Таймер</span>
                            <div className="tasks-leftbarcontent__top-filters-item__timer-wrap">
                                <div className="tasks-leftbarcontent__top-filters-item__plusbtn-timer" onClick={timerDelete}>
                                    {timerIcon ? <span><AiOutlineClose size={15} /></span> : <span><AiOutlinePlus size={15} /></span>}
                                </div>
                                <div className={`tasks-leftbarcontent__top-filters__maxtasks-btn__timerdiv ${timerHide ? "tasks-timerhide" : ""}`}>
                                    <span className='tasks-leftbarcontent__top-filters__maxtasks-btn__minus' onClick={timerBtnMinus}><AiOutlineMinus size={20} /></span>
                                    <span className='tasks-leftbarcontent__top-filters__timer-text'>{`${timerHours === 0 ? "" : `${timerHours}ч`} ${timerMinutes === 0 ? "" : `${timerMinutes}м`}`}</span>
                                    <span className='tasks-leftbarcontent__top-filters__maxtasks-btn__plus' onClick={timerBtnPlus}><AiOutlinePlus size={20} /></span>
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            }
        </div>
    )
}