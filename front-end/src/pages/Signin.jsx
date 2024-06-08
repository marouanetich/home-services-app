import { useReducer, useState } from 'react';
import { Link, useNavigate, Navigate } from 'react-router-dom';
import FormContainer from '../components/FormContainer';
import { useStateContext } from '../contexts/ContextProvider';

const initialState = {
  email: '',
  password: ''
};

const reducer = (state = initialState, action) => {
  if (action.type === 'SIGN_IN') {
    return {
      ...state,
      [action.field]: action.value
    };
  } else if (action.type === 'RESET') {
    return initialState;
  }
  return state;
};

function Signin() {
  const { token, setToken, setUser } = useStateContext();
  const [state, dispatch] = useReducer(reducer, initialState);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  if (token) {
    return <Navigate to="/" />;
  }

  function handleInputChange(e) {
    dispatch({
      type: 'SIGN_IN',
      field: e.target.name,
      value: e.target.value
    });
  }

  function handleSignIn(e) {
    e.preventDefault();
  
    fetch(`${process.env.REACT_APP_API_BASE_URL}/signin`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(state),
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('One ore more details are incorrect!');
        }
        return response.json();
      })
      .then(data => {
        setToken(data.token);
        setUser(data.user);
        if (data.user.role === 'Customer') {
          navigate('/');
        } else {
          navigate('/dashboard');
        }
      })
      .catch(err => {
        setError(err.message);
      });
  }

  return (
    <FormContainer>
      <div className="text-center text-2xl color-primary-color mb-2">
        <div className='font-semibold'>Se connecter</div>
        <div className='text-sm text-gray-500 mt-1'>Connectez-vous à votre compte pour continuer.</div>
      </div>
      <form className="space-y-3">
        <div className="sm:col-span-3">
          <label htmlFor="email" className="block text-xs font-medium text-gray-600">Email</label>
          <div className="mt-2">
            <input type="email" name="email" id="email" className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6 px-3 focus:outline-primary" onChange={handleInputChange} value={state.email} />
          </div>
        </div>
        <div className="sm:col-span-3">
          <label htmlFor="password" className="block text-xs font-medium text-gray-600">Mot de passe</label>
          <div className="mt-2">
            <input type="password" name="password" id="password" className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6 px-3 focus:outline-primary" onChange={handleInputChange} value={state.password} />
          </div>
        </div>
        <div className='text-red-600 text-sm'>{error}</div>
        <button className="text-sm bg-primary text-white rounded py-2 px-3 w-full transition-colors" onClick={handleSignIn}>Sign in</button>
        <div className='text-sm'>
          <span className='text-gray-500'>Vous n'avez pas de compte? </span>
          <Link to="/signup" className='text-primary hover:underline'>
            S'inscrire
          </Link>
        </div>
      </form>
    </FormContainer>
  )
}

export default Signin;
