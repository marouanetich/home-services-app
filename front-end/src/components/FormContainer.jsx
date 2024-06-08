function FormContainer({ children }) {
  return (
    <div className="flex flex-col min-h-screen justify-center py-12 sm:px-6 lg:px-8 bg-gray-100">
      <img src="images/home-services-logo.png" className='w-[80px] mx-auto mb-4' />
      <div className='bg-white p-4 rounded-xl shadow-md sm:mx-auto sm:w-full sm:max-w-[500px]'>
        { children }
      </div>
    </div>
  );
}

export default FormContainer;
