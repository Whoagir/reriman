import React, { Component } from 'react'
import TasksTags from './tasksComponent'

export class TagsUpdate extends Component {
    state = {
        myArray: [
        {
            id: 0,
            text: "lorem",
        },
        {
            id: 1,
            text: "lorem ipsum",
        },
        {
            id: 2,
            text: "lorem ipsum a",
        },
    ]
    };

    deleteTag = id => {
        const newArray = [...this.state.myArray];
        newArray.splice(id, 1);
        this.setState({
            myArray: newArray
        })
    }

    render() {
        const tagPosts = this.state.myArray.map((item, id) => {
            return (
                <TasksTags id={item.id} text={item.text} deleteTag={() => this.deleteTag(id)} />
            );
        });
        return (
            <div className='tagsss'>{tagPosts}</div>
        )
    }
}