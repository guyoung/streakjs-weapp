# streakjs

streakjs 是一款多端 JavaScript Canvas 框架，支持桌面及移动浏览器、Node.js、微信小程序等平台，使用统一的 API，快速实现图形绘制、变换、动画和交互等功能。

## 主要特性

- 多端支持
- 提供丰富的图形元素
- 提供完善的事件处理机制，支持移动端设备的触摸事件
- 支持序列化、反序列化
- 基于面向对象模块化设计，易于扩展
- 提供简单快捷的API，支持方法的链式调用
- 支持 TypeScript，提供完整的类型定义文件


## 开始使用

- 引入 streakjs

streakjs 无依赖库，可以直接在[github](https://github.com/guyoung/streakjs/releases)下载js文件，或使用 npm 命令安装

```
npm install streakjs
```

也可以使用 CDN 版本

```html
<script src="https://cdn.jsdelivr.net/npm/streakjs/dist/streakjs.min.js"></script>
```

- 创建舞台容器

在 html 中添加一个用于 streakjs 创建舞台的容器

```html
<div id="container"></div>
```

- 创建舞台并绑定容器、设置宽度和高度

```javascript
var stage = new streakjs.Stage({
  container: "container",
  width: 640,
  height: 480
});
```

- 创建图层

```javascript
var layer = new streakjs.Layer();
```

- 创建图形对象，并添加到图层

```javascript
var circle = new streakjs.shapes.Circle({
  x: stage.width / 2,
  y: stage.height / 2,
  radius: 70,
  fill: "red",
  stroke: "black"
});

layer.add(circle);
```

- 添加图层至舞台

```javascript
stage.add(layer);
```

完整代码，详见 <https://guyoung.github.io/streakjs/#/getting_started/quickstart>

## Node.js

- streakjs 在 Node.js 服务端使用，需要安装 node-canvas

```
npm install canvas
```

node-canvas 安装方法，详见 <https://github.com/Automattic/node-canvas>

- 安装 streakjs

```
npm install streakjs
```

- 使用 streakjs

```javascript
var streakjs = require("streakjs");

streakjs.adaptive.getGlobal().canvas = require("canvas");

var stage = new streakjs.Stage({
  width: 400,
  height: 400
});

var layer = new streakjs.Layer();

var circle = new streakjs.shapes.Circle({
  x: stage.width / 2,
  y: stage.height / 2,
  radius: 70,
  fill: "red",
  stroke: "black",
  strokeWidth: 4
});

layer.add(circle);

stage.add(layer);

console.log(circle.toDataURL());
```

## 微信小程序

微信小程序使用 streakjs，详见 <https://github.com/guyoung/streakjs-weapp>

实际运行效果，请扫描小程序码

![微信小程序](https://github.com/guyoung/streakjs/raw/master/doc/images/streakjs-weapp.png)

## 基础概念

### 核心类

- streakjs.Node 节点

Node 类是场景、图层、图形、图形组等对象的基类，提供公共属性和方法。

- streakjs.Stage 舞台

Stage 是一个容器对象，在 streakjs 中,Stage 对象作为顶层容器使用。一个 Stage 对象可以添加多个图层。

- streakjs.Layer 图层

Layer 是一个容器对象，内部封装了 canvas 对象。

* streakjs.Shape 图形

Shape 类是所有图形对象的基类，可以通过继承 Shape 类或通过创建 Shape 对象方式来自定义图形对象

- streakjs.Group 图形组

Group 是一个容器对象，Group 对象用于把多个不同的 Shape 对象，或其他 Group 对象组合成一个复杂的图形进行统一管理。

### 内置图形

streakjs 内置多种图形对象

- streakjs.shapes.Arc 圆弧
- streakjs.shapes.Arrow 箭头
- streakjs.shapes.Button 按钮
- streakjs.shapes.Circle 圆形
- streakjs.shapes.Ellipse 椭圆
- streakjs.shapes.Label 标签
- streakjs.shapes.Line 线条
- streakjs.shapes.Path 路径
- streakjs.shapes.Polygon 多边形
- streakjs.shapes.Rect 矩形
- streakjs.shapes.RegularPolygon 正多边形
- streakjs.shapes.Ring 圆环
- streakjs.shapes.Sector 扇形
- streakjs.shapes.Star 星形
- streakjs.shapes.Text 文本
- streakjs.shapes.TextPath 文本路径
- streakjs.shapes.Image 图片
- streakjs.shapes.Sprite 精灵

除了使用以上内置图形对象外，您也可以通过继承 streakjs Shape 类或通过创建 Shape 对象时定义 sceneFunc 函数方式来自定义图形对象

```javascript
var triangle = new streakjs.Shape({
  sceneFunc: function(context, shape) {
    context.beginPath();
    context.moveTo(20, 50);
    context.lineTo(220, 80);
    context.quadraticCurveTo(150, 100, 260, 170);
    context.closePath();
    context.fillStrokeShape(shape);
  },
  fill: "#00D2FF",
  stroke: "black",
  strokeWidth: 4
});
```

### 基本属性

sreakjs 中所有继承自 Node 的对象，包括 Stage、Layer、Shape、Group 等，都具有以下属性：

- ID
- Name 名称
- Position 位置
- Size 大小
- Scale 缩放
- Rotation 旋转
- Skew 倾斜
- Offset 偏移
- Opacity 透明
- Visible 显示/隐藏

```javascript
var rect2 = new streakjs.shapes.Rect({
  x: (stage.width - 100) / 2,
  y: 150,
  width: 100,
  height: 50,
  fill: "green",
  stroke: "black",
  strokeWidth: 5,
  cornerRadius: 10,
  skewY: 30
});
```

### 样式

sreakjs 中每个图形对象都支持以下的样式属性：

- Stroke 描边
- StrokeLinearGradient 线性渐变描边
- Fill 填充
- FillLinearGradient 线性渐变填充
- FillRadialGradient 径向渐变填充
- FillPattern 图像填充
- Shadow 阴影
- LineJoin 线条相交拐点
- LineCap 线条结束端点
- LineDash 虚线

```javascript
var rect = new streakjs.shapes.Rect({
  x: (stage.width - 240) / 2,
  y: 100,
  width: 240,
  height: 80,
  fillPatternImage: res,
  fillPatternOffset: { x: -220, y: 70 }
});
```

### 拖曳

streakjs 所有继承自 Node 类的对象都能实现拖曳功能，需要将对象的 draggable 属性设为 true

```javascript
var circle = new streakjs.shapes.Circle({
  x: stage.width / 2,
  y: stage.height / 2,
  radius: 70,
  fill: "red",
  stroke: "black",
  strokeWidth: 4,
  draggable: true
});
```

### 事件

sreakjs 中所有继承自 Node 的对象都可以绑定事件

- 绑定事件

```javascript
circle.on("mouseover", function() {
  writeMessage("Mouseover Circle");
});
circle.on("mouseout", function() {
  writeMessage("Mouseout Circle");
});
circle.on("mousedown", function() {
  writeMessage("Mousedown Circle");
});
circle.on("mouseup", function() {
  writeMessage("Mouseup Circle");
});
```

- 绑定多个事件

```javascript
rect.on("mouseover mouseout mousedown mouseup touchstart touchend", function(
  evt
) {
  writeMessage("Rect Multi Events: " + evt.type);
});
```

### 动画

streakjs 中 Animation 对象提供基本动画功能。

```javascript
var period = 2000;

anim = new streakjs.Animation(function(frame) {
  var scale = Math.sin((frame.time * 2 * Math.PI) / period) + 0.001;
  regularPolygon.scale = { x: scale, y: scale };
}, layer);
```

完整代码，详见 <https://guyoung.github.io/streakjs/#/basic/%E5%8A%A8%E7%94%BB/AnimationScale>

streakjs 中 Tween 对象提供缓动动画功能，可以实现图形从原始的状态到新的状态线性变化，包括位置、大小、旋转、缩放、倾斜、颜色、透明等变化

```javascript
var tween = new streakjs.Tween({
  node: rect,
  duration: 1,
  x: 240,
  y: 100,
  fill: "red",
  rotation: Math.PI * 2,
  opacity: 1,
  strokeWidth: 6,
  scaleX: 1.5
});

setTimeout(function() {
  tween.play();
}, 5000);
```

完整代码，详见 <https://guyoung.github.io/streakjs/#/basic/%E5%8A%A8%E7%94%BB/Tween>

### 选择器

streakjs 的 Stage、Layer、Group 等容器对象都具有 find、findOne 方法，可以根据 ID、Name 和类名来获取对象

- 根据 ID 获取对象

```javascript
var shape = layer.find("#circle1")[0];
```

- 根据 Name 获取对象

```javascript
var shape = layer.find(".circle2")[0];
```

- 根据类名获取对象

```javascript
var shapes = layer.find("Circle");
```

完整代码，详见 <https://guyoung.github.io/streakjs/#/basic/%E6%9D%82%E9%A1%B9/Selector>

### 序列化、反序列化及导出

- 将舞台保存成 JSON 数据

```javascript
stage.toJSON();
```

- 把 JSON 数据加载至舞台

```javascript
var json =
  '{"attrs":{"width":578,"height":200},"className":"Stage","children":[{"attrs":{},"className":"Layer","children":[{"attrs":{"x":100,"y":100,"sides":6,"radius":70,"fill":"red","stroke":"black","strokeWidth":4},"className":"RegularPolygon"}]}]}';

var stage = streakjs.Node.load(json, "container");
```

- 可以直接导出为图片文件

```javascript
var dataURL = stage.toDataURL({ pixelRatio: 3 });
downloadURI(dataURL, "stage.png");
```

完整代码，详见 <https://guyoung.github.io/streakjs/#/basic/%E6%9D%82%E9%A1%B9/ExportAsImage>

了解更多使用方法，请访问项目网站 <https://guyoung.github.io/streakjs>

## 项目网站

- <https://github.com/guyoung/streakjs>

---

**关注微信公众号，获取软件最新消息**

![微信公众号](https://github.com/guyoung/streakjs/raw/master/doc/images/guyoungstudio-mp.png)
