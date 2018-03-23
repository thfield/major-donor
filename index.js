'use strict'
const d3 = require('d3-dsv')
const fs = require('fs')
const write = require('jsutils/write')

let FILE = 'data/fppc460A-2016-2018.csv'
let OUTPUT = 'data/majordonor-2016-2018.json'

let data = fs.readFileSync(FILE, {encoding: 'UTF-8'})

let allPayees = {}
let result

data = d3.csvParse(data, rowProcess)

function rowProcess (d) {
  d.tran_namf = d.tran_namf.toLowerCase()
  d.tran_naml = d.tran_naml.toLowerCase()
  d.tran_amt1 = +d.tran_amt1
  d.tran_amt2 = +d.tran_amt2

  // d.entity_cd: d.entity_cd
  d.payee_name = `${d.tran_namf} ${d.tran_naml}`
  // d.payee = (d.entity_cd !== '') ? d.cmte_id : d.payee_name
  d.payee = `${d.tran_namf} ${d.tran_naml}`

  // TODO create class constructor for payee
  allPayees[d.payee] = allPayees[d.payee] || {}
  allPayees[d.payee].total = allPayees[d.payee].total || 0
  allPayees[d.payee].payments = allPayees[d.payee].payments || []

  allPayees[d.payee].payments.push({
    amount: +d.tran_amt1,
    filer: d.filer_naml,
    filer_id: d.filer_id,
    date: d.tran_date
  })

  allPayees[d.payee].total += d.tran_amt1
  allPayees[d.payee].name = d.payee_name

  return d
}

// write('data/raw.json', data)

// result = groupDonors(data)

// function groupDonors (data, grouping) {
//   let res
//
//   return res
// }

function majorDonors (amt, data) {
  let res = []
  for (let d in data) {
    if (data[d].total >= amt) {
      let foo = { name: data[d].name, total: data[d].total }
      res.push(foo)
    }
  }
  return res
}

result = majorDonors(10000, allPayees)

result.sort(function (a, b) {
  if (a.total < b.total) {
    return 1
  } else if (a.total > b.total) {
    return -1
  } else {
    return 0
  }
})

write(OUTPUT, result)

// payment: {
//   amount: 0,
//   payee_name: 'asdf',
//   filer: 'name',
//   filer_id: '1234'
//   date: 'YYYY-MM-DD',
//   payee_id: '4321',
//   entity_cd: 'FOO'
// }
