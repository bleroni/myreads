import React, { Component } from 'react';
import propTypes from 'prop-types';

class SelectComponent extends Component {
    handleOnChange = (event) => {
        const selectedField = event.target.value;
        if (selectedField === 'none') {
            alert('Action not executed. Every book has to belong to at least one shelf.');
            return;
        }
        alert(event.target.value);
        console.log('calling elvis...')
    }
    render() {
        return (
            <select  defaultValue={this.props.bookDetails.shelf} onChange={this.handleOnChange}>
                <option value="move" disabled>Move to...</option>
                {this.props.shelves.map(shelf => {
                        return <option key={shelf.id} value={shelf.id}>{shelf.title}</option>
                })}
                <option value="none">None</option>
            </select>
        )
    }
}

SelectComponent.propTypes = {
    bookDetails: propTypes.object.isRequired,
}

export default SelectComponent;