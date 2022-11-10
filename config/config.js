require('dotenv').config();

const config = {
  env: process.env.NODE_ENV || 'dev',
  isProd: process.env.NODE_ENV === 'production',
  port: process.env.PORT || 3000,
  dbUrl: process.env.DATABASE_URL,
  jwtSecret: process.env.JWT_SECRET,
  mailerEmail: process.env.MAILER_EMAILL,
  mailerPassword: process.env. MAILER_PASSWORD
}

module.exports = { config };

