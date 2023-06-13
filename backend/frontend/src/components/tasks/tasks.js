import React, { useState, useEffect } from 'react';
import { Link, Routes, Route } from 'react-router-dom';
import { nanoid } from 'nanoid';
import './tasks.css'
import axios from 'axios';
import mylogo from '../../pages/main-page/images/logo.jpg';
import tasksDark from '../../pages/main-page/images/bg2.png'
import tasksLight from './images/tasksLight.png'

// COMPONENTS
import { useTheme } from '../../hooks/usetheme';
import { TasksList } from '../tasks/Components/tasksList';
import { Pagination } from '@mui/material';
import { TasksFilters } from './Components/tasksFilters';

// ICONS
import { FiCopy, } from 'react-icons/fi'
import { BiExport, } from 'react-icons/bi'
import { HiOutlinePrinter, } from 'react-icons/hi'
import { CiLight, CiDark, } from 'react-icons/ci'

export const Tasks = () => {
    const { setTheme } = useTheme();

    const [onload, setOnLoad] = useState(true)
    const [bg, setBg] = useState(true)
    const [loading, setLoading] = useState(false);
    const [hide, setHide] = useState(false);
    const [isCopy, setIsCopy] = useState(false);
    const [tasksPerPage, setTasksPerPage] = useState(2)
    const [currentPage, setCurrentPage] = useState(1)
    const [tasks, setTasks] = useState([])

    const [tasksClick, setTasksClick] = useState(false)
    const [statClick, setStatClick] = useState(false)

    const handleColorChange = () => {
        setHide(true);
        setOnLoad(false);
        setLoading(true);
        for (let i = 0; i < tasks.length; i++) {
            const arr = tasks[i];
            const editedImage = new Image();
            editedImage.crossOrigin = 'anonymous';
            if (arr.image) {
                editedImage.src = arr.image;
            } else {
                arr.image = "http://178.21.8.81/media/tasks_images/9a989fec-174c-4f61-8673-ed563b65c528/Screenshot_9.png";
                arr.error = true;
                editedImage.src = arr.image;
            }
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');
            editedImage.onload = () => {
                canvas.width = editedImage.width;
                canvas.height = editedImage.height;
                ctx.clearRect(0, 0, canvas.width, canvas.height);
                ctx.drawImage(editedImage, 0, 0, canvas.width, canvas.height);
                const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
                const data = imgData.data;
                for (let i = 0; i < data.length; i += 4) {
                    const r = data[i];
                    const g = data[i + 1];
                    const b = data[i + 2];
                    const brightness = (3 * r + 4 * g + b) >>> 3;
                    if (brightness < 128) {
                        data[i] = 220; // белый цвет
                        data[i + 1] = 220;
                        data[i + 2] = 220;
                        data[i + 3] = 255;
                    } else {
                        data[i + 3] = 0; // прозрачный цвет
                    }
                }
                ctx.putImageData(imgData, 0, 0);
                const editedImageUrl = canvas.toDataURL();
                const img = document.querySelector(`.tasks-rightbar__navbar-tasks__image${arr.random}`);
                if (img) {
                    img.src = editedImageUrl;
                }
                setTimeout(() => {
                    setLoading(false);
                    setHide(false);
                }, 400);
            };
        }
    };

    const updTest = () => { setTasksPerPage(parseInt(localStorage.getItem("maxTasks" || 2))) }
    useEffect(() => {
        const getTasks = async () => {
            const maxValue = localStorage.getItem("maxTasks" || 2);
            if (maxValue === null) {
                localStorage.setItem("maxTasks", 2);
            }
            setTasksPerPage(maxValue);
            const res = await axios.get('http://178.21.8.81/api/tasks/');
            for (let i = 0; i < res.data.length; i++) {
                const key4 = nanoid(4)
                res.data[i].random = key4;
                res.data[i].text = i + 1;
            }
            setTasks(res.data);
        };
        getTasks();
        window.addEventListener('storageUpdated', updTest);
        return () => {
            window.removeEventListener('storageUpdated', updTest);
        };
    }, []);
    const copyHandler = () => {
        navigator.clipboard.writeText('Прочитал = гей')
        setIsCopy(true)
        setTimeout(() => {
            setIsCopy(false)
        }, 2000)
    }

    const lastTasksIndex = currentPage * tasksPerPage
    const firstTasksIndex = lastTasksIndex - tasksPerPage
    const currentTasks = tasks.slice(firstTasksIndex, lastTasksIndex);

    const paginate = pageNumbers => {
        setCurrentPage(pageNumbers || 1);
        console.log(currentTasks)
        handleColorChange()
    };

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

    return (
        <>
            <img className='tasks-background' src={bg ? tasksDark : tasksLight} alt="background of tasks-page" />
            <div className="tasks">
                <div className="tasksblur">
                    <div className="taskscontainer">
                        <div className="tasks-leftbar">
                            <div className="tasks-leftbar-wrap">
                                <div className="tasks-leftbar__logo">
                                    <img src={mylogo} alt="#" className='tasks-leftbar__logoimage' />
                                </div>
                                <div className="tasks-leftbarcontent">
                                    <div className="tasks-leftbarcontent-wrap">
                                        <TasksFilters handleColorChange={handleColorChange} current={currentTasks} />
                                        {/* <div className="tasks-leftbarcontent__tags">
                                            <TagsUpdate />
                                        </div> использовать это когда будешь делать черновик */}
                                        <div className="tasks-leftbarcontent__copyed-div">
                                            {(isCopy && true) && <div className='tasks-leftbarcontent__copyed'><span>Скопировано!</span></div>}
                                        </div>
                                        <div className="tasks-leftbarcontent__inp">
                                            <div className="tasks-leftbarcontent__inp1" onClick={copyHandler}>
                                                <div className='tasks-leftbarcontent__inp-id tasks-inp__remove'>ID варианта</div>
                                                <div className="tasks-ico__div">
                                                    <FiCopy size={16.5} />
                                                </div>
                                            </div>
                                            <div className="tasks-leftbarcontent__inp1">
                                                <div className='tasks-leftbarcontent__inp-export tasks-inp__remove'>Экспорт в PDF</div>
                                                <div className="tasks-ico__div">
                                                    <BiExport className='tasks-export' size={17.3} />
                                                </div>
                                            </div>
                                            <div className="tasks-leftbarcontent__inp1">
                                                <div className='tasks-leftbarcontent__inp-scan tasks-inp__remove'>Печать</div>
                                                <div className="tasks-ico__div">
                                                    <HiOutlinePrinter size={18} />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="tasks-rightbar">
                            <div className="tasks-rightbar__list">
                                <ol className='tasks-rightbar__listol'>
                                    <Link onClick={taskBtn} className="tasks-rightbar__navlinkli" to="/tasks">
                                        <li className={tasksClick ? 'tasks-rightbar__listli tasks-rightbar__listli-tasks tasks-selected' : 'tasks-rightbar__listli tasks-rightbar__listli-tasks'}>Задачи</li>
                                    </Link>
                                    <Link onClick={statisticBtn} className="tasks-rightbar__navlinkli" to="./statistics">
                                        <li className={statClick ? 'tasks-rightbar__listli tasks-rightbar__listli-statistics stat-selected' : 'tasks-rightbar__listli tasks-rightbar__listli-statistics'}>Статистика</li>
                                    </Link>
                                </ol>
                                <div className="tasks-rightbar__list-theme">
                                    <CiLight onClick={() => themeBtn("light")} className='tasks-rightbar__list-theme__ico taskslight' size={25} />
                                    <CiDark onClick={() => themeBtn("dark")} className='tasks-rightbar__list-theme__ico tasksdark themeico-hide' size={25} />
                                    <div className='tasks-rightbar__list-theme__padding'></div>
                                </div>
                            </div>
                            <div className="tasks-rightbar__navbar">
                                <input className="tasks-rightbar__navbar-search tasks-inp" placeholder='id задания или варианта' />
                                <input className="tasks-rightbar__navbar-variant tasks-inp" placeholder='свой вариант' />
                            </div>
                            <Routes>
                                <Route path="/" element={
                                    <div className="tasks-rightbar__router-tasks">
                                        <div className="tasks-rightbar__pages">
                                            <Pagination
                                                count={Math.ceil(tasks.length / tasksPerPage)}
                                                onChange={(_, num) => paginate(num)}
                                            />
                                        </div>
                                        {currentTasks.map((arr, ind) => <TasksList pagitasks={arr} loading={loading} hide={hide} onload={onload} refresh={handleColorChange} key={ind} />)}
                                    </div>
                                } />
                                <Route path="/statistics" element={
                                    <h1>Нутипа типа, я лучше всех)</h1>
                                } />
                            </Routes>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}