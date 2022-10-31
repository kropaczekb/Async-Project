<script>
  let height = 5;
  let width = 5;
  let selectedColor = "red";
  let grid = new Array(height)
  for (let i = 0; i < grid.length; i++) {
    grid[i] = new Array(width)
  }

  function clearClasses(element) {
    element.classList.remove("red");
    element.classList.remove("orange");
    element.classList.remove("yellow");
    element.classList.remove("green");
    element.classList.remove("blue");
    element.classList.remove("purple");
    element.classList.remove("grey");
    element.classList.remove("black");
    element.classList.remove("white");
  }
  function click(event) {
    clearClasses(event.target)
    event.target.classList.add(selectedColor)
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
    {#each grid as row, i}
    <tr id="row-{i}">
      {#each row as square, index}
      <td id="cell-{index}" on:click="{click}" class="grey"></td>
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
