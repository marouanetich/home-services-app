import React from 'react';
import { useState, useEffect } from 'react';
import { Drawer, DatePicker, message } from 'antd';
import { fetchData } from '../api';
import { useStateContext } from '../contexts/ContextProvider';

function Booking({ service }) {
  const { user } = useStateContext();
  const [open, setOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [isDisabled, setIsDisabled] = useState(true);
  const [customerId, setCustomerId] = useState(null);
  const [messageApi, contextHolder] = message.useMessage();
  const [bookedTimeSlots, setBookedTimeSlots] = useState(null);

  const success = () => {
    messageApi.open({
      type: 'success',
      content: 'Service réservé avec succès!',
      duration: 5,
    });
  };

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  const onDateChange = (date, dateString) => {
    setSelectedDate(dateString);
  };

  const onTimeChange = (slot) => {
    setSelectedTime(slot);
  };

  const generateTimeSlots = () => {
    const startTime = 8 * 60 + 30;
    const endTime = 16 * 60;
    const interval = 30;
  
    const slots = [];
    for (let time = startTime; time <= endTime; time += interval) {
      const hours = Math.floor(time / 60);
      const minutes = time % 60;
      const formattedHours = hours < 10 ? `0${hours}` : hours;
      const formattedMinutes = minutes === 0 ? '00' : minutes < 10 ? `0${minutes}` : minutes;
      const slot = `${formattedHours}:${formattedMinutes}`;
      slots.push(slot);
    }
    return slots;
  };

  const timeSlots = generateTimeSlots();

  useEffect(() => {
    if (!selectedDate || !selectedTime) {
      setIsDisabled(true);
    } else {
      setIsDisabled(false);
    }
  }, [selectedDate, selectedTime]);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_BASE_URL}/customers/${user.id}`)
      .then(response => response.json())
      .then(data => {
        setCustomerId(data.customer.id);
      });
  }, [customerId]);

  const handleBooking = async () => {
    const customer_id = customerId;
    const provider_id = service.service.provider.id;
    const service_id = service.service.id;

    const bookingData = {
      customer_id,
      provider_id,
      service_id,
      date: selectedDate,
      time_slot: selectedTime,
      price: 80.00,
      status: 'confirmed',
    };

    try {
      const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/bookings`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(bookingData)
      });

      if (response.ok) {
        onClose();
        setSelectedDate(null);
        setSelectedTime(null);
        success();
      } else {
        const errorData = await response.json();
        console.log(errorData);
      }
    } catch (error) {
      console.error('Failed to book. Please try again.');
    }
  };

  useEffect(() => {
    fetchData(`bookings/${service.service.id}/availability/${selectedDate}`, setBookedTimeSlots);
  }, [selectedDate]);

  function isTimeSlotBooked(time) {
    return selectedDate && bookedTimeSlots?.bookings.find(booking => booking.time_slot.substring(0, 5) === time);
  }

  return (
    <>
      <button className="bg-primary text-white px-4 py-2 rounded-md mt-3 w-fit" onClick={showDrawer}>
        Prendre rendez-vous
      </button>
      <Drawer onClose={onClose} open={open}>
        <div className="grid">
          <div className="font-semibold text-lg mb-2">Réserver une prestation</div>
          <p className="text-gray-500 mb-3">Sélectionnez la date et le créneau horaire pour réserver le service.</p>
          <div className="font-semibold text-base mb-2">Sélectionnez une date</div>
          <DatePicker onChange={onDateChange} />
          <div className="font-semibold text-base mb-2 mt-3">Sélectionnez un créneau horaire</div>
          <div className="grid grid-cols-3 gap-2">
            {timeSlots.map((slot) => (
              <button
                disabled={isTimeSlotBooked(slot)}
                key={slot}
                onClick={() => onTimeChange(slot)}
                className={`py-2 rounded-full border transition-colors ${isTimeSlotBooked(slot) ? 'cursor-not-allowed bg-gray-100' : `${selectedTime === slot ? 'text-white bg-primary' : 'text-black bg-white'} hover:bg-primary hover:text-white`}`}
              >
                {slot}
              </button>
            ))}
          </div>
        </div>
        <div className='flex gap-2 items-center'>
          <button className={`${isDisabled ? 'bg-orange-800 cursor-not-allowed' : 'bg-primary hover:bg-orange-700'} transition-colors text-white px-4 py-2 rounded-md mt-6`} disabled={isDisabled} onClick={handleBooking}>Réserver</button>
          {contextHolder}
          <button className='bg-white border border-slate-300 px-4 py-2 rounded-md mt-6' onClick={onClose}>Annuler</button>
        </div>
      </Drawer>
    </>
  );
}

export default Booking;
