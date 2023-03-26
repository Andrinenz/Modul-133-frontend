/*----------------------------------------------------------------------------*/
/* IMPORTS                                                                    */
/*----------------------------------------------------------------------------*/

import { useNavigate } from 'react-router';
import './Homepage.scss';
import logo from './logo.PNG';

/*----------------------------------------------------------------------------*/
/* Homepage                                                                   */
/*----------------------------------------------------------------------------*/

const Homepage = () => {
  const navigate = useNavigate();
  const handleOnClick = () => {
    navigate('/products');
  };

  return (
    <div className='backgroundHome'>
      <div className='flex-container'>
        <h1>Modul 133 BI20a</h1>
        <h2>Entwickler: Scherrer, Enz und Jenic</h2>
        <button className='cursor-pointer' onClick={() => handleOnClick()}>
          Zu unserem Webshop
        </button>
        <div className='Logo'>
          <img src={logo} height='150' alt='homepage'></img>
        </div>
      </div>
    </div>
  );
};

/*----------------------------------------------------------------------------*/
/* EXPORTS                                                                    */
/*----------------------------------------------------------------------------*/
export default Homepage;
