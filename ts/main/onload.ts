// import all from elements and gamemanager
import * as e from './elements.js'
import * as gm from './gamemanager.js'

e.Buttons.settings.on("click",(event) => {
    event.preventDefault()
    gm.colRight(e.Buttons.settings)
    .append('<p>Hello World</p>')
})


