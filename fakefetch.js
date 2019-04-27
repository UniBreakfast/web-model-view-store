
function fetch(path) {
  mur('fetching the '+path)
  return new Promise((resolve,reject)=>{
    setTimeout(()=>{
      mur('net-work done...')
      const data = '{"ok":1, "data":"a lot of data"}'
      resolve(data)
    }, 500*3)
  })
}