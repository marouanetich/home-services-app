import React from 'react';
import BookingItem from './BookingItem';

const BookingTabContent = ({ bookings, emptyMessage }) => (
  <div className='grid grid-cols-autoFit gap-6 mt-2'>
    {
      bookings
      ?
        bookings.length > 0
        ?
        bookings.map(booking => <BookingItem key={booking.id} booking={booking} />)
        :
        <div>{emptyMessage}</div>
      :
      <img src="images/loading_icon.gif" className='mx-auto w-[40px]' />
    }
  </div>
);

export default BookingTabContent;
