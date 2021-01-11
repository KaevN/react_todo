import React, { Component } from 'react';

import './SearchPanel.css';

export default class SearchPanel extends Component {
  state = {
    term: ''
  }

  onSearchChange = (e) => {
    const term = e.target.value;
    this.setState({ term });
    this.props.onSearchChange(term)
  };

  render () {
    return (
      <input
        value={this.state.val}
        type="text"
        className="form-control search-input"
        placeholder="Поиск"
        onChange={this.onSearchChange} 
      />
    )
  }
};
