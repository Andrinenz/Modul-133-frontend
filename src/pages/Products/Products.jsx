/*----------------------------------------------------------------------------*/
/* IMPORTS                                                                    */
/*----------------------------------------------------------------------------*/

import Card from "./assets/Card";

/*----------------------------------------------------------------------------*/
/* Products                                                                   */
/*----------------------------------------------------------------------------*/

const Products = () => {
  let obj = ["1", "2", "3", "4", "5", "6"];
  return obj.map((product, index) => {
    return <Card data={product} />;
  });
};

/*----------------------------------------------------------------------------*/
/* EXPORTS                                                                    */
/*----------------------------------------------------------------------------*/
export default Products;
