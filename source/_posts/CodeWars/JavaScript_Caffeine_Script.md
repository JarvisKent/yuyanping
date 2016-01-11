title: Caffeine Script
tags: [JavaScript,CodeWars]
categories: [Coding Fun]
date: 2016-01-09 19:58:07
---
## Quiz

Complete the function caffeineBuzz, which takes a non-zero integer as it's one argument.

If the integer is divisible by 3, return the string "Java".

If the integer is divisible by 3 and divisible by 4, return the string "Coffee"

If the integer is one of the above and is even, add "Script" to the end of the string.

Otherwise, return the string "mocha_missing!"
<!--more-->

## My Solutions
```javascript
function caffeineBuzz(n){
  var result = ''; // dam it, this can be assign mocha_missing
  if (n%3 == 0) {
    if (n%4 == 0) {
      result = 'Coffee';
    } else {
      result = 'Java';
    }
    if (n%2 == 0){
      result = result + 'Script';
    }
  } else { // this else is meaningless
    result = 'mocha_missing!'; 
  }
  return result;
}
```
## Top Votes Solution
```javascript
function caffeineBuzz(n){
  if (n % 12 === 0) return "CoffeeScript";
  if (n % 6 === 0) return "JavaScript";
  if (n % 3 === 0)  return "Java";
  return "mocha_missing!";
}
```
very clever and tutorial.