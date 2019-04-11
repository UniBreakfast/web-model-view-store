makeModel = function(el) {
  return {
    get val(   ) { return el.value       },
    set val(val) { return el.value = val }
  }
}

v = makeModel(view )
m = makeModel(model)
s = makeModel(store)

v.to_m =()=> m.val=v.val
m.to_v =()=> v.val=m.val

m.to_s =()=> {setTimeout(()=> s.val=m.val, 1000)}
m.grab =cb=> {setTimeout(()=>{ m.val=s.val; if (cb) cb() }, 1000)}

v.push =()=> { v.to_m(); m.to_s() }
m.push =()=> { m.to_v(); m.to_s() }
v.pull = m.pull =()=> m.grab(m.to_v)

refresh.onclick = v.pull
view.oninput = v.push
model.onchange = m.push
setInterval(()=>
  {if (![view, model].includes(document.activeElement)) m.pull()}, 7000)