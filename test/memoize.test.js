var { expect } = require('chai');
const memoize = require('../src/memoize');


const SUPERCAL = 'supercalifragilistic';
const EXPIALA = 'supercalifragilisticexpialidocious';
const TIMEOUT = 30;
const NOOP = _ => _;

const isAttemptingBonus = memoize.length === 2;

const originalFunctionCalledCounts = {
  [SUPERCAL]: 0,
  [EXPIALA]: 0
};

function originalFunction(word) {
  return String(word || '').length;
}

function withCounter(func) {
  return function _withCounter(word) {  
    originalFunctionCalledCounts[word]++;
    return func.apply(null, arguments);
  };
}

const memoizedFunction = memoize(withCounter(originalFunction), 10) || NOOP;

describe(`#memoize() -- ${isAttemptingBonus ? 'with' : 'without'} bonus`, function() {

  describe('memoize(func)', function() {
    it('should return a function', function() {
      expect(memoizedFunction).to.be.a('function').and.not.equal(NOOP)
    });
  })

  describe(`memoize(func)(${SUPERCAL})`, function() {    

    const value = memoizedFunction(SUPERCAL);

    it('should return the same response as the original function', function() {
      expect(value).to.equal(originalFunction(SUPERCAL));
    });

    it(`should call the original function`, function() {        
      expect(originalFunctionCalledCounts[SUPERCAL]).to.equal(1);
    });
  });

  describe(`memoize(func)(${SUPERCAL}) x 2`, function() {    

    const value = memoizedFunction(SUPERCAL);

    it('should return the same response as the original function', function() {
      expect(value).to.equal(originalFunction(SUPERCAL));
    });

    it(`should return cached response`, function() {        
      expect(originalFunctionCalledCounts[SUPERCAL]).to.equal(1);
    });
  });    


  describe(`memoize(func)(${EXPIALA})`, function() {    

    const value = memoizedFunction(EXPIALA);

    it('should return the same response as the original function', function() {
      expect(value).to.equal(originalFunction(EXPIALA));
    });

    it(`should call the original function`, function() {        
      expect(originalFunctionCalledCounts[EXPIALA]).to.equal(1);
    });
  });

  describe(`memoize(func)(${EXPIALA}) x 2 (w/ timeout)`, function() {    

    const value = memoizedFunction(EXPIALA);

    it('should return the same response as the original function', function() {
      expect(value).to.equal(originalFunction(EXPIALA));
    });

    if (isAttemptingBonus) {
      it(`should return from original function`, function(done) {
        setTimeout(() => {
          const value = memoizedFunction(EXPIALA);
          expect(originalFunctionCalledCounts[EXPIALA]).to.equal(2);
          done();
        }, TIMEOUT + 10);
      }); 
    } else {
      it(`should call return cached response`, function() {
        expect(originalFunctionCalledCounts[EXPIALA]).to.equal(1);
      });
    }
  });

});


