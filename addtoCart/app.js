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
const checkout_items = document.getElementById("checkout_items")

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
