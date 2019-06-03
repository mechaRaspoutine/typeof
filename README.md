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
