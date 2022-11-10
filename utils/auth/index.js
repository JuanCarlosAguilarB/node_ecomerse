const passport = require('passport');

// acá es donde empezamos a definir las estrategias que vamos a usar

const localStrategy = require('./strategies/local.strategy.js')
const jwtStrategy = require('./strategies/jwt.strategy.js')

passport.use(localStrategy);  
passport.use(jwtStrategy);  