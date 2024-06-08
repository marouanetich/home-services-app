import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faClock } from '@fortawesome/free-solid-svg-icons';

const formatDateTime = (date, time) => {
  const dateTime = new Date(`${date}T${time}`);

  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  const formattedDate = dateTime.toLocaleDateString('fr-FR', options);

  let hours = dateTime.getHours();
  const minutes = dateTime.getMinutes().toString().padStart(2, '0');
  const ampm = hours >= 12 ? 'PM' : 'AM';
  hours = hours % 12;
  hours = hours ? hours : 12;
  const formattedTime = `${hours}:${minutes} ${ampm}`;

  return `${formattedDate} à ${formattedTime}`;
};

const BookingItem = ({ booking }) => (
  <div key={booking.id} className='flex gap-4'>
    <img
      src={`${process.env.REACT_APP_WEBSITE_URL}/${booking.service.image}`}
      alt={booking.service.service_name}
      className='w-[150px] h-[100px] object-cover rounded-md'
    />
    <div>
      <div className='font-semibold mb-1'>{booking.service.service_name}</div>
      <div className='flex items-center mb-1'>
        <FontAwesomeIcon icon={faUser} />
        <span className='ml-[6px]'>{booking.provider.user.username}</span>
      </div>
      <div className='flex items-center'>
        <FontAwesomeIcon icon={faClock} />
        <span className='ml-[6px]'>{formatDateTime(booking.date, booking.time_slot)}</span>
      </div>
    </div>
  </div>
);

export default BookingItem;