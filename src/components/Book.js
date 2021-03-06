import React from 'react';
import propTypes from 'prop-types';
import SelectComponent from './SelectComponent';

const Book = (props) => {
    return (
        <div className="book">
            <div className="book-top">
                <div className="book-cover"
                    style={{
                        width: 128, height: 192, backgroundImage:
                            `url(${props.bookDetails.imageLinks && props.bookDetails.imageLinks.thumbnail ? `${props.bookDetails.imageLinks.thumbnail}`:`http://via.placeholder.com/128x193?text=No%20Cover`})`
                    }}>
                </div>
                <div className="book-shelf-changer">
                    <SelectComponent onChangeShelf={props.onChangeShelf} shelves={props.shelves} bookDetails={props.bookDetails} />
                </div>
            </div>
            <div className="book-title">{props.bookDetails.title}</div>
            <div className="book-authors">
                {props.bookDetails.authors && props.bookDetails.authors.map((author) => {
                    return `${author} `
                })}
            </div>
        </div>
    )
}

Book.propTypes = {
    bookDetails: propTypes.object.isRequired,
    onChangeShelf: propTypes.func.isRequired
}

export default Book;
