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
	import GridService from '@/services/GridService'

	export default {
		name: 'grid',
		data: () => {
			return {

			}
		},
		mounted() {
			this.getRandomGrid()
		},
		methods: {
			async getRandomGrid () {
				const response = await GridService.randomGrid(500, 500)

				const canvas = document.getElementById('canvas');
				const ctx = canvas.getContext('2d');

				const pixelData = response.data.pixels

				const clampedPixelArray = Uint8ClampedArray.from(pixelData);
				const pixelGridData = new ImageData(clampedPixelArray, 500, 500);

				ctx.putImageData(pixelGridData, 0, 0);
			}
		}
	}
</script>