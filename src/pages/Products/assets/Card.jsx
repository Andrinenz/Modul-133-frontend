/*----------------------------------------------------------------------------*/
/* IMPORTS                                                                    */
/*----------------------------------------------------------------------------*/
import { useNavigate } from "react-router";
import "./Cards.scss";
/*----------------------------------------------------------------------------*/
/* Card                                                                       */
/*----------------------------------------------------------------------------*/

const Card = (props) => {
  let data = props.data;
  const navigate = useNavigate();

  return (
    <div className="BackGround">
      <div className="ProductTitle">
        <h1>Products</h1>
      </div>
      <div className="Cards">
        <div>
          <h1 className="Card1">Card test</h1>
        </div>
        <div>
          <h1 className="Card2">Card test2</h1>
        </div>
        <div>
          <h1 className="Card3">Card test2</h1>
        </div>
        <div>
          <h1 className="Card4">Card test2</h1>
        </div>
        <div>
          <h1 className="Card5">Card test2</h1>
        </div>
        <div>
          <h1 className="Card6">Card test2</h1>
        </div>
      </div>
    </div>
  );
};

/*----------------------------------------------------------------------------*/
/* EXPORTS                                                                    */
/*----------------------------------------------------------------------------*/
export default Card;
