var array = ['item1','item2'];

array.forEach( function(value, position, originalArray){
  // loop over each element in the array
  console.log(value + position + originalArray);
});

// logged -> item1, 0, ['item1','item2']
// logged -> item2, 1, ['item1','item2']

array.every( function( item ){ // is every item in array true for this function?
  return ~item.indexOf('item');
});

// returns -> true since every item in array has 'item'

array.some( function( item ){ // are at least some items true?
  return ~item.indexOf('1');
});

// returns -> true because at least one item has '1'

array.filter( function( item ){ // returns a new array of the items that return true
  return ~item.indexOf('1');
});

// returns -> ['item1']

array.find( function( item ){ // finds the first item that returns true
  return ~item.indexOf('2');
});

// returns -> 'item2'

array.map( function( item ){
  return item + 1
});
