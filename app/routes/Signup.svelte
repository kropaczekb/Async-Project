<script>
  import app from '../../src/index';
  import { getAuth, createUserWithEmailAndPassword, EmailAuthCredential } from 'firebase/auth';

  let email = '';
  let password = '';
  const signUp = async (email, password) => {
    const auth = getAuth(app);
    try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password)
    const user = userCredential.user;
    } catch (error) {
      console.error(error.message)
      console.error(error.code)
    }
  }
</script>

<style>
  input{
      width: 50%;
      color: rgb(89, 71, 255);
  }
</style>

<h2>Signup</h2>
<form on:submit|preventDefault={()=>signUp(email, password)}>
  <div>
    <input bind:value={email}>
  </div>
  <div>
    <input bind:value={password}>
  </div>
  <button type="submit">Submit</button>
</form>


