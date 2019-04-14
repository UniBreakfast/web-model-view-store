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
  // fetch() { this.clerk.fetch(json=> this.json=json) },
  fetch() { this.json = this.clerk.fetch() },
  parse() { this.data = JSON.parse(this.json) },
  load() { },
}
c = {
  setDB(db) { this.db = db },
  setFetch(path) { this.fetchPath = path },
  setPush(path) { this.pushPath = path },
  setFetchParams(params) { this.fetchParams = params },
  fetch(cb, params) {
    if (this.fetchParams && params) params = {...this.fetchParams, ...params}
    else if (this.fetchParams) params = this.fetchParams
    fetch(this.fetchPath+ (params? `${this.fetchPath}?${Object.entries(params)
      .map(([key,value])=>`${key}=${value}`).join('&')}` :''))
        .then(resp=>resp.text())
        .then(cb)
  },
  fetch() { return JSON.stringify(this.db) }
}
