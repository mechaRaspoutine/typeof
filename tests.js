      
'use strict';

var cumul = '';

function check(input, obj, comment="") {
  var r = of(obj);
  cumul += "| `of("+input+")` | " + "`{type:'"+r.type+"', super:'" + r.super + "'}` | " + comment + " |\n";
}

function tests() {
  console.clear();

  cumul += '\n#### Primitives (or wrappers to them)\n\n';
  cumul += "| input       | result      | comment     |\n";
  cumul += "|:------------|:------------|:------------|\n";
  check('',); // undefined
  check('undefined', undefined); // undefined
  check('null', null, "null¹ is a primitive"); // null
  check('false', false); // boolean
  check('5', 5); // number
  check('NaN', NaN, "IEEE 754 floats include NaN"); // number. 
  check('Infinity', Infinity); // number
  check('Number("123")', Number('123')); // number
  check('"one"', 'one'); // string
  //check('"9007199254740991n"', 9007199254740991n, "Firefox 68 / Chrome 67"); // bigint
  //check('BigInt("42")', BigInt("42"), "Firefox 68 / Chrome 67"); // bigint
  check('new Boolean(1)', new Boolean(1)); // boolean
  check('new String("one")', new String('one')); // string
  check('new Number("123")', new Number('123')); // number

  cumul += '\n¹ (typeof null) return "object" only for legacy reasons.\n';

  cumul += '\n#### Basic objects\n\n';
  cumul += "| input       | result      | comment     |\n";
  cumul += "|:------------|:------------|:------------|\n";
  check('{}', {}); // object
  check('new Object()', new Object()); // object

  cumul += '\n#### Arrays, Set, Map, etc\n\n';
  cumul += "| input       | result      | comment     |\n";
  cumul += "|:------------|:------------|:------------|\n";
  check('[]', []); // array
  check('new Array(1)', new Array(1)); // array
  check('new Float32Array(1)', new Float32Array(1)); // typedarray
  check('new ArrayBuffer(1)', new ArrayBuffer(1)); // arraybuffer
  check('new DataView(new ArrayBuffer(2))', new DataView(new ArrayBuffer(2))); // dataview
  check('new Set()', new Set()); // set
  check('new Map()', new Map()); // map
  check('new WeakSet()', new WeakSet()); // weakset
  check('new WeakMap()', new WeakMap()); // weakmap
  check("(new Set(['a'])).values())", (new Set(['a'])).values());
  check("(new Map([[1,'a']])).values()", (new Map([[1,'a']])).values());
  check('"a"[Symbol.iterator]()', "a"[Symbol.iterator]());

  cumul += '\n#### Functions\n\n';
  cumul += "| input       | result      | comment     |\n";
  cumul += "|:------------|:------------|:------------|\n";
  check('function(){}', function(){}); // function
  check('()=>{}', ()=>{}); // function
  check('new (function(){})', new (function(){})); // function
  check('class C {}', class C {}); // function
  check('new (class {constructor(){}})', new (class{constructor(){}})); // object

  check('new Function("")', new Function("")); // function
  check('function *(){}', function *(){}); // generatorfunction
  check('(function(){return arguments})()', (function(){return arguments})()); // arguments

  cumul += '\n#### Regexp\n\n';
  cumul += "| input       | result      | comment     |\n";
  cumul += "|:------------|:------------|:------------|\n";
  check('/a/g', /a/g); // regexp
  check('new RegExp("a","g")', new RegExp("a","g")); // regexp

  cumul += '\n#### Errors\n\n';
  cumul += "| input       | result      | comment     |\n";
  cumul += "|:------------|:------------|:------------|\n";
  check('new Error("error")', new Error("error")); // error
  check('new TypeError("type error")', new TypeError("type error")); // error

  cumul += '\n#### Misc\n\n';
  cumul += "| input       | result      | comment     |\n";
  cumul += "|:------------|:------------|:------------|\n";
  check('new Date()', new Date()); // date
  check('Promise.resolve()', Promise.resolve()); // promise


  cumul += '\n#### User Classes\n\n';
  function Vector2(x=0,y=0){this.x=x;this.y=y;}
  var PersonAnonym = function(name="",age=20){this.name=name;this.age=age;}
  cumul += '```javascript\n';
  cumul += "function Vector2(x=0,y=0){this.x=x;this.y=y;}\n"
  cumul += "var PersonAnonym = function(name='',age=20){this.name=name;this.age=age;}\n\n"
  cumul += "of.removeType(Date);\n";
  cumul += "of.addType(Vector2);\n";
  cumul += "of.addType(PersonAnonym, 'To be,', 'or not to be');\n";
  cumul += '```\n';
  of.addType(Vector2);
  of.removeType(Date);
  of.addType(PersonAnonym, 'To be,', 'or not to be');
  cumul += "| input       | result      | comment     |\n";
  cumul += "|:------------|:------------|:------------|\n";
  check('new Vector2()', new Vector2()); // vector
  check('new Date()', new Date(), 'because removed above'); // object
  check('new PersonAnonym()', new PersonAnonym()); // "To be,"


  console.log(cumul);
}
