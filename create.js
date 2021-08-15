const { Project } = require('./models')

Project.create({
    title: 'BTrack',
    description: 'Bust Tracker'
})
.then(project => {
    console.log(project)
})
.catch(err => {
    console.log(err)
})