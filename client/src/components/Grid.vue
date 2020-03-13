<template>
	<div id="grid">
		<h1>{{ title }}</h1>

		<canvas 
			id="canvas"
			:width="width"
			:height="height"
			>
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
				title: 'Grid',
				width: 500,
				height: 500
			}
		},
		mounted() {
			this.getRandomGrid()
		},
		methods: {
			async getRandomGrid () {
				const response = await GridService.randomGrid(this.width, this.height)

				const canvas = document.getElementById('canvas');
				const ctx = canvas.getContext('2d');

				const pixelData = response.data.pixels

				const clampedPixelArray = Uint8ClampedArray.from(pixelData);
				const pixelGridData = new ImageData(clampedPixelArray, this.width, this.height);

				ctx.putImageData(pixelGridData, 0, 0);
			}
		}
	}
</script>