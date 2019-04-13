v = {
  setEl(el) { this.el = el },
  setModel(model) { this.model = model; model.view = this },
  setPrep(prep) { this.prep = prep },
  prepare() { this.data = this.prep(this.model.data) },
  render() {
    this.el.tBodies[0].innerHTML = this.data.reduce((str, row)=> str + `<tr>${row.reduce((str, cell)=> str + `<td>${cell}</td>`, '')}</tr>`, '')
  }
}
m = {
  setClerk(clerk) { this.clerk = clerk },
  fetch() { this.json = this.clerk.fetch() },
  parse() { this.data = JSON.parse(this.json) }
}
c = {
  setDB(db) { this.db = db },
  fetch() { return JSON.stringify(this.db) }
}