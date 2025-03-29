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
const ambientLight = new THREE.AmbientLight(0x101010, 1.0);
scene.add(ambientLight);

const sunlight = new THREE.DirectionalLight(0xdddddd, 1.0); // Fixed light color
sunlight.position.y = 15;
scene.add(sunlight);

// Cube
const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({ color: 0xff0000 }); // Fixed color
const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

// Event Listener for Key Presses
document.addEventListener("keydown", onKeyDown, false);

const floorTexture=new THREE.TextureLoader().load("img/Table.jpg")

const planeGeometry = new THREE.PlaneGeometry(50, 50);
const planeMaterial = new THREE.MeshBasicMaterial({
    map:floorTexture,
    side: THREE.DoubleSide,
});

const floorPlane = new THREE.Mesh(planeGeometry, planeMaterial);
floorPlane.rotation.x = -Math.PI / 2; // Rotate plane to lay flat
floorPlane.position.y = -Math.PI; // Move slightly below the cube
scene.add(floorPlane);

//Create the walls
const wallGroup=new THREE.Group();
scene.add(wallGroup);

const frontWall=new THREE.Mesh(
    new THREE.BoxGeometry(50,20,0.001),
    new THREE.MeshBasicMaterial({color:'green'})
);
frontWall.position.z=-20;

const leftWall=new THREE.Mesh(
    new THREE.BoxGeometry(50,20,0.001),
    new THREE.MeshBasicMaterial({
        color:'red'
    })
)

leftWall.rotation.y=Math.PI/2;
leftWall.rotation.x=-20;

wallGroup.add(frontWall,leftWall);


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
