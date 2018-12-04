var { expect } = require('chai');
const isValidWalk = require('../src/walk');


describe('#isValidWalk()', function() {

  const tests = [
    { args: [['n','s','n','s','n','s','n','s','n','s']], expected: true },
    { args: [['n', 'e', 'n', 'e', 's', 's', 's', 'w', 'w', 'n']], expected: true },
    { args: [['w','e','w','e','w','e','w','e','w','e','w','e']], expected: false },
    { args: [['w']], expected: false },
    { args: [['w', 'e']], expected: false },
    { args: [['n', 's', 'e', 'w']], expected: false },
    { args: [['n','n','n','s','n','s','n','s','n','s']], expected: false }    
  ];

  tests.forEach(function(test) {
        
    const response = isValidWalk.apply(this, test.args);

    describe(`isValidWalk(${JSON.stringify(test.args[0])})`, function() {

      it('should return a boolean value', function() {
        expect(response).to.be.a('boolean');
      });

      it(`should determin that \`${JSON.stringify(test.args[0])}\` ${test.expected ? 'IS' : 'IS NOT'} a valid walk`, function() {
        expect(response).to.equal(test.expected);
      });

    })

  });  

});

