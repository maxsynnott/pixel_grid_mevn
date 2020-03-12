<template>
	<div id="grid">
		<h1>Grid</h1>

		<canvas 
			id="canvas"
			height="500px"
			width="500px">
		</canvas>
	</div>
</template>

<style>
	canvas {
		border: 1px solid black;
	}
</style>

<script>
	

	export default {
		name: 'grid',
		data () {

		},
		mounted() {
			const canvas = document.getElementById('canvas');
			const ctx = canvas.getContext('2d');

			let pixelData = [];

			for (let i = 0; i < 500 * 500 * 4; i++) {
				pixelData.push(Math.round(Math.random() * 255))
			}

			const clampedPixelArray = Uint8ClampedArray.from(pixelData);
			const pixelGridData = new ImageData(clampedPixelArray, 500, 500);

			ctx.putImageData(pixelGridData, 0, 0);
		}
	}
</script>