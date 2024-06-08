import Header from '../components/Header';
import Hero from '../components/Hero';
import PopularServices from '../components/PopularServices';
import { useStateContext } from '../contexts/ContextProvider';
import { Navigate } from 'react-router-dom';

function Home() {
  const { user, token } = useStateContext();
  
  if (token && user.role === 'Service Provider') {
    return <Navigate to='/dashboard' />;
  }
  
  return (
    <>
      <Header />
      <div className='mx-8'>
        <Hero />
        <PopularServices />
      </div>
    </>
  );
}

export default Home;