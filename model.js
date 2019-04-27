model = {
  take(data) {
    mur('model takes the data')
    this.data = data
    mur(`model.data holds the data: "${this.data}"`)
  }
}

mur('model loaded...')
