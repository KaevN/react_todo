import React, { Component } from 'react';

import AppHeader from '../AppHeader';
import SearchPanel from '../SearchPanel';
import TodoList from '../TodoList';
import ItemStatusFilter from '../ItemStatusFilter';
import AddItem from '../AddItem';

import './App.css';

export default class App extends Component {

  maxId = 100;

  state = {
    todoData: [],
    term: '',
    filter: 'all'
  };

  filter(items, filter) {
    switch(filter) {
      case 'all': return items;
      case 'active': return items.filter((item) => !item.done);
      case 'done': return items.filter((item) => item.done);
      default: return items;
    }
  }

  search(items, term) {
    if(term.length === 0) {
      return items;
    }

    return items.filter((item) => {
      return item.label.toLowerCase().includes(term.toLowerCase());
    })
  };

  createTodoItem(label) {
    return {
        label,
        important: false,
        done: false, 
        id: this.maxId++
    }
  };

  deleteItem = (id) => {
    this.setState(({ todoData }) => {
      const newArray = todoData.filter(e => e.id !== id);

      return  {
        todoData: newArray
      }
    })
  };

  addItem = (text) => {
    const newItem = this.createTodoItem(text);

    this.setState(({todoData}) => {
      const newArray = [
        ...todoData,
        newItem
      ]

      return {
        todoData: newArray
      }
    })
  };

  toggleProperty(arr, id, propName) {
    const newArray = Array.from(arr);

    newArray.map((e) => {
      return e.id === id ? e[propName] = !e[propName] : ''
    })

    return newArray;
  };

  onToggleImportant = (id) => {
    this.setState(({todoData}) => {
      return {
        todoData: this.toggleProperty(todoData, id, 'important')
      }
    })
  };

  onToggleDone = (id) => {
    this.setState(({todoData}) => {
      return {
        todoData: this.toggleProperty(todoData, id, 'done')
      }
    })
  };

  onSearchChange = (term) => {
    this.setState({ term })
  };

  onFilterChange = (filter) => {
    this.setState({ filter })
  }

  render() {

    const { todoData, term, filter } = this.state;

    const visibleItems = this.filter(this.search(todoData, term), filter);
    const doneCount = todoData.filter((e) => e.done).length;
    const todoCount =  todoData.length - doneCount;
    
    return (
      <div className="todo-app">
        <AppHeader toDo={todoCount} done={doneCount} />
        <div className="top-panel d-flex">
          <SearchPanel 
            onSearchChange={this.onSearchChange}
          />
          <ItemStatusFilter 
          filter={filter}
          onFilterChange={this.onFilterChange}
          />
        </div>
  
        <TodoList 
          todos={visibleItems}
          onDeleted={this.deleteItem}
          onToggleImportant={this.onToggleImportant}
          onToggleDone={this.onToggleDone}
        />

        <AddItem onItemAdded={this.addItem}/>
      </div>
    );
  }
}
