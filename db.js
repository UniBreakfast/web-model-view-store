rand = (num,shift=0) => Math.floor(Math.random()*num)+shift
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
      create = new Date(now-rand(600000)).toISOString().replace('T',' ').replace(/\..*/,''),
      create])
  return {headers: ['id','first','last','age','word','score','dt_create','dt_modify'], rows}
}

db = peopleGen()
