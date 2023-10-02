let count = 0

const login = async (req, res) => {
  res.json({
    message: 'hello world! ' + count++,
  })
}


module.exports = {
  login,
}

