import firebase from 'firebase'

const firebaseConfig = {
    apiKey: "AIzaSyBskCW3Rt1i--SSCzML1Z27gYPlqdaOjMg",
    authDomain: "whatsapp-next-2aca2.firebaseapp.com",
    projectId: "whatsapp-next-2aca2",
    storageBucket: "whatsapp-next-2aca2.appspot.com",
    messagingSenderId: "1085807423115",
    appId: "1:1085807423115:web:3863b887d0861ebb2dae8e"
}

const app = !firebase.apps.length ? firebase.initializeApp(firebaseConfig) : firebase.app()

const db = app.firestore()
const auth = app.auth()
const provider = new firebase.auth.GoogleAuthProvider()

export { db, auth, provider }