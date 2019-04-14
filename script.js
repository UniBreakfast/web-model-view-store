
v.setEl(viewtbl)
v.setModel(m)
m.setClerk(c)
c.setDB(db)
v.setPrep(data=> data.rows.map(row=>
  [row[1]+' '+row[2], row[3], row[4], row[5]]))

c.setFetch('db.json')
m.fetch()
m.parse()
v.prepare()
v.render()

function showDB() {
  headers.innerHTML =
    db.headers.reduce((html, header) => `${html}<th>${header}</th>`, '');
  dbtbody.innerHTML = db.rows.reduce((html, row) => `${html}<tr>${row.reduce((tr, td) => `${tr}<td><input value="${td}"></td>`, '')}</tr>`, '');
}
showDB();

function dbCellChange() {
  const row = [...this.parentNode.parentNode.parentNode.children]
                .indexOf(this.parentNode.parentNode),
        cell = [...this.parentNode.parentNode.children]
                .indexOf(this.parentNode);
  db.rows[row][cell] = this.value
  this.parentNode.parentNode.children[7].children[0].value =
    db.rows[row][7] = ISOdate(Date.now())
}
dbtbody.querySelectorAll('input').forEach(el=>el.onchange=dbCellChange)

function showModelData() {
  model.innerHTML = `{\n  headers: [${m.data.headers.reduce((html,header,i,arr)=>`${html}"${header}"${arr.length-i-1?', ':''}`,'')}],\n  rows: [\n${m.data.rows.reduce((html,row)=>`${html}    [${row.reduce((str,cell,i)=>`${str}"${cell}"${row.length-i-1?', ':''}`,'')}],\n`,'')}  ]\n}`
}
showModelData()

refresh.onclick =()=> {
  m.fetch()
  m.parse()
  v.prepare()
  v.render()
  showModelData()
}