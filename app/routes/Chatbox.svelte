<script>
  import { ref, set, push, onValue, serverTimestamp, query, orderByChild, limitToLast } from 'firebase/database';
  import { getDatabase } from 'firebase/database';
  import app from '../../src/index'
  import { getAuth, onAuthStateChanged } from 'firebase/auth';
  import { onMount } from 'svelte';

  let messageInput = "";
  let messages;
  let recentMessagesQuery;
  const auth = getAuth(app)
  let listOfMessages = [];
  let username;
  let loggedin = false

  onMount(async () => {
    const database = await getDatabase();
    messages = await ref(database, "messages/");
    recentMessagesQuery = await query(messages, orderByChild('timestamp', 'desc'), limitToLast(12));

      const loginObserver = (user) => {
      if (user) {
        username = user.displayName;
        loggedin = true;
      } else {
        username = null;
        loggedin = false;
      }
    }
    onAuthStateChanged(auth, loginObserver);

    onValue(recentMessagesQuery, (snapshot) => {
      let data = snapshot.val();
      listOfMessages = Object.values(data)
    })
  });

  async function sendMessage(messageInput) {
    if (loggedin) {
      const message = messageInput;
      messageInput = "";
      let newMessage = push(messages);
      await set(newMessage, {
        name: username || "Anonymous",
        text: message,
        timestamp: serverTimestamp(),
      })
    } else {
      alert("You must sign in to send messages")
    }
  }
</script>

<div id="sidechat">
  <h2 id="heading" >Firebase RealTime Chat</h2>

  <div id="chat">
    <ul id="messages">
      {#each listOfMessages as messageObj}
        <li id="message">{messageObj.text + " sent by: " + messageObj.name}</li>
      {/each}
    </ul>
    <div id="send-message">
      <form id="message-form" on:submit|preventDefault={() => sendMessage(messageInput)}>
        <input id="message-input" type="text" bind:value={messageInput} />
        <button id="message-btn" type="submit">Send</button>
      </form>
    </div>
  </div>
</div>

<style>

  #sidechat {
    overflow: auto;
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    height: 100%;
    width: 320px;
    position: fixed;
    z-index: 1;
    top: 0; /* Stay at the top */
    right: 0;
    background-color: #111; /* Black */
    overflow-x: hidden; /* Disable horizontal scroll */
    padding-top: 20px;
  }

  #heading{
    justify-content: center;
    color: white;
  }

  #messages{
    align-items: flex-end;
  }

  #message {
	position: relative;
	max-width: 30em;
	background-color: #fff;
	padding: 1.125em 1.5em;
	font-size: 0.75em;
	border-radius: 0.8rem;
  margin-top: .1rem;
  box-shadow:	0 0.125rem 0.5rem rgba(0, 0, 0, .3), 0 0.0625rem 0.125rem rgba(0, 0, 0, .2);
  list-style: none;
  list-style-type: none;
}

#message::before {
	content: '';
	position: absolute;
	width: 0;
	height: 0;
	bottom: 100%;
	left: 1.5em;
	border: .75rem solid transparent;
	border-top: none;

	border-bottom-color: #fff;
	filter: drop-shadow(0 -0.0625rem 0.0625rem rgba(0, 0, 0, .1));
}

#send-message {
  bottom: .3rem;
  margin-right: auto;
  margin-left: auto;
}

</style>
