import React, { useEffect, useState } from 'react';
import { useNavigate, useParams, Link, Navigate } from 'react-router-dom';
import Header from '../components/Header';
import { fetchData } from '../api';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLocationDot, faEnvelope, faUser, faClock } from '@fortawesome/free-solid-svg-icons';
import Booking from '../components/Booking';
import { useStateContext } from '../contexts/ContextProvider';

function ServiceDetails() {
  const { user, token } = useStateContext();
  const { serviceId } = useParams();
  const [service, setService] = useState(null);
  const [serviceCategoryName, setServiceCategoryName] = useState(null);
  const [similarServices, setSimilarServices] = useState(null);

  useEffect(() => {
    fetchData(`services/${serviceId}`, setService);
  }, [serviceId]);

  useEffect(() => {
    if (service && service.service && service.service.category.name) {
      setServiceCategoryName(service.service.category.name);
    }
  }, [service]);

  useEffect(() => {
    if (serviceCategoryName) {
      const fetchData = _ => {
        fetch(`${process.env.REACT_APP_API_BASE_URL}/services/category/${serviceCategoryName}`)
          .then(response => {
            if (!response.ok) {
              throw new Error('Failed to fetch data');
            }
            return response.json();
          })
          .then(data => {
            const filteredServices = data?.services.filter(service => service.id != serviceId); 
            setSimilarServices(filteredServices);
          })
          .catch(error => {
            console.error('Error fetching data:', error);
          });
      };

      fetchData();
    }
  }, [serviceCategoryName, serviceId]);

  if (!token) {
    return <Navigate to="/signin" />;
  } else {
    if (user.role === 'Service Provider') {
      return <Navigate to='/dashboard' />;
    }
  }

  return (
    <>
      <Header />
      {
        service &&
        <div className='flex justify-between gap-y-6 mx-8 py-6 flex-wrap'>
          <div>
            <div className='flex flex-wrap gap-x-14 gap-y-6'>
              <div className='flex flex-col md:flex-row gap-4'>
                <img src={`${process.env.REACT_APP_WEBSITE_URL}/${service.service.image}`} className='rounded-xl md:w-[300px]' />
                <div className='flex flex-col gap-2'>
                  <div className='text-xs bg-red-200 px-2 py-1 rounded-md w-fit'>{service.service.category.name}</div>
                  <div className='font-semibold text-xl my-1'>{service.service.service_name}</div>
                  <div className='flex gap-2 items-center'>
                    <FontAwesomeIcon icon={faLocationDot} />
                    <div className='text-gray-500'>{service.service.provider.user.address}</div>
                  </div>
                  <div className='flex gap-2 items-center'>
                    <FontAwesomeIcon icon={faEnvelope} />
                    <div className='text-gray-500'>{service.service.provider.user.email}</div>
                  </div>
                  <Booking service={service} />
                </div>
              </div>
              <div>
                <div className='flex gap-2 items-center'>
                  <FontAwesomeIcon icon={faUser} />
                  <div className='text-gray-500'>{service.service.provider.user.username}</div>
                </div>
                <div className='flex gap-2 items-center mt-2'>
                  <FontAwesomeIcon icon={faClock} />
                  <div className='text-gray-500'>{service.service.provider.availability}</div>
                </div>
              </div>
            </div>
            <div className='mt-8'>
              <div className='text-xl font-semibold mb-2'>Description</div>
              <p className='text-gray-500'>{service.service.description}</p>
            </div>
          </div>
          <div>
            <div className='text-start text-xl font-semibold mb-2'>Prestations similaires</div>
            <div className='grid gap-4 mt-4'>
              {
                similarServices &&
                similarServices.map(service => (
                  <div key={service.id}>
                    <Link to={`/details/${service.id}`} className='flex gap-4'>
                      <img src={`${process.env.REACT_APP_WEBSITE_URL}/${service.image}`} alt={service.name} className='w-[150px] rounded-lg' />
                      <div>{service.service_name}</div>
                    </Link>
                  </div>
                ))
              }
            </div>
          </div>
        </div>
      }
    </>
  );
}

export default ServiceDetails;
