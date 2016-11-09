title: 使用JSDoc注释代码
tags: [前端开发规范,JSDoc]
categories: [Web前端]
date: 2016-05-19 19:58:07
---
团队开发过程中，项目达到一定规模，规范化就需要提上日程，这篇文章对[JSDoc](https://github.com/jsdoc3/jsdoc)一些注释标记作简要使用说明。
## 最简单的注释
```javascript
/**
 *
 * 这是能被JSDoc识别的最简单的注释
 *
 */
```
## 一般场景
```javascript
/**
 * 这是对findGirl函数方法的逻辑说明，如果找到合适的女孩，返回一个女孩对象
 * @param {String} tall - 对这个女孩的身高要求
 * @param {String} weigh - 对这个女孩的体重要求
 * @return {Girl|null} 返回一个女孩对象，或者空
 */
function findGirl(tall,weigh){
  
}

/**
 * @constructor
 * @template Girl
 */
 function Girl(){
    this.name = 'Lucy',
    this.tall = '165cm',
    this.weigh =  '52KG',
    this.habit = 'reading、travel、planting'
 }
```
上面是最一般的场景应用，花括号内，标识此方法函数接受或者返回的类型。
## @param
@param的格式如下：
```javascript
@param {Type} parameter - parameter's description
```
Type可以是JavaScript内建的类型如：Object、String、Array等，当然也可以使用更加复杂的类型，参见[@param](http://usejsdoc.org/tags-param.html)

## @return
@return的使用和@param也基本相同，一样包含Type和一段简单的说明，具体参见[@return](http://usejsdoc.org/tags-returns.html)

## @private|@protected|@public
从单词就可以看出这些标记的作用，使用如下：
```javascript
/**
 * 就是一个演示函数
 * @constructor
 */
function foo(){

  /**
   * @private
   */
  function _innerMethod(){
  
  }

  /**
   * @protected
   */
  this._protectedMethod = function(){

  }

  /**
   * @public
   */
  this.publicMethod = function(){

  }

}

```
能把以上几个用起来，就能极大提高项目的可维护性。

