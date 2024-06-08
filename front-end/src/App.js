import Home from './pages/Home';
import ServicesByCategory from './pages/ServicesByCategory';
import Signin from './pages/Signin';
import Signup from './pages/Signup';
import { Routes, Route } from 'react-router-dom';
import ServiceDetails from './pages/ServiceDetails';
import UserBookings from './pages/UserBookings';
import Dashboard from './pages/Dashboard';
import ChooseRole from './pages/ChooseRole';
import CustomerSignup from './pages/CustomerSignup';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/search/:categoryName" element={<ServicesByCategory />} />
        <Route path="/details/:serviceId" element={<ServiceDetails />} />
        <Route path="/bookings" element={<UserBookings />} />
        
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/choose-role" element={<ChooseRole />} />
        <Route path="/signup/customer" element={<CustomerSignup />} />
      </Routes>
    </div>
  );
}

export default App;
