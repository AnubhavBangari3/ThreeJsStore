// Initialize Scene
const scene = new THREE.Scene();

// Camera
const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1, // Fixed near plane
    1000
);
camera.position.z = 5;

// Renderer
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setClearColor(0xffffff, 1); // Fixed clear color
document.body.appendChild(renderer.domElement);

// Lights
let ambientLight = new THREE.AmbientLight(0x101010, 1.0);
scene.add(ambientLight);

let sunlight = new THREE.DirectionalLight(0xdddddd, 1.0); // Fixed light color
sunlight.position.y = 15;
scene.add(sunlight);

// Cube
let geometry = new THREE.BoxGeometry(1, 1, 1);
let material = new THREE.MeshBasicMaterial({ color: 0xff0000 }); // Fixed color
let mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

// Animation Loop
function animate() {
    requestAnimationFrame(animate);
    mesh.rotation.x += 0.01; // Add rotation
    mesh.rotation.y += 0.01;
    renderer.render(scene, camera);
}
animate(); // Start loop
