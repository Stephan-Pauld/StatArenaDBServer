// const EMAIL = 'stephanpauld@gmail.com'
// const PASSWORD = 
// const USERNAME = "stefler#1173"
// const PLATFORM = "battle"
// const PORT = 8080;
// const REDIS_PORT = 6379;

const EMAIL = process.env.WZ_EMAIL;
const PASSWORD = process.env.WZ_PASSWORD
const USERNAME = process.env.WZ_USERNAME
const PLATFORM = process.env.WZ_PLATFORM
const PORT = process.env.WZ_PORT
const REDIS_PORT = process.env.WZ_REDIS_PORT

module.exports = {
  EMAIL,
  PASSWORD,
  USERNAME,
  PLATFORM,
  PORT,
  REDIS_PORT,
}
