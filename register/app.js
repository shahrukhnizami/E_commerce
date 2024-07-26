import{auth,
    onAuthStateChanged,
    createUserWithEmailAndPassword, 
    doc, 
    setDoc,
    db,
    storage,
    ref, 
    getDownloadURL,
    uploadBytes,
} from "../firebase/app.js"

const register_form = document.getElementById("register_form")
const register_btn = document.getElementById("register_btn")

register_form.addEventListener("submit", function(e){
  e.preventDefault();
  console.log(e);
  const image = e.target[0].files[0];
  const name = e.target[1].value;
  const email = e.target[2].value;
  const pasword = e.target[3].value;
  const confrmpasword = e.target[3].value;
  
  // console.log("image===>",img);
  const register_info = {
    image,
    name,
    email,
    pasword,
    confrmpasword
  };
 
  // Create Acount
  register_btn.ariaDisabled= true;
  register_btn.innerText="Please Wait .....";
  createUserWithEmailAndPassword( auth,email,pasword).then((user)=>{
    console.log("User Id",user.user.uid);
    
    // Upload Image
    const register_user_ref= ref(storage,`regiter_user/${user.user.uid}`);
    uploadBytes(register_user_ref, image).then(()=>{
            console.log("User Image is Uploaded");
            // Download Image Link
            getDownloadURL(register_user_ref)
            .then((url)=>{console.log("Url mil gaya ",url);
                // updated Object
              register_info.image = url;
               // Created User Doc Reference
              const register_user_ref= doc(db,"regiter_user",user.user.uid)
              // set thid Doc to Db
              setDoc(register_user_ref,register_info).then(()=>{
                console.log("User Object Updated into db");
                window,location.href = "/signIn/index.html"
                
              })
               



            })
            .catch(error => console.log("Image Url Nhi Mil raha",error))
          
          
          
          })
            .catch(()=>{console.log("Eror in uploading image");})


  })
  .catch((error)=>{alert(error);})
  console.log(register_info);
  })
  
// Create Acount
// register_btn.ariaDisabled= true;
// register_btn.innerText="..Please Wait";

  // createUserWithEmailAndPassword( auth, email,pasword) .then((user)=>{
  //   console.log("User Id=>>",user.user.uid);
    // Upload Image

    // const register_user_ref= ref(storage,`regiter_user/${user.user.uid}`);
    // // Upload Image
    //     uploadBytes(register_user_ref, image).then(()=>{
    //       console.log("User Image is Uploaded");
    //       // Download Image Link
    //           getDownloadURL(register_user_ref).then((url)=>{console.log("Url Is Build",url)
    //             // updated Object
    //           register_info.image = url;
    //           // Created User Doc Reference
    //           const registerDbRef = doc(db,"register_users",user.user.uid)
    //           // set doc to db
    //           setDoc(registerDbRef,register_info).then(()=>{console.log("user object is Updated in db");
    //                     // window.location.href="./signIn/index.html";
                       
    //                   })
                      

    //           })
    //           .catch((error)=>{console.log("Firebase Url Nhi de raha",error);
                       
    //           })
              
    //     })
    //     .catch((err)  => {console.log("Error In Uploading Image",err);})
    
   

//   }).catch((error)=> alert(error))

// })



// onAuthStateChanged(auth, (user) => {
//   if (user) {
//     console.log("User Login");
//     // User is signed in, see docs for a list of available properties
//     // https://firebase.google.com/docs/reference/js/auth.user
//     const uid = user.uid;
//     // ...
//   } else {
//     console.log("User is signed out");
//     // window.location.href = "/index.html"
//     // User is signed out
//     // ...
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
//       window.location.href = "./in"
//       alert(error.message)
//       // ..
//     });

// }
