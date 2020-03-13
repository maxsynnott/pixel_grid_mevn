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
				width: 100,
				height: 100,
				mouseX: null,
				mouseY: null,
				color: 'white'
			}
		},
		mounted() {
			this.getFirstGrid()
			this.activatePanzoom()

			document.addEventListener('keyup', (event) => {
				const colorObject = {
					'1': 'white',
					'2': 'black',
					'3': 'red',
					'4': 'green',
					'5': 'blue'
				}

				if (colorObject[event.key]) {
					this.color = colorObject[event.key]

					console.log('Changed color to ' + colorObject[event.key])
				}
			})
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
			async getFirstGrid () {
				const response = await GridService.firstGrid()

				const grid = response.data.grid

				this.width = grid.width
				this.height = grid.height

				console.log(grid.pixels)

				const clampedPixelArray = Uint8ClampedArray.from(grid.pixels);
				const pixelGridData = new ImageData(clampedPixelArray, this.width, this.height);
				
				const canvas = this.$refs['grid_canvas'];
				const ctx = canvas.getContext('2d');	

				ctx.putImageData(pixelGridData, 0, 0);	
			},
			activatePanzoom () {
				const panzoom = require('panzoom')

				const grid = this.$refs['grid_canvas']

				panzoom(grid)
			},
			leftClick () {
				const canvas = this.$refs['grid_canvas'];
				const ctx = canvas.getContext('2d');

				ctx.fillStyle = this.color;
				ctx.fillRect(this.mouseX, this.mouseY, 1, 1);
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