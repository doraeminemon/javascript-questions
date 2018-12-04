var { expect } = require('chai');
const isIsogram = require('../src/isogram');


describe('#isIsogram()', function() {

  const tests = [
    { args: ['Dermatoglyphics'], expected: true },
    { args: ['isogram'], expected: true },
    { args: ['aba'], expected: false },
    { args: ['moOse'], expected: false },
    { args: ['isIsogram'], expected: false },
    { args: [''], expected: true },
    { args: [undefined], expected: true }
  ];

  tests.forEach(function(test) {    

    const response = isIsogram.apply(this, test.args);

    describe(`isIsogram(${test.args.join(', ')})`, function() {

      it('should return a boolean value', function() {
        expect(response).to.be.a('boolean');
      });

      it(`should determine that \`${test.args[0]}\` ${test.expected ? 'IS' : 'IS NOT'} an isogram`, function() {
        expect(response).to.equal(test.expected);
      });

    })

  });  

});
