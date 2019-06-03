# of(x).type == typeof x
Alternative for the lame typeof operator


## Exemples

 ### 1: basic usage
 ```javascript
   if (of(42).type == 'number') {
     console.log('this is a number');
   }
   if (of(new Number(42)).type == 'number')) {
     console.log('this is also a number');
   }
 ```
 
 ### 2: keep only array or typedarray
 ```javascript
   var arr = [1,2,3];
   if (of(arr).type == 'array' || of(arr).super == 'typedarray') {
     for (i = 0; i < arr.length; i++) {
       console.log(arr[i]);
     }
   }
 ```
 
 ### 3: Personnal class
 ```javascript
 function Vector2(x=0,y=0) {
   this.x = x;
   this.y = y;
 }
 of.addType(Vector2);
 console.log(of(new Vector2())); // {type:'vector2', super:'object'}
 ```


 ### Tests
 ```javascript
primitives (or wrappers to them) -----------

of().type // 'undefined' (super:'primitive')
of(null).type // 'null' (super:'primitive')
of(false).type // 'boolean' (super:'primitive')
of(new Boolean(1)).type // 'boolean' (super:'object')
of(5).type // 'number' (super:'primitive')
of(NaN).type // 'number' (super:'primitive')
of(Infinity).type // 'number' (super:'primitive')
of(new Number("123")).type // 'number' (super:'object')
of(Number("123")).type // 'number' (super:'primitive')
of("one").type // 'string' (super:'primitive')
of(new String("one")).type // 'string' (super:'object')

pure objects -----------

of({}).type // 'object' (super:'object')
of(new Object()).type // 'object' (super:'object')

arrays, set, map -----------

of([]).type // 'array' (super:'object')
of(new Array(1)).type // 'array' (super:'object')
of(new Float32Array(1)).type // 'float32array' (super:'typedarray')
of(new ArrayBuffer(1)).type // 'arraybuffer' (super:'object')
of(new DataView(new ArrayBuffer(2))).type // 'dataview' (super:'object')
of(new Set()).type // 'set' (super:'object')
of(new Map()).type // 'map' (super:'object')
of(new WeakSet()).type // 'weakset' (super:'object')
of(new WeakMap()).type // 'weakmap' (super:'object')
of([object Set Iterator]).type // 'set iterator' (super:'iterator')
of(new Map([[1,'a']])).type // 'map iterator' (super:'iterator')
of("a"[Symbol.iterator]()).type // 'string iterator' (super:'iterator')

functions -----------

of(function(){}).type // 'function' (super:'object')
of(()=>{}).type // 'function' (super:'object')
of(class C {}).type // 'function' (super:'object')
of(new Function("")).type // 'function' (super:'object')
of(function *(){}).type // 'generatorFunction' (super:'generator')
of([object Arguments]).type // 'arguments' (super:'object')

regexp -----------

of(/a/g).type // 'regexp' (super:'object')
of(new RegExp("a","g")).type // 'regexp' (super:'object')

errors -----------

of(new Error).type // 'error' (super:'object')

misc -----------

of(new Date()).type // 'date' (super:'object')
of(Promise.resolve()).type // 'promise' (super:'object')

Adding/Removing Personnal objects -----------

of.addType(Vector);
of(new Vector()).type // 'vector' (super:'object')
of.removeType(Vector);
of(new Vector()).type // 'object' (super:'object')

of.addType(Vector,'tic','tac');
of(new Vector()).type // 'tic' (super:'tac')
 ```
