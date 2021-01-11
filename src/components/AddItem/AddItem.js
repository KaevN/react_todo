import React, { Component } from 'react';
import './AddItem.css';

export default class AddItem extends Component {

    state ={
        label: ''
    }
    onLabelChange = (e) => {
        this.setState({
            label: e.target.value
        })
    }

    onSubmit = (e) => {
        e.preventDefault();
        this.props.onItemAdded(this.state.label)
        this.setState({
            label: ''
        })
    }

    render() {
        return (
            <form 
            className='add-item d-flex'
            onSubmit={this.onSubmit}
            >
                <input 
                type="text"
                className='form-control'
                onChange={this.onLabelChange}
                value={this.state.label}
                placeholder='Что нужно добавить?'
                />
                <button 
                className='btn btn-outline-secondary'
                > Добавить дело</button>
            </form>
        )
    }
}

