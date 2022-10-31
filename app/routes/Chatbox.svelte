<script>
  import { ref, set, push, onValue, serverTimestamp, query, orderByChild, limitToFirst } from 'firebase/database';
  import { getDatabase } from 'firebase/database';
    import { onMount } from 'svelte';
    import { loop_guard } from 'svelte/internal';
  import db from '../../src/index'
  import user from '../App.svelte'

  let messageInput = "";
  let messages;
  let recentMessagesQuery;
  let data;
  let listOfMessages = [];

  onMount(async () => {
    const database = await getDatabase();
    messages = await ref(database, "messages/");
    recentMessagesQuery = await query(messages, orderByChild('timestamp', 'desc'), limitToFirst(12));

    onValue(recentMessagesQuery, (snapshot) => {
      let data = snapshot.val();
      listOfMessages = Object.values(data)
    })
  });

  async function sendMessage(messageInput) {
    const message = messageInput;
    messageInput = "";
    let newMessage = push(messages);
    await set(newMessage, {
      name: "placeholder",
      text: message,
      timestamp: serverTimestamp(),
    })
  }
</script>

<h2>Firebase RealTime Chat</h2>

<div id="chat">
  <ul id="messages">
    {#each listOfMessages as messageObj}
      <li>{messageObj.text}</li>
    {/each}
  </ul>

  <form id="message-form" on:submit|preventDefault={() => sendMessage(messageInput)}>
    <input id="message-input" type="text" bind:value={messageInput} />
    <button id="message-btn" type="submit">Send</button>
  </form>
</div>
