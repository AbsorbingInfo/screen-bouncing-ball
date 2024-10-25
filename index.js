const canvas = document.getElementsByTagName('canvas')[0];
const c = canvas.getContext('2d');
canvas.width = innerWidth;
canvas.height = innerHeight;

class Ball {
	constructor(radius, xVelocity, yVelocity) {
		this.radius = radius;
		this.x = innerWidth / 2;
		this.y = innerHeight / 2;
		this.xVelocity = xVelocity;
		this.yVelocity = yVelocity;
		this.color = 'white';
	}
	draw() {
		c.beginPath();
		c.fillStyle = this.color;
		this.x += this.xVelocity;
		this.y += this.yVelocity;
		c.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
		c.fill();
	}
}

const directions = ['top', 'right', 'bottom', 'left'];
const colors = [
	'#00FF9C',
	'#FFDB00',
	'#FF204E',
	'#45FFCA',
	'#16FF00',
	'#77ACF1',
	'#FF005C',
	'#FF5200',
	'#A6CB12',
];
const randomIdx = Math.floor(Math.random() * 4);
const velocity = 3;
let lastCollided = directions[randomIdx];
const ball = new Ball(70, 1, 1);

function changeColor() {
	const randomColorIdx = Math.floor(Math.random() * colors.length);
	ball.color = colors[randomColorIdx];
}

function animate() {
	c.clearRect(0, 0, canvas.width, canvas.height);
	// colusion detection
	if (ball.x + ball.radius >= canvas.width) {
		// right wall
		lastCollided = 'right';
		changeColor();
	} else if (ball.x - ball.radius <= 0) {
		// left wall
		lastCollided = 'left';
		changeColor();
	} else if (ball.y + ball.radius >= canvas.height) {
		// bottom wall
		lastCollided = 'bottom';
		changeColor();
	} else if (ball.y - ball.radius <= 0) {
		// top wall
		lastCollided = 'top';
		changeColor();
	}

	if (lastCollided === 'right') {
		ball.xVelocity = -velocity;
	} else if (lastCollided === 'left') {
		ball.xVelocity = velocity;
	} else if (lastCollided === 'top') {
		ball.yVelocity = velocity;
	} else if (lastCollided === 'bottom') {
		ball.yVelocity = -velocity;
	}
	ball.draw();
	canvas.removeEventListener('click', clickHandler);
	canvas.addEventListener('click', clickHandler);
	requestAnimationFrame(animate);
}

function isInsideCircle(x, y, centerX, centerY, radius) {
	return (
		Math.pow(x - centerX, 2) + Math.pow(y - centerY, 2) <= Math.pow(radius, 2)
	);
}

function clickHandler(event) {
	const x = event.clientX;
	const y = event.clientY;
	if (isInsideCircle(x, y, ball.x, ball.x, ball.radius)) {
		console.log('inside circle');
		if (lastCollided === 'right') {
			ball.xVelocity -= velocity;
		} else if (lastCollided === 'left') {
			ball.xVelocity += velocity;
		} else if (lastCollided === 'top') {
			ball.yVelocity += velocity;
		} else if (lastCollided === 'bottom') {
			ball.yVelocity -= velocity;
		}
	}
}

animate();
