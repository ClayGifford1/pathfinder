function generateGrid() {
  const grid = document.getElementById("graph");
  const nav = document.getElementById("navigation");
  const info = document.getElementById("info");
  const navHeight = nav.offsetHeight;
  const infoHeight = info.offsetHeight;
  const sizes = calculateGridSize();
  const rows = (sizes.height - navHeight - infoHeight) / 27;
  const cells = sizes.width / 27;

  for (let x = 0; x < rows; x++) {
    var row = document.createElement("tr");
    row.class = "gridRow";
    for (let y = 0; y < cells; y++) {
      var cell = document.createElement("td");
      cell.class = "cell";
      var text = document.createTextNode("");
      cell.appendChild(text);
      row.appendChild(cell);
    }
    grid.appendChild(row);
  }
}

function clearGrid() {
  const grid = document.getElementById("graph");
  while(grid.hasChildNodes()) {
    grid.removeChild(grid.firstChild);
  }
}

function calculateGridSize() {
  const sizes = {
    height: window.innerHeight,
    width: window.innerWidth };
  return sizes;
}
