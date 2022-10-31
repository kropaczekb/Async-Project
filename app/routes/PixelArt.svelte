<script>
  let height = 5;
  let width = 5;
  let color = "red";
  let grid = new Array(height)
  for (let i = 0; i < grid.length; i++) {
    grid[i] = new Array(width)
  }
  function click(event) {
    console.log("event.target", event.target)
    event.target.classList.add(color)
  }
</script>

<table>
    {#each grid as row, i}
    <tr id="row-{i}">
      {#each row as square, index}
      <td id="cell-{index}" on:click="{click}"></td>
      {/each}
    </tr>
    {/each}
</table>

<style>
  :global(.red) {
    background-color: red;
  }
  td {
    height: 50px;
    width: 50px;
    /* background-color: rgb(15, 10, 10); */
  }
</style>
