import React from 'react';
import { Link } from 'react-router-dom';
import { booksData } from '../Books/Bookingjson';
import './Books.css';
import Navbar from '../Navbar';
import Button from '../../Button/Button';
import Image from '../../Image/Image';
import useAuth from '../utils/useAuth';
const Books = () => {
    useAuth()
  return (
    <>
    <Navbar />
    <div className="books-container">
      <h1 className="title">Explore Our Collection</h1>
      <div className="books-list">
        {booksData.map((book) => (
          <div key={book.id} className="book-card">
            <Image src={book.image} alt={book.title} className="book-image" />
            <div className="book-info">
              <h2 className="book-title">{book.title}</h2>
              <p className="book-author">{book.author}</p>
              <p className="book-description">{book.description}</p>
              <p className="book-description">INR {book.price}₹ </p>
              <Link to={`/booking-details/${book.id}`}>
                <Button className="details-button" value="View Details"/>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
    </>
  );
};

export default Books;
