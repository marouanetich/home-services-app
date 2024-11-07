import { useReducer, useState, useEffect } from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import FormContainer from '../components/FormContainer';
import { useStateContext } from '../contexts/ContextProvider';

const initialState = {
  username: '',
  email: '',
  password: '',
  phone_number: '',
  address: '',
  role: '',
  image: ''
};

const reducer = (state = initialState, action) => {
  if (action.type === 'SIGN_UP') {
    return {
      ...state,
      [action.field]: action.value
    };
  } else if (action.type === 'RESET') {
    return initialState;
  }
  return state;
};

const initialErrors = {
  username: '',
  email: '',
  password: '',
  phone_number: '',
  address: '',
  role: '',
  image: ''
};

function Signup() {
  const { token } = useStateContext();
  const [state, dispatch] = useReducer(reducer, initialState);
  const [errors, setErrors] = useState(initialErrors);
  const [error, setError] = useState('');
  const [lastUserId, setLastUserId] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_BASE_URL}/users/last-user`)
      .then(response => response.json())
      .then(data => setLastUserId(data.last_user_id + 1));
  }, [lastUserId]);

  useEffect(() => {
    dispatch({ type: 'SIGN_UP', field: 'role', value: 'Customer' });
  }, []);

  if (token) {
    return <Navigate to='/' />;
  }

  function handleInputChange(e) {
    const { name, value, files } = e.target;

    if (name === 'image') {
      const file = files[0];
      if (file && file.size > 2 * 1024 * 1024) {
        setErrors(prevErrors => ({
          ...prevErrors,
          [name]: `La taille de l'image doit être inférieure à 2MB!`
        }));
        return;
      } else {
        dispatch({
          type: 'SIGN_UP',
          field: name,
          value: file
        });
      }
    } else {
      dispatch({
        type: 'SIGN_UP',
        field: name,
        value: value
      });
    }

    validateField(name, value);
  }

  function validateField(name, value) {
    let errorMsg = '';

    switch (name) {
      case 'username':
        if (!value) {
          errorMsg = `Nom d'utilisateur est requis!`;
        } else if (!isNaN(value)) {
          errorMsg = `Le nom d'utilisateur n'est pas valide`;
        }
        break;
      case 'email':
        if (!value) {
          errorMsg = 'Email est requis!';
        } else if (!/\S+@\S+\.\S+/.test(value)) {
          errorMsg = 'Email est invalide!';
        }
        break;
      case 'password':
        if (!value) {
          errorMsg = 'Le mot de passe est requis!';
        } else if (value.length < 6) {
          errorMsg = 'Le mot de passe doit être au moins de 6 caractères!';
        }
        break;
      case 'phone_number':
        if (!value) {
          errorMsg = 'Le nombre de téléphone est requis!';
        } else if (!/^\d{10}$/.test(value)) {
          errorMsg = 'Le nombre de téléphone est invalide.';
        }
        break;
      case 'address':
        if (!value) errorMsg = `L'adresse est requise!`;
        break;
      case 'role':
        if (!value) errorMsg = 'Le rôle est requis!';
        break;
      default:
        break;
    }

    setErrors(prevErrors => ({
      ...prevErrors,
      [name]: errorMsg
    }));
  }

  function handleSignup(e) {
    e.preventDefault();

    let formIsValid = true;

    for (const key in state) {
      validateField(key, state[key]);
      if (errors[key]) {
        formIsValid = false;
      }
    }

    if (!formIsValid) {
      setError('Please fix the errors in the form.');
      return;
    }

    const formData = new FormData();
    formData.append('username', state.username);
    formData.append('email', state.email);
    formData.append('password', state.password);
    formData.append('phone_number', state.phone_number);
    formData.append('address', state.address);
    formData.append('role', state.role);
    formData.append('image', state.image);

    fetch(`${process.env.REACT_APP_API_BASE_URL}/signup`, {
      method: 'POST',
      body: formData,
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => {
      dispatch({ type: 'RESET' });
      setErrors(initialErrors);
      setError('');
      if (lastUserId) {
        if (state.role === 'Customer') {
          fetch(`${process.env.REACT_APP_API_BASE_URL}/customers`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              user_id: lastUserId
            })
          })
          .then(response => {
            if (!response.ok) {
              console.error("Error creating customer:", response.statusText);
              return;
            }
            try {
              return response.json();
            } catch (error) {
              console.error("Error parsing response:", error);
              return;
            }
          })
          .then(data => {
          })
          .catch(error => {
            console.error("Unexpected error:", error);
          });
        } else {
          // Dealing with service provider registration
        }
        navigate('/signin');
      }
    })
    .catch(err => {
      setError('Failed to sign up. Please try again.');
      console.error('Error:', err);
    });
}

  return (
    <FormContainer>
      <div className="text-center text-2xl color-primary-color mb-4">
        <div className="font-semibold">Créer un compte</div>
        <div className='text-sm text-gray-500 mt-1'>Remplissez le formulaire pour créer un nouveau compte.</div>
      </div>
      <form className="space-y-3">
        <div className="sm:col-span-3">
          <label htmlFor="name" className="block text-xs font-medium text-gray-600">Nom d'utilisateur</label>
          <div className="mt-2">
            <input type="text" name="username" id="username" className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6 px-3 focus:outline-primary" onChange={handleInputChange} value={state.username} />
            {errors.username && <div className="text-red-600 text-sm mt-2">{errors.username}</div>}
          </div>
        </div>
        <div className="sm:col-span-3">
          <label htmlFor="email" className="block text-xs font-medium text-gray-600">Email</label>
          <div className="mt-2">
            <input type="email" name="email" id="email" className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6 px-3 focus:outline-primary" onChange={handleInputChange} value={state.email} />
            {errors.email && <div className="text-red-600 text-sm mt-2">{errors.email}</div>}
          </div>
        </div>
        <div className="sm:col-span-3">
          <label htmlFor="password" className="block text-xs font-medium text-gray-600">Mot de passe</label>
          <div className="mt-2">
            <input type="password" name="password" id="password" className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6 px-3 focus:outline-primary" onChange={handleInputChange} value={state.password} />
            {errors.password && <div className="text-red-600 text-sm mt-2">{errors.password}</div>}
          </div>
        </div>
        <div className="sm:col-span-3">
          <label htmlFor="phone_number" className="block text-xs font-medium text-gray-600">Numéro de téléphone</label>
          <div className="mt-2">
            <input type="text" name="phone_number" id="phone_number" className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6 px-3 focus:outline-primary" onChange={handleInputChange} value={state.phone_number} />
            {errors.phone_number && <div className="text-red-600 text-sm mt-2">{errors.phone_number}</div>}
          </div>
        </div>
        <div className="sm:col-span-3">
          <label htmlFor="address" className="block text-xs font-medium text-gray-600">Adresse</label>
          <div className="mt-2">
            <input type="text" name="address" id="address" className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6 px-3 focus:outline-primary" onChange={handleInputChange} value={state.address} />
            {errors.address && <div className="text-red-600 text-sm mt-2">{errors.address}</div>}
          </div>
        </div>
        <div className="sm:col-span-3">
          <label htmlFor="role" className="block text-xs font-medium text-gray-600">Rôle</label>
          <div className="mt-2">
            <select name="role" id="role" onChange={handleInputChange} value={state.role} className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6 px-3 focus:outline-primary">
              <option value="Customer">Client</option>
              <option value="Service Provider">Fournisseur de services</option>
            </select>
            {errors.role && <div className="text-red-600 text-sm mt-2">{errors.role}</div>}
          </div>
        </div>
        <div className="sm:col-span-3">
          <label htmlFor="image" className="block text-xs font-medium text-gray-600">Image de profil</label>
          <div className="mt-3">
            <input type="file" accept="image/*" name="image" id="image" className="block w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-violet-50 file:text-primary hover:file:bg-violet-100" onChange={handleInputChange} />
            {errors.image && <div className="text-red-600 text-sm mt-2">{errors.image}</div>}
          </div>
        </div>
        <div className='text-red-600 text-sm'>{error}</div>
        <button className="text-sm bg-primary text-white rounded py-2 px-3 w-full transition-colors" onClick={handleSignup}>S'inscrire</button>
        <div className='text-sm'>
          <span className='text-gray-500'>Vous avez déjà un compte? </span>
          <Link to="/signin" className='text-primary hover:underline'>
            Se connecter
          </Link>
        </div>
      </form>
    </FormContainer>
  );
}

export default Signup;
