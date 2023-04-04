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

  console.log(data);
  if (data) {
    let sizes = data?.size.slice(",");
    console.log(sizes);
  }

  return (
    <div className="d-flex bx-wrap BackGround">
      <div className="Cards">
        <div className="ProductTitle d-flex fd-c f-jc fac">
          <h3>{data?.title}</h3>
          <img className="PicturePreview" src={data?.image} />
          <div className="ProductPrice">
            <h3>{data?.price}.-</h3>
          </div>
        </div>
      </div>
    </div>
  );
};

/*----------------------------------------------------------------------------*/
/* EXPORTS                                                                    */
/*----------------------------------------------------------------------------*/
export default Card;
