const axios = require('axios')
const write = require('jsutils/write')

let source = {
  title: 'Contribution Data',
  filename: 'data/fppc460A-2016-2018.csv',
  uri: 'https://data.sfgov.org/resource/iwc4-zg6v.csv?$where=rpt_date%20between%20%272016-01-01%27%20and%20%272018-01-01%27',
  limit: 50000
}

let path = `${source.uri}&$limit=${source.limit}`

axios.get(path)
  .then(res => {
    write(source.filename, res.data)
  })
  .catch(errorHandler)

function errorHandler (err) {
  console.error(err)
}
