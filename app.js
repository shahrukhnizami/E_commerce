import{onAuthStateChanged,
    auth,
    signOut,
    getDoc,
    doc,
    db,
    collection,
    onSnapshot ,

} from "../firebase/app.js"


const logOut_btn = document.getElementById("logOut_btn")
const signinbtn_login = document.getElementById("signinbtn_login")
const register_name = document.getElementById("register_name")
const register_image = document.getElementById("register_image")
const registerbtn_login = document.getElementById("registerbtn_login")
const all_products = document.getElementById("all_products")
const men_category = document.getElementById("men")
// console.log(register_user);
// logOut_btn.style.display="none"

// men_category.addEventListener("click",function(){getRealtimeProducts(e.target.value);})

getRealtimeProducts();
function getRealtimeProducts(){


  // const add_product_ref= doc(db,"Products","")

  // console.log(add_product_ref);
  // console.log("data Base",collection,"Products",i);
  const q = collection(db,"Products");
  const unsub = onSnapshot(q, (snapshot) => {
    const source = snapshot.metadata.hasPendingWrites ? "Local" : "Server";
    console.log(source, " data: ", snapshot);
    all_products.innerHTML = "";
    snapshot.forEach((doc) => {
      console.log("doc->", doc.p_title, doc.data());
      const { p_image, p_title, p_dec, p_price } = doc.data();
      const productview =`
      <div class="product-item men">
							<div class="product product_filter">
								<div class="product_image">
									<img src="${p_image}" alt="">
								</div>
								<div class="favorite"></div>
								<div class="product_info">
									<h6 class="product_name"><a href="single.html">${p_title}</a></h6>
									<div class="product_price">$${p_price}</div>
								</div>
							</div>
							<div class="red_button add_to_cart_button"><a href="#">add to cart</a></div>
						</div>
    `
      all_products.innerHTML += productview;

  });
  });
}





function getRealtimeProducts1() {




  // const q = query(collection(db, "Products"));
  const unsub = onSnapshot(query(collection(db, "Products")), (snapshot) => {
    const source = doc.metadata.hasPendingWrites ? "Local" : "Server";
    console.log(source, " data: ", snapshot);
    all_products.innerHTML = "";
    snapshot.forEach((doc) => {
      console.log("doc->", doc.id, doc.data());
      const { p_image, p_title, p_dec, P_price } = doc.data();
      const productview =`
      <div class="product discount product_filter">
        <div class="product_image">
          <img src="${img}" alt="">
        </div>
        <div class="favorite favorite_left"></div>
        <div class="product_bubble product_bubble_right product_bubble_red d-flex flex-column align-items-center"><span>-$20</span></div>
        <div class="product_info">
          <h6 class="product_name"><a href="single.html">${title}</a></h6>
          <div class="product_price">${price}<span>$590.00</span></div>
        </div>
      </div>
      <div class="red_button add_to_cart_button"><a href="#">add to cart</a></div>
    `
      all_products.innerHTML += productview;
    });
  });
  // const q = query(collection(db, "Products"));
  // const unsub = onSnapshot(q, (snapshot) => {
  //   const source = snapshot.metadata.hasPendingWrites ? "Local" : "Server";
  //   console.log(source, " Products/", snapshot);
  //   all_products.innerHTML = "";
  //   snapshot.forEach((doc) => {
  //     console.log("doc->", doc.id, doc.data());
  //     const { img,title, price, } = doc.data();
  //     const productview =`
  //     <div class="product discount product_filter">
  //       <div class="product_image">
  //         <img src="${img}" alt="">
  //       </div>
  //       <div class="favorite favorite_left"></div>
  //       <div class="product_bubble product_bubble_right product_bubble_red d-flex flex-column align-items-center"><span>-$20</span></div>
  //       <div class="product_info">
  //         <h6 class="product_name"><a href="single.html">${title}</a></h6>
  //         <div class="product_price">${price}<span>$590.00</span></div>
  //       </div>
  //     </div>
  //     <div class="red_button add_to_cart_button"><a href="#">add to cart</a></div>
  //   `
  //   all_products.innerHTML += productview;
  //   });
  // });
}







onAuthStateChanged(auth, (user) => {
    if (user) {
        console.log("User Is Login");
        signinbtn_login.style.display="none"
        registerbtn_login.style.display="none"
        logOut_btn.style.display="block"
        // register_name.innerText= register_name;      //   window.location.href = "index.html"
      // User is signed in, see docs for a list of available properties
      // https://firebase.google.com/docs/reference/js/auth.user
      const uid = user.uid;
      register_info(uid)
    
      // ...
    } else {
        console.log("User is not Login");
        logOut_btn.style.display="none"
        signinbtn_login.style.display="block"
        registerbtn_login.style.display="block"
        register_image.style.display="none"
      // User is signed out
      // ...
    }
  });


  function register_info(uid){
    const register_user_ref = doc(db,"regiter_user",uid)
    getDoc(register_user_ref).then((data)=>{
        console.log("data", data.id);
        console.log("data", data.data());
        console.log("data", data.data().name);
        register_name.innerText= data.data().name
        register_image.src=data.data().image
        
    })
  }

  logOut_btn.addEventListener("click",()=>{
    signOut(auth).then(()=>{
        window.location.href="index.html"
    })
  })