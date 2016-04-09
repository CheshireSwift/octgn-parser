'use strict'

var _ = require('lodash')
var $ =  require('cheerio')

var path = require('path')
var fs = require('fs')

var loadSetDocument = setString => $.load(setString, { xmlMode: true })
var loadSetDocumentFromPath = setPath => loadSetDocument(fs.readFileSync(setPath, 'utf-8'))
var getSetName = doc => doc('set').attr('name')

var mtgUid = process.env.MTG_UID || 'A6C8D2E8-7CD8-11DD-8F94-E62B56D89593'
var setsPath = path.join(process.env.OCTGN_DIR, 'GameDatabase', mtgUid, 'Sets')
var setsByName = _(fs.readdirSync(setsPath))
  .map(setUid => path.join(setsPath, setUid, 'set.xml'))
  .map(loadSetDocumentFromPath)
  .keyBy(getSetName)
  .value()

module.exports = setsByName

