const v = {
  container: document.body,
  setContainer(element) { this.container = element },

  template: '',

  render(data) { this.container.innerHTML = data },

  handle(data) {
    this.render(data)
  },

}

v.container = view