function peopleGen() {
  let firsts = ['John', 'Jack', 'Alex', 'Maria', 'Jessica', 'Alice', 'Teresa', 'Monica', 'Peter', 'Oliver', 'Claudia', 'Theodore', 'Chad', 'Cole', 'Valery', 'Bert', 'Tony'],
  lasts = ['Smith', 'Carter', 'White', 'Black', 'Silver', 'Taylor', 'Jackson', 'Kent', 'Jones', 'Walker', 'Night', 'Porter', 'Butler', 'Blanc', 'Good', 'Wood', 'Ward', 'Strong', 'Bright'],
  words = ['doggy', 'flier', 'boyscout', 'tanker', 'spaceship', 'battleground', 'groundhog', 'smokescreen', 'forester', 'monkeys', 'lightbulb', 'bottleneck', 'kangaroo', 'marionette', 'puppeteer', 'flagstock', 'sailor', 'portrait', 'direction', 'sponsor', 'fiancee', 'impression', 'inertia', 'pokerface', 'caterpillar', 'waterline', 'butterfly', 'healer'],
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
