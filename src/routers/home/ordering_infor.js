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
      setProducts(result); // Cập nhật state products với dữ liệu từ server;
      setLoading(false);
    } catch (error) {
      console.log(error.error);
    }
  };

  const handleShowProducts = async (productId) => {
    try {
      // Gọi API để lấy thông tin sản phẩm cụ thể dựa trên productId
      const functionName = "getOrderingInfo";
      const productDetail = await app.currentUser.callFunction(functionName,productId);
      
      // Cập nhật trạng thái của sản phẩm
      setProducts(products.map(product => {
        if (product._id === productId) {
          return { ...product, selected: !product.selected }; // Đảo ngược trạng thái selected
        } else {
          return product;
        }
      }));

      return productDetail;
    } catch (error) {
      console.log(error);
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
                    <h3>Thông tin đơn hàng {index + 1}</h3>
                    <img src={product.imageUrl} alt={product.imageUrl} />
                    <p><strong>Tên khách hàng:</strong> {product.fullName}</p>
                    <p><strong>Id khách hàng:</strong> {product.user}</p>
                    <p><strong>Thời gian đặt:</strong> {product.date}</p>
                    <p><strong>Email:</strong> {product.email}</p>
                    <p><strong>Address:</strong> {product.address}</p>
                    <p><strong>Số điện thoại:</strong> {product.phoneNumber}</p>
                    <p><strong>Tổng thanh toán:</strong> ${product.totalPays}</p>
                    <button onClick={() => handleShowProducts(product._id)}>
                      {product.selected ? "Ẩn" : "Chi tiết"} {/* Thay đổi văn bản của nút */}
                    </button>
                    {product.selected && product.products.map((productlist, productIndex) => (
                      <div key={productIndex}>
                        <p><strong>Sản phẩm {productIndex + 1}</strong></p>
                        <p><strong>Tên sản phẩm:</strong> {productlist.productName}</p>
                        <p><strong>Loại sản phẩm:</strong> {productlist.productType}</p>
                        <p><strong>Giá bán:</strong> ${productlist.sellingPrice}</p>
                        <p><strong>Số lượng mua:</strong> {productlist.productCounts}</p>
                        <p><strong>Tổng thanh toán:</strong> ${productlist.totalPay}</p>
                        {/* Các thông tin khác về sản phẩm */}
                      </div>
                    ))}
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
