const renest =arr=> arr.reduce((arr,el)=>{
  el.forEach((el,i)=>arr[i].push(el))
  return arr
}, Array(arr[0].length).fill(0).map(_=>[])),
recordsFrom =data=> {
  try   { var [headers, rows] = data }
  catch { var {headers, rows} = data }
  return rows.map(row => {
    let obj = {}
    row.forEach((value,i) => obj[headers[i]] = value)
    return obj
  })
},
makeArr =(length, func, distinct, persist)=> {
  if (distinct) {
    for (var set = new Set(), i=0, max = persist? Infinity:100000;
         set.size<length && i<max; i++)
      { if (set.size<set.add(func()).size) i=0 }
    return Array.from(set)
  }
  return Array(length).fill(0).map(func)
},
nth =day=> {
  if (day>3 && day<21) return +day+'th'
  switch (day%10) {
    case 1: return +day+'st'
    case 2: return +day+'nd'
    case 3: return +day+'rd'
    default: return +day+'th'
  }
},
dtStd =date=> new Date(date.getTime()-(date.getTimezoneOffset()*60000))
  .toISOString().replace('T',' ').slice(0,-5),
dtForm =(datetime,format)=> {
  const [YYYY,MM,DD,HH,mm,ss] = datetime.split(/[- :]/)
  return format.replace('YYYY',YYYY)
    .replace('DDth', nth(DD))
    .replace('Month', months[MM-1]).replace('MM',MM)
    .replace('month', monthShorts[MM-1]).replace('DD',DD)
    .replace('HH',HH).replace('mm',mm).replace('ss',ss)
},
rnd =(...args)=> {
  const [arg1,arg2] = args
  if (args.length==1) {
    if (typeof arg1 == 'number')
      return Math.floor(Math.random()*arg1)
    if (Array.isArray(arg1)) return arg1[rnd(arg1.length)]
    if (arg1==Date) return dtStd(new Date(rnd(Date.now())))
    if (arg1 instanceof Date)
      return dtStd(new Date(rnd(arg1.getTime(), Date.now())))
    if (typeof arg1 == 'string') {
      if (arg1.match(/^.-.$/))
        return String.fromCharCode(rnd(arg1.charCodeAt(0),arg1.charCodeAt(2)))
      return dtForm(rnd(Date), arg1)
    }

  }
  if (args.length==2) {
    if (typeof arg1=='number' && typeof arg2=='number')
      return Math.round(arg1+(arg2-arg1)*Math.random())
    if (typeof arg2=='number') return makeArr(arg2,_=>rnd(arg1))
    if (Array.isArray(arg2)) return rnd(arg1)+' '+rnd(arg2)
  }
  return Math.random()
},
// rnd() == random decimal from 0 to 1
// rnd(num) == random integer from 0 to num-1
// rnd(num1, num2) == random ineger from num1 to num2
// rnd(arr) == random el from arr
// rnd(Date) == random ISO-datetime from 1970 to now
// rnd('DD.MM.YYYY') == random date/time from 1970 to now in provided format
// rnd(new Date(1234567890)) == random datetime between that date and now
// rnd(arr, num) == array of num random els from arr
// rnd(arr1, arr2) == string of random combination of some el from arr1 w el from arr2
// rnd(Date, num) == array of num random datetimes from 1970 to now
// rnd('DD.MM.YYYY', num) == array of num random dates/times from 1970 to now in provided format
probably =percentage=> +(rnd(1,100)<=percentage),
integers =(start, length, density=100)=> {
  for (var arr=[]; arr.length<length; start++) {
    if (probably(density)) arr.push(start) }
  return arr
},
ids =num=> {
  let pad = rnd(2), more = rnd(2)
  switch (rnd(4)) {
    case 1: return integers(1,num)
    case 2: pad = 0
    case 3: return integers(1,num,rnd(10,100))
      .map((int,_,arr)=>(int+'').padStart(pad? (arr[num-1]+'').length:1,'0'))
    default:
      const letterSet = rnd(['a-z','A-Z','a-'+rnd('b-z'),'A-'+rnd('B-Z')]),
      letters = rnd(letterSet,num).sort().reduce((obj,l)=>
        { obj[l] = 1+(obj[l]||0); return obj }, {}),
      chars = rnd([['-',''],['.',''],['(',')'],['[',']'],['','']])
      return Object.entries(letters)
        .map(([key,value])=>integers(1,value,rnd(10,100))
        .map(int=>key+chars[0]+(pad
          ? (int+'').padStart((num+'').length+more,'0'):int)+chars[1])).flat()
  }
},
namesGend =(num)=> {
  const males = rnd(30,70),
        joined = probably(40),
        titleNick = rnd(3),
        titles = titleNick==1,
        [dr,mr,mrs,miss] = !titles? []:
          rnd([['Dr.','Mr.','Mrs.','Miss'],['dr.','mr.','mrs.','miss']]),
        nicks = titleNick==2,
        name1st = nicks&&joined? 1 : rnd(2),
        nickPlace = joined? rnd(4):rnd(2),
        nick1st  = nicks? nickPlace==0 :0,
        nickLast = nicks? nickPlace==1 :0,
        nickIn   = nicks? nickPlace==2 :0,
        nickEnd  = nicks? nickPlace==3 :0,
        quote    = nicks? rnd(['"',"'","~",'`',':','-','=']) :0,
        nicksArr = nicks? makeArr(num,_=>rnd(nicknames),1,1) :0,
        nameAbbr = joined&&!nickIn? probably(25) :0,
        gender = rnd(2),
        gend = probably(35),
        naming = rnd(3),
        headers = []

  if (nick1st) headers.push(rnd(['nick','nickname','nickname','alias','callsign']))
  if (joined) headers.push(rnd(['name','fullname','full name']))
  else {
    if (titles) headers.push('title')
    if (name1st) headers.push(['firstname','first name','name'][naming])
    headers.push(['lastname','last name','surname'][naming])
    if (!name1st) headers.push(['firstname','first name','name'][naming])
    if (nickLast)
      headers.push(rnd(['nick','nickname','nickname','alias','callsign']))
  }
  if (gender) headers.push('gender')

  return [headers, makeArr(num,_=>{
    const row=[],
          male=probably(males),
          married=probably(60),
          firstname=rnd([femaleNames,maleNames][male]),
          first=nameAbbr? firstname[0]+'.':firstname,
          last=rnd(lastNames),
          nick=nicksArr? nicksArr.pop() :'',
          _nick_=quote+nick+quote,
          title=titles? (probably(5)? dr:(male?mr:[mrs,miss][married])):'',
          fe_male=[['female','male'],['F','M']][gend]

    if (nick1st) row.push(nick)
    if (joined) row.push((title? title+' ':'')+
      (name1st? (first)+' ':'')+(nickIn? _nick_+' ':'')+(last)+
      (!name1st? ', '+(first):'')+(nickEnd? ' aka '+_nick_:''))
    else {
      if (titles) row.push(title)
      if (name1st) row.push(first)
      row.push(last)
      if (!name1st) row.push(first)
      if (nickLast) row.push(nick)
    }
    if (gender) row.push(fe_male[male])

    return row
  })]
},
schemas = {
  persons: []
},

rndData =(cols=[3,20], rows=[100,500])=> {
  if (typeof cols == 'number') cols = rnd(2,cols)
  else cols = rnd(cols[0],cols[1])
  if (typeof rows == 'number') rows = rnd(2,rows)
  else rows = rnd(rows[0],rows[1])
  // selectScheme()
  // decideOptions()
  // generateData()

  const wIds = probably(80)

},

/*

person
    name   age gender date_of_birth
  John Snow 21  male  June 12, 1980

  id  first  last   born
  001  Joe   Peshi  1956

*/

personsData = [
  ['id','name','age','gender'],
  [

  ]
]
