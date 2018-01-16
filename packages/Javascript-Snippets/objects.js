/********************************************************
* Put a function in an object and reference with 'this' *
*********************************************************/

var sampleObject = {
  item: false,

  changeItem: function() {
    this.item = !this.item;
  }
}

sampleObject.changeItem();

console.log(sampleObject.item);

// logged is => true

// OR

var sampleObject = {
  item: false
}

sampleObject.changeItem = function(){
  this.item = !this.item;
}

/****************************************************************
Use object prototypes to assign functions to multiple instances *
****************************************************************/

var Person = function( name ){
  this.name = name;
}

Person.prototype.showName = function(){
  console.log(this.name);
}

var me = new Person("Justin");

me.showName();

// logged => "Justin"

/***************************
*    Object inheritance    *
***************************/

function Animal( name ){
  this.name = name;
}

Animal.prototype.showName = function(){
  console.log(this.name);
}

function Dog( furColor, name ){
  this.furColor = furColor;
  Animal.call(this, name);
}

Dog.prototype = Object.create(Animal.prototype);

var scrappy = new Dog("brown","scrappy");

scrappy.showName();

// logged => "scrappy"
// the Dog prototype inherits everything from Animal
// animal would not inherit any Dog prototype functions


/************************************
* Lowercase all keys in object/array
*************************************/

// input array or object that has inconsistent key capitalization
function lowerCaseKeys( data ){
  if (Array.isArray( data )){ // in case there are arrays of objects
  	var length = data.length;
    var tempArray = [];

    while (length--){
      tempArray[length] = lowerCaseKeys(data[length]);
    }

    return tempArray;
  } else if (typeof data === 'object'){ // this section actually changes the keys

    var keyList = Object.keys(data); // array of keys
    var amountOfKeys = keyList.length;
    var newObject = {}; // stores the new lowercase object

    while( amountOfKeys-- ){
      var key = keyList[amountOfKeys];
      var newKey = key.toLowerCase();
      newObject[newKey] = data[key];

      if( Array.isArray( newObject[newKey] ) || typeof newObject[newKey] === 'object') {
      	newObject[newKey] = lowerCaseKeys(newObject[newKey]);
      }
    }

    return newObject;

  } else {
  	return data; // no need to change anything here
  }
}
