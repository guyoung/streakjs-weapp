declare module "streakjs" {
   type Vector2d = {
      x: number;
      y: number;
   }

   type Point = {
      x: number;
      y: number;
   }

   interface IRect {
      x: number;
      y: number;
      width: number;
      height: number;
   }

   type GlobalCompositeOperationType =
      | ''
      | 'source-over'
      | 'source-in'
      | 'source-out'
      | 'source-atop'
      | 'destination-over'
      | 'destination-in'
      | 'destination-out'
      | 'destination-atop'
      | 'lighter'
      | 'copy'
      | 'xor'
      | 'multiply'
      | 'screen'
      | 'overlay'
      | 'darken'
      | 'lighten'
      | 'color-dodge'
      | 'color-burn'
      | 'hard-light'
      | 'soft-light'
      | 'difference'
      | 'exclusion'
      | 'hue'
      | 'saturation'
      | 'color'
      | 'luminosity';

   interface IInjectionHost {
      updatedAfterInjection: boolean;
   }


   interface IInjector {
      host: IInjectionHost;
      run(imageData: ImageData): void;
   }

   export let Vector2d: Vector2d;
   export let Point: Point;
   export let IRect: IRect;
   export let GlobalCompositeOperationType: GlobalCompositeOperationType;
   export let IInjectionHost: IInjectionHost;
   export let IInjector: IInjector;

   /**
    * 
    */
   export abstract class NodeBase {
      constructor(opts?: any);

      readonly uid: number;
      nodeType: string;
      className: string;
      id: string;
      name: string;
      position: Vector2d;
      x: number;
      y: number;
      size: { width: number, height: number }
      width: number;
      height: number;
      rotation: number;
      offset: Vector2d;
      offsetX: number;
      offsetY: number;
      scale: Vector2d;
      scaleX: number;
      scaleY: number;
      skew: Vector2d;
      skewX: number;
      skewY: number;
      opacity: number;
      visible: boolean | 'inherit';
      listening: boolean | 'inherit';
      globalCompositeOperation: GlobalCompositeOperationType;
      transformsEnabled: string;
      attrs: any;

      getAttrs(): any;
      getAttr(attr: string): any;
      setAttr(key, val): NodeBase;
      getClassName(): string;
      getType(): string;
      show(): NodeBase;
      hide(): NodeBase;
   }

   export abstract class Node extends NodeBase implements IInjectionHost {
      constructor(opts?: any)

      zIndex: number;
      preventDefault: boolean;
      draggable: boolean;
      dragDistance: number;
      injectors: IInjector[];
      parent: Container<Node> | null;
      children: Array<Node>;
      updatedAfterInjection: boolean;

      dragBoundFunc: (pos: Vector2d) => Vector2d;

      isListening(): boolean | 'inherit';
      isVisible(): boolean;
      getParent(): Node | null;
      getDepth(): number;
      getZIndex(): number;
      setZIndex(val: number): Node;
      getLayer(): BaseLayer | null;
      getStage(): Stage | null;
      move(change: Vector2d): Node;
      moveToTop(): boolean;
      moveUp(): boolean;
      moveDown(): boolean;
      moveToBottom(): boolean;
      moveTo(newContainer: Container<Node>): Node;
      rotate(theta: number): Node;
      remove(): Node;
      on(evtStr: string, handler: Function): Node;
      off(evtStr: string, callback?: Function): Node;
      addEventListener(type: string, handler: Function): Node;
      removeEventListener(type: string): Node;
      dispatchEvent(evt: any): Node;
      fire(eventType: string, evt?: any, bubble?: boolean): Node;
      getClientRect(opts?: {
         skipTransform?: boolean;
         skipShadow?: boolean;
         skipStroke?: boolean;
         relativeTo?: Container<Node>;
      }): IRect;
      getAbsoluteScale(top?: Node): Vector2d;
      toJSON(): string
      toDataURL(opts?: {
         x?: number;
         y?: number;
         width?: number;
         height?: number;
         pixelRatio?: number;
         mimeType?: string;
         quality?: number;
         callback?: (str: string) => void;
      }): string;
      toImage(opts?: {
         x?: number;
         y?: number;
         width?: number;
         height?: number;
         pixelRatio?: number;
         mimeType?: string;
         quality?: number;
         callback?: (img: HTMLImageElement) => void;
      }): void;
      cache(opts?: {
         x?: number;
         y?: number;
         width?: number;
         height?: number;
         drawBorder?: boolean;
         offset?: number;
         pixelRatio?: number;
         imageSmoothingEnabled?: boolean;
      }): void;
      draw(): Node;

      static load(data: any, container?: any);
   }

   export abstract class Container<ChildType extends Node> extends Node {
      constructor(opts?: any);

      childre: Array<ChildType>;
      clip: IRect;
      clipX: number;
      clipY: number;
      clipWidth: number;
      clipHeight: number;

      clipFunc: (ctx: CanvasRenderingContext2D, shape: Container<ChildType>) => void;

      getChildren(filterFunc?: (item: Node) => boolean): Array<ChildType>;
      hasChildren(): boolean;
      removeChildren(): Container<ChildType>;
      add(child: ChildType): Container<ChildType>
      destroy(): Container<ChildType>;
      find<ChildNode extends Node = Node>(selector): Array<ChildNode>;
      findOne<ChildNode extends Node = Node>(selector): ChildNode;
      clone(obj?): Node;
      getAllIntersections(pos: Vector2d): Array<Shape>
   }

   export class Stage extends Container<BaseLayer> {
      constructor(opts?: any);

      container: string | Element;
      content: HTMLDivElement | null;
      events: any;

      clear(): Stage;
      getIntersection(pos: Vector2d | null, selector?: string): Shape | null;
      batchDraw(): Stage;
   }

   export abstract class BaseLayer extends Container<Node> {
      constructor(opts?: any);

      clearBeforeDraw: boolean;
      imageSmoothingEnabled: boolean;

      getContext(): ContextWrapper;
      clear(bounds?: IRect): BaseLayer;
      remove(): BaseLayer;
      getStage(): Stage;
      batchDraw(): BaseLayer;
      // for nodejs
      createPNGStream(): void

   }

   export class Layer extends BaseLayer {
      constructor(opts?: any);

      hitGraphEnabled(): boolean;

      getIntersection(pos: Vector2d, selector?: string);
      enableHitGraph(): Layer;
      disableHitGraph(): Layer;
      toggleHitCanvas(): Layer;
   }

   export class FastLayer extends BaseLayer {
      constructor(opts?: any);
   }

   export class Group extends Container<Group | Shape> {
      constructor(opts?: any);
   }


   export abstract class DisplayObject extends Node {
      constructor(opts?: any);

      lineCap: string;
      lineJoin: string;
      dash: number[];
      dashEnabled: boolean;
      dashOffset: number;
      fill: string;
      fillEnabled: boolean;
      fillLinearGradientColorStops: Array<number | string>;
      fillLinearGradientStartPointX: number;
      fillLinearGradientStartPointY: number;
      fillLinearGradientEndPointX: number;
      fillLinearGradientEndPointY: number;
      fillRadialGradientStartRadius: number;
      fillRadialGradientEndRadius: number;
      fillRadialGradientColorStops: Array<number | string>;
      fillRadialGradientStartPointX: number;
      fillRadialGradientStartPointY: number;
      fillRadialGradientEndPointX: number;
      fillRadialGradientEndPointY: number;
      fillPatternImage: HTMLImageElement;
      fillPatternRepeat: string;
      fillPatternRotation: number;
      fillPatternOffsetX: number;
      fillPatternOffsetY: number;
      fillPatternScaleX: number;
      fillPatternScaleY: number;
      fillPatternX: number;
      fillPatternY: number;
      fillPriority: string;
      shadowColor: string;
      shadowEnabled: boolean;
      shadowForStrokeEnabled: boolean;
      shadowOpacity: number;
      shadowBlur: number;
      shadowOffsetX: number;
      shadowOffsetY: number;
      stroke: string;
      strokeEnabled: boolean;
      strokeScaleEnabled: boolean;
      strokeHitEnabled: boolean;
      strokeWidth: number;
      strokeLinearGradientColorStops: Array<number | string>;
      strokeLinearGradientStartPointX: number;
      strokeLinearGradientStartPointY: number;
      strokeLinearGradientEndPointX: number;
      strokeLinearGradientEndPointY: number;

      fillFunc: (ctx: ContextWrapper) => void;
      strokeFunc: (ctx: ContextWrapper) => void;
      hitFillFunc: (ctx: ContextWrapper) => void;
      hitStrokeFunc: (ctx: ContextWrapper) => void;
   }

   export class Shape extends DisplayObject {
      constructor(opts?: any);

      centroid: boolean;
      colorKey: string;
      hitStrokeWidth: number | 'auto';
      perfectDrawEnabled: boolean;

      getContext(): ContextWrapper;
      getStrokeHitEnabled();
      setStrokeHitEnabled(val: number): Shape;
      useBufferCanvas(caching?: boolean): boolean;
      destroy(): Shape;
      getSelfRect(): IRect;
      getClientRect(attrs: any): IRect;
      sceneRender(context: ContextWrapper);
      hitRender(context: ContextWrapper)

   }

   export abstract class ContextWrapper {
      constructor(context: CanvasRenderingContext2D,
         canvasWidth: number, canvasHeight: number, canvasPixelRatio: number);

      context: CanvasRenderingContext2D;
      canvasWidth: number;
      canvasHeight: number;
      canvasPixelRatio: number;
      fillStyle: string | CanvasGradient | CanvasPattern;
      strokeStyle: string | CanvasGradient | CanvasPattern;
      shadowColor: string;
      shadowBlur: number;
      shadowOffsetX: number;
      shadowOffsetY: number;
      lineCap: CanvasLineCap;
      lineDashOffset: number;
      lineJoin: CanvasLineJoin;
      lineWidth: number;
      miterLimit: number;
      font: string;
      textAlign: CanvasTextAlign;
      textBaseline: CanvasTextBaseline;
      globalAlpha: number;
      globalCompositeOperation: string;
      imageSmoothingEnabled: boolean;

      arc(x: number, y: number, radius: number,
         startAngle: number, endAngle: number, anticlockwise?: boolean): ContextWrapper;
      arcTo(x1: number, y1: number, x2: number, y2: number, radius: number): ContextWrapper;
      beginPath(): ContextWrapper;
      bezierCurveTo(a0, a1, a2, a3, a4, a5): ContextWrapper;
      clearRect(a0, a1, a2, a3): ContextWrapper;
      clip(): ContextWrapper;
      closePath(): ContextWrapper;
      createImageData(a0: ImageData | number, a1?: number): ImageData;
      drawImage(image: CanvasImageSource,
         a1: number, a2: number, a3?: number, a4?: number, a5?: number,
         a6?: number, a7?: number, a8?: number): ContextWrapper;
      ellipse(x: number, y: number, radiusX: number, radiusY: number, rotation: number,
         startAngle: number, endAngle: number, anticlockwise?: boolean): ContextWrapper;
      isPointInPath(x: number, y: number, fillRule?: CanvasFillRule): boolean;
      fill(): ContextWrapper;
      fillRect(x: number, y: number, w: number, h: number): ContextWrapper;
      fillText(text: string, x: number, y: number, maxWidth?: number): ContextWrapper;
      measureText(text: string): TextMetrics;
      getImageData(sx: number, sy: number, sw: number, sh: number): ImageData;
      getLineDash(): number[];
      lineTo(x: number, y: number): ContextWrapper;
      moveTo(x: number, y: number): ContextWrapper;
      rect(x: number, y: number, w: number, h: number): ContextWrapper;
      putImageData(imagedata: ImageData, dx: number, dy: number,
         dirtyX?: number, dirtyY?: number, dirtyWidth?: number, dirtyHeight?: number): ContextWrapper;
      quadraticCurveTo(cpx: number, cpy: number, x: number, y: number): ContextWrapper;
      restore(): ContextWrapper;
      rotate(angle: number): ContextWrapper;
      save(): ContextWrapper;
      scale(x: number, y: number): ContextWrapper;
      setLineDash(segments: number[]): ContextWrapper;
      setTransform(a: number, b: number, c: number, d: number, e: number, f: number): ContextWrapper;
      stroke(): ContextWrapper;
      strokeRectt(x: number, y: number, w: number, h: number): ContextWrapper;
      strokeText(text: string, x: number, y: number, maxWidth?: number): ContextWrapper;
      transform(a: number, b: number, c: number, d: number, e: number, f: number): ContextWrapper;
      translate(x: number, y: number): ContextWrapper;
      fillShape(shape: Shape): void;
      strokeShape(shape: Shape): void;
      fillStrokeShape(shape: Shape): void;
      clear(bounds?: IRect): void;
      reset(): void;
   }
   
   export class Animation {
      constructor(func: (frame?: IFrame) => boolean|void, layers?: Layer[]);

      start(): Animation;
      stop(): Animation;
      isRunning(): boolean;
   }

   export class Tween {
      constructor(opts: any);

      onFinish: Function;
      onReset: Function;

      play(): Tween;
      reverse(): Tween;
      reset(): Tween;
      seek(t: number): Tween;
      pause(): Tween;
      finish(): Tween;
      destroy(): Tween;
   }

   interface IFrame {
      time: number;
      timeDiff: number;
      lastTime: any;
      frameRate: number;
   }

   interface Easings {
      BackEaseIn(t, b, c, d);
      BackEaseOut(t, b, c, d);
      BackEaseInOut(t, b, c, d);
      ElasticEaseIn(t, b, c, d, a, p);
      ElasticEaseOut(t, b, c, d, a, p);
      ElasticEaseInOut(t, b, c, d, a, p);
      BounceEaseOut(t, b, c, d);
      BounceEaseIn(t, b, c, d);
      BounceEaseInOut(t, b, c, d);
      EaseIn(t, b, c, d);
      EaseOut(t, b, c, d);
      EaseInOut(t, b, c, d);
      StrongEaseIn(t, b, c, d);
      StrongEaseOut(t, b, c, d);
      StrongEaseInOut(t, b, c, d);
      Linear(t, b, c, d);
   }
   export let IFrame: IFrame;
   export let Easings: Easings;

   interface Adaptive {
      isBrowser: boolean;
      isWx: boolean;
      isNode: boolean;
      supportPointerEvents: boolean;
      supportTouchEvents: boolean;
      enableBuffer: boolean;

      getGlobal(): any;
      setGlobal(val: any);
      getCanvasRef(): any;
      setCanvasRef(val: any);
      createImageElement(): any;
      createCanvasElement(): any;
      createOffScreenCanvasElement(): any;
      getDevicePixelRatio(): number | null;
      now(): number | null;
      requestAnimationFrame(callback: Function): any;
      cancelAnimationFrame(requestID): any;
      createDummyContext(): any;
      getDummyContext(): any;
   }

  
   export let adaptive: Adaptive;

   interface __color {
      rgbToHex(r: number, g: number, b: number): string;
      rgbToString(rgb: { r: number, g: number, b: number }): string;
      hexToRgb(hex: string): { r: number, g: number, b: number };
      getRandomColor(): string;
   }


   interface loader {
      loadImage(img: any, callback: Function, param?: any);
      loadImages(sources: string[], callback: Function, param?: any);
   }


  

   type config = {
      pixelRatio: number | undefined;
      inDblClickWindow: boolean;
      dblClickWindow: number;
      pointerEventsEnabled: boolean;
      listenClickTap: boolean;
      captureTouchEventsEnabled: boolean;
      dragDistance: number;
      dragButtons: number[];
      hitOnDragEnabled: boolean;
      showWarnings: boolean;
      ns1: string[];
      ns2: string[];
   }

   interface log {
      error(message?: any): void;
      warn(message?: any): void;
   }

   interface values {
      PI: number;
      PI_TWO: number;
      PI_HALF: number;
      PI_OVER_DEG180: number;
      PI_OVER_DEG360: number;
      DEG180_OVER_PI: number;
      has(val: any): boolean;
      get(val: any, defaultVal: any): any;
   }

   export let color: __color;
   export let config: config;
   export let loader: loader;
   export let values: values;
   export let log: log;

   interface __array {
      destroyArray(array: any[]): void;

   }



   interface __is {
      isFunction(obj: any): boolean;
      isPlainObject(obj: any): boolean;
      isArray(obj: any): boolean;
      isNumber(obj: any): boolean;
      isString(obj: any): boolean;
      isBoolean(obj: any): boolean;
      isObject(val: any): boolean;
   }


   interface __object {
      classApply(constructor: any, args: any): any;
      destroyObject(obj: any, ignore?: string): void

   }

   interface __string {
      capitalize(str: string): string;         
      leftTrim(str): string;
      rightTrim(str): string
      trim(str): string;         
   }

   export let array: __array;  
   export let is: __is;
   export let object: __object;
   export let string: __string;


   export let extension: any;

 

   export namespace shapes {
      class Arc extends Shape {
         innerRadius: number;
         outerRadius: number;
         angle: number;
         clockwise: boolean;
      }

      class Arrow extends Line {
         pointerLength: number;
         pointerWidth: number;
         pointerAtBeginning: boolean;
      }

      class Button extends Group {

      }

      class Circle extends Shape {
         radius: number;
      }

      class Ellipse extends Shape {
         radiusX: number;
         radiusY: number;
      }

      class Image extends Shape {
         image: CanvasImageSource;
         cropX: number;
         cropY: number;
         cropWidth: number;
         cropHeight: number;
      }

      class Label extends Group {
      }

      class Line extends Shape {
         points: number[];
         closed: boolean;
         bezier: boolean;
         tension: number;
      }

      class Path extends Shape {
         data: any;
         dataArray: any[];
         pathLength: number;
      }

      class Polygon extends Line {

      }

      class Rect extends Shape {
         cornerRadius: number | number[];
      }

      class RegularPolygon extends Shape {
         radius: number;
         sides: number;

      }

      class Ring extends Shape {
         innerRadius: number;
         outerRadius: number;

      }

      class Sector extends Shape {
         radius: number;
         angle: number;
         clockwise: boolean;
      }

      class Sprite extends Shape {
         frameIndex: number;
         animation: string;
         image: CanvasImageSource;
         animations: any[];
         frameOffsets: any;
         frameRate: number;

      }

      class Star extends Shape {
         numPoints: number;
         innerRadius: number;
         outerRadius: number;
      }

      class Tag extends Shape {
         pointerDirection: string;
         pointerWidth: number;
         pointerHeight: number;
         cornerRadius: number;
      }

      class Text extends Shape {
         fontFamily: string;
         fontSize: number;
         fontStyle: string;
         fontVariant: string;
         align: string;
         letterSpacing: number;
         verticalAlign: string;
         padding: number;
         lineHeight: number;
         textDecoration: string;
         text: string;
         wrap: string;
         ellipsis: boolean;
      }


      class TextPath extends Shape {
         fontFamily: string;
         fontSize: number;
         fontStyle: string;
         fontVariant: string;
         align: string;
         letterSpacing: number;
         text: string;
         data: string;
         textBaseline: string;
         textDecoration: string;

         kerningFunc: (leftChar?: string, rightChar?: string) => number;
      }
   }
}

