const wheel = document.getElementById("wheel");
const spinBtn = document.getElementById("spin-btn");
const finalValue = document.getElementById("final-value");
const addBtn = document.getElementById("add-btn");
const subtractBtn = document.getElementById("subtract-btn");
const livesDisplay = document.getElementById("lives");
const currentVolumeDisplay = document.getElementById("current-volume");

let currentVolume = 0;
let lives = 3;
let lastValue = 0; 


function updateDisplay() {
  livesDisplay.textContent = `Lives: ${lives}`;
  currentVolumeDisplay.textContent = `Current Volume: ${currentVolume}`;
}

updateDisplay(); 

const rotationValues = Array.from({ length: 100 }, (_, index) => ({
  minDegree: index * 3.6,
  maxDegree: (index + 1) * 3.6 - 1,
  value: index + 1
}));

const data = Array(100).fill(1);
const pieColors = Array.from({ length: 100 }, (_, index) => 
  `hsl(${(index / 100) * 360}, 100%, 50%)`
);

let myChart = new Chart(wheel, {
  plugins: [ChartDataLabels],
  type: "pie",
  data: {
    labels: rotationValues.map((v) => v.value),
    datasets: [{
      backgroundColor: pieColors,
      data: data,
    }],
  },
  options: {
    responsive: true,
    animation: { duration: 0 },
    plugins: {
      tooltip: { enabled: false },
      legend: { display: false },
      datalabels: {
        color: "#ffffff",
        anchor: 'end',
        align: 'end',
        offset: -40,
        font: {
          size: 9,
          weight: 'bold'
        },
        formatter: (_, context) => context.chart.data.labels[context.dataIndex],
      },
    },
  },
});

const valueGenerator = (angleValue) => {
  let normalizedAngle = (360 - angleValue + 90) % 360;
  const selectedSegment = rotationValues.find(segment => 
    normalizedAngle >= segment.minDegree && normalizedAngle < segment.maxDegree
  );
  if (selectedSegment) {
    lastValue = selectedSegment.value; 
    finalValue.innerHTML = `<p>Your Volume option to add or subtract from total is: ${lastValue}</p>`;
    document.getElementById("user-options").style.display = 'block'; 
    spinBtn.disabled = true; 
  } else {
    finalValue.innerHTML = `<p>Get PWND spin again</p>`;
  }
  spinBtn.disabled = false;
};


function handleVolumeChange(changeType) {
  if (lives > 0) {
    currentVolume += changeType === 'add' ? lastValue : -lastValue;
    lives--;
    updateDisplay();
    document.getElementById("user-options").style.display = 'none';
    spinBtn.disabled = false;
    checkGameEnd();
  }
}

addBtn.addEventListener("click", () => handleVolumeChange('add'));
subtractBtn.addEventListener("click", () => handleVolumeChange('subtract'));


function checkGameEnd() {
  if (lives <= 0) {
    spinBtn.disabled = true;
    finalValue.innerHTML = `<p>Game over! Your final volume is ${currentVolume}.</p>`;
  }
}

let count = 0;
let resultValue = 101;
let isMusicPlayed = false;  

spinBtn.addEventListener("click", () => {
  if (lives > 0) {
    spinBtn.disabled = true;
    finalValue.innerHTML = `<p>Good Luck!</p>`;
    
 
    if (!isMusicPlayed) {
      const backgroundMusic = document.getElementById('background-music');
      backgroundMusic.play().catch(error => console.error('Failed to play:', error));
      isMusicPlayed = true; 
    }

    let randomDegree = Math.floor(Math.random() * 360);
    let rotationInterval = setInterval(() => {
      myChart.options.rotation += resultValue;
      myChart.update();
      if (myChart.options.rotation >= 360) {
        count++;
        resultValue -= 5;
        myChart.options.rotation = 0;
      } else if (count > 15 && myChart.options.rotation === randomDegree) {
        valueGenerator(randomDegree);
        clearInterval(rotationInterval);
        count = 0;
        resultValue = 101;
      }
    }, 10);
  }
});