import { Link } from 'react-router-dom';

function Service({ service }) {
  return (
    <div className="aspect-video">
      <img src={`${process.env.REACT_APP_WEBSITE_URL}/${service.image}`} className='h-[250px] object-cover w-full' />
      <div className='text-xs bg-red-200 px-2 py-1 rounded-md w-fit mt-3'>{service.category.name}</div>
      <div className='mt-3 font-medium'>{service.service_name}</div>
      <p className='my-3 text-sm'>{service.description}</p>
      <Link to={`/details/${service.id}`}>
        <button className="text-sm bg-primary text-white rounded-md p-2">Reserve maintenant</button>
      </Link>
    </div>
  );
}

export default Service;