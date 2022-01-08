import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {
  onSnapshot,
  getFirestore,
  getDoc,
  doc,
  setDoc,
  getDocs,
  addDoc,
  collection,
  deleteDoc,
} from "firebase/firestore";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDKTslFoMPcgTeEXnnu9sxxn9rChu6pFrw",
  authDomain: "new-project-4b177.firebaseapp.com",
  projectId: "new-project-4b177",
  storageBucket: "new-project-4b177.appspot.com",
  messagingSenderId: "1006741241233",
  appId: "1:1006741241233:web:143dd7ce76ccadc42b6e30",
  measurementId: "G-VRBDT4KEXE",
};

// Initialize Firebase
let edit = false
const app = initializeApp(firebaseConfig);

const auth = getAuth();

const analytics = getAnalytics(app);
const listContainer = document.getElementById("list_container");

const db = getFirestore();

const studentForm = document.getElementById("add");

const registerForm = document.getElementById("register");
const loginForm = document.getElementById("login");

const studentsColRef = collection(db, "student");

// studentForm.addEventListener("submit", (e) => {
//   e.preventDefault();
//   if (!edit) {
//     console.log('Add wla chala')
//     addDoc(studentsColRef, {
//       name: studentForm.name.value,
//       marks: studentForm.marks.value,
//       class: studentForm.class.value,
//     }).then(() => {
//       studentForm.reset();
//     });
//   }

// });



// const addListItem = (obj) => {
//   const li = document.createElement("li");
//   const txt = document.createElement("span");
//   txt.append(obj.name);
//   const btn = document.createElement("button");
//   const editBtn = document.createElement("button");
//   btn.append("Delete");
//   editBtn.append('Edit')
//   btn.setAttribute("id", obj.id);
//   editBtn.setAttribute("id", obj.id);
//   li.append(txt);
//   li.append(btn);
//   li.append(editBtn);
//   listContainer.appendChild(li);

//   btn.addEventListener("click", (e) => deleteDocument(e.target.id));

//   editBtn.addEventListener("click", (e) => editDocument(e.target.id));
// };

// const unsubscribe = onSnapshot(
//   studentsColRef,
//   (snapshot) => {
//     let students = [];
//     snapshot.forEach((doc) => {
//       students.push({ id: doc.id, ...doc.data() });
//     });
//     console.log('students==>', students)
//     showTheStudents(students);
//   },
//   (error) => {
//     console.log("No such document!");
//   }
// );

// const showTheStudents = (arr) => {
//   listContainer.innerHTML = null;
//   arr.map((data) => addListItem(data));
// };

// const deleteDocument = async (id) => {
//   const deleted = await deleteDoc(doc(db, "student", id));
//   console.log("deleted=>", deleted);
// };

// const editDocument = async (id) => {
//   console.log('id=>', id)
//   edit = true
//   let docRef = doc(db, 'student', id)
//   let studentObj = await getDoc(docRef)
//   studentObj = studentObj.data()
//   studentForm.name.value = studentObj.name
//   studentForm.marks.value = studentObj.marks
//   studentForm.class.value = studentObj.class

//   const btn = studentForm.getElementsByTagName('button')
//   console.log(btn)
//   btn[0].innerText = 'Update Student'
//   btn[0].addEventListener('click', () => {
//     if (edit) {
//       setDoc(docRef, {
//         name: studentForm.name.value,
//         marks: studentForm.marks.value,
//         class: studentForm.class.value,
//       }).then(() => {
//         studentForm.reset();
//       });
//     }

//   })
//   btn[0].innerText = 'Add Student'
//   edit = false
// }


registerForm.addEventListener("submit", (e) => {
  e.preventDefault();
  registerUser(registerForm.email.value, registerForm.password.value);
});

const registerUser = async (email, password) => {
  await createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in
      const user = userCredential.user;
      console.log(user);
      registerForm.reset()
      // ...
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      alert(error.message)
      // ..
    });
};

loginForm.addEventListener("submit", (e) => {
  e.preventDefault();
  loginUser(loginForm.email.value, loginForm.password.value);
});

const loginUser = async (email, password) => {
  await signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      console.log(user);
      alert(user.email)
      loginForm.reset()
      // ...
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      alert(error.message)
      // ..
    });
};