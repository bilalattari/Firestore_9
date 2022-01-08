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
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

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
const app = initializeApp(firebaseConfig);
const auth = getAuth();
const analytics = getAnalytics(app);
const listContainer = document.getElementById("list_container");
const db = getFirestore();
const studentForm = document.getElementById("add");
const registerForm = document.getElementById("register");
const studentsColRef = collection(db, "student");

studentForm.addEventListener("submit", (e) => {
  e.preventDefault();

  addDoc(studentsColRef, {
    name: studentForm.name.value,
    marks: studentForm.marks.value,
    class: studentForm.class.value,
  }).then(() => {
    studentForm.reset();
  });
});

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
      // ...
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      // ..
    });
};

const addListItem = (obj) => {
  const li = document.createElement("li");
  const txt = document.createElement("span");
  txt.append(obj.name);
  const btn = document.createElement("button");
  btn.append("Delete");
  btn.setAttribute("id", obj.id);
  li.append(txt);
  li.append(btn);
  listContainer.appendChild(li);

  btn.addEventListener("click", (e) => deleteDocument(e.target.id));
};

const unsubscribe = onSnapshot(
  studentsColRef,
  (snapshot) => {
    let students = [];
    snapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      students.push({ id: doc.id, ...doc.data() });
      // addListItem({ id: doc.id, ...doc.data() });
    });

    showTheStudents(students);
  },
  (error) => {
    console.log("No such document!");
  }
);

const showTheStudents = (arr) => {
  listContainer.innerHTML = null;
  arr.map((data) => addListItem(data));
};

const deleteDocument = async (id) => {
  console.log("id=>", id);
  const deleted = await deleteDoc(doc(db, "student", id));
  console.log("deleted=>", deleted);
};
