import {
  auth,
  db,
  onAuthStateChanged,
  signInWithEmailAndPassword 
} from "../firebase/app.js"

const register_btn = document.getElementById("register_btn")
const login_form = document.getElementById("login_form")
const signinbtn_login = document.getElementById("signinbtn_login")

register_btn.addEventListener("click",()=>{
 
    window.location.href="../register/index.html"
  })

  login_form.addEventListener("submit", function(e){
    e.preventDefault();
    const email = e.target[0].value;
    const password = e.target[1].value;
    signInWithEmailAndPassword(auth, email, password)
.then((userCredential) => {
  // Signed in 
  const user = userCredential.user;
  window.location.href="../index.html";
  // signinbtn_login.style.display="none"
  // ...
})
.catch((error) => {
  const errorCode = error.code;
  const errorMessage = error.message;
});
  })



 


// console.log("ssf",auth);

// register_btn.addEventListener("click",()=>{
 
//   window.location.href="../register/index.html"
// })


// onAuthStateChanged(auth, (user) => {
//   if (user) {
//     console.log("User Login");
  
//     const uid = user.uid;
//     // ...
//   } else {
//     console.log("User is signed out");

//   }
// });
// function RegisterUserAcount() {
//     createUserWithEmailAndPassword(auth, email_Signup.value, Password.value)
//     .then((userCredential) => {
//       // Signed up 
//       const user = userCredential.user;
//       console.log("User", user);


//       // ...
//     })
//     .catch((error) => {
//       const errorCode = error.code;
//       const errorMessage = error.message;
//       console.log("User not LOgin")
//       alert(error.message)
//       // ..
//     });

// }
