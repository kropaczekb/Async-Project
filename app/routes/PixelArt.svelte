<script>
  import { ref, set, push, onValue, serverTimestamp, query, orderByChild, limitToLast, update, getDatabase } from 'firebase/database';
  import app from '../../src/index'
  import { getAuth, onAuthStateChanged } from 'firebase/auth';
  import { onMount } from 'svelte';

  const auth = getAuth();
  let loggedin = false;
  let selectedColor = "red";
  let listOfColors;
  let height;
  let width;
  const database = getDatabase();
  const colors = ref(database, "colors/");
  const sizes = ref(database, "dimensions/");

  onValue(sizes, async (snapshot) => {
    let data = await snapshot.val();
    height = data.height
    width = data.width
    height = height
    width = width
  })

  onValue(colors, async (snapshot) => {
    let data = await snapshot.val();
    listOfColors = await Object.values(data)[0]
    listOfColors = listOfColors
  })

  onMount(async () => {
    const loginObserver = (user) => {
      if (user) {
        loggedin = true;
      } else {
        loggedin = false;
      }
    }
    onAuthStateChanged(auth, loginObserver);
  })

  async function click(event) {
    if (loggedin) {
      console.log("listofcolors", listOfColors)
      let column = event.srcElement.cellIndex;
      let row = event.srcElement.parentNode.rowIndex;
      listOfColors.length = height;
      for (let i = 0; i < listOfColors.length; i++){
        if (listOfColors[i] === undefined) {
          listOfColors[i] = new Array(width)
        }
        listOfColors[i].length = width;
        for (let j = 0; j < listOfColors[i].length; j++) {
          if (!listOfColors[i][j]) {
          listOfColors[i][j] = 'grey'
        }}
      }

      listOfColors[row][column] = selectedColor;
      await set(colors, {
        listOfColors
      })
    } else {
      alert("Sign in to paint")
    }
  }
</script>

<select bind:value={selectedColor}>
  <option value="red">Red</option>
  <option value="orange">Orange</option>
  <option value="yellow">Yellow</option>
  <option value="green">Green</option>
  <option value="blue">Blue</option>
  <option value="purple">Purple</option>
  <option value="grey">Grey</option>
  <option value="black">Black</option>
  <option value="white">White</option>
</select>


<input type:number bind:value={height} min=1 max=30>
<input type:number bind:value={width} min=1 max=30>

{#if listOfColors}
<table>
    {#each listOfColors as row, rowindex}
      <tr id="row-{rowindex}">
        {#each row as square, cellindex}
          {#if listOfColors.length - 1 >= rowindex}

            <!-- {#if listOfColors[rowindex].length - 1 <= cellindex} -->
            <td id="cell-{cellindex}" on:click="{(event) => click(event)}" class={listOfColors[rowindex][cellindex]}></td>
            <!-- {:else}
              <td id="cell-{cellindex}" on:click="{(event) => click(event)}" class={'grey'}></td>
            {/if} -->

          {:else}
            <td id="cell-{cellindex}" on:click="{(event) => click(event)}" class={'grey'}></td>
          {/if}
        {/each}
      </tr>
    {/each}
  </table>
  {:else}
<p>Loading...</p>
  {/if}

<style>
  :global(.red) {
    background-color: red;
  }
  :global(.orange) {
    background-color: orange;
  }
  :global(.yellow) {
    background-color: yellow;
  }
  :global(.green) {
    background-color: green;
  }
  :global(.blue) {
    background-color: blue;
  }
  :global(.purple) {
    background-color: purple;
  }
  :global(.grey) {
    background-color: grey;
  }
  :global(.black) {
    background-color: black;
  }
  :global(.white) {
    background-color: white;
  }
  td {
    height: 50px;
    width: 50px;
  }
</style>
