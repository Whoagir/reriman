// import React from 'react'
// import axios from 'axios';
// import { useState, useEffect } from 'react'
// import { TasksList } from '../tasks/Components/tasksList';
// import { Pagination } from '@mui/material';

// export const Paginator = () => {
//     const [tasksPerPage, setTasksPerPage] = useState(2)
//     const [tasks, setTasks] = useState([])
//     const [currentPage, setCurrentPage] = useState(1)
//     const [loading, setLoading] = useState(false);

//     const [editedImages, setEditedImages] = useState([]);

//     useEffect(() => {
//         const getTasks = async () => {
//             const maxValue = localStorage.getItem("maxTasks" || 2)
//             if (maxValue === null) {
//                 localStorage.setItem("maxTasks", 2)
//             }
//             setTasksPerPage(maxValue)
//             const res = await axios.get('http://178.21.8.81/api/tasks/')
//             setTasks(res.data)
//         }
//         getTasks()
//         window.addEventListener('storageUpdated', updTest)
//         return () => {
//             window.removeEventListener('storageUpdated', updTest)
//         }
//     }, [])

//     const updTest = () => {
//         setTasksPerPage(parseInt(localStorage.getItem("maxTasks" || 2)))
//     }

//     const handleColorChange = () => {
//         const imgdiv = document.querySelector(".tasks-rightbar__navbar-tasks__imagediv")
//         imgdiv.classList.add("noneimage")
//         const classArray = [];
//         for (let i = 1; i < tasks.length + 1; i++) {
//             classArray.push(`tasks-rightbar__navbar-tasks__image${i}`)
//         }
//         setLoading(true)

//         tasks.map((arr, ind) => {
//             const editedImage = new Image();
//             editedImage.crossOrigin = 'anonymous';
//             editedImage.src = arr.image;
//             const canvas = document.createElement('canvas');
//             const ctx = canvas.getContext('2d');
//             editedImage.onload = () => {
//                 canvas.width = editedImage.width;
//                 canvas.height = editedImage.height;
//                 ctx.clearRect(0, 0, canvas.width, canvas.height);
//                 ctx.drawImage(editedImage, 0, 0, canvas.width, canvas.height);
//                 const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
//                 const data = imgData.data;
//                 for (let i = 0; i < data.length; i += 4) {
//                     const r = data[i];
//                     const g = data[i + 1];
//                     const b = data[i + 2];
//                     if (r === 255 && g === 255 && b === 255) {
//                         data[i + 3] = 0; // прозрачный цвет
//                     } else if (r === 0 && g === 0 && b === 0) {
//                         data[i] = 255; // белый цвет
//                         data[i + 1] = 255;
//                         data[i + 2] = 255;
//                     }
//                 }
//                 ctx.putImageData(imgData, 0, 0);
//                 const editedImageUrl = canvas.toDataURL();
//                 const img = document.querySelector(`.tasks-rightbar__navbar-tasks__image${ind + 1}`)
//                 img.src = editedImageUrl
//                 setTimeout(() => {
//                     setLoading(false)
//                     imgdiv.classList.remove("noneimage")
//                 }, 400)
//                 setEditedImages([...editedImages, editedImageUrl]);
//             };
//             return classArray;
//         })
//     };
    
//     const lastTasksIndex = currentPage * tasksPerPage
//     const firstTasksIndex = lastTasksIndex - tasksPerPage
//     const currentTasks = tasks.slice(firstTasksIndex, lastTasksIndex)

//     const paginate = pageNumbers => {
//         setCurrentPage(pageNumbers || 1)
//         const currentTheme = localStorage.getItem("app-theme")
//         if (currentTheme==="dark") {handleColorChange()}
//         if (currentTheme==="light") {handleColorChange()}
//     }

//     return (
//         <>
//             <div className="tasks-rightbar__pages">
//                 <Pagination
//                     count={Math.ceil(tasks.length / tasksPerPage)}
//                     onChange={(_, num) => paginate(num)}
//                 />
//             </div>
//             {currentTasks.map((arr, ind) => <TasksList pagitasks={arr} loading={loading} key={ind} />)}
//         </>
//     )
// }

