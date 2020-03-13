<template>
	<canvas 
		ref="grid_canvas"
		:width="width"
		:height="height"
		@click.left="leftClick"
		@mousemove="mouseMove">
	</canvas>
</template>

<style>
	canvas {
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
				height: 500,
				mouseX: null,
				mouseY: null
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

				const controller = panzoom(grid)

				console.log(controller)
			},
			leftClick () {
				console.log(this.mouseX)
				console.log(this.mouseY)
			},
			mouseMove (event) {
				const grid = this.$refs['grid_canvas']
				const rect = grid.getBoundingClientRect()
				const regex = /[.|\d]+/;
				const zoom = grid.style.transform.match(regex);

				this.mouseX = Math.floor((event.clientX - rect.left) / zoom)
				this.mouseY = Math.floor((event.clientY - rect.top) / zoom)
			}
		}
	}
</script>