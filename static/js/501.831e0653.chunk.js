"use strict";(self.webpackChunkapp_test=self.webpackChunkapp_test||[]).push([[501],{86501:(t,n,e)=>{e.r(n),e.d(n,{default:()=>i});var o=e(65043),r=e(93402),a=e(35475),s=(e(53590),e(70579));const c=new r.qw({id:"app-test-dnvhs"}),l=c.currentUser,i=()=>{const[t,n]=(0,o.useState)(),[e,r]=(0,o.useState)(!0),[i,u]=(0,o.useState)([]),[d,p]=(0,o.useState)({fullName:"",email:"",address:"",phoneNumber:""});(0,o.useEffect)((()=>{h()}),[]);const h=async()=>{try{const t="getProductInCart",n=(await c.currentUser.callFunction(t)).map((t=>({...t,totalPay:t.productCounts*t.sellingPrice})));u(n),r(!1)}catch(t){console.log(t.error)}},g=t=>{const n=new WeakSet;return JSON.parse(JSON.stringify(t,((t,e)=>{if("object"===typeof e&&null!==e){if(n.has(e))return;n.add(e)}return e})))},m=async t=>{try{const n=await(async t=>{try{const n=await c.currentUser.callFunction("get_Cart_reduce",t);return g(n)}catch(n){throw console.error("L\u1ed7i khi l\u1ea5y th\xf4ng tin s\u1ea3n ph\u1ea9m:",n),n}})(t);if(n&&n._id.toString()===t.toString()){if(n.productCounts=n.productCounts>0?n.productCounts-1:0,n.totalPay=n.sellingPrice*n.productCounts,0===n.productCounts)return h(),N(),null;await C(t,n.productCounts,n.totalPay),u((e=>e.map((e=>e._id===t?{...e,productCounts:n.productCounts,totalPay:n.totalPay}:e)))),console.log(n.productCounts),console.log(t)}return N(),n}catch(n){console.log("L\u1ed7i khi c\u1eadp nh\u1eadt s\u1ed1 l\u01b0\u1ee3ng s\u1ea3n ph\u1ea9m:",n)}},y=async t=>{try{const n=await(async t=>{try{const n=await c.currentUser.callFunction("getCart",t);return g(n)}catch(n){throw console.error("L\u1ed7i khi l\u1ea5y th\xf4ng tin s\u1ea3n ph\u1ea9m:",n),n}})(t);return n&&n._id.toString()===t.toString()&&(n.productCounts=(n.productCounts||0)+1,n.totalPay=n.sellingPrice*n.productCounts,n.productCounts===n.quantity&&(n.productCounts=n.quantity,window.alert("B\u1ea1n \u0111\xe3 \u0111\u1ea1t \u0111\u1ebfn gi\u1edbi h\u1ea1n mua!")),await C(t,n.productCounts,n.totalPay),u((e=>e.map((e=>e._id===t?{...e,productCounts:n.productCounts,totalPay:n.totalPay}:e)))),console.log(n.productCounts),console.log(t)),N(),n}catch(n){console.log("L\u1ed7i khi c\u1eadp nh\u1eadt s\u1ed1 l\u01b0\u1ee3ng s\u1ea3n ph\u1ea9m:",n)}},C=async(t,n,e)=>{const o={productId:t,productCounts:n,totalPay:e};try{await c.currentUser.callFunction("updateProductCount",o),console.log("\u0110\xe3 c\u1eadp nh\u1eadt s\u1ed1 l\u01b0\u1ee3ng mua s\u1ea3n ph\u1ea9m tr\xean m\xe1y ch\u1ee7.")}catch(r){throw console.log("L\u1ed7i khi g\u1ecdi API c\u1eadp nh\u1eadt s\u1ed1 l\u01b0\u1ee3ng mua s\u1ea3n ph\u1ea9m:",r),r.error}},x=t=>{const{name:n,value:e}=t.target;p({...d,[n]:e})},j=async n=>{n.preventDefault();try{const n=await c.currentUser.callFunction("getProductInCart"),e=new Date,o=e.getFullYear(),r=e.getMonth()+1,a=e.getDate(),s=e.getHours(),i=e.getMinutes(),u={date:"".concat(s,":").concat(i," ").concat(a,"/").concat(r,"/").concat(o," "),user:l.id,totalPays:n?parseFloat(t):0,products:n.map((t=>({productName:t.productName,productType:t.productType,productimageUrl:t.imageUrl,sellingPrice:t.sellingPrice,productCounts:t.productCounts,totalPay:t.totalPay}))),fullName:d.fullName,email:d.email,address:d.address,phoneNumber:d.phoneNumber},p=await c.currentUser.callFunction("submitPayment",u),g=await c.currentUser.callFunction("refreshCart");console.log(g),h(),N(),console.log(p)}catch(e){console.log(e)}};(0,o.useEffect)((()=>{N()}),[]);const N=async()=>{try{var t,e;const o=await l.callFunction("cart_module");n(null===o||void 0===o||null===(t=o.public)||void 0===t||null===(e=t.output)||void 0===e?void 0:e.total.toFixed(2)),console.log(o)}catch(o){console.log(o.error)}};return(0,s.jsx)("div",{className:"cart-page",children:(0,s.jsx)("div",{className:"containers",children:e?(0,s.jsx)("p",{children:"\u0110ang t\u1ea3i s\u1ea3n ph\u1ea9m..."}):(0,s.jsxs)(s.Fragment,{children:[(0,s.jsx)("ul",{className:"containers_list",children:(0,s.jsx)("div",{className:"product_list",children:Array.isArray(i)&&i.length>0?i.map(((t,n)=>(0,s.jsxs)("div",{className:"products",children:[(0,s.jsxs)("h3",{children:["Th\xf4ng tin s\u1ea3n ph\u1ea9m ",n+1,":"]}),(0,s.jsx)("img",{src:t.imageUrl,alt:t.imageUrl}),(0,s.jsxs)("p",{children:[(0,s.jsx)("strong",{children:"T\xean s\u1ea3n ph\u1ea9m:"})," ",t.productName]}),(0,s.jsxs)("p",{children:[(0,s.jsx)("strong",{children:"Lo\u1ea1i s\u1ea3n ph\u1ea9m:"})," ",t.productType]}),(0,s.jsxs)("p",{children:[(0,s.jsx)("strong",{children:"S\u1ed1 l\u01b0\u1ee3ng c\xf2n l\u1ea1i:"})," ",t.quantity]}),(0,s.jsxs)("p",{children:[(0,s.jsx)("strong",{children:"S\u1ed1 l\u01b0\u1ee3ng mua:"})," ",t.productCounts]}),(0,s.jsx)("button",{className:"btn",onClick:()=>m(t._id),children:" - "}),(0,s.jsx)("button",{className:"btn",onClick:()=>y(t._id),children:" + "}),(0,s.jsxs)("p",{children:[(0,s.jsx)("strong",{children:"Gi\xe1 b\xe1n:"})," $",t.sellingPrice]}),(0,s.jsxs)("p",{children:[(0,s.jsx)("strong",{children:"T\u1ed5ng thanh to\xe1n:"})," $",null===t||void 0===t?void 0:t.totalPay]})]},n))):(0,s.jsx)("p",{children:"Gi\u1ecf h\xe0ng ch\u01b0a c\xf3 s\u1ea3n ph\u1ea9m n\xe0o"})})}),(0,s.jsxs)("form",{className:"information_cart",onSubmit:j,children:[(0,s.jsx)("input",{type:"text",name:"fullName",value:d.fullName,onChange:x,placeholder:"H\u1ecd v\xe0 t\xean",required:!0}),(0,s.jsx)("input",{type:"email",name:"email",value:d.email,onChange:x,placeholder:"Email",required:!0}),(0,s.jsx)("input",{type:"text",name:"address",value:d.address,onChange:x,placeholder:"\u0110\u1ecba ch\u1ec9",required:!0}),(0,s.jsx)("input",{type:"tel",name:"phoneNumber",value:d.phoneNumber,onChange:x,placeholder:"S\u1ed1 \u0111i\u1ec7n tho\u1ea1i",required:!0}),(0,s.jsxs)("p",{children:["T\u1ed5ng thanh to\xe1n: $",t]}),(0,s.jsx)("button",{type:"submit",onSubmit:j,children:"Thanh to\xe1n"})]}),(0,s.jsx)(a.N_,{to:"/orderingInformation",children:(0,s.jsx)("button",{className:"btn_open_ordering_page",children:"\u0110\u01a1n h\xe0ng"})})]})})})}},53590:()=>{}}]);
//# sourceMappingURL=501.831e0653.chunk.js.map