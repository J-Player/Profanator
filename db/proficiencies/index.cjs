const Proficiency = require('../models/proficiency.cjs')

const PROFICIENCIES = [
    new Proficiency({name: 'Alchemy'}),
    new Proficiency({name: 'Architecture'}),
    new Proficiency({name: 'Blacksmith'}),
    new Proficiency({name: 'Bowcrafting'}),
    new Proficiency({name: 'Carpentry'}),
    new Proficiency({name: 'Tailoring'}),
    new Proficiency({name: 'Tinkering'}),
]

module.exports = PROFICIENCIES