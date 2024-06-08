import React from 'react';
import { Link } from 'react-router-dom';

function ChooseRole() {
  return (
    <div className="flex flex-col min-h-screen justify-center py-12 sm:px-6 lg:px-8 bg-gray-100">
      <img src="images/home-services-logo.png" className='w-[80px] mx-auto mb-4' />
      <div className='bg-white p-4 rounded-xl shadow-md sm:mx-auto sm:w-full sm:max-w-[500px]'>
        <div className="text-2xl font-semibold mb-4 text-center">Choisissez votre rôle</div>
        <div className="mt-6 grid grid-cols-2 gap-2">
          <Link
            to="/signup/customer"
            className="flex items-center justify-center text-lg text-black rounded-md px-4 py-2 border border-slate-200 h-[100px] hover:border-slate-600"
          >
            Client
          </Link>
          <Link
            to="/signup/service-provider"
            className="flex items-center justify-center text-lg text-black rounded-md px-4 py-2 border border-slate-200 h-[100px] hover:border-slate-600"
          >
            Fournisseur de services
          </Link>
        </div>
      </div>
    </div>
  );
}

export default ChooseRole;
