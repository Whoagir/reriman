import React, { useState, useEffect } from 'react';
import { Link, Routes, Route } from 'react-router-dom';
import './tasks.scss'
import axios from 'axios';
import mylogo from '../../pages/main-page/images/logo.jpg';
import tasksDark from '../../pages/main-page/images/bg2.png'
import tasksLight from './images/tasksLight.png'

// COMPONENTS
import { useTheme } from '../../hooks/usetheme';
import { Pagination, createTheme, ThemeProvider } from '@mui/material';
import { TasksList } from './Components/tasksList';
import { TasksFilters } from './Components/tasksFilters';
import { GenerateTasks } from './Components/generateTasks';
import { Statistics } from '../statistics/statistics'

// ICONS
import { FiCopy, } from 'react-icons/fi'
import { BiExport, } from 'react-icons/bi'
import { HiOutlinePrinter, } from 'react-icons/hi'
import { CiLight, CiDark, } from 'react-icons/ci'
import { AiOutlineMinus, AiOutlinePlus } from 'react-icons/ai';

const theme = createTheme({
    components: {
        MuiPaginationItem: {
            styleOverrides: {
                root: {
                    '&': {
                        transition: '.3s ease-in-out',
                        color: 'white',
                        border: '1px solid white'
                    },
                    '&.MuiPaginationItem-ellipsis': {
                        border: 'none'
                    },
                    '&.Mui-selected': {
                        backgroundColor: 'white',
                        color: 'black',
                    },
                    '&.Mui-selected:hover': {
                        backgroundColor: 'white',
                        color: 'black',
                        transform: 'scale(1.08)',
                    },
                    '&.MuiPaginationItem-previousNext:hover': {
                        transform: 'scale(1.08)',
                    }
                },
            },
        },
    },
});

export const Tasks = () => {
    const { setTheme } = useTheme();

    const [bg, setBg] = useState(true)
    const [tasksPerPage, setTasksPerPage] = useState(parseInt(localStorage.getItem("maxTasks")) || 2)
    const [maxVal, setMaxVal] = useState(parseInt(localStorage.getItem("maxTasks")) || 2)
    const [currentPage, setCurrentPage] = useState(1)
    const [tasks, setTasks] = useState([]);

    const [tasksClick, setTasksClick] = useState(false)
    const [statClick, setStatClick] = useState(false)

    const [showgeneration, setShowgeneration] = useState(true);
    const [visibletext, setVisibletext] = useState(false);

    const updTest = () => { setTasksPerPage(parseInt(localStorage.getItem("maxTasks")) || 2) }
    useEffect(() => {
        const getTasks = async () => {
            const maxValue = localStorage.getItem("maxTasks" || 2);
            if (maxValue === null) { localStorage.setItem("maxTasks", 2); }
            const res = await axios.get('http://178.21.8.81/api/tasks/');
            const updatedTasks = await Promise.all(res.data.map(async (task) => {
                task.text = res.data.indexOf(task) + 1;
                const editedImage = new Image();
                editedImage.crossOrigin = 'anonymous';
                if (task.image) {
                    editedImage.src = task.image;
                } else {
                    task.image = "http://178.21.8.81/media/tasks_images/9a989fec-174c-4f61-8673-ed563b65c528/Screenshot_9.png";
                    task.error = true;
                    editedImage.src = task.image;
                }
                const canvas = document.createElement('canvas');
                const ctx = canvas.getContext('2d');
                const loadImage = new Promise((resolve, reject) => {
                    editedImage.onload = () => {
                        canvas.width = editedImage.width;
                        canvas.height = editedImage.height;
                        ctx.clearRect(0, 0, canvas.width, canvas.height);
                        ctx.drawImage(editedImage, 0, 0, canvas.width, canvas.height);
                        const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
                        const data = imgData.data;
                        for (let j = 0; j < data.length; j += 4) {
                            const r = data[j];
                            const g = data[j + 1];
                            const b = data[j + 2];
                            const brightness = (3 * r + 4 * g + b) >>> 3;
                            if (brightness < 128) {
                                data[j] = 220; // белый цвет
                                data[j + 1] = 220;
                                data[j + 2] = 220;
                                data[j + 3] = 255;
                            } else {
                                data[j + 3] = 0; // прозрачный цвет
                            }
                        }
                        ctx.putImageData(imgData, 0, 0);
                        task.image = canvas.toDataURL();
                        resolve(task);
                    };
                    editedImage.onerror = () => {
                        reject(new Error('Failed to load image.'));
                    };
                });
                return loadImage;
            }));
            setTasks(updatedTasks);
        };
        getTasks();
        window.addEventListener('storageUpdated', updTest);
        return () => {
            window.removeEventListener('storageUpdated', updTest);
        };
    }, []);

    const copyHandler = () => {
        navigator.clipboard.writeText('Просто что то')
    }

    const lastTasksIndex = currentPage * tasksPerPage
    const firstTasksIndex = lastTasksIndex - tasksPerPage
    const currentTasks = tasks.slice(firstTasksIndex, lastTasksIndex);

    const paginate = pageNumbers => {
        setCurrentPage(pageNumbers || 1);
        console.log(currentTasks)
    };

    const maxTasks = (which) => {
        if (which === "minus") {
            if (maxVal > 1) {
                setMaxVal(maxVal => parseInt(maxVal) - 1)
                localStorage.setItem("maxTasks", parseInt(maxVal) - 1);
                window.dispatchEvent(new Event('storageUpdated'))
            }
        }
        if (which === "plus") {
            if (maxVal < 40) {
                setMaxVal(maxVal => parseInt(maxVal) + 1)
                localStorage.setItem("maxTasks", parseInt(maxVal) + 1);
                window.dispatchEvent(new Event('storageUpdated'))
            }
        }
    }

    const tasksHandler = (e) => {
        if (!/^[0-9]*$/.test(e)) { return; }
        if (parseInt(e) > 40 || parseInt(e) < 1) {
            setMaxVal('')
            return;
        }
        setMaxVal(e)
    }

    const blurHandler = () => {
        if (maxVal === '') {
            setMaxVal(1)
            localStorage.setItem("maxTasks", parseInt(maxVal));
        }
        window.dispatchEvent(new Event('storageUpdated'))
    }

    useEffect(() => {
        const url = window.location.href
        if (url.indexOf('statistics') === -1) { setTasksClick(true) }
        if (url.indexOf('statistics') === 28) { setStatClick(true) }
        const dark = document.querySelector(".tasksdark");
        const light = document.querySelector(".taskslight");
        const currentTheme = localStorage.getItem("app-theme")
        if (currentTheme === "light") {
            light.classList.toggle("themeico-hide");
            dark.classList.toggle("themeico-hide");
            setBg(false)
        }
    }, [])

    const themeBtn = (val) => {
        const dark = document.querySelector(".tasksdark");
        const light = document.querySelector(".taskslight");
        dark.classList.toggle("themeico-hide");
        light.classList.toggle("themeico-hide");
        if (val === "dark") {
            setTheme('dark')
            setBg(true)
        } else {
            setTheme('light')
            setBg(false)
        }
    }

    const taskBtn = () => {
        setStatClick(false)
        setTasksClick(true)
    }

    const statisticBtn = () => {
        setTasksClick(false)
        setStatClick(true)
    }

    const hideLeft = () => {
        setVisibletext(!visibletext)
    }

    const burgerHandler = () => {
        const burgerMenu = document.querySelector('.burger-menu');
        const menu = document.querySelector('.menu');
        menu.classList.toggle('show');
        burgerMenu.classList.toggle('open')
    }

    useEffect(() => {
        setMaxVal(`${maxVal}`)
    }, [maxVal])

    return (
        <>
            <img className='tasks-background' src={bg ? tasksDark : tasksLight} alt="background of tasks-page" />
            <div className="tasks">
                <div className="tasksblur">
                    <div className="taskscontainer">
                        <div className="tasks__top">
                            <div className="tasks__top-leftside">
                                <div className="tasks-leftbar__logo">
                                    <img src={mylogo} alt="#" className='tasks-leftbar__logoimage' />
                                </div>
                                <div className="tasks-rightbar__list">
                                    <ol className='tasks-rightbar__listol'>
                                        <Link onClick={taskBtn} className="tasks-rightbar__navlinkli" to={tasksClick ? null : "/tasks"}>
                                            <li className={tasksClick ? 'tasks-rightbar__listli tasks-rightbar__listli-tasks tasks-selected' : 'tasks-rightbar__listli tasks-rightbar__listli-tasks'}>Задачи</li>
                                        </Link>
                                        <Link
                                            onClick={statisticBtn}
                                            className="tasks-rightbar__navlinkli"
                                            to={statClick ? null : "/tasks/statistics"}>
                                            <li className={statClick ? 'tasks-rightbar__listli tasks-rightbar__listli-statistics stat-selected' : 'tasks-rightbar__listli tasks-rightbar__listli-statistics'}>Статистика</li>
                                        </Link>
                                    </ol>
                                </div>
                            </div>
                            <div class="menu-container">
                                <div class="burger-menu" onClick={() => burgerHandler()}>
                                    <div class="bar"></div>
                                    <div class="bar"></div>
                                    <div class="bar"></div>
                                </div>
                                <div class="menu">
                                    <div className="menu-list df fdc w100">
                                        <Link onClick={taskBtn} to={tasksClick ? null : "/tasks"}>
                                            <p className={tasksClick ? 'menu-selected' : ''}>Задачи</p>
                                        </Link>
                                        <Link onClick={statisticBtn} to={statClick ? null : "/tasks/statistics"}>
                                            <p className={statClick ? 'menu-selected' : ''}>Статистика</p>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                            <div className="tasks-rightbar__list-theme">
                                <CiLight onClick={() => themeBtn("light")} className='tasks-rightbar__list-theme__ico taskslight' size={25} />
                                <CiDark onClick={() => themeBtn("dark")} className='tasks-rightbar__list-theme__ico tasksdark themeico-hide' size={25} />
                                <div className='tasks-rightbar__list-theme__padding'></div>
                            </div>
                        </div>
                        <Routes>
                            <Route path="/" element={
                                <div className="tasks__bars">
                                    <div className="tasks-leftbar">
                                        <div className="tasks-leftbar-wrap">
                                            <div className="tasks-leftbarcontent">
                                                <div className="tasks-leftbarcontent-wrap">
                                                    <TasksFilters setShowgeneration={setShowgeneration} visibletext={visibletext} />
                                                    {visibletext ? <></> :
                                                        <div className="tasks-leftbarcontent__inp">
                                                            <div className="tasks-leftbarcontent__inp1" onClick={copyHandler}>
                                                                <div className='tasks-leftbarcontent__inp-id tasks-inp__remove'><p>ID варианта</p></div>
                                                                <div className="tasks-ico__div">
                                                                    <FiCopy size={16.5} />
                                                                </div>
                                                            </div>
                                                            <div className="tasks-leftbarcontent__inp1">
                                                                <div className='tasks-leftbarcontent__inp-export tasks-inp__remove'><p>
                                                                    Экспорт в PDF</p></div>
                                                                <div className="tasks-ico__div">
                                                                    <BiExport className='tasks-export' size={17.3} />
                                                                </div>
                                                            </div>
                                                            <div className="tasks-leftbarcontent__inp1">
                                                                <div className='tasks-leftbarcontent__inp-scan tasks-inp__remove'><p>Печать</p></div>
                                                                <div className="tasks-ico__div">
                                                                    <HiOutlinePrinter size={18} />
                                                                </div>
                                                            </div>
                                                        </div>
                                                    }
                                                </div>
                                            </div>
                                        </div>
                                        <div className="tasks-leftbar-visible w100 df jcc">
                                            <div onClick={() => hideLeft()}>
                                                <p className='tac'>{visibletext ? 'показать' : 'скрыть'}</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="tasks-rightbar">
                                        <div className="tasks-rightbar__navbar">
                                            <input className="tasks-rightbar__navbar-search tasks-inp" placeholder='id задания или варианта' />
                                            <div className="tasks-leftbarcontent__top-filters__maxtasks">
                                                <div className="tasks-leftbarcontent__top-filters__maxtasks-btn">
                                                    <span className='tasks-leftbarcontent__top-filters__maxtasks-btn__minus' onClick={() => maxTasks("minus")}>
                                                        <AiOutlineMinus size={20} />
                                                    </span>
                                                    <input className='tasks-leftbarcontent__top-filters__maxtasks-btn__text' type="text" onChange={e => tasksHandler(e.target.value)} value={maxVal} onBlur={blurHandler} />
                                                    <span className='tasks-leftbarcontent__top-filters__maxtasks-btn__plus' onClick={() => maxTasks("plus")}>
                                                        <AiOutlinePlus size={20} />
                                                    </span>
                                                </div>
                                            </div>
                                            <input className="tasks-rightbar__navbar-variant tasks-inp" placeholder='свой вариант' />
                                        </div>
                                        <div className="tasks-rightbar__router-tasks">
                                            {showgeneration ?
                                                <GenerateTasks setShowgeneration={setShowgeneration}/>
                                                :
                                                <>
                                                    <div className="tasks-rightbar__pages">
                                                        <ThemeProvider theme={theme}>
                                                            <Pagination
                                                                count={Math.ceil(tasks.length / tasksPerPage)}
                                                                onChange={(_, num) => paginate(num)}
                                                                classes=''
                                                            />
                                                        </ThemeProvider>
                                                    </div>
                                                    {currentTasks.map((arr, ind) => <TasksList pagitasks={arr} key={ind} />)}
                                                </>
                                            }
                                        </div>
                                    </div>
                                </div>
                            } />
                            <Route path="statistics/*" element={<Statistics />} />
                        </Routes>
                    </div>
                </div>
            </div>
        </>
    )
}