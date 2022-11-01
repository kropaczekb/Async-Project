<script>
  import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
  import app from '../../src/index';
  import { navigate } from 'svelte-routing';

  const auth = getAuth(app)
  auth.languageCode = 'it';
  const provider = new GoogleAuthProvider();
  provider.addScope('https://www.googleapis.com/auth/contacts.readonly');

  const googleSignIn = async (auth, provider) => {
    console.log("google sign in", auth, provider)
    const result = await signInWithPopup(auth, provider)
    const credential = await GoogleAuthProvider.credentialFromResult(result);
    const token = credential.accessToken;
    const user = result.user;
    navigate('/', { replace: true })
  }

</script>

<button on:click={() => googleSignIn(auth, provider)}>Sign in with Google</button>
