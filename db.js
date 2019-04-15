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
  const { modify } = params,
        { headers, rows } = this.data
  if (modify)
    return JSON.stringify({ headers, rows: rows.filter(row=>row[7]>modify)})
  return JSON.stringify(this.data)
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
    db.data.headers.reduce((html, header) => `${html}<th>${header}</th>`, '');
  dbtbody.innerHTML = db.data.rows.reduce((html, row) =>
    `${html}<tr>${row.reduce((tr, td) =>
      `${tr}<td><input value="${td}"></td>`, '')}</tr>`, '');
}

function dbCellChange() {
  const row = [...this.parentNode.parentNode.parentNode.children]
                .indexOf(this.parentNode.parentNode),
        cell = [...this.parentNode.parentNode.children]
                .indexOf(this.parentNode);
  db.data.rows[row][cell] = this.value
  this.parentNode.parentNode.children[7].children[0].value =
    db.data.rows[row][7] = ISOdate(Date.now())
}