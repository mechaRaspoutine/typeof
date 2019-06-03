# typeof
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
 ### 3: Keep only primitives
 ```javascript
   const isPrimitive = data => of(data).super == 'primitive';
   var tst1 = isPrimitive(5)? tst1.valueOf() : false; // 5
   var tst2 = isPrimitive(new Number(5))? tst2.valueOf() : false; // false
 ```
