import { initializeApp } from "firebase/app";
import { getFirestore, doc, setDoc, addDoc, collection, getDoc, getDocs } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyDKTslFoMPcgTeEXnnu9sxxn9rChu6pFrw",
    authDomain: "new-project-4b177.firebaseapp.com",
    projectId: "new-project-4b177",
    storageBucket: "new-project-4b177.appspot.com",
    messagingSenderId: "1006741241233",
    appId: "1:1006741241233:web:143dd7ce76ccadc42b6e30",
    measurementId: "G-VRBDT4KEXE"
};

// Initialize Firebase
const addBtn = document.getElementById('submitBtn')
const app = initializeApp(firebaseConfig);
const db = getFirestore()
let userRef = collection(db, 'user')


const submitDataToFirebase = async () => {
    const name = document.getElementById('name').value
    if (name) {
        let obj = {
            name
        }
        let student = await addDoc(userRef, obj)
        console.log(student.id)
        alert('User data added suucessfully')
        document.getElementById('name').value = ''

    } else {
        alert('Please enter name')
    }
}

addBtn.addEventListener('click', submitDataToFirebase)


// const db = getFirestore()

// get single doc

// const userRef = doc(db, "students", "HPiPCes9K1hMn7gQ6Qlz");

// const userObj = await getDoc(userRef);

// if (userObj.exists()) {
//     console.log("Document data:", userObj.data());
// } else {
//     // doc.data() will be undefined in this case
//     console.log("No such document!");
// }

// get multiple documents

// const studentsCollectionRefrence = collection(db, 'students')
// const studentsList = await getDocs(studentsCollectionRefrence)
// console.log('studentsList==>', studentsList)
// if (!studentsList.empty) {
//     studentsList.forEach((doc) => {
//         // doc.data() is never undefined for query doc snapshots
//         console.log(doc.id, " => ", doc.data());
//     });
// } else {

// }

//add single doc

//automatically id generate hojae or doc add hojae
// const ref = collection(db, 'user')
// const addUser = await addDoc(ref, { name: 'meelad so rha he' })

// console.log('addUser=>', addUser)


//id khud dekar document add karen

// const ref = doc(db, 'user' , '123456789')
// const addUser = await setDoc(ref, { name: 'meelad active hogya he' })

