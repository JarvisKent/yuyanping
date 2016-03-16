title: 精通CSS笔记 
date: 2016/02/29 16:00:00
tags: [CSS]
categories: [Web前端]
---
## IDs or Classes

>classes should be applied to conceptually similar items that could appear in multiple places on the same page, whereas IDs should be applied to unique elements

有相同抽象概念的元素使用`class`，对唯一元素进行控制时使用`id`。

## Divs and spans

>div actually stands for division and provides a way of dividing a document into meaningful areas.

Div不是随便用的，主要是将页面文档，分块成不同意义的区域。

>Whereas divs can be used to group block-level elements, spans can be used to group or identify inline elements

Span主要是用在内联函数中。

## Note to self
```javascript
/* :@todo Remember to remove this rule before the site goes live */
/* @workaround: I managed to fix this problem in IE by setting a small negative margin but it's not pretty */
/* @bugfix: Rule breaks in IE 5.2 Mac */
```
对CSS内容进行注释，让样式更容易理解，也知道还有什么事没做，可参考[CSSDoc](http://cssdoc.net)

## Margin collapsing

>when two or more vertical margins meet, they will collapse to form a single margin. The height of this margin will equal the height of the larger of the two collapsed margins.

两个元素的边距叠加在一起，以最大的为准。