import{onAuthStateChanged,
    auth,
    signOut,
    getDoc,
    doc,
    db,

} from "../firebase/app.js"


const logOut_btn = document.getElementById("logOut_btn")
const signinbtn_login = document.getElementById("signinbtn_login")
const register_name = document.getElementById("register_name")
const register_image = document.getElementById("register_image")
const registerbtn_login = document.getElementById("registerbtn_login")
// console.log(register_user);
// logOut_btn.style.display="none"
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