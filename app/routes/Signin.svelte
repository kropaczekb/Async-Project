<script>
  import app from '../../src/index';
  import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

  let email = '';
  let password = '';

  const signIn = async (email, password) => {
    try {
      const auth = getAuth();
      const userCredential = await signInWithEmailAndPassword(auth, email, password)
      const user = userCredential.user
    } catch (error) {
        console.error(error.code);
        console.error(error.message);
    };
  }
</script>

<h2>Signin</h2>
<form on:submit|preventDefault={signIn(email, password)}>
  <input bind:value={email}>
  <input bind:value={password}>
  <button type="submit">Sign in</button>
</form>
