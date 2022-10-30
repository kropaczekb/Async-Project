<script>
  import app from '../src/index'
  import Googlesignin from './routes/Googlesignin.svelte';
  import Signin from './routes/Signin.svelte';
  import Signup from './routes/Signup.svelte';
  import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth';
  import { Router, Route, Link } from "svelte-routing";
  import Chatbox from './routes/Chatbox.svelte';
  export let url = "";
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
  <nav>
    <h1>Pixel Chat Rooms</h1>
    <Link to="/">Home</Link>
    <Link to="signin">Sign in</Link>
    <Link to="signup">Sign up</Link>
  </nav>
  <div>
    <!-- <Route path="/"></Route> -->
    <Route path="signin" component="{Signin}" />
    <Route path="signup" component="{Signup}" />
  </div>
</Router>
<Chatbox />

<!--
{#if signedin}
  <a href=""
  <button id="sign-out" on:click={() => signOut(auth)}>Sign out</button>
{:else}
  <Signin />
  <Googlesignin />
  <h4>or</h4>
  <Signup />
{/if} -->
