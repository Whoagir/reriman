import React, { useState } from 'react';
import { AiOutlinePlus, AiOutlineClose, AiOutlineMinus } from 'react-icons/ai';
import { nanoid } from 'nanoid';

function FilterItem({ id, onDeletePodtip }) {
    const [podtipNumber, setPodtipNumber] = useState(parseInt(localStorage.getItem("podtip")) || 18)
    const podtipBtn = (which) => {
        if (which === "minus") {
            if (podtipNumber > 1) {
                setPodtipNumber(podtipNumber => podtipNumber - 1)
                localStorage.setItem("podtip", podtipNumber - 1);
            }
        }
        if (which === "plus") {
            if (podtipNumber < 60) {
                setPodtipNumber(podtipNumber => podtipNumber + 1)
                localStorage.setItem("podtip", podtipNumber + 1);
            }
        }
    }
    return (
        <div className="tasks-leftbarcontent__top-filters-item">
            <div className="tasks-leftbarcontent__top-filters-item__podtip">
                <select name="item" className='tasks-leftbarcontent__top-filters-item__select'>
                    <option className='tasks-leftbarcontent__top-filters-item__select-option' selected>1 задание</option>
                    <option className='tasks-leftbarcontent__top-filters-item__select-option'>2 задание</option>
                </select>
                <div className="tasks-leftbarcontent__top-filters-item__floor2">
                    <div className="tasks-leftbarcontent__top-filters-item__plusbtn-timer" onClick={onDeletePodtip}>
                        <span><AiOutlineClose size={15} /></span>
                    </div>
                    <div className="tasks-leftbarcontent__top-filters__maxtasks-btn__podtip">
                        <span className='tasks-leftbarcontent__top-filters__maxtasks-btn__minus' onClick={() => podtipBtn('minus')}><AiOutlineMinus size={20} /></span>
                        <span className='tasks-leftbarcontent__top-filters__maxtasks-btn__text'>{podtipNumber}</span>
                        <span className='tasks-leftbarcontent__top-filters__maxtasks-btn__plus' onClick={() => podtipBtn('plus')}><AiOutlinePlus size={20} /></span>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default function PodtipMenu() {
    const [filters, setFilters] = useState([]);

    const handleAddFilter = () => {
        const id = nanoid(); // Создание уникального идентификатора
        setFilters([...filters, { id }]);
    };

    const handleDeleteFilter = (id) => {
        setFilters(filters.filter(filter => filter.id !== id));
    };

    return (
        <div>
            {filters.map(({ id }) => (
                <FilterItem key={id} id={id} onDeletePodtip={() => handleDeleteFilter(id)} />
            ))}
            <div className="tasks-leftbarcontent__top-filters-item__plusbtn-podtip" onClick={handleAddFilter}>
                <AiOutlinePlus size={15} />
            </div>
        </div>
    );
}