import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'

const firebaseConfig = {
  apiKey: "AIzaSyCeFowEnvnZuvr_4h1b2LhO0SOUaQuXBpg",
  authDomain: "async-project-d9e97.firebaseapp.com",
  projectId: "async-project-d9e97",
  storageBucket: "async-project-d9e97.appspot.com",
  messagingSenderId: "260805224657",
  appId: "1:260805224657:web:608a31fc957f6a44193df0"
}

const app = initializeApp(firebaseConfig)
export const auth = getAuth(app);

export default app
