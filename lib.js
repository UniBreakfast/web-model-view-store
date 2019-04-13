v = {
    el: view,
    render(data) {
        this.el.tBodies[0].innerHTML = data.reduce((str, row)=> str + `<tr>${row.reduce((str, cell)=> str + `<td>${cell}</td>`, '')}</tr>`, '')
    }
}
m = {
    db,
    fetch() {
        this.data = JSON.stringify(this.db)
    }
}
