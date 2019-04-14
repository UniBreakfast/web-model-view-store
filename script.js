
v.setEl(viewtbl)
v.setModel(m)
m.setClerk(c)
v.setPrep(data=> data.rows.map(row=>
  [row[1]+' '+row[2], row[3], row[4], row[5]]))

c.setFetch('get.json')
m.fetch(procedure)
function procedure(){
    m.parse()
    v.prepare()
    v.render()
    showDB()
    dbtbody.querySelectorAll('input').forEach(el=>el.onchange=dbCellChange)
    showModelData()
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

function showModelData() {
  model.innerHTML = `{\n  headers: [${m.data.headers.reduce((html,header,i,arr)=>`${html}"${header}"${arr.length-i-1?', ':''}`,'')}],\n  rows: [\n${m.data.rows.reduce((html,row)=>`${html}    [${row.reduce((str,cell,i)=>`${str}"${cell}"${row.length-i-1?', ':''}`,'')}],\n`,'')}  ]\n}`
}

refresh.onclick =()=> {
  m.fetch(()=>{
    m.parse()
    v.prepare()
    v.render()
    showModelData()
  })
}
