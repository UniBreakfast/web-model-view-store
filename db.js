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

db.get = function(params) {
  return JSON.stringify(this.data)
}


// fake fetch to simulate working with the real backend db right in memory
function fetch(url, wait=1000) {
  let {path, params} = parsePath(url)
  return new Promise(resolve => {
    setTimeout(()=>{
      let response = {text: ()=>db[path](params)}
      setTimeout(()=> resolve(response), wait)
    }, wait)
  })
}

function parsePath(url) {
  let [path, params] = url.split('?')
  path = path.split('.')[0]
  params = params? params.split('&').map(param=>param.split('='))
    .reduce((obj, [key, value])=> {obj[key] = value; return obj}, {}) :0
  return params? {path, params} : {path}
}