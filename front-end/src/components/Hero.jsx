import { useState, useEffect } from 'react';
import Category from './Category';
import { fetchData } from "../api";
import { Link } from 'react-router-dom';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function Hero() {
  const [categories, setCategories] = useState({});

  useEffect(() => {
    fetchData('categories', setCategories);
  }, []);

  function convertToSlug(categoryName) {
    return categoryName.toLowerCase().replaceAll(' ', '-');
  }
  
  return (
    <div className="py-20 text-center">
      <div className="text-[60px] font-semibold leading-tight">Trouver des services et réparations <br />à domicile près de toi</div>
      <p className="text-gray-500 mt-4 mb-6">Découvrez les meilleurs services et réparations à domicile à proximité</p>
      <div className="max-w-[400px] mx-auto relative">
        <input type="text" placeholder="Recherche" className="border-[1px] px-3 pr-9 py-2 rounded-md outline-gray-600 text-sm w-full" />
        <FontAwesomeIcon icon={faMagnifyingGlass} className="absolute top-1/2 right-3 -translate-y-1/2 text-gray-400 cursor-pointer" />
      </div>
      <div className="mt-10 grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
        {
          Object.keys(categories).length > 0 ?
          categories.categories?.map(category => (
            <Link to={`/search/${convertToSlug(category.name)}`} key={category.id}>
              <Category name={category.name} image={category.image_url} description={category.description} />
            </Link>
          ))
          :
          new Array(4).fill(0).map((_, i) => (
            <div key={i} className="grid bg-orange-100 p-4 rounded-md shadow-sm h-[110px] animate-pulse">
            </div>
          ))
        }
      </div>
    </div>
  );
}

export default Hero;