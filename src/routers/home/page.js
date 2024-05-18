import React, {useEffect, useState} from 'react';
import *as Realm from 'realm-web';

import Form from '@rjsf/core';
import validator from '@rjsf/validator-ajv8';
import { Link } from 'react-router-dom';



const app = new Realm.App({id:process.env.REACT_APP_REALM_ID})
const user = app.currentUser

// Schema
const schema = {
  title: 'Register',
  type: 'object',
  required: ['email', 'password'],
  properties: {
    email: { type: 'string', title: 'Email', format: 'email' },
    password: { type: 'string', title: 'Password', minLength: 6, format: 'password'},
  },
};

const Login = {
  title: 'Login',
  type: 'object',
  required: ['email', 'password'],
  properties: {
    email: { type: 'string', title: 'Email', format: 'email' },
    password: { type: 'string', title: 'Password', minLength: 6, format: 'password'},
  },
};
/*
const Sum = {
  title: 'Sum',
  type: 'object',
  required: ['a', 'b'],
  properties: {
    a: { type: 'number', title: 'A'},
    b: { type: 'number', title: 'B'},
  },
};
*/
////////////////////////////////////////////////////////////////////////////
// async
const Home = () => {
  const [Sum, SetSum] = useState({});
  const [total, setTotal] = useState();

  const [showRegisterForm, setShowRegisterForm] = useState(false);

  //
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const [cartCount, setCartCount] = useState(0);
  const [cartItems, setCartItems] = useState([]);

  const [ , setProductCounts] = useState({});
  const [ , setProducttotalPay] = useState({});
  
  //

  useEffect(() => {
    fetchData();
    
  },[])

  const fetchData = async() =>{
    const functionName = "module"
    try {
      const res = await user.callFunction(functionName)
      SetSum(res[0]?.public?.input?.jsonSchema)
      console.log(res)

    } catch (error) {
      console.log(error.error)  
    }
  }

  useEffect(() => {
    fetchData1();
  }, [])

  const fetchData1 = async () => {
    try {
      const functionName = "getAllProducts";
      const result = await app.currentUser.callFunction(functionName);
      setProducts(result);
      setLoading(false);
    } catch (error) {
      console.log(error.error);
      setLoading(false);
    }
  }
  const addToCart = async (productId) => {
    try {
      // Gọi hàm để lấy thông tin chi tiết của sản phẩm từ máy chủ
      const product = await getProductDetails(productId);
  
      // Kiểm tra xem sản phẩm có tồn tại không
      if (!product) {
        throw new Error("Không tìm thấy thông tin sản phẩm.");
      }
  
      // Tiến hành các hành động liên quan đến giỏ hàng với thông tin sản phẩm đã lấy được
      console.log('Thông tin sản phẩm...:', product);
  
      // Cập nhật giỏ hàng
      setCartCount(cartCount + 1);
      setCartItems([...cartItems, { id: product._id, productName: product.productName }]);

      // Cập nhật số lượng sản phẩm được thêm vào giỏ hàng
      setProductCounts(prevCounts => {
        const updatedCounts = { ...prevCounts };
        updatedCounts[productId] = (updatedCounts[productId] || 0) + 1;
        //console.log(productCounts);
        return updatedCounts;
          
      });
      // Cập nhật số lượng sản phẩm được thêm vào giỏ hàng
      setProducttotalPay(prevCounts => {
        const updatedtotalPay = { ...prevCounts };
        //updatedtotalPay[productId] = (updatedtotalPay[productId] || 0) + 1;
        //console.log(productCounts);
        return updatedtotalPay;
          
      });
    } catch (error) {
      console.error('Lỗi khi thêm vào giỏ hàng:', error);
      // Xử lý lỗi ở đây, ví dụ: hiển thị thông báo lỗi cho người dùng
    }
  };
    // Hàm để lấy thông tin chi tiết của sản phẩm từ cơ sở dữ liệu hoặc ngữ cảnh của bạn
    const getProductDetails = async (productId) => {

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
  //Register
  const Register = async (form) =>{

    const {email, password} = form?.formData

    try {

      await app.emailPasswordAuth.registerUser({email, password});
      console.log("Đăng ký thành công")
      window.location.reload(true)

    } catch (error) {
      console.log(error.error)
    }
  }

  //Login
    const Loginn = async (form) =>{

      const {email, password} = form?.formData
  
      try {
        // Create an API Key credential
        const credentials = Realm.Credentials.emailPassword(email, password);
        // Authenticate the user
        await app.logIn(credentials);
        console.log("Đăng nhập thành công:");
        window.location.reload(true)
  
      } catch (error) {
        console.log(error.error)
        window.alert("Sai thông tin đăng nhập!")

      }
  }

   //LogOut
   const logOut = async () =>{

    try {
      // Authenticate the user
      await user.logOut();
      console.log("Đăng xuất thành công:");
      window.location.reload(true)

    } catch (error) {
      console.log(error.error)
    }
}

//GetValue
const GetValue = async () =>{
  const functionName = "get";

  try {
    const result = await user.callFunction(functionName);
    console.log(result)

  } catch (error) {
    console.log(error.error)
  }
}

//Sum
const OnSum = async (form) =>{
  const functionName = "SUMAB";
  const args = [form?.formData, user.id]

  try {
    const res = await user.callFunction(functionName, ...args);
    setTotal(res[0]?.public?.output?.total)
    console.log(res[0]?.public?.output?.total)
    console.log(res)

  } catch (error) {
    console.log(error.error)
  }
}
///////////////////////////////////////////////////////////////////////////////////
  //Return Result
  return (
    <div>
      {user? (
        
      <div>home
        <button className="btn_button" onClick={logOut}>Đăng xuất</button>
        <button className="btn_button" onClick={GetValue}>Gọi Function</button>

        <Form 
          schema={Sum}
          validator={validator}
          onSubmit={OnSum}
        />
       
        <p>Kết quả là: {total}</p>
      
        {/* Kiểm tra isLoading để xem liệu dữ liệu sản phẩm đang được tải hay không */}
        {loading ? (
          <p>Đang tải sản phẩm...</p>
        ) : (
         <div className='product'>
              <div className="cart-icon">
              {/* Sử dụng Link để điều hướng đến trang giỏ hàng */}
              <Link to={"/cart"}>
                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRNjsW9hOm9ohsN9Mzhpc-BA-L1hRFAX_GV_rpBrO3GDbrniV0UUD76niBFTA&s" alt='img_cart_icon'></img>
                <span className="cart-count">{cartCount}</span>
              </Link>
          </div>
            <ul>
              {/* Duyệt qua danh sách sản phẩm và hiển thị */}
              {products.map((product) => (
                <li key={product._id}>
                    <img src={product.imageUrl} alt={product.productName} />
                    <h2>{product.productName}</h2>
                    <p>{product.productType}</p>
                    <p>Giá: ${product.sellingPrice}</p>
                    <p>Số lượng: {product.quantity}</p>
                    <button className="add-to-cart-btn" onClick={() => addToCart(product._id)}>Thêm vào giỏ hàng</button>
                </li>
              ))}
            </ul>
          </div>
        )}
    </div>

      ) : (
      <div className="overlay-container">
        <div className="overlay-content">
          <div className='container_form'>
          {!showRegisterForm ? (
            <>
              <button className="button1" onClick={() =>
                setShowRegisterForm(true)}>Đăng ký</button>

              <Form
                className="custom-form"
                schema={Login}
                validator={validator}
                onSubmit={Loginn}
              />
            </>
          ) : (
              <>
                <button className="button1" onClick={() => 
                  setShowRegisterForm(false)}>Quay lại</button>
                <Form
                  className="custom-form"
                  schema={schema}
                  validator={validator}
                  onSubmit={Register}
                />
              </>
            )}
      </div>
    </div>
    </div>
      )}
      
    </div>  
  )
};

export default Home;