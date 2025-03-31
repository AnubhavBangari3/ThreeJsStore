// Initialize Scene
// import * as THREE from 'three';
// import * as STDLIB from 'three-stdlib';



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


const textureLoader=new THREE.TextureLoader();
const floorTexture=textureLoader.load("img/floor2.jpg")
floorTexture.wrapS=THREE.RepeatWrapping;
floorTexture.wrapT=THREE.RepeatWrapping;
//floorTexture.repeat.set(20,20);

const wallColor=textureLoader.load("img/wall2.webp")

const topColor=textureLoader.load("img/top.jpg")

const planeGeometry = new THREE.PlaneGeometry(50, 50);
const planeMaterial = new THREE.MeshBasicMaterial({
    map:floorTexture,
    side: THREE.DoubleSide,
});

const wallMaterial = new THREE.MeshBasicMaterial({
    map:wallColor,
    //side: THREE.DoubleSide,
});

const topMaterial = new THREE.MeshBasicMaterial({
    map:topColor,
    //side: THREE.DoubleSide,
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
    wallMaterial
);
frontWall.position.z=-20;

const leftWall=new THREE.Mesh(
    new THREE.BoxGeometry(50,20,0.001),
    wallMaterial
)

leftWall.position.x = -25; // Move left
leftWall.rotation.y = Math.PI / 2; // Face the room

const rightWall=new THREE.Mesh(
    new THREE.BoxGeometry(50,20,0.001),
    wallMaterial
)
rightWall.position.x = 25; // Move to the right
rightWall.rotation.y = -Math.PI / 2; // Rotate to face the front

wallGroup.add(frontWall,leftWall,rightWall);

for (let i = 0; i < wallGroup.children.length; i++) {
    wallGroup.children[i].BBox = new THREE.Box3().setFromObject(wallGroup.children[i]);
}


//Create the ceiling
const ceilingGeometry=new THREE.PlaneBufferGeometry(50,50);
const celingMaterial=new THREE.MeshBasicMaterial(
    topMaterial
);

const ceilingPlane=new THREE.Mesh(ceilingGeometry,celingMaterial);

ceilingPlane.rotation.x = Math.PI / 2; 
ceilingPlane.position.y = 10; 

scene.add(ceilingPlane);

function createPainting(imageURL,w,h,position){
    const textureLoader=new THREE.TextureLoader();
    const paintingTexture=textureLoader.load(imageURL);
    const paintingMaterial=new THREE.MeshBasicMaterial({
        map: paintingTexture,
        side: THREE.DoubleSide
    });
    const paintingGeometry=new THREE.PlaneGeometry(w,h);
    const painting=new THREE.Mesh(paintingGeometry,paintingMaterial);
    painting.position.set(position.x,position.y,position.z);

    return painting;
}

//Painting start
const painting1=createPainting('artwork/1.jpg',10,8,new THREE.Vector3(-10,5,-19.9));
const painting2=createPainting('artwork/0.jpg',10,8,new THREE.Vector3(10,5,-19.9));

const painting3 = createPainting(
    'artwork/3.webp', 
    4, 
    5, 
    new THREE.Vector3(-24.9, 5, 0) // Left wall
);
painting3.rotation.y = Math.PI / 2;

const painting7 = createPainting(
    'artwork/3.webp', 
    4, 
    5, 
    new THREE.Vector3(-24.9, 5, 5) // Left wall
);
painting7.rotation.y = Math.PI / 2;

const painting5 = createPainting(
    'artwork/5.jpg', 
    4, 
    5, 
    new THREE.Vector3(-24.9, 5,10) // Left wall, slightly offset
);
painting5.rotation.y = Math.PI / 2; // Face inward


const painting8 = createPainting(
    'artwork/5.jpg', 
    4, 
    5, 
    new THREE.Vector3(-24.9, 5,15) // Left wall, slightly offset
);
painting8.rotation.y = Math.PI / 2; // Face inward


const painting4 = createPainting(
    'artwork/4.webp', 
    4, 
    5,  
    new THREE.Vector3(24.9, 5, 0) // Right wall
);
painting4.rotation.y = -Math.PI / 2;

const painting9 = createPainting(
    'artwork/4.webp', 
    4, 
    5, 
    new THREE.Vector3(24.9, 5, 5) // Right wall
);
painting9.rotation.y = -Math.PI / 2;

const painting6 = createPainting(
    'artwork/6.jpg', 
    4, 
    5,  
    new THREE.Vector3(24.9, 5, 10) // Right wall
);
painting6.rotation.y = -Math.PI / 2;

const painting10 = createPainting(
    'artwork/6.jpg', 
    4, 
    5, 
    new THREE.Vector3(24.9, 5, 15) // Right wall
);
painting10.rotation.y = -Math.PI / 2;

scene.add(painting1,painting2,painting3,painting4,painting5,painting6,painting7,painting8,painting9,painting10);
//Painting end

const controls=new THREE.PointerLockControls(camera,document.body);
function startExperience(){
controls.lock();
hideMenu();
}
const playButton=document.getElementById('play_button');
playButton.addEventListener('click',startExperience);

function hideMenu(){
    const menu=document.getElementById('menu');
    menu.style.display = "none";
}
function showMenu(){
    const menu=document.getElementById('menu');
     menu.style.display = "block"
}

controls.addEventListener('unlock',showMenu);

function onKeyDown(event) {
    const moveSpeed = 0.2;
    const direction = new THREE.Vector3();

    // Get camera's forward direction (ignoring Y-axis for ground movement)
    camera.getWorldDirection(direction);
    direction.y = 0; // Keep movement horizontal
    direction.normalize();

    switch (event.key) {
        case "ArrowUp":
        case "w":
        case "W":
            // Move forward
            camera.position.addScaledVector(direction, moveSpeed);
            break;
        case "ArrowDown":
        case "s":
        case "S":
            // Move backward
            camera.position.addScaledVector(direction, -moveSpeed);
            break;
        case "ArrowLeft":
        case "a":
        case "A":
            // Strafe left (perpendicular to forward direction)
            const leftDirection = new THREE.Vector3().crossVectors(
                new THREE.Vector3(0, 1, 0), // Up vector
                direction
            );
            camera.position.addScaledVector(leftDirection, moveSpeed);
            break;
        case "ArrowRight":
        case "d":
        case "D":
            // Strafe right (opposite of left)
            const rightDirection = new THREE.Vector3().crossVectors(
                direction,
                new THREE.Vector3(0, 1, 0) // Up vector
            );
            camera.position.addScaledVector(rightDirection, moveSpeed);
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
