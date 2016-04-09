'use strict'

var _ = require('lodash')
var $ =  require('cheerio')

var path = require('path')
var fs = require('fs')

var loadSetDocument = setString => $.load(setString, { xmlMode: true })
var loadSetDocumentFromPath = setPath => loadSetDocument(fs.readFileSync(setPath, 'utf-8'))
var getSetName = doc => doc('set').attr('name')

var setsPath = path.join(process.env.OCTGN_DIR, 'GameDatabase', process.env.MTG_UID, 'Sets')
var setsByName = _(fs.readdirSync(setsPath))
  .map(setUid => path.join(setsPath, setUid, 'set.xml'))
  .map(loadSetDocumentFromPath)
  .keyBy(getSetName)
  .value()

module.exports = setsByName

