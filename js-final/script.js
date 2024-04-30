const wheel = document.getElementById("wheel");
const spinBtn = document.getElementById("spin-btn");
const finalValue = document.getElementById("final-value");

// Generate the rotationValues dynamically for 100 segments
const rotationValues = Array.from({ length: 100 }, (_, index) => ({
  minDegree: index * 3.6,
  maxDegree: (index + 1) * 3.6 - 1,
  value: index + 1
}));

// Generate 100 data values (one for each segment)
const data = Array(100).fill(1);

// Simple pattern for pie colors - repeating pattern for simplicity
const pieColors = Array.from({ length: 100 }, (_, index) => 
  `hsl(${(index / 100) * 360}, 100%, 50%)`
);

// Create the Chart with 100 segments
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
        anchor: 'end', // Anchors the labels to the end of the pie slices
        align: 'end', // Aligns the labels to the end
        offset: -40, // Pushes the labels a bit towards the center
        font: {
          size: 9, // Smaller font size for better readability
          weight: 'bold' // Optional: to make the font bold
        },
        formatter: (_, context) => context.chart.data.labels[context.dataIndex],
      },
    },
  },
});

const valueGenerator = (angleValue) => {
  // Normalize the angle value where 0 degrees is the rightmost point of the circle
  let normalizedAngle = (360 - angleValue + 90) % 360;
  
  // Find the segment that contains the normalized angle
  const selectedSegment = rotationValues.find(segment => 
    normalizedAngle >= segment.minDegree && normalizedAngle < segment.maxDegree
  );

  if (selectedSegment) {
    finalValue.innerHTML = `<p>Your Volume is: ${selectedSegment.value}</p>`;
    spinBtn.disabled = false;
  }
};

//Spinner count
let count = 0;
//100 rotations for animation and last rotation for result
let resultValue = 101;
//Start spinning
spinBtn.addEventListener("click", () => {
  spinBtn.disabled = true;
  //Empty final value
  finalValue.innerHTML = `<p>Good Luck!</p>`;
  //Generate random degrees to stop at
  let randomDegree = Math.floor(Math.random() * (355 - 0 + 1) + 0);
  //Interval for rotation animation
  let rotationInterval = window.setInterval(() => {
    //Set rotation for piechart
    /*
    Initially to make the piechart rotate faster we set resultValue to 101 so it rotates 101 degrees at a time and this reduces by 1 with every count. Eventually on last rotation we rotate by 1 degree at a time.
    */
    myChart.options.rotation = myChart.options.rotation + resultValue;
    //Update chart with new value;
    myChart.update();
    //If rotation>360 reset it back to 0
    if (myChart.options.rotation >= 360) {
      count += 1;
      resultValue -= 5;
      myChart.options.rotation = 0;
    } else if (count > 15 && myChart.options.rotation == randomDegree) {
      valueGenerator(randomDegree);
      clearInterval(rotationInterval);
      count = 0;
      resultValue = 101;
    }
  }, 10);
});
