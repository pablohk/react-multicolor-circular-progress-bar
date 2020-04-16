# react-multicolor-circular-progress-bar
[![NPM](https://img.shields.io/npm/v/react-multicolor-circular-progress-bar.svg)](https://www.npmjs.com/package/react-multicolor-circular-progress-bar) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)


A React component that displays a customisable circular or semicircular progress bar.

The bar can display multiples colors segments in the circle, with variable degrees and gradient color between transitions.

![alt text][examples]

[examples]: ./assets/examples.png "Examples"


## Install
Install with npm:
```bash
npm install --save react-multicolor-circular-progress-bar
```

## Examples
For examples and usage see [example](./example) folder.

## Usage
```jsx
import React from 'react';

import CircularBar from 'react-multicolor-circular-progress-bar';

const Example = (props) => (
    <CircularBar
      scale={2}
      angleTransition={[180]}
      colors={['#ff0000','#00ff00']}
      stroke={ {color:'#eee', width:5}}
    />
);

export default Example;
```

## Naming
![alt text][naming]

[naming]: ./assets/naming.png "Naming schema"


## Props
|  Name              |  Type                        |  Required       |  Default                          |  Range                                    |  Description                                                                                                                        |
| ------------------ | ---------------------------- | --------------- | --------------------------------- | ----------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------- |
|  fontFamily        |  string                      |  false          |  roboto                           |  n/a                                      |  The font-family used in the component.                                                                                             |
|  scale             |  number or string            |  false          |  1                                |  >0                                       |  General scale of all elements in  progress bar.                                                                                    |
|  gapGradient       |  number                      |  false          |  1                                |  >=0                                      |  The size in degrees of color gradient applied between color transition. The max value depends of angles of adjacent sectors.       |
|  angleTransition   |  Array of numbers            |  false          |  [ 180 ]                          |  >0º and <360º or 180º for semicircular   |  Set the angle position where the segment change of color.                                                                          |
|  colors            |  Array of string             |  true           |  [ '#ff0000',  '#00ff00' ]        |  Valid hex color code                     |  Set the segments colors. The array must have one more element than angleTransition array.                                          |
|  semiCircular      |  boolean                     |  false          |  false                            |  n/a                                      |  Change between circular or semicircular mode.                                                                                      |
|  title             |  Object                      |  false          |  n/a                              |  n/a                                      |  Set the title properties. See [title](#title) props.                                                                               |
|  percent           |  Object                      |  true           |  n/a                              |  n/a                                      |  Set the percent properties. See [percent](#percent) props.                                                                         |
|  image             |  Object                      |  false          |  n/a                              |  n/a                                      |  Set the image properties. See [image](#image) props.                                                                               |
|  stroke            |  Object                      |  true           |  n/a                              |  n/a                                      |  Set the stroke properties. See [stroe](#stroke) props.                                                                             |
|  ring              |  Object                      |  false          |  n/a                              |  n/a                                      |  Set the ring properties. See [ring](#ring) props.                                                                                  |


***


### **title**
|  Name              |  Type                        |  Required       |  Default                          |  Range                                                                              |  Description                                                                              |
| ------------------ | ---------------------------- | --------------- | --------------------------------- | ----------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------- |
|  name              |  string                      |  true           |  n/a                              |  n/a                                                                                |  Title text in the progress bar.                                                          |
|  fontSize          |  number                      |  false          |  10                               |  n/a                                                                                |  The font-size in px.                                                                     |
|  fontWeight        |  string                      |  false          |  'normal'                         |  'normal', 'bold'                                                                   |  The font-weight of font.                                                                 |
|  color             |  string                      |  false          |  '#00000099'                      |  Valid hex color code                                                               |  The font-color.                                                                          |
|  align             |  string                      |  false          |  'middle'                         |  'start', 'middle', 'end'                                                           |  The font-alligment in the progress bar.                                                  |
|  position          |  Object                      |  true           |  { X: 0, Y: 0 }                   |  <ul><li>X: -50 to 50</li><li>Y: -50 to 50 or -50 to 0 for semicircular</li></ul>   |  x and y title position coordinates, in percentage, over progress bar. Take base of coordinates the align props selected ( start, middle or end of string). |

***


### **percent**
|  Name              |  Type                        |  Required       |  Default                          |  Range                                                                              |  Description                                                                              |
| ------------------ | ---------------------------- | --------------- | --------------------------------- | ----------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------- |
|  value             |  number                      |  true           |  n/a                              |  0 to 100                                                                           |  Percent of gradient bar.                                                                 |
|  showValue         |  boolean                     |  false          |  true                             |  n/a                                                                                |  Show or hide the percent value.                                                          |
|  fontSize          |  number                      |  false          |  10                               |  n/a                                                                                |  The font-size in px.                                                                     |
|  fontWeight        |  string                      |  false          |  'normal'                         |  'normal', 'bold'                                                                   |  The font-weight of font.                                                                 |
|  color             |  string                      |  false          |  '#00000099'                      |  Valid hex color code                                                               |  The font-color.                                                                          |
|  align             |  string                      |  false          |  'middle'                         |  'start', 'middle', 'end'                                                           |  The font-alligment in the progress bar.                                                  |
|  position          |  Object                      |  true           |  { X: 0, Y: 0 }                   |  <ul><li>X: -50 to 50</li><li>Y: -50 to 50 or -50 to 0 for semicircular</li></ul>   |  x and y percent position coordinates, in percentage, over progress bar. Take base of coordinates the align props selected ( start, middle or end of string). |

***


### **image**
|  Name              |  Type                        |  Required       |  Default                          |  Range                                                                              |  Description                                                                              |
| ------------------ | ---------------------------- | --------------- | --------------------------------- | ----------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------- |
|  path              |  string                      |  true           |  n/a                              |  n/a                                                                                |  Path of the image.                                                                       |
|  width             |  number                      |  true           |  1                                |  n/a                                                                                |  The image width in px.                                                                   |
|  position          |  Object                      |  true           |  { X: 0, Y: 0 }                   |  <ul><li>X: -50 to 50</li><li>Y: -50 to 50 or -50 to 0 for semicircular</li></ul>   |  x and y image position coordinates, in percentage, over progress bar.                    |


***


### **stroke**
|  Name              |  Type                        |  Required       |  Default                          |  Range                                                                              |  Description                                                                              |
| ------------------ | ---------------------------- | --------------- | --------------------------------- | ----------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------- |
|  color             |  string                      |  true           |  '#eee'                           |  Valid hex color code                                                               |  The color of stroke arc. Cover the bar percent from percent valure up to 360º.           |
|  width             |  number                      |  true           |  5                                |  n/a                                                                                |  The width of progress bar.                                                               |

***


### **ring**
|  Name              |  Type                        |  Required       |  Default                          |  Range                                                                              |  Description                                                                              |
| ------------------ | ---------------------------- | --------------- | --------------------------------- | ----------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------- |
|  bgColor           |  string                      |  false          |  n/a                              |  Valid hex color code                                                               |  The color of inner progress bar.                                                         |
|  color             |  string                      |  true           |  n/a                              |  Valid hex color code                                                               |  The color of ring inner gradient colors arc.                                             |
|  width             |  number                      |  true           |  0                                |  n/a                                                                                |  The width of progress bar.                                                               |
|  padding           |  number                      |  false          |  0                                |  n/a                                                                                |  The gap between gradient color circle and ring.                                          |


## License

MIT © [Pablo Carmona &lt;pablusmid@gmail.com&gt;](https://github.com/pablohk &lt;pablusmid@gmail.com&gt;)
