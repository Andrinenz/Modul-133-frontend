/*----------------------------------------------------------------------------*/
/* IMPORTS                                                                    */
/*----------------------------------------------------------------------------*/

import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Route, Routes } from 'react-router';
import './App.css';
import Homepage from './pages/Homepage/Homepage';
import Login from './pages/Login/Login';

/*----------------------------------------------------------------------------*/
/* App                                                                        */
/*----------------------------------------------------------------------------*/

const App = () => {
  const dispatch = useDispatch();

  return (
    <div className='whole-page'>
      <Routes>
        <Route index element={<Homepage />} />
        <Route path='login' element={<Login />} />
      </Routes>
    </div>
  );
};

/*----------------------------------------------------------------------------*/
/* EXPORTS                                                                    */
/*----------------------------------------------------------------------------*/
export default App;
