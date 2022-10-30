<script>
  import { ref, set, push, onValue, serverTimestamp } from 'firebase/database';
  import { getDatabase } from 'firebase/database';
  import db from '../../src/index'
  import user from '../App.svelte'
  let messageInput = "";
  const database = getDatabase();
  let messages = ref(database, 'messages/')

  onValue(messages, (snapshot) => {
    messages = snapshot.val();
  })

  async function sendMessage(messageInput) {
    const message = messageInput;
    messageInput = "";
    // document.scrollIntoView({ behavior: "smooth", block: "end", inline: "nearest" })
    const newMessage = messages.push();
    newMessage.set({
      text: message,
    })
    messageInput = "";
  }
</script>

<h2>Firebase RealTime Chat</h2>

<div id="chat">
  <ul id="messages"></ul>

  <form id="message-form" on:submit|preventDefault={() => sendMessage(messageInput)}>
    <input id="message-input" type="text" bind:value={messageInput} />
    <button id="message-btn" type="submit">Send</button>
  </form>
</div>
