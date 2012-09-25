exports.render = function() {
	return require("./content.jade")();
}

exports.start = function() {
	var THREE = require("three");
	require("jquery");
	
	// three.js canvas - camera - orthographic example
	
	var container, stats;
	var camera, scene, renderer;

	init();
	animate();

	function init() {
	
		camera = new THREE.OrthographicCamera( -400, 400, 400, -400, - 2000, 1000 );
		camera.position.x = 200;
		camera.position.y = 100;
		camera.position.z = 200;

		scene = new THREE.Scene();

		scene.add( camera );

		// Grid

		var geometry = new THREE.Geometry();
		geometry.vertices.push( new THREE.Vertex( new THREE.Vector3( - 500, 0, 0 ) ) );
		geometry.vertices.push( new THREE.Vertex( new THREE.Vector3( 500, 0, 0 ) ) );

		for ( var i = 0; i <= 20; i ++ ) {

			var line = new THREE.Line( geometry, new THREE.LineBasicMaterial( { color: 0x000000, opacity: 0.2 } ) );
			line.position.z = ( i * 50 ) - 500;
			scene.add( line );

			var line = new THREE.Line( geometry, new THREE.LineBasicMaterial( { color: 0x000000, opacity: 0.2 } ) );
			line.position.x = ( i * 50 ) - 500;
			line.rotation.y = 90 * Math.PI / 180;
			scene.add( line );

		}

		// Cubes

		var geometry = new THREE.CubeGeometry( 50, 50, 50 );
		var material = new THREE.MeshLambertMaterial( { color: 0xffffff, shading: THREE.FlatShading, overdraw: true } );

		for ( var i = 0; i < 100; i ++ ) {

			var cube = new THREE.Mesh( geometry, material );

			cube.scale.y = Math.floor( Math.random() * 2 + 1 );

			cube.position.x = Math.floor( ( Math.random() * 1000 - 500 ) / 50 ) * 50 + 25;
			cube.position.y = ( cube.scale.y * 50 ) / 2;
			cube.position.z = Math.floor( ( Math.random() * 1000 - 500 ) / 50 ) * 50 + 25;

			scene.add(cube);

		}

		// Lights

		var ambientLight = new THREE.AmbientLight( Math.random() * 0x10 );
		scene.add( ambientLight );

		var directionalLight = new THREE.DirectionalLight( Math.random() * 0xffffff );
		directionalLight.position.x = Math.random() - 0.5;
		directionalLight.position.y = Math.random() - 0.5;
		directionalLight.position.z = Math.random() - 0.5;
		directionalLight.position.normalize();
		scene.add( directionalLight );

		var directionalLight = new THREE.DirectionalLight( Math.random() * 0xffffff );
		directionalLight.position.x = Math.random() - 0.5;
		directionalLight.position.y = Math.random() - 0.5;
		directionalLight.position.z = Math.random() - 0.5;
		directionalLight.position.normalize();
		scene.add( directionalLight );

		renderer = new THREE.CanvasRenderer();
		renderer.setSize( 400, 400 );
		
		$(".three-container").append(renderer.domElement);
	}
	
	function animate() {
		if($(".three-container").length > 0) {
			requestAnimationFrame( animate );
			render();
		}
	}
	function render() {
		var timer = new Date().getTime() * 0.0001;

		camera.position.x = Math.cos( timer ) * 200;
		camera.position.z = Math.sin( timer ) * 200;
		camera.lookAt( scene.position );

		renderer.render( scene, camera );
	}
}