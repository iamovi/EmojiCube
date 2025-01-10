const scene = document.querySelector(".scene");
const cube = document.querySelector(".cube");

let isDragging = false;
let startX, startY;
let rotationX = 0;
let rotationY = 0;

// Start dragging and disable animation
const startDrag = (e) => {
  isDragging = true;

  // Record the initial pointer position
  startX = e.touches ? e.touches[0].clientX : e.clientX;
  startY = e.touches ? e.touches[0].clientY : e.clientY;

  // Disable animation while dragging
  cube.style.animation = "none";
};

// Dragging movement
const drag = (e) => {
  if (!isDragging) return;

  // Current pointer position
  const currentX = e.touches ? e.touches[0].clientX : e.clientX;
  const currentY = e.touches ? e.touches[0].clientY : e.clientY;

  // Calculate the difference from start
  const deltaX = currentX - startX;
  const deltaY = currentY - startY;

  // Update the rotation based on drag movement
  const sensitivity = 0.3; // Adjust sensitivity multiplier
  rotationY += deltaX * sensitivity;
  rotationX -= deltaY * sensitivity;

  // Apply the rotation
  cube.style.transform = `rotateX(${rotationX}deg) rotateY(${rotationY}deg)`;

  // Update the start position for the next movement
  startX = currentX;
  startY = currentY;
};

// Stop dragging and set the animation to resume from the current rotation
const stopDrag = () => {
  if (!isDragging) return;
  isDragging = false;

  // Resume the animation from the current rotation
  cube.style.animation = `rotateFromPosition 8s infinite linear`;
  cube.style.setProperty("--start-rotation-x", `${rotationX}deg`);
  cube.style.setProperty("--start-rotation-y", `${rotationY}deg`);
};

// Event listeners for mouse and touch
scene.addEventListener("mousedown", startDrag);
scene.addEventListener("mousemove", drag);
scene.addEventListener("mouseup", stopDrag);
scene.addEventListener("mouseleave", stopDrag);

scene.addEventListener("touchstart", startDrag);
scene.addEventListener("touchmove", drag);
scene.addEventListener("touchend", stopDrag);
