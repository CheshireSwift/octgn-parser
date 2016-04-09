describe('the OCTGN parser', function() {
  it('loads the OCTGN data files', function() {
    var magic = require('../index')

    var multiversePropertySelector = 'card property[name="MultiverseId"][value="195297"]'
    var cardName = magic['Worldwake'](multiversePropertySelector).parent().attr('name')
    expect(cardName).toBe('Jace, the Mind Sculptor')
  })
})

