agent = {
  begin() {
    mur('agent began...')
    clerk.enter(response=>{
      mur('response received...')
      const {ok,data} = response
      if (ok) {
        mur("it's ok...")
        if (data) {
          mur('data is given to the model...')
          model.take(data)
          this.show()
        }
      }
    })
  },

  show() {
    mur('agent is going to show the data from the model')
    view.render(model.data)
  },
  func() {},
  func() {},
  func() {},
  func() {},

}

mur('agent loaded...')