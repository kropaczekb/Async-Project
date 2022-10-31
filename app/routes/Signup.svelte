<script>
  import app from '../../src/index';
  import { getAuth, createUserWithEmailAndPassword, EmailAuthCredential, updateProfile } from 'firebase/auth';
  import { navigate } from 'svelte-routing';

  let email = '';
  let password = '';
  let username = '';
  let photo = null;

  const signUp = async (email, username, photo, password) => {
    const auth = getAuth(app);
    try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password)
    const user = userCredential.user;
    await updateProfile(auth.currentUser, {
      displayName: username,
      photoURL: photo || './anonymous.jpg',
    })
    alert("sucess!")
    navigate("/", { replace: true })
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
<form on:submit|preventDefault={()=>signUp(email, username, photo, password)}>
  <div>
    <input bind:value={email}>
  </div>
  <div>
    <input bind:value={username}>
  </div>
  <div>
    <input bind:value={photo}>
  </div>
  <div>
    <input bind:value={password}>
  </div>
  <button type="submit">Submit</button>
</form>


