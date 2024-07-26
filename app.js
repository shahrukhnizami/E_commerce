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
const add_P = document.getElementById("add_P")
const men_category = document.getElementById("men")
// console.log(register_user);
// logOut_btn.style.display="none"

// men_category.addEventListener("click",function(){getRealtimeProducts(e.target.value);})

getRealtimeProducts();
function getRealtimeProducts(){

  const q = collection(db,"Products");
  const unsub = onSnapshot(q, (snapshot) => {
    const source = snapshot.metadata.hasPendingWrites ? "Local" : "Server";
    console.log(source, " data: ", snapshot);
    all_products.innerHTML = "";
    snapshot.forEach((doc) => {
      // console.log("doc->", doc.p_title, doc.data());
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


men_category.addEventListener("click" ,function ()
   {

    const q = this.querySelector(collection(db,"Products")
    .where("P_category", "==", "men"));

    // const q = collection((db,"Products") .where("P_category", "==", "men"));
    console.log("query",q);
    const unsub = onSnapshot(q, (snapshot) => {
      const source = snapshot.metadata.hasPendingWrites ? "Local" : "Server";
      console.log(source, " data: ", snapshot);
      all_products.innerHTML = "";
      snapshot.forEach((doc) => {
        console.log("doc->", doc.id, doc.data());
        const { p_image, p_title, p_dec, p_price ,p_category} = doc.data();
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
    `;
        all_products.innerHTML += productview;
      });
    });
  
})












onAuthStateChanged(auth, (user) => {
    if (user) {
        console.log("User Is Login");
        signinbtn_login.style.display="none"
        registerbtn_login.style.display="none"
        logOut_btn.style.display="block"
        add_P.style.visibility="display"
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
        add_P.style.visibility="hidden"
        
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