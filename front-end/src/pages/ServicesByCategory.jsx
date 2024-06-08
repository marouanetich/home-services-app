import Header from "../components/Header";
import { fetchData } from "../api";
import { useState, useEffect } from 'react';
import { Link, Navigate, useParams } from "react-router-dom";
import Service from '../components/Service';
import ServiceSkeleton from "../components/ServiceSkeleton";
import { useStateContext } from "../contexts/ContextProvider";

function ServicesByCategory() {
  const { user, token } = useStateContext();
  const [categories, setCategories] = useState({});
  const [services, setServices] = useState({});
  const [selectedCategory, setSelectedCategory] = useState(null);
  const { categoryName } = useParams();

  useEffect(() => {
    fetchData('categories', setCategories);
  }, []);

  useEffect(() => {
    fetchData(`services/category/${revertSlug(categoryName)}`, setServices);
    setSelectedCategory(categoryName);
  }, [categoryName]);

  function convertToSlug(categoryName) {
    return categoryName.toLowerCase().replaceAll(' ', '-');
  }

  function revertSlug(slug) {
    const words = slug.split('-');
  
    const categoryName = words.map((word, index) => {
        if (index === 0) {
            return word.charAt(0).toUpperCase() + word.slice(1);
        } else {
            return word;
        }
    }).join(' ');
  
    return categoryName;
  }

  if (token && user.role === 'Service Provider') {
    return <Navigate to='/dashboard' />;
  }
  
  return (
    <>
      <Header />
      <div className='mx-8 py-6'>
        <div className="flex gap-12">
          <div className="w-full max-w-80 flex flex-col gap-4">
            {
              Object.keys(categories).length > 0 ?
              categories?.categories?.map(category => (
                <Link to={`/search/${convertToSlug(category.name)}`} key={category.id}>
                  <div className={`border p-4 flex items-center rounded-md gap-4 hover:bg-orange-50 hover:text-primary hover:border-primary ${selectedCategory === convertToSlug(category.name) ? 'bg-orange-50 text-primary border-primary' : 'bg-gray-50'}`}>
                    <img src={category.image_url} width={30} height={30} />
                    <div className="text-sm">{category.name}</div>
                  </div>
                </Link>
              ))
              :
              new Array(4).fill(0).map((_, i) => (
                <div className="flex items-center animate-pulse gap-3" key={i}>
                  <div className="w-10 h-10 rounded-full bg-gray-200"></div>
                  <div className="h-4 bg-gray-200 rounded-full w-48"></div>
                </div>
              ))
            }
          </div>
          <div className="grid grid-cols-autoFit gap-6 w-full">
            {
              Object.keys(services).length > 0 ?
              services?.services.map(service => (
                <Service key={service.id} service={service} />
              ))
              :
              new Array(4).fill(0).map((_, i) => (
                <ServiceSkeleton key={i} />
              ))
            }
          </div>
        </div>
      </div>
    </>
  );
}

export default ServicesByCategory;
