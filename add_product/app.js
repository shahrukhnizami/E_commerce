import {
  auth,
  getDoc,
  onAuthStateChanged,
  //     createUserWithEmailAndPassword, 
  doc,
  setDoc,
  db,
  storage,
  ref,
  getDownloadURL,
  uploadBytes,
} from "../firebase/app.js"



const register_name = document.getElementById("register_name")
const register_image = document.getElementById("register_image")
const add_product_form = document.getElementById("add_product_form")
const logOut_btn = document.getElementById("logOut_btn")
const upload_btn = document.getElementById("Upload_btn")
const msgupload = document.getElementById("msgupload")
const loading = document.getElementById("loading")
// const add_P = document.getElementById("add_P")

add_product_form.addEventListener("submit", function (e) {

  e.preventDefault();
  console.log(e);
  const p_image = e.target[0].files[0];
  const p_title = e.target[1].value;
  const p_dec = e.target[2].value;
  const p_price = e.target[3].value;
  const P_category = e.target[4].value;

  console.log("image===>", p_image);
  console.log("P_category===>", P_category);
  const produt_info = {
    p_image,
    p_title,
    p_dec,
    p_price,
    P_category
  };

  //   // Create Acount
  //   register_btn.ariaDisabled= true;
  //   register_btn.innerText="Please Waite Creat Your Acount .....";
  //   createUserWithEmailAndPassword( auth,email,pasword).then((user)=>{
  //     console.log("User Id",user.user.uid);

  // Upload Image


  const add_product_ref = ref(storage, `product/${p_title}`);
  uploadBytes(add_product_ref, p_image).then(() => {
    console.log("Product Image is Uploaded");
    // Download Image Link
    getDownloadURL(add_product_ref)
      .then(
        (url) => {
          loading.style.display="block"
             upload_btn.style.display="none"
        console.log("Url mil gaya ", url);
        // updated Object
        produt_info.p_image = url;
        //                // Created User Doc Reference
        const add_product_ref = doc(db, "Products", p_title)
        //               // set thid Doc to Db
             
        setDoc(add_product_ref, produt_info).then(() => {
          console.log("User Object Updated into db");
          console.log("User Object", produt_info);
           upload_btn.style.display="block"
           loading.style.display="none"
          //                 window,location.href = "/signIn/index.html"
          msgupload.style.display = "block"
        

        })




      })
      .catch(error => console.log("Image Url Nhi Mil raha", error))



  })
    .catch(() => { console.log("Eror in uploading image"); })


  //   })
  //   .catch((error)=>{alert(error);})
  //   console.log(register_info);
})



onAuthStateChanged(auth, (user) => {
  if (user) {
    console.log("User Is Login");
    signinbtn_login.style.display = "none"
    registerbtn_login.style.display = "none"
    logOut_btn.style.display = "block"

    // register_image.style.display="block"
    // add_P.style.visibility="display"
    // register_name.innerText= ;      //   window.location.href = "index.html"
    // User is signed in, see docs for a list of available properties
    // https://firebase.google.com/docs/reference/js/auth.user
    const uid = user.uid;
    register_info(uid)

    // ...
  } else {
    console.log("User is not Login");
    console.log("User is not Logcjdkfnsklnflin");
    window.location.href = "..//index.html"
    logOut_btn.style.display = "none"
    signinbtn_login.style.display = "block"
    registerbtn_login.style.display = "block"

    // register_image.style.display="none"

    // add_P.style.visibility="hidden"

    // User is signed out
    // ...
  }
});


function register_info(uid) {
  const register_user_ref = doc(db, "regiter_user", uid)
  getDoc(register_user_ref).then((data) => {
    console.log("data", data.id);
    console.log("data", data.data());
    console.log("data", data.data().name);
    register_name.innerText = data.data().name
    register_image.src = data.data().image

  })
}

