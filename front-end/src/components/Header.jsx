import { Link } from 'react-router-dom';
import DropDown from './DropDown';
import { useStateContext } from '../contexts/ContextProvider';

function Header() {
  const { token, setToken, setUser } = useStateContext();
  
  async function handleSignOut() {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/signout`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });
      if (response.ok) {
        setToken(null);
        setUser(null);
      } else {
        console.error('Logout failed:', response.status);
      }
    } catch (error) {
      console.error('An error occurred during logout:', error);
    }
  } 
  
  return (
    <header className="flex items-center justify-between bg-white px-4 py-3 border-b-[1px] border-gray-200">
      <div className="flex items-center gap-6">
        <Link to="/">
          <img src="/images/home-services-logo.png" className="w-[50px]" />
        </Link>
      </div>
      {
        token
        ?
        <DropDown handleSignOut={handleSignOut} />
        :
        <Link to="/signin">
          <button className="text-sm font-semibold bg-white border-2 border-primary text-primary px-4 py-2 rounded-md">Se connecter</button>
        </Link>
      }
    </header>
  );
}

export default Header;