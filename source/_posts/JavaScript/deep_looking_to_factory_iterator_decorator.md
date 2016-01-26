title: 深入学习 JavaScript 工厂、迭代器、装饰者模式
date: 2016-01-12 22:49:45
tags: [JavaScript]
categories: [Web前端]
---
## Factory
工厂模式的目的是，创建对象，主要是防止`new`所带来的高耦合，《JavaScript Patterns》上就举了一个工厂的例子，似乎JavaScript中并没有分，简单工厂，工厂方法和抽象工厂这些，我在网上查了资料，抽象工厂好像也是有的，但是没有细看，书上的例子应该是简单工厂的，但和Java这些工厂模式，比较起来又不太一样，可能是基于原型和类继承的差别，这里先做笔记，回来再研究。简单工厂，是通过传入的参数不同，返回不同的实例化对象，书上的例子正好是这样，传入不同种类的车，但又不是写死在工厂中的。下面是创建代码：
```javascript
var corolla  = CarMaker.factory('Compact'); 
var solstice = CarMaker.factory('Convertible'); 
var cherokee = CarMaker.factory('SUV'); 
corolla.drive();  // "Vroom, I have 4 doors" 
solstice.drive(); // "Vroom, I have 2 doors" 
cherokee.drive(); // "Vroom, I have 17 doors
```
<!--more-->
实现代码：
```javascript
// parent constructor 
function CarMaker() {}
// a method of the parent 
CarMaker.prototype.drive = function () {    
  return "Vroom, I have " + this.doors + " doors"; 
};
// the static factory method 
CarMaker.factory = function (type) {    
  var 
    constr = type,       
    newcar;
  // error if the constructor doesn't exist    
  if (typeof CarMaker[constr] !== "function") { 
    throw { 
      name: "Error",
      message: constr + " doesn't exist"    
    };    
  }
  // at this point the constructor is known to exist    
  // let's have it inherit the parent but only once    
  if (typeof CarMaker[constr].prototype.drive !== "function") {
    CarMaker[constr].prototype = new CarMaker();    
  }   
  // create a new instance   
  newcar = new CarMaker[constr]();    
  // optionally call some methods and then return...   
  return newcar;
};
// define specific car makers
CarMaker.Compact = function () {
  this.doors = 4; 
}; 
CarMaker.Convertible = function () {    
  this.doors = 2; 
}; 
CarMaker.SUV = function () {
  this.doors = 24; 
}
```
虽然这里是使用参数，来实现对象生成，但是实现的部分并没有写死在`factory`里面，而是可以动态的进行扩展，更像工厂方法模式，让具体的子类去实现。
## Iterator
其实迭代器模式，主要是提供两个方法，`hasNext`和`next`，这两个方法从名字上就能很好理解，一个为了判断，一个用来实际取值。迭代器其实是链表，但是链表的结构需要一样，迭代器不关心每个元素的实际结构，实现代码如下：
```javascript
var agg = (function () {
    var 
      index = 0,       
      data = [1, 2, 3, 4, 5],        length = data.length;
    return {
        next: function () {          
          var element;
          if (!this.hasNext()) {
            return null; 
          }
          element = data[index];
          index = index + 2;            
          return element;
        },
        hasNext: function () {            
          return index < length;      
        }
    }; 
  }());
```
## Decorator
装饰者模式，其实就是可以动态的为对象添加一些内容，这在JavaScript并不难实现，因为它本向就是动态的语言，下面是用一个产品销售的例子来说明装饰者模式。
比如一个来自加拿大的买家，他购买的商品就需要交，洲税和联邦税（真可怜:-)），代码如下：
```javascript
var sale = new Sale(100);  // the price is 100 dollars 
sale = sale.decorate('联邦税');  // add federal tax 
sale = sale.decorate('洲税');   // add provincial tax 
sale = sale.decorate('money');  // format like money 
sale.getPrice(); // "$112.88
```
现在又来一个中国的买家，他只要交一种税，所有有如下代码：
```javascript
var sale = new Sale(100);    // the price is 100 dollars 
sale = sale.decorate('坑爹税');  
sale.getPrice();                 // "RMB 105.00"
```
现在就用数组的形式来实现，来分析下，decorate这个方法一定有一个数组，用来保存这个产品的税种数量，然后有一个`getPrice`方法，返回计算后的价格，各个税种都实现自己的getPrice方法，用来返回计算后的价格，那思路就有了。

 - 首先需要在销售中保存需要收的税种。
 - 分别实现各税种方法，提供统一方法调用getPrice，返回计算上这种税的价格。
 - sale中有一个总的getPrice方法，去调用此销售中所需要计算的所有税，返回总的价格。

Sale构造器代码如下：
```javascript
function Sale(price) {    
  this.price = (price > 0) || 100; 
  this.decorators_list = []; 
}
```
添加不同的税种，和一个格式化钱的方法：
```javascript
Sale.decorators = {};
Sale.decorators.联邦税 = {   
  getPrice: function (price) {       
    return price + price * 5 / 100;   
  } 
};
Sale.decorators.洲税 = {   
  getPrice: function (price) {     
    return price + price * 7.5 / 100;    
  } 
};
Sale.decorators.坑爹税 = {   
  getPrice: function (price) {     
    return price + price * 20 / 100;    
  } 
};
```
下面需要把税种`push`到列表中，再分别计算，代码如下：
```javascript
Sale.prototype.decorate = function (decorator) {    
  this.decorators_list.push(decorator); 
};
Sale.prototype.getPrice = function () {    
  var 
    price = this.price,        
    i,        
    max = this.decorators_list.length,       
    name;    

    for (i = 0; i < max; i += 1) {        
    	name = this.decorators_list[i];       
    	price = Sale.decorators[name].getPrice(price);   
    }    
  return price; 
}
```
这些模式在JavaScript中的实现都相对要简单的多，有许多模式，虽然不知道他的名字，但是不知不觉的其实已经用上了。


