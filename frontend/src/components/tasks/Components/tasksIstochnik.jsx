import React, { useState } from 'react';
import { AiOutlinePlus, AiOutlineClose } from 'react-icons/ai';
import { nanoid } from 'nanoid';

function FilterItem({ id, onDelete }) {
    return (
        <div className="tasks-leftbarcontent__top-filters-item__istochnik" id={id}>
            <div className="tasks-leftbarcontent__top-filters-item__plusbtn-timer" onClick={onDelete}>
                <span><AiOutlineClose size={15} /></span>
            </div>
            <select name="item" className='tasks-leftbarcontent__top-filters-item__istochnik-select'>
                <option className='tasks-leftbarcontent__top-filters-item__select-option' selected>fipi</option>
                <option className='tasks-leftbarcontent__top-filters-item__select-option'>1</option>
                <option className='tasks-leftbarcontent__top-filters-item__select-option'>2</option>
            </select>
        </div>
    );
}

export default function FilterBar() {
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
                <FilterItem key={id} id={id} onDelete={() => handleDeleteFilter(id)} />
            ))}
            <div className="tasks-leftbarcontent__top-filters-item__istochnik-plusbtn" onClick={handleAddFilter}>
                <AiOutlinePlus size={15} />
            </div>
        </div>
    );
}
