function requestInfo (req, res, next) {
  console.log('\n* ' + (new Date()).toString().green)
  console.log(`  Request URL: ${req.url}`.cyan.italic)
  console.log(`  Request method: ${req.method}`.yellow)
  next()
}

module.exports = requestInfo