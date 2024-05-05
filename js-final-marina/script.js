const buttonSize = 100; 

class Button {
  constructor(color, text, velX, velY) {
    this.x = Math.random() * (document.body.clientWidth - buttonSize);
    this.y = Math.random() * (document.body.clientHeight - buttonSize);
    this.velX = velX;
    this.velY = velY;
    this.color = color;
    this.text = text;
  }

  draw() {
    ctx.beginPath();
    ctx.fillStyle = this.color;
    ctx.fillRect(this.x, this.y, buttonSize, buttonSize);
    ctx.fillStyle = "#FFFFFF";
    ctx.font = "20px Arial";

  
    const textX = this.x + (buttonSize - ctx.measureText(this.text).width) / 2;
    const textY = this.y + buttonSize / 2 + 10; 

    ctx.fillText(
      this.text,
      textX,
      textY
    );
  }

  update() {
    if (
      this.x + buttonSize >= document.body.clientWidth ||
      this.x <= 0
    ) {
      this.velX = -this.velX;
    }
    if (
      this.y + buttonSize >= document.body.clientHeight ||
      this.y <= 0
    ) {
      this.velY = -this.velY;
    }

    this.x += this.velX;
    this.y += this.velY;
  }

  isMouseOver(mouseX, mouseY) {
    return (
      mouseX >= this.x &&
      mouseX <= this.x + buttonSize &&
      mouseY >= this.y &&
      mouseY <= this.y + buttonSize
    );
  }
}

const canvas = document.createElement("canvas");
document.body.appendChild(canvas);
const ctx = canvas.getContext("2d");

const width = (canvas.width = window.innerWidth);
const height = (canvas.height = window.innerHeight);

const buttons = [];


const increaseVolumeBtn = new Button("#ff0000", "Increase", 5, 5);


const decreaseVolumeBtn = new Button("#0000ff", "Decrease", -5, -5);

buttons.push(increaseVolumeBtn, decreaseVolumeBtn);

function loop() {
  ctx.clearRect(0, 0, width, height);

  for (const button of buttons) {
    button.draw();
    button.update();
  }

  requestAnimationFrame(loop);
}

loop();


canvas.addEventListener("click", function (event) {
  var mouseX = event.clientX;
  var mouseY = event.clientY;

  for (const button of buttons) {
    if (button.isMouseOver(mouseX, mouseY)) {
      adjustVolume(button.text === "Increase");
    }
  }
});

function adjustVolume(increase) {
  
  var volumeChange = Math.floor(Math.random() * 41) - 20;
  if (!increase) {
    volumeChange *= -1; 
  }

 
  var newVolume = Math.max(0, Math.min(100, currentVolume + volumeChange));


  alert(
    (increase ? "Increased" : "Decreased") +
      " volume by " +
      Math.abs(volumeChange) +
      ". New volume: " +
      newVolume +
      "!"
  );
  currentVolume = newVolume; 
}

var currentVolume = 50; 