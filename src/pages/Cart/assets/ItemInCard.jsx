/*----------------------------------------------------------------------------*/
/* IMPORTS                                                                    */
/*----------------------------------------------------------------------------*/
import { Button } from "antd";
import { InformationSquare } from "@carbon/icons-react";
import { ShoppingCartClear } from "@carbon/icons-react";
import { ShoppingCartPlus } from "@carbon/icons-react";
import { ShoppingCartMinus } from "@carbon/icons-react";
/*----------------------------------------------------------------------------*/
/* ItemInCard                                                                 */
/*----------------------------------------------------------------------------*/

const ItemInCard = (props) => {
  let data = props.data;

  return (
    <div className="mb-2">
      <div className="d-flex bx-wrap bcol-ibm-white">
        <div className="border-right cds--col-lg-8 pl-0 pr-0">
          <h3>image</h3>
        </div>
        <div className="cds--col-lg-8 pl-0 pr-0">
          <div className="border-bottom pl-2 pt-2">
            <h3>Title Product</h3>
          </div>
          <div className="mt-5">
            <h5>Product info</h5>
          </div>
          <div className="d-flex bx-wrap border-top">
            <div className="d-flex f-ac f-jc pl-0 pr-0 cds--col-lg-8 border-right">
              <div className="p-2">
                <h5 className="mb-0">
                  <Button className="cursor-pointer">
                    Details{<InformationSquare size="20" />}
                  </Button>
                </h5>
              </div>
            </div>
            <div className="d-flex f-ac f-jc pr-0 pl-0 cds--col-lg-8">
              <div className="mb-0">
                <Button className="cursor-pointer">
                  {<ShoppingCartMinus size="20" />}
                </Button>
                <Button className="cursor-pointer">
                  {<ShoppingCartPlus size="20" />}
                </Button>
                <Button className="cursor-pointer">
                  {<ShoppingCartClear size="20" />}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

/*----------------------------------------------------------------------------*/
/* EXPORTS                                                                    */
/*----------------------------------------------------------------------------*/
export default ItemInCard;
