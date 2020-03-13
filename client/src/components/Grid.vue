<template>
	<div id="grid">
		<h1>{{ title }}</h1>

		<canvas 
			ref="grid_canvas"
			:width="width"
			:height="height">
		</canvas>
	</div>
</template>

<style>
	canvas {
		border: 1px solid black;
		image-rendering: pixelated;
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
			this.activatePanzoom()
		},
		methods: {
			async getRandomGrid () {
				const response = await GridService.randomGrid(this.width, this.height)

				const canvas = this.$refs['grid_canvas'];
				const ctx = canvas.getContext('2d');

				const pixelData = response.data.pixels

				const clampedPixelArray = Uint8ClampedArray.from(pixelData);
				const pixelGridData = new ImageData(clampedPixelArray, this.width, this.height);

				ctx.putImageData(pixelGridData, 0, 0);
			},
			activatePanzoom () {
				const panzoom = require('panzoom')

				const grid = this.$refs['grid_canvas']

				const controller = panzoom(
					grid
				)

				console.log(controller)
			}
		}
	}
</script>