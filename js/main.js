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

// Event Listener for Key Presses
document.addEventListener("keydown", onKeyDown, false);

let floorTexture=new THREE.TextureLoader().load("img/Table.jpg")

let planeGeometry = new THREE.PlaneGeometry(50, 50);
let planeMaterial = new THREE.MeshBasicMaterial({
    map:floorTexture,
    side: THREE.DoubleSide,
});

let floorPlane = new THREE.Mesh(planeGeometry, planeMaterial);
floorPlane.rotation.x = -Math.PI / 2; // Rotate plane to lay flat
floorPlane.position.y = -0.5; // Move slightly below the cube
scene.add(floorPlane);

function onKeyDown(event) {
    let moveSpeed = 0.1;

    switch (event.key) {
        case "ArrowRight":
            camera.position.x += moveSpeed; // Move right
            break;
        case "ArrowLeft":
            camera.position.x -= moveSpeed; // Move left
            break;
        case "ArrowUp":
            camera.position.y += moveSpeed; // Move up
            break;
        case "ArrowDown":
            camera.position.y -= moveSpeed; // Move down
            break;
    }
}

// Animation Loop
function animate() {
    requestAnimationFrame(animate);
    mesh.rotation.x += 0.01; // Add rotation
    mesh.rotation.y += 0.01;
    renderer.render(scene, camera);
}
animate(); // Start loop
