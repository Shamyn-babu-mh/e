function changeColor() {
  const secondaryColor = getComputedStyle(document.documentElement).getPropertyValue('--secondary-color').trim();
if (secondaryColor === "blue") {

   document.documentElement.style.setProperty('--secondary-color', 'crimson');
}
  if (secondaryColor === "crimson") {

   document.documentElement.style.setProperty('--secondary-color', 'blue');
}
}


function showGrid() {
  let content = document.getElementById('grid').textContent;
  
  
  if (content === "show grid" ){
  document.getElementById('grid').innerHTML = "hide <br>grid";
    document.getElementById('myContainer').style.visibility = "visible";
    document.getElementById('myContainer1').style.visibility = "visible";
  }
  else{
  document.getElementById('grid').innerHTML = "show <br>grid";
      document.getElementById('myContainer').style.visibility = "hidden";
    document.getElementById('myContainer1').style.visibility = "hidden";
  }
    
}


let widthDiv=Math.trunc(window.innerWidth /10);






for (let i = 0; i < widthDiv; i++) {
 
  
  // Step 1: Create the new <div> element
const newDiv = document.createElement("div");
let id = "a" + i;
newDiv.id = id;
  
  
  
// Step 3: Find the existing element where you want to put the new <div>
const currentContainer = document.getElementById("myContainer1");

// Step 4: Append the new <div> inside the container
currentContainer.appendChild(newDiv);
  
   document.getElementById(id).style.width = "1px";
  document.getElementById(id).style.background = "black";
document.getElementById(id).style.height = "70vh";

}

let heightDiv=Math.trunc(window.innerHeight /15);

for (let i = 0; i < heightDiv; i++) {
 
  
  // Step 1: Create the new <div> element
const newDiv = document.createElement("div");


  
  
  
// Step 3: Find the existing element where you want to put the new <div>
const currentContainer = document.getElementById("myContainer");

// Step 4: Append the new <div> inside the container
currentContainer.appendChild(newDiv);
  
 

}










function instructionsDis() {
  document.getElementById('instructions').style.display = "none";
}



function showDonate() {
     document.getElementById('donation-timer').style.display = "block";
}




let deviceId = localStorage.getItem('fc4f66c9-49ac-46e2-98c1-7c14fadcaeaa');
if (!deviceId) {

setTimeout(() => {
    
  document.getElementById('donation-timer').style.display = "block";
  

    // Insert your code here (e.g., sound an alarm, submit a form)
}, 10000);
  
}

function showAlert() {
    document.getElementById('donation-timer').style.display = "none";
   // If no device ID exists, generate a new one and save it
if (!deviceId) {
    deviceId = crypto.randomUUID(); // Generates a secure, unique string
    localStorage.setItem('fc4f66c9-49ac-46e2-98c1-7c14fadcaeaa', deviceId);
}

}

function scene1 () {
  document.getElementById('car1').style.display = "block";
  
  document.getElementById('heading').style.display = "block";
  
  
  document.getElementById('car2').style.display = "block";
  
  document.getElementById('line').style.display = "block";
  
  document.getElementById('poster-h').style.display = "none";
  }

function sceneH () {
  
  document.getElementById('heading').style.display = "none";
  
  
  document.getElementById('car1').style.display = "none";
  
  document.getElementById('car2').style.display = "none";
  
  document.getElementById('line').style.display = "none";
  
  document.getElementById('poster-h').style.display = "block";
  }


function showContact () {
  document.getElementById('contactScreen').style.display = "block";
  document.getElementById('close').style.display = "block";
}

function hideContact () {
  document.getElementById('contactScreen').style.display = "none";
  document.getElementById('close').style.display = "none";
  
}





























// Stateful Rotational Trackers
let currentRotation = 0;   // Net current accumulated steering rotation in degrees
let startAngle = 0;        // Absolute polar angle where current interaction sequence started
let isDragging = false;

const steeringWheel = document.getElementById('steering');
const tyreLeft = document.getElementById('frontTyre1');
const tyreRight = document.getElementById('frontTyre2');
const angleDisplay = document.getElementById('firstTouchInfo');
const statusDisplay = document.getElementById('dragTouchInfo');

// Operational Limits
const MAX_STEER_LIMIT = 360; 

// Evaluates pointer coordinates relative to the steering group geometric center
function getPointerAngle(e) {
  const rect = steeringWheel.getBoundingClientRect();
  const centerX = rect.left + rect.width / 2;
  const centerY = rect.top + rect.height / 2;
  
  const deltaX = e.clientX - centerX;
  const deltaY = e.clientY - centerY;
  
  // Math.atan2 processes Y first, returning values from -PI to +PI
  return Math.atan2(deltaY, deltaX) * (180 / Math.PI);
}

// Unified input initialization
function onPointerDown(e) {
  isDragging = true;
  steeringWheel.style.cursor = 'grabbing';
  
  
  // Explicitly snap the current reference coordinate point
  startAngle = getPointerAngle(e);
  
  // Lock the specific active element pointer to accurately handle out-of-bounds dragging
  steeringWheel.setPointerCapture(e.pointerId);
}

// Active tracking loop execution
function onPointerMove(e) {
  if (!isDragging) return;

  const currentAngle = getPointerAngle(e);
  
  // Determine raw visual displacement delta
  let angleDelta = currentAngle - startAngle;

  // Correct for the Math.atan2 -180/180 boundary flip anomaly
  if (angleDelta > 180) angleDelta -= 360;
  if (angleDelta < -180) angleDelta += 360;

  // Derive target temporary rotation position
  let targetRotation = currentRotation + angleDelta;

  // Constrain boundary limits rigidly between -270 and +270
  if (targetRotation > MAX_STEER_LIMIT) {
    targetRotation = MAX_STEER_LIMIT;
    angleDelta = targetRotation - currentRotation; // Recalculate accurate delta adjustment
  } else if (targetRotation < -MAX_STEER_LIMIT) {
    targetRotation = -MAX_STEER_LIMIT;
    angleDelta = targetRotation - currentRotation;
  }

  // Commit calculated values to transformation matrices
  steeringWheel.style.transform = `rotate(${targetRotation}deg)`;
  
  // Scale tire profile rotation down appropriately (270deg wheel turns tires 30deg)
  const tyreRotation = targetRotation / 12;
  tyreLeft.style.transform = `rotate(${tyreRotation}deg)`;
  tyreRight.style.transform = `rotate(${tyreRotation}deg)`;

  // Update tracking frames continuously during live action execution
  currentRotation = targetRotation;
  startAngle = getPointerAngle(e);

}

// End of lifecycle cleanup
function onPointerUp(e) {
  if (!isDragging) return;
  isDragging = false;
  steeringWheel.style.cursor = 'grab';
 
  steeringWheel.releasePointerCapture(e.pointerId);
}

// Event Bindings
steeringWheel.addEventListener('pointerenter', onPointerDown);
steeringWheel.addEventListener('pointermove', onPointerMove);
steeringWheel.addEventListener('pointerleave', onPointerUp);
steeringWheel.addEventListener('pointercancel', onPointerUp);



// --- Drive State Configuration ---
// --- Drive State Configuration ---
// Locate this block at the top of your driving script files
let carState = {
  x: window.innerWidth * 0.15,  // Places the car horizontally directly over the first vertical road slot
  y: window.innerHeight * 0.45, // Places the car vertically centered on the map track
  speed: 0,
  maxSpeed: .1,
  acceleration: 0.01,
  deceleration: 0.15,
  friction: 0.0,
  angle: -90,                   // Heading upwards alignment
  wheelbase: window.innerWidth * 0.142,
};


if (window.innerWidth > 490) {
 carState = {
  x: window.innerWidth * 0.75,  // Places the car horizontally directly over the first vertical road slot
  y: window.innerHeight * 0.45, // Places the car vertically centered on the map track
  speed: 0,
  maxSpeed: .1,
  acceleration: 0.01,
  deceleration: 0.15,
  friction: 0.0,
  angle: -90,                   // Heading upwards alignment
  wheelbase: 60,
};
}


// State Machines: 'stop', 'forward', or 'reverse'
let currentDriveMode = 'stop';

// --- Bind Interface Control Elements ---
const btnForward = document.getElementById('btnForward');
const btnStop = document.getElementById('btnStop');
const btnReverse = document.getElementById('btnReverse');
const gearButtons = document.querySelectorAll('.gear-btn');

// State Update UI Refresher 
function updateControlUI() {
  btnForward.classList.remove('active-forward');
  btnReverse.classList.remove('active-reverse');
  
  if (currentDriveMode === 'forward') {
    btnForward.classList.add('active-forward');
  } else if (currentDriveMode === 'reverse') {
    btnReverse.classList.add('active-reverse');
  }
}

// Single Touch/Click Event Listeners
function autoSelectFirstGear() {
  // Find the button with speed value "1" (or data-speed="1")
  const firstGearBtn = Array.from(gearButtons).find(btn => btn.dataset.speed === "1" || btn.textContent.trim() === "1");
  
  if (firstGearBtn) {
    // Clear active status styling from all other gears
    gearButtons.forEach(b => b.classList.remove('active'));
    // Visual toggle for Gear 1
    firstGearBtn.classList.add('active');
    // Set the speed state directly to the 1st gear profile ceiling
    carState.maxSpeed = parseFloat(firstGearBtn.dataset.speed);
  }
}
// Single Touch/Click Event Listeners with Auto-Gear Setup
btnForward.addEventListener('click', () => {
  currentDriveMode = 'forward';
  autoSelectFirstGear(); // Forces immediate synchronization to Gear 1
  updateControlUI();
});

btnReverse.addEventListener('click', () => {
  currentDriveMode = 'reverse';
  autoSelectFirstGear(); // Forces immediate synchronization to Gear 1
  updateControlUI();
});


btnStop.addEventListener('click', () => {
  currentDriveMode = 'stop';
  updateControlUI();
});

// Gearbox Speed Governor Selector
gearButtons.forEach(btn => {
  btn.addEventListener('click', (e) => {
    gearButtons.forEach(b => b.classList.remove('active'));
    e.target.classList.add('active');
    carState.maxSpeed = parseFloat(e.target.dataset.speed);
  });
});

// Optional Keyboard Overrides (W=Forward, S=Reverse, Space=Stop)
window.addEventListener('keydown', (e) => {
  const key = e.key.toLowerCase();
  if (key === 'arrowup' || key === 'w') { currentDriveMode = 'forward'; updateControlUI(); }
  if (key === 'arrowdown' || key === 's') { currentDriveMode = 'reverse'; updateControlUI(); }
  if (key === 'a') { currentDriveMode = 'stop'; updateControlUI(); e.preventDefault(); }
  
  
  
  // Universal Keyboard Speed Gear Selection Mapping (Z, X, C, V)
window.addEventListener('keydown', (e) => {
  const code = e.key.toLowerCase();
  
  // Create an array mapping keys to their respective gear index (0 to 3)
  const keyToGearMap = {
    'z': 1, // Gear 1
    'x': 2, // Gear 2
    'c': 3, // Gear 3
    'v': 4  // Gear 4
  };

  // Check if the pressed key is within our map configuration
  if (keyToGearMap[code] !== undefined) {
    const targetGearIndex = keyToGearMap[code];
    
    // Find all speed buttons present inside the dashboard layout
    const gearButtons = document.querySelectorAll('.gear-btn');
    
    // Safety check: ensure the button node exists before accessing attributes
    if (gearButtons[targetGearIndex - 1]) {
      const selectedBtn = gearButtons[targetGearIndex - 1];
      
      // Remove the active visual style from all buttons
      gearButtons.forEach(g => g.classList.remove('active'));
      
      // Apply the active visual style highlight onto the selected button
      selectedBtn.classList.add('active');
      
      // Update the physics maxSpeed value using the gear number
      carState.maxSpeed = targetGearIndex * .1;
    }
  }
});

  
  
  
  
  
  
});

// --- Main Engine Physics Frame Simulation ---
function simulateVehicleLoop() {
  // 1. Process Speed Deltas Based on Drive State Mode
  // 1. Process Speed Deltas Based on Drive State Mode (Symmetrical Speed Edition)
  if (currentDriveMode === 'forward') {
    // Accelerate forward to the current gear cap
    if (carState.speed < 0) {
      carState.speed = Math.min(0, carState.speed + carState.deceleration); // Active brake out of reverse first
    } else {
      carState.speed = Math.min(carState.maxSpeed, carState.speed + carState.acceleration);
    }
  } else if (currentDriveMode === 'reverse') {
    // Accelerate backward to the EXACT same top speed limit as forward
    const maxReverse = -carState.maxSpeed; 
    if (carState.speed > 0) {
      carState.speed = Math.max(0, carState.speed - carState.deceleration); // Active brake out of forward first
    } else {
      carState.speed = Math.max(maxReverse, carState.speed - carState.acceleration);
    }
  } else {
    // 'stop' mode active - Heavier active braking until completely stopped
    if (carState.speed > 0) carState.speed = Math.max(0, carState.speed - carState.deceleration);
    if (carState.speed < 0) carState.speed = Math.min(0, carState.speed + carState.deceleration);
  }


  // 2. Real Car Steering Mechanics (Ackermann Turn Radius)
  if (Math.abs(carState.speed) > 0.02) {
    const dynamicSteerAngle = (currentRotation / 9) * (Math.PI / 180); 
    
    const frontAxleX = carState.x + (carState.wheelbase / 2) * Math.cos(carState.angle * Math.PI / 180);
    const frontAxleY = carState.y + (carState.wheelbase / 2) * Math.sin(carState.angle * Math.PI / 180);
    
    const rearAxleX = carState.x - (carState.wheelbase / 2) * Math.cos(carState.angle * Math.PI / 180);
    const rearAxleY = carState.y - (carState.wheelbase / 2) * Math.sin(carState.angle * Math.PI / 180);

    const updatedRearX = rearAxleX + carState.speed * Math.cos(carState.angle * Math.PI / 180);
    const updatedRearY = rearAxleY + carState.speed * Math.sin(carState.angle * Math.PI / 180);

    const updatedFrontX = frontAxleX + carState.speed * Math.cos(carState.angle * Math.PI / 180 + dynamicSteerAngle);
    const updatedFrontY = frontAxleY + carState.speed * Math.sin(carState.angle * Math.PI / 180 + dynamicSteerAngle);

    carState.x = (updatedFrontX + updatedRearX) / 2;
    carState.y = (updatedFrontY + updatedRearY) / 2;
    carState.angle = Math.atan2(updatedFrontY - updatedRearY, updatedFrontX - updatedRearX) * (180 / Math.PI);
  }

  // 3. Keep Car on the Ground (Rigid Window Viewport Boundary Constraints)
    // 3. Keep Car on the Ground (Rigid Window Viewport Boundary Constraints + Lightning Flash Trigger)
  const carRect = car.getBoundingClientRect();
  const halfWidth = carRect.width / 2;
  const halfHeight = carRect.height / 2;
  
  // Track boundary violations in the current execution frame
  let isColliding = false;

  // Check Horizontal Boundaries
  if (carState.x < halfWidth) { 
    carState.x = halfWidth; 
    carState.speed = 0; 
    currentDriveMode = 'stop'; 
    isColliding = true; 
  }
  if (carState.x > window.innerWidth - halfWidth) { 
    carState.x = window.innerWidth - halfWidth; 
    carState.speed = 0; 
    currentDriveMode = 'stop'; 
    isColliding = true; 
  }

  // Check Vertical Boundaries
  if (carState.y < halfHeight) { 
    carState.y = halfHeight; 
    carState.speed = 0; 
    currentDriveMode = 'stop'; 
    isColliding = true; 
  }
  if (carState.y > window.innerHeight - halfHeight) { 
    carState.y = window.innerHeight - halfHeight; 
    carState.speed = 0; 
    currentDriveMode = 'stop'; 
    isColliding = true; 
  }

  // Trigger UI changes based on real-time collision checks
  const flashOverlay = document.getElementById('flashOverlay');
  if (isColliding) {
    flashOverlay.classList.add('active-flash');
    updateControlUI(); // Synchronizes the dashboard buttons to match the automatic emergency stop
  } else {
    flashOverlay.classList.remove('active-flash');
  }


  // 4. Render Updates to DOM Elements
  car.style.left = `${carState.x}px`;
  car.style.top = `${carState.y}px`;
  car.style.transform = `translate(-50%, -50%) rotate(${carState.angle + 90}deg)`;

  requestAnimationFrame(simulateVehicleLoop);
}

// Fire Simulation Engine Run
requestAnimationFrame(simulateVehicleLoop);
