<script>
  import { ref, set, push, onValue, serverTimestamp, query, orderByChild, limitToLast, update } from 'firebase/database';
  import { getDatabase } from 'firebase/database';
  import app from '../../src/index'
  import { getAuth, onAuthStateChanged } from 'firebase/auth';
  import { onMount } from 'svelte';
  let height = 10;
  let width = 10;
  let selectedColor = "red";
  // let listOfColors = new Array(5).fill(new Array(5).fill('grey'));
  let listOfColors = new Array(height)
  for (let i = 0; i < listOfColors.length; i++) {
    listOfColors[i] = new Array(width).fill('grey');
  }
  let grid = new Array(height)
  for (let i = 0; i < grid.length; i++) {
    grid[i] = new Array(width)
  }
  const database = getDatabase();
  const colors = ref(database, "colors/");

  onValue(colors, (snapshot) => {
    let data = snapshot.val();
    listOfColors = Object.values(data)[0]
  })

  async function click(event) {

    let column = event.srcElement.cellIndex;
    let row = event.srcElement.parentNode.rowIndex;

    listOfColors.length = height;
    for (let i = 0; i < listOfColors.length; i++){
      listOfColors[i].length = width;
      for (let j = 0; j < listOfColors[i].length; j++) {
        if (listOfColors[i][j] === undefined) {
        listOfColors[i][j] = 'grey'
      }}
    }

    listOfColors[row][column] = selectedColor;
    await set(colors, {
      listOfColors
    })
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

<table>
    {#each grid as row, rowindex}
      <tr id="row-{rowindex}">
        {#each row as square, cellindex}
          {#if listOfColors.length - 1 >= rowindex}
            <td id="cell-{cellindex}" on:click="{(event) => click(event)}" class={listOfColors[rowindex][cellindex]}></td>
          {:else}
            <td id="cell-{cellindex}" on:click="{(event) => click(event)}" class={'grey'}></td>
          {/if}

        {/each}
      </tr>
    {/each}
</table>

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
