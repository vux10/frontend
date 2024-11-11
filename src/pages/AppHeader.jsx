import { HomeFilled, ShoppingCartOutlined } from "@ant-design/icons";
import { Badge, Menu } from "antd";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

import { getCart } from "../apis";
import Notification from "../component/Notification";

function AppHeader() {
  const navigate = useNavigate();

  const onMenuClick = (item) => {
    navigate(`/${item.key}`);
  }; 
  return (
    <div className="appHeader">
      <Menu
        className="appMenu"
        onClick={onMenuClick}
        mode="horizontal"
        items={[
          {
            label: <HomeFilled />,
            key: "",
          }
        ]}
      />
      <AppCart />
      <Notification />
    </div>
  );
}
function AppCart() {
  const { items, status, error } = useSelector((state) => state.cart)
  const dispatch = useDispatch()

  useEffect(() => {
    const fetchCartData = async () => {
      const cartData = await dispatch(getCart('507f191e810c19729de860ea'));
      // Assuming `cartData.payload` contains the products array
      console.log('cartData: ', cartData.payload.products)
      // if (cartData && cartData.payload) {
        // setCartItems(cartData.payload.products);
      // }
    };
    fetchCartData();
  }, [dispatch]);
  
  console.log('items: ', items)
  return (
    <div>
      <Link to={'/cart'}>
        <Badge
          count={items && items.products ? items.products.length : 0}
          className="soppingCartIcon"
        >
          <ShoppingCartOutlined />
        </Badge>
      </Link>
    </div>
  );
}
export default AppHeader;
