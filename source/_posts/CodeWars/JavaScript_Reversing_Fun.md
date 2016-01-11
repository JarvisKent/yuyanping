title: Reversing Fun
tags: [JavaScript,CodeWars]
categories: [Coding Fun]
date: 2016-01-07 18:58:07
---
## Quiz

You are going to be given a string. Your job is to return that string in a certain order that I will explain below:

Let's say you start with this: 012345

The first thing you do is reverse it:543210
Then you will take the string from the 1st position and reverse it again:501234
Then you will take the string from the 2nd position and reverse it again:504321
Then you will take the string from the 3rd position and reverse it again:504123
<!--more-->
Continue this pattern until you have done every single position, and then you will return the string you have created. For this particular number, you would return:504132

Input:

A string of length 1 - 1000

Output:

A correctly reordered string.
## My Solution
```javascript
function flipNumber(n) {
  //Code goes here!
  var 
    a = n.split('').reverse(),
    i = 0,
    j = a.length - 1,
    result = '';
   
  while (i < j) {
    result = result + a[i++] +a[j--];
  }
  
  if ( a.length % 2 != 0 ) {
    result = result + a[i];
  }
  return result;
}
```
## Top Votes Solution
```javascript
const flipNumber = n => n.length < 2 ? n : n.slice(-1) + n[0] + flipNumber(n.slice(1, -1));
```
## Other Guys
### e.g one
```javascript
function flipNumber(n){
  console.log(n)
  for(var i=0; i<n.length; i++){
    n = n.slice(0,i).concat(n.slice(i,n.length).split("").reverse().join(""));
  }
  return n;
}
```
### e.g two
```javascript
function flipNumber(n) {
  var length = n.length;
  var result = [];
  for (var i = 0; i < Math.floor(length / 2); i++) {
    result.push(n[length - (i + 1)]);
    result.push(n[i]);
  }
  if (length % 2 !== 0) result.push(n[i]);
  return result.join('');
}
```
### e.g three
```javascript
function flipNumber(n)
{
  var r = '', s = [...n];
  
  while (s.length > 1) {
    r += s.pop() + s.shift();
  }
  
  return r + s.join('');
}
```
take a look this solution,I really can't figure it out, what does `s = [...n]` means. I search this in google, but nothing was valueable. Finally, I found the answer, see [ES6函数扩展#rest参数](http://es6.ruanyifeng.com/#docs/function#rest参数)
## Test Cases
```javascript
Random Testing: yBOJaAmjEundefinedundefinedFcQdwccPtDwHhtKwKRzBhZDXkYEN
Test Passed: Value == NyEBYOkJXaDAZmhjBEzuRnKdweKftihnHewdDutnPdcecfwidnQecdF

Random Testing: 767592780245
Test Passed: Value == 574627058972

Random Testing: 23074507040865811217824672935119593638624179427261934846372006226002704012202020944600004576310193272363001031673794718062904983336746482839699879214647840230443602250030628807226980744404172176169433009062081536487876789434275565150968727606471318719369869635088533708690536626066202999137804553518442917888130989713973972161103988794212137578184376613989313650171055734860309777126629420218928475045687289409560411409893691167036610715269023132578422506466493881384569981614581488645689193108962971625454533299370668675739457472063286961082855834551068582181151646848972735866500062786504173343415830905147212865768033257523999885801175846004831821095508444766990973115022309667981229949011357208579683274237912878254577942593810920559766930857587157748108278251055216814531794
Test Passed: Value == 42937017345540178064102856550811512281772882041687427973551171895579538603389662647197595402279206118933945824469377725040562282768020129770342041722230826092705984042670503010140597469391202119839277626396033020210053111637739709949761687046424980045958930313268714368448020863498659791817098251848694979834205273502434330680627255608023102672481850079202368958104734443430741147025167867126690403035060698056327028719583468468476817561718891423845287650516555145308956588722870610669467812331680721794376594896397653756088686503733790982639305543564652266016769220629989091133971890846555436581884414825941176818889193605948893711838937934967624166015120234988785729341231220193672557187108146367360671631918996331938695004117114005655793044896802370896757470152764682299482102
```
