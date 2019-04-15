
v.setEl(viewtbl)
v.setModel(m)
m.setClerk(c)
m.setData({headers:[],rows:[]})
v.setPrep(data=> data.rows.map(row=>
  [row[0], row[1]+' '+row[2], row[3], row[4], row[5]]))

c.setFetch('get.json')
m.fetch(procedure)

function procedure(){
    m.parse()
    v.prepare()
    v.render()
    showDB()
    dbtbody.querySelectorAll('input').forEach(el=>{
      el.onchange=dbCellChange
      el.onkeydown =e=> { if (e.key=='Delete' && e.shiftKey) {
        // e.target.dataset.row
      }}
    })
    showModelData()
}

function showModelData() {
  model.innerHTML = `{\n  headers: [${m.data.headers.reduce((html,header,i,arr)=>`${html}"${header}"${arr.length-i-1?', ':''}`,'')}],\n  rows: [\n${m.data.rows.reduce((html,row)=>`${html}    [${row.reduce((str,cell,i)=>`${str}"${cell}"${row.length-i-1?', ':''}`,'')}],\n`,'')}  ]\n}`
}

refresh.onclick =()=> {
  let params = {}
  if (m.data) {
    if (m.data.rows.length) {
      params.modify = m.data.rows.reduce((max,cur)=>max<cur[7]? cur[7]:max,'')
      params.track = m.data.rows.map(row=>row[0]).join('.')
    }
  }
  m.fetch(()=>{
    m.parse()
    v.prepare()
    v.render()
    showModelData()
  }, params)
}
