v = {
  setEl(el) { this.el = el },
  setModel(model) { this.model = model; model.view = this },
  setPrep(prep) { this.prep = prep },
  setSort(sorter) { this.sorter = sorter },
  sorter: (a,b)=>(a[0]>b[0])-.5,
  prepare() { this.data = this.prep(this.model.data) },
  render() {
    let data = this.data.sort(this.sorter).map(row=>row.slice(1))
    this.el.tBodies[0].innerHTML = data.reduce((str, row)=> str + `<tr>${row.reduce((str, cell)=> str + `<td>${cell}</td>`, '')}</tr>`, '')
  }
}
m = {
  setClerk(clerk) { this.clerk = clerk },
  setData(tplObj) { this.data = tplObj },
  fetch(cb, params={}) {
    this.clerk.fetch(json=> {this.json=json; cb()}, params)
  },
  parse() {
    const upd = JSON.parse(this.json)
    this.data.headers = upd.headers
    const ids = upd.rows.map(row=>row[0])
    this.data.rows = this.data.rows.filter(row=>!ids.includes(row[0]))
    this.data.rows.unshift(...upd.rows)
  },
  load() { },
}
c = {
  setFetch(path) { this.fetchPath = path },
  setPush(path) { this.pushPath = path },
  setFetchParams(params) { this.fetchParams = params },
  fetch(cb, params) {
    if (this.fetchParams && params) params = {...this.fetchParams, ...params}
    else if (this.fetchParams) params = this.fetchParams
    fetch(this.fetchPath + (params? `?${Object.entries(params)
      .map(([key,value])=>`${key}=${value}`).join('&')}` :''))
        .then(resp=>resp.text())
        .then(cb)
  },
}
