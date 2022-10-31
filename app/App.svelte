<script>
  import app from '../src/index'
  import Googlesignin from './routes/Googlesignin.svelte';
  import Signin from './routes/Signin.svelte';
  import Signup from './routes/Signup.svelte';
  import PixelArt from './routes/PixelArt.svelte'
  import { getAuth, onAuthStateChanged, signOut, updateCurrentUser } from 'firebase/auth';
  import { Router, Route, Link } from "svelte-routing";
  import Chatbox from './routes/Chatbox.svelte';
  export let url = "/";
  let user;
  let signedin;
  const auth = getAuth(app)
  let envVariable = process.env.foo;
  const loginObserver = (user) => {
    if (user) {
      signedin = true;
    } else {
      signedin = false;
    }
  }
  onAuthStateChanged(auth, loginObserver);
</script>

<Router url="{url}">
  <nav id="nav-bar">
    <h1>Pixel Chat Rooms</h1>
    <Link to="/">Home</Link>
    {#if signedin}
      {#if auth.currentUser.displayName}
        <div>Hello {auth.currentUser.displayName}</div>
        <img src={auth.currentUser.photoURL} alt="User" />
      {/if}
    <button id="sign-out" on:click={() => signOut(auth)}>Sign out</button>
    {:else}
    <Link to="signin">Sign in</Link>
    <Link to="signup">Sign up</Link>
    {/if}
  </nav>
  <div>
    <Route path="/" component="{PixelArt}" />
    <Route path="signin" component="{Signin}" />
    <Route path="signup" component="{Signup}" />
  </div>
</Router>
<Chatbox />

<style>
  #nav-bar {
    display: flex;
    background-color: grey;
  }
  img {
    width: 20px;
    height: 20px;
    border-radius: 50%;
  }
</style>
