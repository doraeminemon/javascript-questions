var { expect } = require('chai');
const DNAStrand = require('../src/dna');


describe('#DNAStrand()', function() {

  const tests = [
    { args: ['AAAA'], expected: 'TTTT' },
    { args: ['ATTGC'], expected: 'TAACG' },
    { args: ['GTAT'], expected: 'CATA' },
    { args: [''], expected: '' },
    { args: [undefined], expected: '' }
  ];

  tests.forEach(function(test) {    

    const response = DNAStrand.apply(this, test.args);

    describe(`DNAStrand(${test.args.join(', ')})`, function() {

      it('should return a string', function() {
        expect(response).to.be.a('string');
      });

      it(`given \`${test.args[0]}\`, expected result should be \`${test.expected}\``, function() {
        expect(response).to.equal(test.expected);
      });

    })

  });  

});
