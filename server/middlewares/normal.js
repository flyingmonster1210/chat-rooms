function requestInfo (req, res, next) {
  console.log('\n* ' + (new Date()).toString())
  console.log(`  Request method: ${req.method}`)
  next()
}

module.exports = requestInfo