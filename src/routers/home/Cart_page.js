
import React, { useEffect, useState } from 'react';
import * as Realm from 'realm-web';
import { Link } from 'react-router-dom';
import './cart_page.css';

const app = new Realm.App({ id: process.env.REACT_APP_REALM_ID });
const user = app.currentUser


const CartPage = () => {

  const [total, setTotalPay] = useState();
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState([]);

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    address: '',
    phoneNumber: ''
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const functionName = "getProductInCart";
      const result = await app.currentUser.callFunction(functionName);
      // Lặp qua từng sản phẩm và thêm thông tin tổng thanh toán
      const updatedProducts = result.map(product => ({
        ...product,
        totalPay: product.productCounts * product.sellingPrice // Tính toán tổng thanh toán
      }));
      setProducts(updatedProducts);
      setLoading(false);
    } catch (error) {
      console.log(error.error);
    }
  };
  
 // Hàm để lấy thông tin chi tiết của sản phẩm từ cơ sở dữ liệu hoặc ngữ cảnh của bạn
 const getProductDetails_Reduce = async (productId) => {

  try {
    // Thực hiện truy vấn để lấy thông tin sản phẩm từ cơ sở dữ liệu

    const result = await app.currentUser.callFunction("get_Cart_reduce", productId);
    
        // Kiểm tra và loại bỏ các thuộc tính circular structure
    const productWithoutCircular = removeCircular(result);

// Trả về thông tin chi tiết của sản phẩm
return productWithoutCircular;
  } catch (error) {
  console.error('Lỗi khi lấy thông tin sản phẩm:', error);
  throw error;
  }
  };

// Hàm để lấy thông tin chi tiết của sản phẩm từ cơ sở dữ liệu hoặc ngữ cảnh của bạn
const getProductDetails_Add = async (productId) => {

  try {
    // Thực hiện truy vấn để lấy thông tin sản phẩm từ cơ sở dữ liệu

    const result = await app.currentUser.callFunction("getCart", productId);
    
        // Kiểm tra và loại bỏ các thuộc tính circular structure
    const productWithoutCircular = removeCircular(result);

// Trả về thông tin chi tiết của sản phẩm
return productWithoutCircular;
  } catch (error) {
  console.error('Lỗi khi lấy thông tin sản phẩm:', error);
  throw error;
  }
  };
// Hàm loại bỏ circular structure
const removeCircular = (obj) => {
  const seen = new WeakSet();
  const cleanObj = JSON.parse(JSON.stringify(obj, (key, value) => {
    if (typeof value === 'object' && value !== null) {
      if (seen.has(value)) {
        return;
      }
      seen.add(value);
    }
    return value;
  }));
  return cleanObj;
};
const handleReduceProduct = async (productId) => {
  try {
      // Lấy chi tiết sản phẩm từ hàm getProductDetails
      const product = await getProductDetails_Reduce(productId);

      // Nếu sản phẩm tồn tại và có cùng _id với productId
      if (product && product._id.toString() === productId.toString()) {
          // Giảm số lượng mua của sản phẩm trong React state
          product.productCounts = (product.productCounts > 0 ? product.productCounts - 1 : 0);
          product.totalPay      = product.sellingPrice * product.productCounts;

          if (product.productCounts === 0) {
           // Trả về null để không cập nhật sản phẩm trong React state
           fetchData();
           fetchData1();
            return null
          }
          // Gọi hàm cập nhật số lượng mua sản phẩm trên máy chủ
          await updateProductCountOnServer(productId, product.productCounts, product.totalPay);

          // Cập nhật UI với số lượng sản phẩm mới
          setProducts(prevProducts => {
              const updatedProducts = prevProducts.map(prevProduct => {
                  if (prevProduct._id === productId) {
                      return { ...prevProduct, productCounts: product.productCounts, totalPay: product.totalPay };
                  }
                  return prevProduct;
              });

              return updatedProducts;
          });

          console.log(product.productCounts);
          console.log(productId);
      }
      fetchData1();
      return product;
      
  } catch (error) {
      console.log("Lỗi khi cập nhật số lượng sản phẩm:", error);
      // Xử lý lỗi tại đây nếu cần
  }
};

  const handleAddProduct = async (productId) => {
    try {
        // Lấy chi tiết sản phẩm từ hàm getProductDetails
        const product = await getProductDetails_Add(productId);

        // Nếu sản phẩm tồn tại và có cùng _id với productId
        if (product && product._id.toString() === productId.toString()) {
            // Tăng số lượng mua của sản phẩm trong React state
                
          product.productCounts = (product.productCounts || 0) + 1;
          product.totalPay      = product.sellingPrice * product.productCounts;

          if(product.productCounts === product.quantity)
            {
              product.productCounts = product.quantity;
              window.alert("Bạn đã đạt đến giới hạn mua!")
            }
              
            // Gọi hàm cập nhật số lượng mua sản phẩm trên máy chủ
            await updateProductCountOnServer(productId, product.productCounts, product.totalPay);

                  // Cập nhật UI với số lượng sản phẩm mới
            setProducts(prevProducts => {
              const updatedProducts = prevProducts.map(prevProduct => {
                if (prevProduct._id === productId) {
                  return { ...prevProduct, productCounts: product.productCounts, totalPay: product.totalPay};
                }
                return prevProduct;
              });
              
              return updatedProducts;
            });

          console.log(product.productCounts);
          console.log(productId);
        }
        fetchData1();
        return product;
        
    } catch (error) {
        console.log("Lỗi khi cập nhật số lượng sản phẩm:", error);
        // Xử lý lỗi tại đây nếu cần
    }
    
};

  const updateProductCountOnServer = async (productId, productCounts, totalPay) => {
    const functionName = "updateProductCount";
    const args = { productId, productCounts, totalPay };
    try {
      // Gọi hàm của Realm Function để cập nhật số lượng mua sản phẩm trên máy chủ
      await app.currentUser.callFunction(functionName, args);
      console.log("Đã cập nhật số lượng mua sản phẩm trên máy chủ.");
    } catch (error) {
      console.log("Lỗi khi gọi API cập nhật số lượng mua sản phẩm:", error);
      // Ném lỗi nếu không tìm thấy sản phẩm với ID đã cho
      throw(error.error)
    }
  };
///////Make form submit Payment 
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      // Gọi API để lấy thông tin sản phẩm
      const products = await app.currentUser.callFunction("getProductInCart");

    // Tạo một đối tượng Date mới đại diện cho thời gian hiện tại  
      const currentDate = new Date(); 
      const year = currentDate.getFullYear(); // Lấy năm
      const month = currentDate.getMonth() + 1; // Lấy tháng (0 - 11, cần cộng thêm 1 để hiển thị đúng)
      const day = currentDate.getDate(); // Lấy ngày
      const hours = currentDate.getHours(); // Lấy giờ
      const minutes = currentDate.getMinutes(); // Lấy phút

    // Tạo định dạng chuỗi cho ngày và thời gian
      const currentDateTimeString = `${hours}:${minutes} ${day}/${month}/${year} `;
      
    // Tạo một mảng để lưu trữ dữ liệu của tất cả các sản phẩm
      const dataToSend = {
        date: currentDateTimeString,
        user: user.id,
        totalPays: products ? parseFloat(total) : 0,
        products: products.map((product) => ({
          productName: product.productName,
          productType: product.productType,
          productimageUrl: product.imageUrl,
          sellingPrice: product.sellingPrice,
          productCounts: product.productCounts,
          totalPay: product.totalPay
        })),
        fullName: formData.fullName,
        email: formData.email,
        address: formData.address,
        phoneNumber: formData.phoneNumber
      };
  
      // Gửi đối tượng dữ liệu lên server
      const response = await app.currentUser.callFunction("submitPayment", dataToSend);
      //Làm mới giở hàng bằng cách xóa hết sản phẩm chứa trong giở sau khi hoàn tất thanh toán
      const resfresh = await app.currentUser.callFunction("refreshCart");
      console.log(resfresh);
      //Gọi lại API giỏ hàng để lấy dữ liệu làm mới từ server
      fetchData();
      fetchData1();
      console.log(response);

      // Xử lý response từ server (nếu cần)
      

    } catch (error) {
      console.log(error);
    }
  };
  
  

  useEffect(() => {
    fetchData1()
  },[])

  const fetchData1 = async() => {
    const functionName = "cart_module";
    try {
      const res = await user.callFunction(functionName);
      setTotalPay(res?.public?.output?.total.toFixed(2));   
      console.log(res);
    } catch (error) {
      console.log(error.error);
    }
  };
  

  return (
    <div className="cart-page">
      <Link to={"/orderingInformation"}>
        <button className='btn_open_ordering_page'>Đơn hàng</button>
      </Link>
      <div className='containers'>
        {loading ? (
          <p>Đang tải sản phẩm...</p>
        ) : (
          <>
          <ul className='containers_list'>
          <div className="product_list">
          {Array.isArray(products) && products.length > 0 ? (
            products.map((product, index) => (
              <div key={index} className="products">
                <h3>Thông tin sản phẩm {index + 1}:</h3>
                <img src={product.imageUrl} alt={product.imageUrl} />
                <p><strong>Tên sản phẩm:</strong> {product.productName}</p>
                <p><strong>Loại sản phẩm:</strong> {product.productType}</p>
                <p><strong>Số lượng còn lại:</strong> {product.quantity}</p>
                <p><strong>Số lượng mua:</strong> {product.productCounts}</p>
                <button className='btn' onClick={() => handleReduceProduct(product._id)}> - </button>
                <button className='btn'onClick={() => handleAddProduct(product._id)}> + </button>
                <p><strong>Giá bán:</strong> ${product.sellingPrice}</p>
                <p><strong>Tổng thanh toán:</strong> ${product?.totalPay}</p>
              </div>
            ))
          ) : (
            <p>Giỏ hàng chưa có sản phẩm nào</p>
          )}
        </div>
          </ul>
            <form className='information_cart' onSubmit={handleFormSubmit}>
              <input type="text" name="fullName" value={formData.fullName} onChange={handleInputChange} placeholder="Họ và tên" required />
              <input type="email" name="email" value={formData.email} onChange={handleInputChange} placeholder="Email" required />
              <input type="text" name="address" value={formData.address} onChange={handleInputChange} placeholder="Địa chỉ" required />
              <input type="tel" name="phoneNumber" value={formData.phoneNumber} onChange={handleInputChange} placeholder="Số điện thoại" required />
              <p>Tổng thanh toán: ${total}</p>
              <button type="submit" onSubmit={handleFormSubmit}>Thanh toán</button>
            </form>
          </>
        )}
      </div>
    </div>
  );
};

export default CartPage;