import React, { Component } from 'react';
import propTypes from 'prop-types';

class SelectComponent extends Component {
    handleOnChange = (event) => {
        const selectedShelf = event.target.value;
        if (selectedShelf === 'none') {
            alert("Action not executed. A book cannot be assigned to none once it's inside a shelf");
            return;
        }
        this.props.onChangeShelf(this.props.bookDetails, selectedShelf)
    }
    render() {
        return (
            <select  defaultValue={this.props.bookDetails.shelf?this.props.bookDetails.shelf : 'none'} onChange={this.handleOnChange}>
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
    onChangeShelf: propTypes.func.isRequired,
}

export default SelectComponent;