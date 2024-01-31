import { getApp, getApps, initializeApp } from "firebase/app"
import { getStorage } from "firebase/storage"
import { getFirestore } from "firebase/firestore"

const firebaseConfig = {
    apiKey: "AIzaSyBw-aiAVO8h4IUj91um-YkHNLldAGDoqvk",
    authDomain: "dropbox-01.firebaseapp.com",
    projectId: "dropbox-01",
    storageBucket: "dropbox-01.appspot.com",
    messagingSenderId: "153641621979",
    appId: "1:153641621979:web:3c8a7e16b6bacd3812effe"
};

const app = getApps().length ? getApp() : initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app)

export { db, storage };