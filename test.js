 
'use strict';

function check(str, obj) {
  var r = of(obj);
  console.log("of("+str+").type == '" + r.type + "' (super:'" + r.super + "')");
}

function test() {
  console.clear();

  console.warn('primitives (or wrappers to them) -----------');
  check('',); // undefined
  check('null', null); // null
  check('false', false); // boolean
  check('new Boolean(1)', new Boolean(1)); // boolean
  check('5', 5); // number
  check('NaN', NaN); // number. IEEE 754 floats include NaN as a possible value.
  check('Infinity', Infinity); // number
  check('new Number("123")', new Number('123')); // number
  check('Number("123")', Number('123')); // number
  check('"one"', 'one'); // string
  check('new String("one")', new String('one')); // string

  console.warn('pure objects -----------');
  check('{}', {}); // object
  check('new Object()', new Object()); // object

  console.warn('arrays, set, map -----------');
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

  console.warn('functions -----------');
  check('function(){}', function(){}); // function
  check('()=>{}', ()=>{}); // function
  check('class C {}', class C {}); // function
  check('new Function("")', new Function("")); // function
  check('function *(){}', function *(){}); // generatorfunction
  function fun() { check(arguments + '', arguments) } // arguments
  fun('a','b','c');

  console.warn('regexp -----------');
  check('/a/g', /a/g); // regexp
  check('new RegExp("a","g")', new RegExp("a","g")); // regexp

  console.warn('errors -----------');
  check('new Error', new Error); // error

  console.warn('misc -----------');
  check('new Date()', new Date()); // date
  check('Promise.resolve()', Promise.resolve()); // promise

  console.warn('Adding Personnal objects -----------');

  function Vector(x=0,y=0) { this.x = x; this.y = y; }
  console.log("of.addType(Vector);");
  of.addType(Vector);
  check('new Vector()', new Vector()); // vector
  of.removeType(Vector);
  console.log("of.removeType(Vector);");
  check('new Vector()', new Vector()); // object
  console.log("of.addType(Vector,'tic','tac');");
  of.addType(Vector, "tic", "tac");
  check('new Vector()', new Vector()); // tic
}
