// Function stolen from the internets
function addEvent( element, eventName, fn ) {
	if ( element.addEventListener ) {
		element.addEventListener( eventName, fn, false );
	} else if ( element.attachEvent ) {
		element.attachEvent( "on" + eventName, fn );
	}
}

// This is also stolen
function rb655_isMobile() {
	if ( /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|ipad|iris|kindle|Android|Silk|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test( navigator.userAgent )
		|| /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test( navigator.userAgent.substr( 0, 4 ) ) )
	{
		return true;
	}
	return false;
}

var SnowFall = function() {
	this.canvas = document.createElement( "canvas" );
	this.canvas.style.zIndex = 9999;
	this.canvas.style.display = "block";
  this.canvas.style.position = "fixed";
  this.canvas.style.top = "0px";
  this.canvas.style.left = "0px";
  this.canvas.style.bottom = "0px";
  this.canvas.style.right = "0px";
  this.canvas.style.pointerEvents = "none";           
	document.body.appendChild( this.canvas );

	this.ctx = this.canvas.getContext( "2d" );

	this.updateSize( true );

	// Config
	this.maxParticles = 48;
	this.minRadius = 1;
	this.maxRadius = 8;
	// End Config

	this.particles = [];

	for ( var i = 0; i < this.maxParticles; i++ ) {
		this.particles.push( {
			x: Math.random() * this.width,
			y: Math.random() * this.height,
			r: Math.random() * ( this.maxRadius - this.minRadius ) + this.minRadius,
			d: Math.random() * this.maxParticles // Density
		} );
	}

	// Initialize the script

	if ( rb655_isMobile() ) {
		return; // Don't initialize on mobile devices, we don't want to kill them.
	}

	this.pause( document.visibilityState == "hidden" );
	var fuckingJS = this;
	setInterval( function() {
		if ( fuckingJS.bPaused ) return;
		fuckingJS.draw();
	}, 50 );
};

SnowFall.prototype.pause = function( bPause ) {
	this.bPaused = bPause;
};

SnowFall.prototype.updateSize = function( resize ) {
	this.width = window.innerWidth
	this.height = window.innerHeight;

	if ( resize ) {
		this.canvas.width = this.width;
		this.canvas.height = this.height;
	}
};

SnowFall.prototype.draw = function() {
	this.updateSize( true );

	this.ctx.clearRect( 0, 0, this.width, this.height );

	this.ctx.fillStyle = "rgba(255, 255, 255, 0.8)";

	//this.ctx.lineWidth = 1;
	//this.ctx.strokeStyle = '#000';

	this.ctx.beginPath();

	for ( var i = 0; i < this.maxParticles; i++ ) { // TODO: For k,v in pairs loop?
		var p = this.particles[ i ];
		this.ctx.moveTo( p.x, p.y );
		this.ctx.arc( p.x, p.y, p.r, 0, Math.PI * 2, true );
	}

	this.ctx.fill();
	//this.ctx.stroke();

	this.update();
};

//var lastNow = 0;
var angle = 0;
SnowFall.prototype.update = function() {
	this.updateSize();

	/*console.log( performance.now() - lastNow );
	/console.log( 1 / (performance.now() - lastNow) );

	var delta = 1 / (performance.now() - lastNow)
	lastNow = performance.now()*/

	angle += 0.01;

	for ( var i = 0; i < this.maxParticles; i++ ) { // TODO: For k,v in pairs loop?
		var p = this.particles[ i ];
		//Updating X and Y coordinates
		//We will add 1 to the cos function to prevent negative values which will lead flakes to move upwards
		//Every particle has its own density which can be used to make the downward movement different for each flake
		//Lets make it more random by adding in the radius
		p.y += Math.cos( angle + p.d ) + 1 + p.r / 2;
		p.x += Math.sin( angle ) * 2;

		//Sending flakes back from the top when it exits
		//Lets make it a bit more organic and let flakes enter from the left and right also.
		if ( p.x > this.width + 5 || p.x < -5 || p.y > this.height ) {
			if( i % 3 > 0 ) { //66.67% of the flakes
				this.particles[ i ] = { x: Math.random() * this.width, y: -10, r: p.r, d: p.d };
			} else {
				//If the flake is exitting from the right
				if ( Math.sin( angle ) > 0 ) {
					//Enter from the left
					this.particles[ i ] = { x: -5, y: Math.random() * this.height, r: p.r, d: p.d };
				} else {
					//Enter from the right
					this.particles[ i ] = { x: this.width + 5, y: Math.random() * this.height, r: p.r, d: p.d };
				}
			}
		}
	}
};

var mySnowFall;
addEvent( window, "load", function() {
	mySnowFall = new SnowFall();
} );

addEvent( document, "visibilitychange", function() {
	mySnowFall.pause( document.visibilityState == "hidden" );
} );
