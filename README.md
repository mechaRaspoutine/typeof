# of(x).type == typeof x
Alternative for the lame typeof operator

## Exemples

 ### 1: basic usage
 ```javascript
   if (of(42).type == 'number') {
     console.log('this is a number');
   }
   
   const isPrimitive = (data) => of(data).super == 'primitive';
   if (isPrimitive(null)) console.log('!!'); // true
   if (isPrimitive(new Number(14))) console.log('!!'); // false
 ```
 
 ### 2: keep only array or typedarray
 ```javascript
   var arr = [1,2,3];
   if (of(arr).type == 'array' || of(arr).super == 'typedarray') {
     for (var i = 0; i < arr.length; i++) {
       console.log(arr[i]);
     }
   }
 ```
 
 ### 3: User class
 ```javascript
 function Vector2(x=0,y=0) {
   this.x = x;
   this.y = y;
 }
 of.addType(Vector2);
 console.log(of(new Vector2())); // {type:'vector2', super:'object'}
 ```


### Tests
 
#### Primitives (or wrappers to them)

| input       | result      | comment     |
|:------------|:------------|:------------|
| `of()` | `{type:'undefined', super:'primitive'}` |  |
| `of(undefined)` | `{type:'undefined', super:'primitive'}` |  |
| `of(null)` | `{type:'null', super:'primitive'}` | null¹ is a primitive |
| `of(false)` | `{type:'boolean', super:'primitive'}` |  |
| `of(5)` | `{type:'number', super:'primitive'}` |  |
| `of(NaN)` | `{type:'number', super:'primitive'}` | IEEE 754 floats include NaN |
| `of(Infinity)` | `{type:'number', super:'primitive'}` |  |
| `of(Number("123"))` | `{type:'number', super:'primitive'}` |  |
| `of("one")` | `{type:'string', super:'primitive'}` |  |
| `of("9007199254740991n")` | `{type:'bigint', super:'primitive'}` | Firefox 68 / Chrome 67 |
| `of(BigInt("42"))` | `{type:'bigint', super:'primitive'}` | Firefox 68 / Chrome 67 |
| `of(new Boolean(1))` | `{type:'boolean', super:'object'}` |  |
| `of(new String("one"))` | `{type:'string', super:'object'}` |  |
| `of(new Number("123"))` | `{type:'number', super:'object'}` |  |

¹ (typeof null) return "object" only for legacy reasons.

#### Basic objects

| input       | result      | comment     |
|:------------|:------------|:------------|
| `of({})` | `{type:'object', super:'object'}` |  |
| `of(new Object())` | `{type:'object', super:'object'}` |  |

#### Arrays, Set, Map, etc

| input       | result      | comment     |
|:------------|:------------|:------------|
| `of([])` | `{type:'array', super:'object'}` |  |
| `of(new Array(1))` | `{type:'array', super:'object'}` |  |
| `of(new Float32Array(1))` | `{type:'float32array', super:'typedarray'}` |  |
| `of(new ArrayBuffer(1))` | `{type:'arraybuffer', super:'object'}` |  |
| `of(new DataView(new ArrayBuffer(2)))` | `{type:'dataview', super:'object'}` |  |
| `of(new Set())` | `{type:'set', super:'object'}` |  |
| `of(new Map())` | `{type:'map', super:'object'}` |  |
| `of(new WeakSet())` | `{type:'weakset', super:'object'}` |  |
| `of(new WeakMap())` | `{type:'weakmap', super:'object'}` |  |
| `of((new Set(['a'])).values()))` | `{type:'set iterator', super:'iterator'}` |  |
| `of((new Map([[1,'a']])).values())` | `{type:'map iterator', super:'iterator'}` |  |
| `of("a"[Symbol.iterator]())` | `{type:'string iterator', super:'iterator'}` |  |

#### Functions

| input       | result      | comment     |
|:------------|:------------|:------------|
| `of(function(){})` | `{type:'function', super:'object'}` |  |
| `of(()=>{})` | `{type:'function', super:'object'}` |  |
| `of(new (function(){}))` | `{type:'object', super:'object'}` |  |
| `of(class C {})` | `{type:'function', super:'object'}` |  |
| `of(new (class {constructor(){}}))` | `{type:'object', super:'object'}` |  |
| `of(new Function(""))` | `{type:'function', super:'object'}` |  |
| `of(function *(){})` | `{type:'generatorFunction', super:'generator'}` |  |
| `of((function(){return arguments})())` | `{type:'arguments', super:'object'}` |  |

#### Regexp

| input       | result      | comment     |
|:------------|:------------|:------------|
| `of(/a/g)` | `{type:'regexp', super:'object'}` |  |
| `of(new RegExp("a","g"))` | `{type:'regexp', super:'object'}` |  |

#### Errors

| input       | result      | comment     |
|:------------|:------------|:------------|
| `of(new Error("error"))` | `{type:'error', super:'object'}` |  |
| `of(new TypeError("type error"))` | `{type:'error', super:'object'}` |  |

#### Misc

| input       | result      | comment     |
|:------------|:------------|:------------|
| `of(new Date())` | `{type:'date', super:'object'}` |  |
| `of(Promise.resolve())` | `{type:'promise', super:'object'}` |  |

#### User Classes

```javascript
function Vector2(x=0,y=0){this.x=x;this.y=y;}
var PersonAnonym = function(name='',age=20){this.name=name;this.age=age;}

of.removeType(Date);
of.addType(Vector2);
of.addType(PersonAnonym, 'To be,', 'or not to be');
```
| input       | result      | comment     |
|:------------|:------------|:------------|
| `of(new Vector2())` | `{type:'vector2', super:'object'}` |  |
| `of(new Date())` | `{type:'object', super:'object'}` | because removed above |
| `of(new PersonAnonym())` | `{type:'To be,', super:'or not to be'}` |  |

