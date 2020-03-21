var canvas = document.querySelector('canvas');


canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// context
let c = canvas.getContext('2d');


//Rectangles
// for (let i = 0; i < 50; i++) {
// 	let color = '#' + Math.floor(Math.random() * 16777215).toString(16);
// 	let x = Math.random() * window.innerWidth;
// 	let y = Math.random() * window.innerHeight;
// 	let dim = Math.random() * 100 + 50;
// 	c.fillStyle = color;
// 	c.fillRect(x,y,dim,dim);
// }



// Line
// c.beginPath();
// c.moveTo(50,300);
// c.lineTo(300,100);
// c.strokeStyle = "blue"
// c.stroke();


// Arc
// c.beginPath();
// c.arc(400,500,50,0,Math.PI * 2, false);
// c.strokeStyle  = "red";
// c.stroke();

// for (var i = 0; i < 50; i++) {
// 	var x = Math.random() * window.innerWidth;
// 	var y = Math.random() * window.innerHeight;
// 	var color = '#' + Math.floor(Math.random() *16777215).toString(16); 
// 	c.beginPath();
// 	c.arc(x,y,50,0,Math.PI * 2, false);
// 	c.strokeStyle  = color;
// 	c.stroke();
// }


let mouse = {
	x: undefined,
	y: undefined
}

let maxRadius = 100;
let minRadius = 10;	

window.addEventListener('mousemove', 
	function(event) {
		mouse.x = event.x;
		mouse.y = event.y;
});

window.addEventListener('resize', 
	function(event) {
		canvas.width = window.innerWidth;
		canvas.height = window.innerHeight;

		init();
	})

function Circle(x, y, dx, dy, radius, color) {
	this.x = x;
	this.y = y;
	this.dx = dx;
	this.dy = dy;
	this.radius = radius;
	this.minRadius = radius;
	this.color = '#' + Math.floor(Math.random() *16777215).toString(16);

	this.draw = function() {
		c.beginPath();
		c.arc(this.x,this.y,this.radius,0,Math.PI * 2, false);
		c.strokeStyle  = "blue";
		c.fillStyle = this.color;
		c.fill();
	}

	this.update = function() {
		if (this.x + this.radius > innerWidth || this.x - this.radius < 0) {
			this.dx = -this.dx;
		}

		if (this.y + this.radius > innerHeight || this.y - this.radius < 0) {
			this.dy = -this.dy;
		}

		this.x += this.dx;
		this.y += this.dy;

		// interactivity
		if (mouse.x - this.x < 50 && mouse.x - this.x > -50 && mouse.y - this.y < 50 && mouse.y - this.y > -50) {
			if (this.radius < maxRadius) {
				this.radius += 1;
			}
			
		} else if (this.radius > this.minRadius) {
			this.radius -= 1;
		}

		this.draw();
	}

}


let circleArray = [];
function init() {

	circleArray = [];
	for (var i = 0; i < 1000; i++) {
		let radius = Math.random() * 3 + 1;
		var x = Math.random()* (innerWidth - radius * 2) + radius;
		let y = Math.random()* (innerHeight - radius * 2) + radius;
		let dx = (Math.random() - 0.5) ;
		let dy = (Math.random() - 0.5) ;
		circleArray.push(new Circle(x, y, dx, dy, radius));
	}
}
function animate() {
	requestAnimationFrame(animate);
	c.clearRect(0,0,innerWidth, innerHeight);

	for (var i = 0; i < circleArray.length; i++) {
		circleArray[i].update();
	}
	
}

init();
animate();