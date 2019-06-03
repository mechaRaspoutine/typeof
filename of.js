
/**
 * Alternative for the lame typeof operator
 * Liscence: public domain
 */


/**
 * Usage: 
 *
 * 1: basic usage
 *   if (of(42).type == 'number') console.log('this is a number');
 *   if (of(new Number(42)).type == 'number')) console.log('this is also a number');
 *
 * 2: keep only array or typedarray
 *   var arr = [1,2,3];
 *   if (of(arr).type == 'array' || of(arr).super == 'typedarray') {
 *     for (i = 0; i < arr.length; i++) console.log(arr[i]);
 *   }
 *
 * 3: Keep only primitives
 *   const isPrimitive = data => of(data).super == 'primitive';
 *   var tst1 = isPrimitive(5)? tst1.valueOf() : false; // 5
 *   var tst2 = isPrimitive(new Number(5))? tst2.valueOf() : false; // false
 */

const of = (function(){
  "use strict";

  // --------------------------------------
  // The latest ECMAScript standard defines eight data types:
  // 
  //     Seven data types that are primitives:
  //         - Boolean. true and false.
  //         - null. A special keyword denoting a null value.
  //           Because JavaScript is case-sensitive,
  //           null is not the same as Null, NULL, or any other variant.
  //         - undefined. A top-level property whose value is not defined.
  //         - Number. An integer or floating point number.
  //           For example: 42 or 3.14159.
  //         - BigInt. An integer with arbitrary precision.
  //           For example: 9007199254740992n.
  //         - String. A sequence of characters that represent a text value.
  //           For example: "Howdy"
  //         - Symbol (new in ECMAScript 2015). A data type whose
  //           instances are unique and immutable.
  //     and Object

  const TYPES = {
    // primitives
    'boolean':            Object.freeze({type:'boolean', super:'primitive'}),
    'undefined':          Object.freeze({type:'undefined', super:'primitive'}),
    'number':             Object.freeze({type:'number', super:'primitive'}),
    'bigint':             Object.freeze({type:'bigint', super:'primitive'}),
    'string':             Object.freeze({type:'string', super:'primitive'}),
    'symbol':             Object.freeze({type:'symbol', super:'primitive'}),

    // typeof(null) return "object" for legacy reasons
    // but null is indeed a primitive
    '[object Null]':      Object.freeze({type:'null', super:'primitive'}),

    // Primitive wrapper object
    '[object Boolean]':   Object.freeze({type:'boolean',super:'object'}),
    '[object Undefined]': Object.freeze({type:'undefined',super:'object'}),
    '[object Number]':    Object.freeze({type:'number', super:'object'}),
    '[object BigInt]':    Object.freeze({type:'bigint', super:'object'}),
    '[object String]':    Object.freeze({type:'string', super:'object'}),
    '[object Symbol]':    Object.freeze({type:'symbol', super:'object'}),

    // Module-like objects
    '[object JSON]':      Object.freeze({type:'json', super:'object'}),
    '[object Math]':      Object.freeze({type:'math', super:'object'}),

    // Built-in classes
    '[object ArrayBuffer]':       Object.freeze({type:'arraybuffer', super:'object'}),
    '[object DataView]':          Object.freeze({type:'dataview', super:'object'}),
    '[object Int8Array]':         Object.freeze({type:'int8array',super:'typedarray'}),
    '[object Uint8Array]':        Object.freeze({type:'uint8array', super:'typedarray'}),
    '[object Uint8ClampedArray]': Object.freeze({type:'uint8clampedarray', super:'typedarray'}),
    '[object Int16Array]':        Object.freeze({type:'int16array', super:'typedarray'}),
    '[object Uint16Array]':       Object.freeze({type:'uint16array', super:'typedarray'}),
    '[object Int32Array]':        Object.freeze({type:'int32array', super:'typedarray'}),
    '[object Uint32Array]':       Object.freeze({type:'uint32array', super:'typedarray'}),
    '[object Float32Array]':      Object.freeze({type:'float32array', super:'typedarray'}),
    '[object Float64Array]':      Object.freeze({type:'float64array', super:'typedarray'}),
    '[object BigInt64Array]':     Object.freeze({type:'bigint64array', super:'typedarray'}),
    '[object BigUint64Array]':    Object.freeze({type:'biguint64array', super:'typedarray'}),
    '[object Set]':               Object.freeze({type:'set', super:'object'}),
    '[object Map]':               Object.freeze({type:'map', super:'object'}),
    '[object WeakSet]':           Object.freeze({type:'weakset', super:'object'}),
    '[object WeakMap]':           Object.freeze({type:'weakmap', super:'object'}),
    '[object Promise]':           Object.freeze({type:'promise', super:'object'}),

    // Iterators
    '[object Map Iterator]':      Object.freeze({type:'map iterator', super:'iterator'}),
    '[object Set Iterator]':      Object.freeze({type:'set iterator', super:'iterator'}),
    '[object String Iterator]':   Object.freeze({type:'string iterator', super:'iterator'}),

    // Miscellaneous
    '[object Arguments]':         Object.freeze({type:'arguments', super:'object'}),
    '[object Date]':              Object.freeze({type:'date', super:'object'}),
    '[object Array]':             Object.freeze({type:'array', super:'object'}),
    '[object Error]':             Object.freeze({type:'error', super:'object'}),
    '[object RegExp]':            Object.freeze({type:'regexp', super:'object'}),
    '[object Function]':          Object.freeze({type:'function', super:'object'}),
    '[object Generator]':         Object.freeze({type:'generator', super:'generator'}),
    '[object GeneratorFunction]': Object.freeze({type:'generatorFunction', super:'generator'}),
  };

  const FALLBACK = Object.freeze({type:'object', super:'object'});
  const TOSTRING = Object.prototype.toString;
  var prevReturn = TYPES['undefined'];
  var prevData = undefined;
  

  /**************************************************************
   * class
   */ 
  function of(data) {
    if (prevData !== data) {
      prevData = data; // memoize
      prevReturn = TYPES[typeof(data)] || TYPES[TOSTRING.call(data)] || FALLBACK;
    }
    return prevReturn;
  }


  /**************************************************************
   * Add a new type.
   */ 
  of.addType = function(o, type, supertype = 'object') {
    if (!o || !o.prototype || !o.name) return;

    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Symbol/toStringTag
    // http://2ality.com/2015/09/well-known-symbols-es6.html
    Object.defineProperty(o.prototype, Symbol.toStringTag, {
      configurable:true,
      value:o.name,
    });

    // add object in the lookup array
    // in strict mode Object.freeze prevent errors like (of(5).type = 'number')?
    type = type || o.name.toLowerCase();
    TYPES[`[object ${o.name}]`] = Object.freeze({type:type, super:supertype});
  };


  /**************************************************************
   * Remove a new type.
   */ 
  of.removeType = function(o) {
    if (!o || !o.prototype || !o.name) return;
    var name = `[object ${o.name}]`;
    if (o.prototype.hasOwnProperty(Symbol.toStringTag)) {
      delete(o.prototype[Symbol.toStringTag]);
    }
    if (TYPES[name]) delete(TYPES[name]);
  };


  return of;
})();


// export {of}; // uncomment if used as module


