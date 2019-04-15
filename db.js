rand = (num,shift=0) => Math.floor(Math.random()*num)+shift
ISOdate = timestamp => new Date(timestamp)
  .toISOString().replace('T',' ').replace(/\..*/,'')
function peopleGen() {
  let firsts = ['John', 'Jack', 'Alex', 'Maria', 'Jessica', 'Alice', 'Teresa', 'Monica', 'Peter', 'Oliver', 'Claudia', 'Theodore', 'Chad', 'Cole', 'Valery', 'Bert', 'Tony'],
  lasts = ['Smith', 'Carter', 'White', 'Black', 'Silver', 'Taylor', 'Jackson', 'Kent', 'Jones', 'Walker', 'Night', 'Porter', 'Butler', 'Blanc', 'Good', 'Wood', 'Ward', 'Strong', 'Bright'],
  now = Date.now(), create,
  length = words.length
  rows = []
  for (i=0; i<100; i++) rows.push([
      i+1,
      firsts[rand(firsts.length)],
      lasts[rand(lasts.length)],
      rand(60, 14),
      words[rand(length)],
      rand(99)*100,
      create = ISOdate(now-rand(600000)),
      create])
  return {headers: ['id','first','last','age','word','score','dt_create','dt_modify'], rows}
}

db = { data: peopleGen() }

db.get = function(params={}) {
  const { modify, track } = params,
        { headers, rows } = this.data,
        response = {}
  if (track) {
    var gone = track.split('.').filter(id=>!rows.map(row=>row[0]).includes(+id))
    if (gone.length) response.gone = gone
  }
  if (modify) response.rows = rows.filter(row=>row[7]>modify)
  else response.rows = rows
  if (response.rows.length) response.headers = headers
  else delete response.rows
  return JSON.stringify(response)
}

db.set = function(params) {
  return JSON.stringify({ok:{id:4}})
}


// fake fetch to simulate working with the real backend db right in memory
function fetch(url, wait=40) {
  let {path, params} = parsePath(url)
  return new Promise(resolve => {
    setTimeout(()=>{
      const resp = db[path](params), response = {text: ()=>resp}
      setTimeout(()=> resolve(response), wait+resp.length/7)
    }, wait+url.length)
  })
}

function parsePath(url) {
  let [path, params] = url.split('?')
  path = path.split('.')[0]
  params = params? params.split('&').map(param=>param.split('='))
    .reduce((obj, [key, value])=> {obj[key] = value; return obj}, {}) :0
  return params? {path, params} : {path}
}

function showDB() {
  headers.innerHTML =
    db.data.headers.reduce((html, header) => `${html}<th>${header}</th>`, '')
  dbtbody.innerHTML = db.data.rows.reduce((html, row, j) =>
    `${html}<tr>${row.reduce((tr, td, i) =>
      `${tr}<td><input data-row=${j} data-cell=${i} value="${td}"></td>`, '')}</tr>`, '')
}

function dbCellChange() {
  db.data.rows[this.dataset.row][this.dataset.cell] = this.value
  this.parentNode.parentNode.children[7].children[0].value =
    db.data.rows[this.dataset.row][7] = ISOdate(Date.now())
}