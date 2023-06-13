import React from 'react'
import { MdClose } from 'react-icons/md'

const TasksTags = ({
    id,
    text,
    deleteTag
}) => {
    return (
        <div className={`tasks-leftbarcontent__tag tasks-leftbarcontent__tag${id}`}>
            <div className="tasks-leftbarcontent__tagmain">
                <p>{text}</p>
                <div className='tasks-leftbarcontent__tag-close' onClick={deleteTag}><MdClose size={17} /></div>
            </div>
        </div>
    )
}
export default TasksTags;