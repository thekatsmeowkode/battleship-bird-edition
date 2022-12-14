import { board } from "./index.js";

export function UI() {
  const instructionBox = document.getElementById("instruction-box");
  let wormsPlaced = false;

  const generateTable = (tableID, player) => {
    const table = document.createElement("table");
    table.classList.add(`${player}-table`);
    const boardFrame = document.querySelector(tableID);
    boardFrame.appendChild(table);
    for (let y = 0; y < 10; y++) {
      const row = document.createElement("tr");
      row.classList.add("row");
      for (let x = 0; x < 10; x++) {
        const cell = document.createElement("td");
        cell.classList.add("dropzone");
        cell.classList.add("board-square");
        cell.classList.add(player);
        player === "human" ? (cell.style.pointerEvents = "none") : null;
        player === "robot" ? (cell.style.cursor = "pointer") : null;
        cell.setAttribute("id", `${y}${x}`);
        row.appendChild(cell);
      }
      table.appendChild(row);
    }
  };

  const registerHovers = () => {
    document
      .querySelector(".robot-table")
      .addEventListener("mouseover", (event) => {
        let target = event.target;
        target.style.backgroundColor = "pink";
      });

    document
      .querySelector(".robot-table")
      .addEventListener("mouseout", (event) => {
        let target = event.target;
        target.style.backgroundColor = "lightgreen";
      });
  };

  const gameStart = (bool) => {
    if (!bool) {
      instructionBox.textContent =
        "Please drag and drop up to 4 worms on right-hand board. Worm lengths run from 2 units to 5 units, left to right";
    } else {
      instructionBox.textContent =
        "To start game, click any square on the left-side board.  Red indicates a hit and dark green indicates a miss.  The robot will make a move automatically after you choose.  Good luck!";
      const robotCells = document.querySelectorAll(".robot");
      const humanCells = document.querySelectorAll(".human");
      robotCells.forEach((cell) => (cell.style.pointerEvents = "none"));
      humanCells.forEach((cell) => (cell.style.pointerEvents = "all"));
      humanCells.forEach((cell) => (cell.style.cursor = "pointer"));
      wormsPlaced = true;
    }
  };

  const displayWorms = (wormCoords) => {
    for (let i = 0; i < wormCoords.length; i++) {
      let boxID = `${wormCoords[i]}`;
      let box = document.querySelectorAll(".robot");
      box.forEach((box) => {
        if (box.id === boxID) {
          box.style.backgroundColor = "pink";
          box.style.pointerEvents = "none";
        }
      });
    }
  };

  const createStartButton = (wormsOnBoard) => {
    let button = document.createElement("button");
    if (wormsOnBoard.length >= 4) {
      let imageHolder = document.querySelector(".images");
      while (imageHolder.firstChild) {
        imageHolder.removeChild(imageHolder.firstChild);
      }
      let container = document.querySelector(".button-holder");

      button.classList.add("start-button");
      button.textContent = "Start Game";
      container.appendChild(button);
    }
    button.addEventListener("click", () => {
      gameStart(true);
      board.robotSetShips();
      button.style.visibility = "hidden";
    });
  };

  function changeColor(player, coords, hit) {
    let playerName = "." + player;
    const IDsquare = document.querySelectorAll(playerName);
    if (hit === "hit") {
      IDsquare.forEach((square) => {
        if (square.id === coords) {
          square.style.backgroundColor = "red";
          square.style.pointerEvents = "none";
        }
      });
    } else {
      IDsquare.forEach((square) => {
        if (square.id === coords) {
          square.style.backgroundColor = "darkgreen";
          square.style.pointerEvents = "none";
        }
      });
    }
  }

  return {
    generateTable,
    registerHovers,
    gameStart,
    displayWorms,
    createStartButton,
    changeColor,
  };
}
