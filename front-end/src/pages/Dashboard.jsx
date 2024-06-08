import { useStateContext } from "../contexts/ContextProvider";
import { Navigate } from "react-router-dom";
import Header from "../components/Header";

function Dashboard() {
  const { user, token } = useStateContext();
  
  if (!token) {
    return <Navigate to='/signin' />
  } else {
    if (user.role !== 'Service Provider') {
      return <Navigate to='/' />
    }
  }
  
  return (
    <>
      <Header />
      <h1>Dashboard</h1>
    </>
  );
}

export default Dashboard;