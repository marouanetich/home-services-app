import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import { Tabs } from 'antd';
import { fetchData } from '../api';
import BookingTabContent from '../components/BookingTabContent';
import { Navigate } from 'react-router-dom';
import { useStateContext } from '../contexts/ContextProvider';

const { TabPane } = Tabs;

function UserBookings() {
  const { user, token } = useStateContext();
  const [customerId, setCustomerId] = useState(null);
  const [pendingServices, setPendingServices] = useState(null);
  const [confirmedServices, setConfirmedServices] = useState(null);
  const [completedServices, setCompletedServices] = useState(null);
  const [cancelledServices, setCancelledServices] = useState(null);

  useEffect(() => {
    if (token && user.role === 'Customer') {
      fetch(`${process.env.REACT_APP_API_BASE_URL}/customers/${user.id}`)
        .then(response => response.json())
        .then(data => {
          setCustomerId(data.customer.id);
        });
    }
  }, []);

  useEffect(() => {
    if (customerId) {
      fetchData(`bookings/${customerId}/status/pending`, setPendingServices);
      fetchData(`bookings/${customerId}/status/confirmed`, setConfirmedServices);
      fetchData(`bookings/${customerId}/status/completed`, setCompletedServices);
      fetchData(`bookings/${customerId}/status/cancelled`, setCancelledServices);
    }
  }, [customerId]);

  if (!token) {
    return <Navigate to="/signin" />;
  }

  if (user.role === 'Service Provider') {
    return <Navigate to='/dashboard' />;
  }
  
  return (
    <>
      <Header />
      <div className='mx-8 py-6'>
        <Tabs defaultActiveKey="1" type="card" className="large-tabs">
          <TabPane tab="En attente" key="1">
            <BookingTabContent
              bookings={pendingServices?.bookings}
              emptyMessage="Vous n'avez pas encore de réservations en attente!"
            />
          </TabPane>
          <TabPane tab="Confirmé" key="2">
            <BookingTabContent
              bookings={confirmedServices?.bookings}
              emptyMessage="Vous n'avez pas encore de réservation confirmée!"
            />
          </TabPane>
          <TabPane tab="Complété" key="3">
            <BookingTabContent
              bookings={completedServices?.bookings}
              emptyMessage="Vous n'avez pas encore de réservations finalisées!"
            />
          </TabPane>
          <TabPane tab="Annulé" key="4">
            <BookingTabContent
              bookings={cancelledServices?.bookings}
              emptyMessage="Vous n'avez pas encore de réservation annulée!"
            />
          </TabPane>
        </Tabs>
      </div>
    </>
  );
}

export default UserBookings;
