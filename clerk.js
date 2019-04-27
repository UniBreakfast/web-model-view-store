clerk = {
  enterPath: 'enter.php',
  enter(cb) {
    mur('going to enter...')
    fetch(this.enterPath).then(res=>cb(JSON.parse(res)))
  }
}

mur('clerk loaded...')
