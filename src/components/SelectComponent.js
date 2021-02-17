import React, { Component } from 'react';

class SelectComponent extends Component {
    render() {
        return (
            <select>
                <option value="move" disabled>Move to...</option>
                {this.props.shelves.map(shelf => {
                    return <option value={shelf.id}>{shelf.title}</option>
                })}
                <option value="none">None</option>
            </select>
        )
    }
}

export default SelectComponent;