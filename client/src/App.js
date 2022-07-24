import './styles/styles.css'
import { useContext, useEffect } from 'react'
import { UserContext } from './context/userContext';
import { Routes, Route, useNavigate } from 'react-router-dom'

import Landing from './pages/Landing'
import HomeUser from './pages/HomeUser'
import BookDetail from './pages/BookDetail'
import BookDetailDownload from './pages/BookDetailDownload'
import Profile from './pages/Profile'
import BookList from './pages/BookList'
import Transactions from './pages/Transactions'
import AddBooks from './pages/AddBooks'
import Cart from './pages/Cart'
import ComplainAdmin from './pages/ComplainAdmin'
import ComplainUser from './pages/ComplainUser'


import { API, setAuthToken } from './config/api'

// init token on axios every time the app is refreshed
if (localStorage.token) {
  setAuthToken(localStorage.token);
}

function App() {
  let navigate = useNavigate();
  const [state, dispatch] = useContext(UserContext);
  // console.log(state);
  useEffect(() => {
    if (localStorage.token) {
      setAuthToken(localStorage.token);
    }

    // Redirect Auth
    if (state.isLogin === false) {
      navigate('/');
    } else {
      if (state.user.status === 'Admin') {
        navigate('/admin');
      } else if (state.user.status === 'Customer') {
        navigate('/user');
      }
    }
  }, [state]);

  const checkUser = async () => {
    try {
      const response = await API.get('/check-auth');

      // If the token incorrect
      if (response.status === 404) {
        return dispatch({
          type: 'AUTH_ERROR',
        });
      }

      // Get user data
      let payload = response.data.data.user;
      // Get token from local storage
      payload.token = localStorage.token;

      // Send data to useContext
      dispatch({
        type: 'USER_SUCCESS',
        payload,
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (localStorage.token) {
      checkUser();
    }
  }, []);


  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/user">
        <Route index element={<HomeUser />}></Route>
        <Route path="/user/book-detail/:id" element={<BookDetail />}></Route>
        <Route path="/user/book-download" element={<BookDetailDownload />}></Route>
        <Route path="/user/profile" element={<Profile />}></Route>
        <Route path="/user/cart" element={<Cart />}></Route>
        <Route path="/user/complain" element={<ComplainUser />}></Route>
      </Route>
      <Route path="/admin">
        <Route index element={<Transactions />}></Route>
        <Route path="/admin/book-list" element={<BookList />}></Route>
        <Route path="/admin/add-book" element={<AddBooks />}></Route>
        <Route path="/admin/complain" element={<ComplainAdmin />}></Route>
      </Route>
    </Routes>
  );
}

export default App;
