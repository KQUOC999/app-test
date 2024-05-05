import React, { useEffect, useState } from 'react';
import * as Realm from 'realm-web';
import './cart_page.css';

const app = new Realm.App({ id: process.env.REACT_APP_REALM_ID });

const OrderingInfoPage = () => {
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const functionName = "getOrderingInfo";
      const result = await app.currentUser.callFunction(functionName);
      setProducts(result); // Cập nhật state products với dữ liệu từ server
      setLoading(false);
    } catch (error) {
      console.log(error.error);
    }
  };

  return (
    <div className="container_OderingPage">
      <div className='containers'>
        {loading ? (
          <p>Đang tải sản phẩm...</p>
        ) : (
          <>
            <div className="product_list">
              {Array.isArray(products) && products.length > 0 ? (
                products.map((product, index) => (
                  <div key={index} className="products">
                    <h3>Thông tin sản phẩm {index + 1}:</h3>
                    <img src={product.imageUrl} alt={product.imageUrl} />
                    <p><strong>Tên khách hàng:</strong> {product.fullName}</p>
                    <p><strong>Id khách hàng:</strong> {product.user}</p>
                    <p><strong>Thời gian đặt:</strong> {product.date}</p>
                    <p><strong>Email:</strong> {product.email}</p>
                    <p><strong>Address:</strong> {product.address}</p>
                    <p><strong>Số điện thoại:</strong> {product.phoneNumber}</p>
                  </div>
                ))
              ) : (
                <p>Giỏ hàng chưa có sản phẩm nào</p>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default OrderingInfoPage;
