'use strict'
const fs = require('fs')
const write = require('jsutils/write')
const prettyPrint = require('jsutils/prettyPrint')
const writeCsv = require('jsutils/write-csv')

let FILE = 'data/raw.json'

let data = fs.readFileSync(FILE, {encoding: 'UTF-8'})
data = JSON.parse(data)



writeCsv('data/statistics.csv', data)