// An isogram is a word that has no repeating letters, consecutive or non-consecutive. 
// Implement a function that determines whether a string that contains only letters is 
// an isogram. Assume the empty string is an isogram. Ignore letter case.

module.exports = function isIsogram(str) {
  // you code here
  if(!str || str.length == 0){
    return true
  }
  let letters = {}
  const lowercasedStr = str.toLowerCase().split('');
  for(var char of lowercasedStr){
    if(letters[char]){
      return false
    } else {
      letters[char] = true
    }
  }
  return true
};