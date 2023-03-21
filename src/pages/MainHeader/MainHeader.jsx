/*----------------------------------------------------------------------------*/
/* IMPORTS                                                                    */
/*----------------------------------------------------------------------------*/

import "./MainHeader.scss";
import {
  ShoppingCart,
  Login,
  Events,
  VisualRecognition,
} from "@carbon/icons-react";
import { Badge, Layout, Menu, theme } from "antd";
import React from "react";
import { useNavigate } from "react-router";
const { Header } = Layout;

/*----------------------------------------------------------------------------*/
/* MainHeader                                                                 */
/*----------------------------------------------------------------------------*/

const MainHeader = () => {
  const navigate = useNavigate();

  const {
    token: { colorBgContainer },
  } = theme.useToken();
  return (
    <Layout>
      <Header
        style={{
          position: "sticky",
          top: 0,
          zIndex: 1,
          width: "100%",
        }}
      >
        <Menu
          theme="dark"
          mode="horizontal"
          selectedKeys={["2"]}
          items={[
            {
              key: "1",
              icon: <Login />,
              label: "Login",
              className: "NavLogin",
            },
            {
              key: "2",
              icon: <VisualRecognition />,
              label: "Products",
              className: "NavProducts",
            },
            {
              key: "3",
              icon: (
                <Badge count={2}>
                  <ShoppingCart size={"20"} />
                </Badge>
              ),
              className: "NavCart",
            },
            {
              key: "4",
              icon: <Events />,
              label: "About",
              className: "NavAbout",
            },
          ]}
        />
      </Header>
    </Layout>
  );
};

/*----------------------------------------------------------------------------*/
/* EXPORTS                                                                    */
/*----------------------------------------------------------------------------*/
export default MainHeader;
