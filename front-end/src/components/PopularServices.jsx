import { useState, useEffect } from 'react';
import { fetchData } from '../api';
import Service from './Service';
import ServiceSkeleton from './ServiceSkeleton';

function PopularServices() {
  const [popularServices, setPopularServices] = useState([]);

  useEffect(() => {
    fetchData('services/popular-services', setPopularServices);
  }, []);
  
  return (
    <div>
      <h2 className="text-xl font-bold">Services Populaires</h2>
      <div className='grid gap-4 mt-4 grid-cols-autoFit'>
        {
          Object.keys(popularServices).length > 0 ?
          popularServices.popular_services?.map(popularService => (
            <Service key={popularService.id} service={popularService} />
          ))
          :
          new Array(5).fill(0).map((_, i) => (
            <ServiceSkeleton key={i} />
          ))  
        }
      </div>
    </div>
  );
}

export default PopularServices;