
v.setEl(viewtbl)
v.setModel(m)
m.setClerk(c)
c.setDB(db)
v.setPrep(data=> data.rows.map(row=>
  [row[1]+' '+row[2], row[3], row[4], row[5]]))

m.fetch()
m.parse()
v.prepare()
v.render()

db.headers.forEach(header=> headers.innerHTML+=`<th>${header}</th>`)
db.rows.forEach(row=> dbtbody.innerHTML+=`<tr>${row.reduce((tr, td)=>
  tr+`<td><input value="${td}"></td>`,'')}</tr>`)
dbtbody.querySelectorAll('input').forEach(el=>el.onchange=dbCellChange)

function dbCellChange() {
  db.rows[[...this.parentElement.parentElement.parentElement.children].indexOf(this.parentElement.parentElement)][[...this.parentElement.parentElement.children].indexOf(this.parentElement)] = this.value
  console.log(db.rows)
}

model.innerHTML = `{\n  headers: [${m.data.headers.reduce((html,header,i,arr)=>`${html}"${header}"${arr.length-i-1?', ':''}`,'')}],\n  rows: [\n${m.data.rows.reduce((html,row)=>`${html}    [${row.reduce((str,cell,i)=>`${str}"${cell}"${row.length-i-1?', ':''}`,'')}],\n`,'')}  ]\n}`