// import all from elements and gamemanager
import * as e from './elements.js'
import * as gm from './gamemanager.js'

e.settingsbutton.on("click",(event) => {
    event.preventDefault()
    gm.colRight(e.settingsbutton)
    .append('<p>Hello World</p>')
})

