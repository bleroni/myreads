import React, { Component } from 'react'
import PropTypes from 'prop-types'
import SelectComponent from './SelectComponent';

class Book extends Component {
    render() {
        return (
            <div className="book">
                <div className="book-top">
                    <div className="book-cover" style={{ width: 128, height: 192, backgroundImage: `url("${this.props.bookDetails.imageLinks.thumbnail}")` }}></div>
                    <div className="book-shelf-changer">
                        <SelectComponent shelves={this.props.shelves} />
                    </div>
                </div>
                <div className="book-title">{this.props.bookDetails.title}</div>
                <div className="book-authors">
                    {this.props.bookDetails.authors.map((author) => {
                        return `${author} `
                    })}
                </div>
            </div>
        )
    }
}

Book.PropTypes = {
    bookDetails: PropTypes.object.isRequired,
}

export default Book;
