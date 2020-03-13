import Api from '@/services/Api'

export default {
  randomGrid (width, height) {
    return Api().get(`random/${width}/${height}`)
  },
  firstGrid () {
		return Api().get('grid')
  }
}