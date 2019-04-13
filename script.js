
db.headers.forEach(header=> headers.innerHTML+=`<th>${header}</th>`)
db.rows.forEach(row=> dbtbody.innerHTML+=`<tr>${row.reduce((tr, td)=>
  tr+`<td><input value="${td}"></td>`,'')}</tr>`)
dbtbody.querySelectorAll('input').forEach(el=>el.onchange=dbCellChange)

function dbCellChange() {
  db.rows[[...this.parentElement.parentElement.parentElement.children].indexOf(this.parentElement.parentElement)][[...this.parentElement.parentElement.children].indexOf(this.parentElement)] = this.value
  console.log(db.rows)
}
