import React, { useEffect, useState } from 'react';
import { booksData } from './Bookingjson';
import { useParams } from 'react-router-dom';
import './Books.css'; // Add a separate CSS file for styling
import Navbar from '../Navbar';
import Image from '../../Image/Image';
import Button from '../../Button/Button';
import axios from 'axios';  
import { BaseURL } from '../../Baseurl';
import { toast } from "react-toastify";
const BookingDetails = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [bookData, setBookData] = useState(null);
  let singleBookingData = booksData.find((book) => book.id === parseInt(id));

  useEffect(() => {
    if (singleBookingData?.id !== Number(id)) {
      setLoading(true);
    } else {
      setBookData(singleBookingData);
    }
  }, [singleBookingData, id]);

  const handlePurchase = async () => {
    try {
      const { data:{order} } = await axios.post(`${BaseURL}/checkout`, {
        amount: singleBookingData.price,  
      });
      
     const options = {
         key:process.env.REACT_APP_KEY_ID,
         amount: order.amount,
         currency: "INR",
         name: "shyam-dev",
         description: "Tutorial of RazorPay",
         order_id: order.id,
         callback_url: `${BaseURL}/paymentverification`,
         prefill: {
             name: "shyam",
             email: "guptashyam1096@gmail.com",
             contact: "8094404704"
         },
         notes: {
            "address": "Razorpay Corporate Office"
         },
         theme: {
             "color": "#401212"
         }
     };
     const razor = new window.Razorpay(options);
    razor.open();
    } catch (error) {
      console.error(error);
      toast.error('Error occurred while processing payment');
    }
  };

 
  if (!singleBookingData) {
    return <div className="no-book-found">No book found with this ID</div>;
  }

  return (
    <>
      <Navbar />
      {loading ? (
        <h1>No book found with this ID</h1>
      ) : (
        <div className="booking-details-container">
          <div className="book-image-section">
            <Image
              src={singleBookingData.image}
              alt={singleBookingData.title}
              className="book-detail-image"
            />
          </div>
          <div className="book-info-section">
            <h1 className="book-title">{singleBookingData.title}</h1>
            <h2 className="book-author">by {singleBookingData.author}</h2>
            <p className="book-description">{singleBookingData.description}</p>
            <p className="book-price">Price: ₹{singleBookingData.price}</p>
            <button
              className="details-button-purchase"
              value="Purchase now"
              type="submit"
              onClick={handlePurchase} 
            >Purchase</button>
          </div>
        </div>
      )}
    </>
  );
};

export default BookingDetails;
