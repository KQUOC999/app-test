import React, { useState, useEffect} from 'react';
import * as Realm from 'realm-web';
import Form from '@rjsf/core';
import validator from '@rjsf/validator-ajv8';
import Home from './page';



const app = new Realm.App({ id: process.env.REACT_APP_REALM_ID });
const user = app.currentUser;

const schema = {
  title: 'Register',
  type: 'object',
  required: ['email', 'password'],
  properties: {
    email: { type: 'string', title: 'Email', format: 'email' },
    password: { type: 'string', title: 'Password', minLength: 6, format: 'password' },
  },
};

const loginSchema = {
  title: 'Login',
  type: 'object',
  required: ['email', 'password'],
  properties: {
    email: { type: 'string', title: 'Email', format: 'email' },
    password: { type: 'string', title: 'Password', minLength: 6, format: 'password' },
  },
};

const Logout = () => {
  const [ , setUser] = useState(null);
  const [showRegisterForm, setShowRegisterForm] = useState(false);
  const [loading, setLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Thêm state mới để kiểm tra trạng thái đăng nhập


  useEffect(() => {
    const fetchUser = async () => {
        try {
          // Authenticate the user
          if (user) { // Kiểm tra xem user có tồn tại không trước khi gọi fetchUser
            await user.logOut(); // Trước khi đăng xuất, kiểm tra user có tồn tại
            setIsLoggedIn(false)
            window.location.reload(true)
            return window.location.href = '/app-test'
          }
        } catch (error) {
          console.log(error.error);
        }
    };

    if (user) {
        fetchUser();
      }
      
  }, []); // Thêm logOut vào danh sách dependency của useEffect

  const register = async (form) => {
    const { email, password } = form.formData;
    try {
      await app.emailPasswordAuth.registerUser({ email, password });
      window.location.reload(true);
    } catch (error) {
      console.log(error.error);
    }
  };

  const login = async (form) => {
    const { email, password } = form.formData;
    try {
      const credentials = Realm.Credentials.emailPassword(email, password);
      const loggedInUser = await app.logIn(credentials);
      setLoading(false);
      setUser(loggedInUser);
      setIsLoggedIn(true); // Đã đăng nhập thành công
      window.location.reload(true);
      window.location.href = '/app-test';
    
    } catch (error) {
      console.log(error.error);
    }
  };

  return (
    <div>
      {user ? (
        <>
          {isLoggedIn && loading ? <p>Loading...</p> : <Home />}
        </>
      ) : (
        <div className="overlay-container">
          <div className="overlay-content">
            <div className="container_form">
              {!showRegisterForm ? (
                <>
                  <button className="button1" onClick={() => setShowRegisterForm(true)}>
                    Đăng ký
                  </button>
                  <Form
                    className="custom-form"
                    schema={loginSchema}
                    validator={validator}
                    onSubmit={login}
                  />
                </>
              ) : (
                <>
                  <button className="button1" onClick={() => setShowRegisterForm(false)}>
                    Quay lại
                  </button>
                  <Form
                    className="custom-form"
                    schema={schema}
                    validator={validator}
                    onSubmit={register}
                  />
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Logout;
