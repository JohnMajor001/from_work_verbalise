function drawOnCanvas(noOfTeams, teamObjectsArray, pointsToWin) {
  var myCanvas = document.querySelector('canvas');
  var c = myCanvas.getContext('2d');
  c.translate(0.5, 0);

var piepiece = (Math.PI*2)/pointsToWin;

var rPie = myCanvas.height/2.2;

var xPie = myCanvas.width/2;
var yPie = myCanvas.height/2;
var blackCircleR = rPie/3;
var arrayOfColours = ['red', 'green', 'orange', 'yellow', 'blue', 'purple',
'pink', 'gray', 'violet'];
arrayOfColours.length = categories.length;
var distBetweenParticles = (rPie - blackCircleR)/noOfTeams;

function drawPieSlice(c,centerX, centerY, radius, startAngle, endAngle, color ){
  c.fillStyle = color;
  c.beginPath();
  c.moveTo(centerX,centerY);
  c.arc(centerX, centerY, radius, startAngle, endAngle);
  c.closePath();
  c.fill();
}

// var ar = '\u2192';
// Draws black circle in middle
function blackCircle() {
  c.beginPath();
  c.arc(xPie, yPie, blackCircleR, 0, Math.PI*2, false);
  c.fillStyle = 'black';
  c.fill();

  c.beginPath();
  c.fillStyle = "#fff";
  c.font = "bold 1rem Arial";
  c.fillText("Finish", xPie+rPie-rPie/3, yPie+2);
  c.stroke();
}

// circle constructor
function Circle(x, y, color, radius, distFromCentre, teamPosition, teamPastPosition) {
      // Ensure particles don't go past finish
      if(teamPosition > pointsToWin) {
        this.teamPosition = pointsToWin;
      } else {
        this.teamPosition = teamPosition;
      }
  this.teamPastPosition = teamPastPosition;
  this.x = x;
  this.y = y;
  this.radius = radius;
  this.color = color;
  this.radians = ((Math.PI*2)/pointsToWin)*teamPastPosition;
  this.velocity = 0.02;
  this.distanceFromCentre = {
        x: blackCircleR + this.radius + distFromCentre + 1,
  // WILL NEED TO INCREMENT THIS IN ORDER TO GET SPECIFIC DISTANCES FOR TEAMS
      };

  this.angle = piepiece*(this.teamPosition);
  this.specTheta = this.angle - (piepiece/2);
  this.k = (Math.PI/2) - this.specTheta;
  this.h = this.distanceFromCentre.x;
  this.xCo = xPie + (Math.sin(this.k)*this.h);
  this.yCo = yPie + (Math.cos(this.k)*this.h);

  // calculate starting position
  this.SAngle = piepiece*(this.teamPastPosition);
  this.SSpecTheta = this.SAngle - (piepiece/2);
  this.sk = (Math.PI/2) - this.SSpecTheta;
  this.xStart = xPie + (Math.sin(this.sk)*this.h);
  this.yStart = xPie + (Math.cos(this.sk)*this.h);


  this.update = () => {
    this.radians += this.velocity;
    this.x = x + Math.cos(this.radians) * this.distanceFromCentre.x;
    this.y = y + Math.sin(this.radians) * this.distanceFromCentre.x;
    this.draw();
  }

  this.draw = () => {
    c.beginPath();
    c.arc(this.x, this.y, this.radius, 0, Math.PI*2, false);
    c.fillStyle = this.color;
    c.fill();
    c.strokeStyle = 'black';
    c.stroke();
    c.closePath();
  }
}

// when the particle needs to stop moving, see four quadrent if statements
function stopParticle(particle, xnum, ynum) {
  particle.x = xnum;
  particle.y = ynum;
  particle.draw();

  return;
}

function animate() {
  // Stop animation frame whenever use clicks beyond it
    if(stopFrameNumber < 5) {
      requestAnimationFrame(animate);
    }
    // c.fillStyle = 'rgba(0, 0, 0, 0.05)'; // color is wrong
    c.clearRect(0, 0, myCanvas.width, myCanvas.height);
    for(i=0;i<pointsToWin;i++) {
      var number = Math.floor((i+1)%(arrayOfColours.length));

      drawPieSlice(
          c,
          xPie,
          yPie,
          rPie,
          piepiece*i,
          piepiece*(i+1),
          arrayOfColours[number]
      );
    }

    blackCircle();

    particles.forEach(element => {
       // Four quadrent if statements
      if (element.teamPosition <= (pointsToWin/4) - 1) {
          if (element.x <= element.xCo && element.y >= element.yCo) {
            stopParticle(element, element.xCo, element.yCo);
          } else {
            element.update();
          }
      } else if (element.teamPosition == (pointsToWin/4) // NEW ONE!!!
        && element.teamPosition <= ((pointsToWin/2) - 1)) {
          if ((element.y <= element.yCo + 10 && element.y >= element.yCo - 10)
          && (element.x <= element.xCo + 10 && element.x >= element.xCo - 10)) {
            stopParticle(element, element.xCo, element.yCo);
          } else {
            element.update();
          }
      } else if (element.teamPosition > (pointsToWin/4)
        && element.teamPosition <= ((pointsToWin/2) - 1)) {
          if (element.x <= element.xCo && element.y <= element.yCo) {
            stopParticle(element, element.xCo, element.yCo);
          } else {
            element.update();
          }
      } else if (element.teamPosition == (pointsToWin/2) // NEW ONE!!!
        && element.teamPosition <= ((3*(pointsToWin/4)) - 1)) {
          if ((element.y <= element.yCo + 10 && element.y >= element.yCo - 10)
          && (element.x <= element.xCo + 10 && element.x >= element.xCo - 10)) {
            stopParticle(element, element.xCo, element.yCo);
          } else {
            element.update();
          }
      } else if (element.teamPosition > (pointsToWin/2)
        && element.teamPosition <= ((3*(pointsToWin/4)) - 1)) {
          if (element.x >= element.xCo && element.y <= element.yCo) {
            stopParticle(element, element.xCo, element.yCo);
          } else {
            element.update();
          }
      } else if (element.teamPosition > (3*(pointsToWin/4) - 1)) {
          if ((element.y <= element.yCo + 10 && element.y >= element.yCo - 10)
          && (element.x <= element.xCo + 10 && element.x >= element.xCo - 10)) {
            stopParticle(element, element.xCo, element.yCo);
        } else {
          element.update();
      }
    }
  });
}
let particles;
function init() {
  particles = [];

// get a radius for each of the circles which is based on the size of each pieslice
var specR = (Math.sin(piepiece/2))*(rPie/2);
var dynamicR = specR*2;

// noOfTeams = number of particles you want
  for(i=0; i<noOfTeams;i++) {
    particles.push(new Circle(xPie, yPie, teamObjectsArray[i].color,
      specR, 0+(i*distBetweenParticles), teamObjectsArray[i].position,
      teamObjectsArray[i].pastPosition));
  }

}
init();
animate();
}
