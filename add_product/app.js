import{
  //   auth,
//     onAuthStateChanged,
//     createUserWithEmailAndPassword, 
    doc, 
    setDoc,
    db,
    storage,
    ref, 
    getDownloadURL,
    uploadBytes,
} from "../firebase/app.js"




const add_product_form = document.getElementById("add_product_form")
const upload_btn = document.getElementById("Upload_btn")

add_product_form.addEventListener("submit", function(e){
  e.preventDefault();
  console.log(e);
  const p_image = e.target[0].files[0];
  const p_title = e.target[1].value;
  const p_dec = e.target[2].value;
  const p_price = e.target[3].value;
  const P_category = e.target[4].value;
  
  console.log("image===>",p_image);
  console.log("P_category===>",P_category);
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
    const add_product_ref= ref(storage,`product/${p_title}`);
    uploadBytes(add_product_ref,     p_image ).then(()=>{
            console.log("Product Image is Uploaded");
            // Download Image Link
            getDownloadURL(add_product_ref)
            .then((url)=>{console.log("Url mil gaya ",url);
                // updated Object
                produt_info.p_image = url;
//                // Created User Doc Reference
              const add_product_ref= doc(db,"Products",p_title)
//               // set thid Doc to Db
              setDoc(add_product_ref,produt_info).then(()=>{
                console.log("User Object Updated into db");
                console.log("User Object",produt_info);
//                 window,location.href = "/signIn/index.html"
                
              })
               



            })
            .catch(error => console.log("Image Url Nhi Mil raha",error))
          
          
          
          })
            .catch(()=>{console.log("Eror in uploading image");})


//   })
//   .catch((error)=>{alert(error);})
//   console.log(register_info);
  })
  
// // Create Acount
// // register_btn.ariaDisabled= true;
// // register_btn.innerText="..Please Wait";

//   // createUserWithEmailAndPassword( auth, email,pasword) .then((user)=>{
//   //   console.log("User Id=>>",user.user.uid);
//     // Upload Image

//     // const register_user_ref= ref(storage,`regiter_user/${user.user.uid}`);
//     // // Upload Image
//     //     uploadBytes(register_user_ref, image).then(()=>{
//     //       console.log("User Image is Uploaded");
//     //       // Download Image Link
//     //           getDownloadURL(register_user_ref).then((url)=>{console.log("Url Is Build",url)
//     //             // updated Object
//     //           register_info.image = url;
//     //           // Created User Doc Reference
//     //           const registerDbRef = doc(db,"register_users",user.user.uid)
//     //           // set doc to db
//     //           setDoc(registerDbRef,register_info).then(()=>{console.log("user object is Updated in db");
//     //                     // window.location.href="./signIn/index.html";
                       
//     //                   })
                      

//     //           })
//     //           .catch((error)=>{console.log("Firebase Url Nhi de raha",error);
                       
//     //           })
              
//     //     })
//     //     .catch((err)  => {console.log("Error In Uploading Image",err);})
    
   

// //   }).catch((error)=> alert(error))

// // })



// // onAuthStateChanged(auth, (user) => {
// //   if (user) {
// //     console.log("User Login");
// //     // User is signed in, see docs for a list of available properties
// //     // https://firebase.google.com/docs/reference/js/auth.user
// //     const uid = user.uid;
// //     // ...
// //   } else {
// //     console.log("User is signed out");
// //     // window.location.href = "/index.html"
// //     // User is signed out
// //     // ...
// //   }
// // });
// // function RegisterUserAcount() {
// //     createUserWithEmailAndPassword(auth, email_Signup.value, Password.value)
// //     .then((userCredential) => {
// //       // Signed up 
// //       const user = userCredential.user;
// //       console.log("User", user);


// //       // ...
// //     })
// //     .catch((error) => {
// //       const errorCode = error.code;
// //       const errorMessage = error.message;
// //       console.log("User not LOgin")
// //       window.location.href = "./in"
// //       alert(error.message)
// //       // ..
// //     });

// // }
