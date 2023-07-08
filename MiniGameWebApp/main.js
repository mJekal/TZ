const gameBoxes = document.querySelectorAll('.GameBox');

  gameBoxes.forEach(gameBox => {
    gameBox.addEventListener('click', () => {
      const url = gameBox.dataset.href;
      if (url) {
        window.location.href = url;
      }
    });
  });

const canvas = document.getElementById("canvas1");
const ctx = canvas.getContext("2d");

canvas.width = 400; 
canvas.height = 200; 

const fontSize = 50;
ctx.font = `${fontSize}px Arial`;
ctx.fillStyle = "#000000";

const text = "스도쿠";
const X = canvas.width / 2 - ctx.measureText(text).width / 2;
const Y = canvas.height / 2 + fontSize / 4;
ctx.fillText(text, X, Y);