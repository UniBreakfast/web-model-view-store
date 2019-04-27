view = {
  holder: viewholder,
  render(data) {
    mur(`going to render data: "${data}" in viewholder`)
    this.holder.innerText = data
  }
}

mur('view loaded...')
