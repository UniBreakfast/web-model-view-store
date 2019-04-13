// function fetch(url, opt={method: 'GET'}) {
//   if (opt.method=='POST') url
//   return new Promise(resolve=> setTimeout(()=>resolve(s.val), 1000))
// }

// makeModel = function(el) {
//   return {
//     get val(   ) { return el.value       },
//     set val(val) { return el.value = val }
//   }
// }
//
// v = makeModel(view )
// m = makeModel(model)
// s = makeModel(store)
//
//
// v.to_m =()=> m.val=v.val
// m.to_v =()=> v.val=m.val
//
// m.to_s =()=> {fetch()}
// m.to_s =()=> {setTimeout(()=> s.val=m.val, 1000)}
// m.grab =cb=> {setTimeout(()=>{ m.val=s.val; if (cb) cb() }, 1000)}
//
// v.push =()=> { v.to_m(); m.to_s() }
// m.push =()=> { m.to_v(); m.to_s() }
// v.pull = m.pull =()=> m.grab(m.to_v)
//
// refresh.onclick = v.pull
// view.oninput = v.push
// model.onchange = m.push
// setInterval(()=>
//   {if (![view, model].includes(document.activeElement)) m.pull()}, 7000)
v = {
    el: view,
    render(data) {
        this.el.tBodies[0].innerHTML = data.reduce((str, row)=> str + `<tr>${row.reduce((str, cell)=> str + `<td>${cell}</td>`, '')}</tr>`, '')
    }
}
function peopleGen() {
  let firsts = ["John", "Jack", "Alex", "Maria", "Jessica", "Alice", "Teresa", "Monica", "Peter", "Oliver", "Claudia", "Theodore", "Chad", "Cole", "Valery", "Bert", "Tony"],
  lasts = ["Smith", "Carter", "White", "Black", "Silver", "Taylor", "Jackson", "Kent", "Jones", "Walker", "Night", "Porter", "Butler", "Blanc", "Good", "Wood", "Ward", "Strong", "Bright"],
  words = ["doggy", "flier", "boyscout", "tanker", "spaceship", "battleground", "groundhog", "smokescreen", "forester", "monkeys", "lightbulb", "bottleneck", "kangaroo", "marionette", "puppeteer", "flagstock", "sailor", "portrait", "direction", "sponsor", "fiancee", "impression", "inertia", 'pokerface', 'caterpillar', 'waterline', 'butterfly', 'healer'],
  now = Date.now(), create,
  length = words.length
  rows = []
  for (i=0; i<length; i++) rows.push([
      i+1,
      firsts[Math.floor(Math.random()*firsts.length)],
      lasts[Math.floor(Math.random()*lasts.length)],
      Math.floor(Math.random()*60)+14,
      words.pop(),
      Math.floor(Math.random()*76)*100,
      create = new Date(now-Math.floor(Math.random()*1000*60*10)).toISOString().replace('T',' ').replace(/\..*/,''),
      create])
  return {headers: ['id','first','last','age','word','score','dt_create','dt_modify'], rows}
}

db = peopleGen()
db.headers.forEach(header=> headers.innerHTML+=`<th>${header}</th>`)
db.rows.forEach(row=> dbtbody.innerHTML+=`<tr>${row.reduce((tr, td)=>
  tr+`<td><input value="${td}"></td>`,'')}</tr>`)
dbtbody.querySelectorAll('input').forEach(el=>el.onchange=dbCellChange)

function dbCellChange() {
  db.rows[[...this.parentElement.parentElement.parentElement.children].indexOf(this.parentElement.parentElement)][[...this.parentElement.parentElement.children].indexOf(this.parentElement)] = this.value
  console.log(db.rows)
}
