"use strict";(self.webpackChunkapp_test=self.webpackChunkapp_test||[]).push([[711,606],{46711:(t,e,s)=>{s.r(e),s.d(e,{default:()=>p});var r=s(65043),a=s(93402),o=s(96244),i=s(40443),n=s(75606),c=s(70579);const l=new a.qw({id:"app-test-dnvhs"}),d=l.currentUser,m={title:"Register",type:"object",required:["email","password"],properties:{email:{type:"string",title:"Email",format:"email"},password:{type:"string",title:"Password",minLength:6,format:"password"}}},h={title:"Login",type:"object",required:["email","password"],properties:{email:{type:"string",title:"Email",format:"email"},password:{type:"string",title:"Password",minLength:6,format:"password"}}},p=()=>{const[t,e]=(0,r.useState)(!1),[s,p]=(0,r.useState)(!0);(0,r.useEffect)((()=>{d&&(async()=>{try{d&&u()}catch(t){console.log(t.error)}})()}),[]);const u=async()=>{if(d)try{await d.logOut(),window.location.reload(!0)}catch(t){console.error("Error logging out:",t)}};return(0,c.jsx)("div",{children:d?(0,c.jsx)(c.Fragment,{children:s?(0,c.jsx)("p",{children:"Loading..."}):(0,c.jsx)(n.default,{})}):(0,c.jsx)("div",{className:"overlay-container",children:(0,c.jsx)("div",{className:"overlay-content",children:(0,c.jsx)("div",{className:"container_form",children:t?(0,c.jsxs)(c.Fragment,{children:[(0,c.jsx)("button",{className:"button1",onClick:()=>e(!1),children:"Quay l\u1ea1i"}),(0,c.jsx)(o.Ay,{className:"custom-form",schema:m,validator:i.Ay,onSubmit:async t=>{const{email:e,password:s}=null===t||void 0===t?void 0:t.formData;try{await l.emailPasswordAuth.registerUser({email:e,password:s}),window.location.reload(!0)}catch(r){console.log(r.error)}}})]}):(0,c.jsxs)(c.Fragment,{children:[(0,c.jsx)("button",{className:"button1",onClick:()=>e(!0),children:"\u0110\u0103ng k\xfd"}),(0,c.jsx)(o.Ay,{className:"custom-form",schema:h,validator:i.Ay,onSubmit:async t=>{const{email:e,password:s}=null===t||void 0===t?void 0:t.formData;try{const t=a.Ji.emailPassword(e,s);await l.logIn(t),p(!1),window.location.href="/app-test"}catch(r){console.log(r.error)}}})]})})})})})}},75606:(t,e,s)=>{s.r(e),s.d(e,{default:()=>p});var r=s(65043),a=s(93402),o=s(96244),i=s(40443),n=s(35475),c=s(70579);const l=new a.qw({id:"app-test-dnvhs"}),d=l.currentUser,m={title:"Register",type:"object",required:["email","password"],properties:{email:{type:"string",title:"Email",format:"email"},password:{type:"string",title:"Password",minLength:6,format:"password"}}},h={title:"Login",type:"object",required:["email","password"],properties:{email:{type:"string",title:"Email",format:"email"},password:{type:"string",title:"Password",minLength:6,format:"password"}}},p=()=>{const[t,e]=(0,r.useState)(!1),[s,p]=(0,r.useState)([]),[u,g]=(0,r.useState)(!0),[w,y]=(0,r.useState)(0),[j,x]=(0,r.useState)([]),[,f]=(0,r.useState)({}),[,v]=(0,r.useState)({});(0,r.useEffect)((()=>{d&&N()}),[]);const N=async()=>{try{const t="getAllProducts",e=await l.currentUser.callFunction(t);p(e),g(!1)}catch(t){console.log(t.error),g(!1)}},b=async t=>{try{const e=await l.currentUser.callFunction("getCart",t);return S(e)}catch(e){throw console.error("L\u1ed7i khi l\u1ea5y th\xf4ng tin s\u1ea3n ph\u1ea9m:",e),e}},S=t=>{const e=new WeakSet;return JSON.parse(JSON.stringify(t,((t,s)=>{if("object"===typeof s&&null!==s){if(e.has(s))return;e.add(s)}return s})))};return(0,c.jsx)("div",{children:d?(0,c.jsx)("div",{children:u?(0,c.jsx)("p",{children:"\u0110ang t\u1ea3i s\u1ea3n ph\u1ea9m..."}):(0,c.jsxs)("div",{className:"product",children:[(0,c.jsx)("div",{className:"cart-icon",children:(0,c.jsxs)(n.N_,{to:"/cart",children:[(0,c.jsx)("img",{src:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRNjsW9hOm9ohsN9Mzhpc-BA-L1hRFAX_GV_rpBrO3GDbrniV0UUD76niBFTA&s",alt:"img_cart_icon"}),(0,c.jsx)("span",{className:"cart-count",children:w})]})}),(0,c.jsx)("ul",{children:s.map((t=>(0,c.jsxs)("li",{children:[(0,c.jsx)("img",{src:t.imageUrl,alt:t.productName}),(0,c.jsx)("h2",{children:t.productName}),(0,c.jsx)("p",{children:t.productType}),(0,c.jsxs)("p",{children:["Gi\xe1: $",t.sellingPrice]}),(0,c.jsxs)("p",{children:["S\u1ed1 l\u01b0\u1ee3ng: ",t.quantity]}),(0,c.jsx)("button",{className:"add-to-cart-btn",onClick:()=>(async t=>{try{const e=await b(t);if(!e)throw new Error("Kh\xf4ng t\xecm th\u1ea5y th\xf4ng tin s\u1ea3n ph\u1ea9m.");y(w+1),x([...j,{id:e._id,productName:e.productName}]),f((e=>{const s={...e};return s[t]=(s[t]||0)+1,s})),v((t=>({...t})))}catch(e){console.error("L\u1ed7i khi th\xeam v\xe0o gi\u1ecf h\xe0ng:",e)}})(t._id),children:"Th\xeam v\xe0o gi\u1ecf h\xe0ng"})]},t._id)))})]})}):(0,c.jsx)("div",{className:"overlay-container",children:(0,c.jsx)("div",{className:"overlay-content",children:(0,c.jsx)("div",{className:"container_form",children:t?(0,c.jsxs)(c.Fragment,{children:[(0,c.jsx)("button",{className:"button1",onClick:()=>e(!1),children:"Quay l\u1ea1i"}),(0,c.jsx)(o.Ay,{className:"custom-form",schema:m,validator:i.Ay,onSubmit:async t=>{const{email:e,password:s}=null===t||void 0===t?void 0:t.formData;try{await l.emailPasswordAuth.registerUser({email:e,password:s}),window.location.reload(!0)}catch(r){console.log(r.error)}}})]}):(0,c.jsxs)(c.Fragment,{children:[(0,c.jsx)("button",{className:"button1",onClick:()=>e(!0),children:"\u0110\u0103ng k\xfd"}),(0,c.jsx)(o.Ay,{className:"custom-form",schema:h,validator:i.Ay,onSubmit:async t=>{const{email:e,password:s}=null===t||void 0===t?void 0:t.formData;try{const t=a.Ji.emailPassword(e,s);await l.logIn(t),window.location.reload(!0)}catch(r){console.log(r.error)}}})]})})})})})}}}]);
//# sourceMappingURL=711.c2154141.chunk.js.map