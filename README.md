# react-svg-pie
A React.js component for drawing pie segments with wrapped text using SVG.

You can draw individual pie segments with the `TextWedge` component, or create a set of 
`TextWedge` instances from data using the `Pie` component.

The components use the Material UI mechanism for defining a default style and allowing 
applications to override any aspect of the CSS without having to define the entire style.

Here are some examples of what the components can look like. I build these to be very 
flexible but have sensible defaults. This means that it's very easy to get started, 
and you can change anything that you need to later.

# The `Pie` component

This component provides a convenient method of creating a set of `TextWedge` components that
divide up a full circle in proportion to a set of data values. Each data value can also have
other information associated with it to customize the look of the corresponding pie segment.

## props

### `radius`
The radius of the outer edge of the pie. The width and height of the SVG drawing will
be 2x this radius unless you have exploded pie segments. Defaults to 120 pixels.

### `centerRadius`
This is the radius of the 'hole' to leave in the center of the pie. This is useful
for creatng pie menus and doughnuts. Defaults to 10 pixels.

### `className`
The name of a CSS class to apply to the svg. drawing. In Material UI this
is usually generated using the `makeStyles` function.

### `margin`
The amount of space to leave around the sides of each pie segment. Defaults to 3 pixels.
Note that sincce each pie segment will have 3 pixels of space around it, the distance
from the edges of two adjacent pie segments will be 6 pixels by default.

### `padding`
The amount of space to leave between the edge of the pie segment and the text inside of it. 
Defaults to 5 pixels.

### `data`
The data to display on the pie. This defines the relative size of the pie
slices, the text to display in each slice, and the styling to apply to each slice.

You can also just set this property to an array of numbers to display a pie chart for
those numbers.

## Passing data

To be continued...

# The `TextWedge` component

The `Pie` component creates a set of `TextWedge` components internally, but you can create these yourself 
for ultimate flexibility like this:

```javascript
import React from 'react';
import { TextWedge } from 'react-svg-pie';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    stroke: 'blue',
  },
  text: {
    fontSize: '45px',
    fill: 'none',
  },
  wedge: {
    fill: 'green',
    stroke: 'black',
    strokeWidth: 2,
    fillOpacity: 0.2,
    '&:hover': {
      opacity: 0.4,
    },
  },
}));

export const CustomPie = () => {
  const classes = useStyles();
  return (
    <svg width="550" height="550">
      <TextWedge classes={classes} radius={250} centerRadius={50} startAngle={315} endAngle={45} drawWedge wedgeMargin={3}>
        This is the first wedge
      </TextWedge>
      <TextWedge classes={classes} radius={250} centerRadius={50} startAngle={45} endAngle={135} drawWedge wedgeMargin={3} explode={25}>
        This is the second wedge
      </TextWedge>
      <TextWedge classes={classes} radius={250} centerRadius={50} startAngle={135} endAngle={225} drawWedge wedgeMargin={3}>
        This is the third wedge
      </TextWedge>
      <TextWedge classes={classes} radius={250} centerRadius={50} startAngle={225} endAngle={315} drawWedge wedgeMargin={3}>
        This is the fourth wedge
      </TextWedge>
    </svg>
  );
};

```

Note that `TextWedge` outputs an SVG `<g>` element and must be inside an `<svg>` element.

## props
The `TextWedge` component has the following props, all other props passed to it will be passed down to the `<g>` element.
This allows you to pass other props such as `onClick` to the SVG group.

### `radius`
The distance from the center of the pie to the outside edge. Defaults to 120 pixels.
You can either pass the same value to all `TextWedge` components in the pie, or you can
scale your SVG to whatever size you want.

### `centerRadius`
The radius of a circle in the middle of the pie that will not be drawn. This is useful
for cases where you want to draw a pie menu, or draw a doughnut. Defaults to 10 pixels.

### `startAngle`
The angle in degrees to start drawing at. This prop has no default and must be specified
for every `TextWedge`.

### `endAngle`
The angle in degrees to finish drawing at. This prop has no default and must be specified
for every `TextWedge`. The most common use case it to have the `endAngle` of one `TextWedge`
match the `startAngle` of the next segment, but you can overlap them or leave gaps if you like.

### `children`
You don't need to pass this prop explicitly, it will be set automatically by React and 
contains the nested elements. For this component the children must be text strings.

### `className`
The name of a CSS class to apply to the root element of the `TextWedge`. In Material UI this
is usually generated using the `makeStyles` function.

### `classes`
Optionally pass an object that overrides the styling of all parts of the `TextWedge` component.
Using this prop, you can change the style of the root element, the text, the wedge drawing and 
baseline drawing.

### `lineSpacing`
This is the vertical distance between lines of text. If you do not set this prop, then the
text will be measured with all of the CSS styling applied to calculate the line spacing.

### `lineHeight`
The height of one line of text. By default this will be the 80% of the line spacing. This
prop only affects the distance between the outside edge of the pie and the top of the 
first line of text.

### `margin`
The size of the space to leave between the left and right edge of the text and the edge of
the pie segment. The default is 5 pixels.

### `drawWedge`
Set this prop to a truthy value to draw the pie segment. If you do not set this prop then
only the text will be drawn.

### `wedgeMargin`
If `drawWedge` is true, then this prop sets the gap between this wedge and the adjacent one.
The default value is 3 pixels. If you are not drawing the wedge then this prop has no effect.

### `drawBaseline`
Set this prop to a truthy value to draw a line on the text baseline. This is mostly useful for 
debugging purposes, but can be used in production code if you like this effect. The style of the
baseline can be customized by passing a `classes` prop with a `baseline` property.

### `explode`
Defines how much to displace this pie segment from the circle to make this pie segment stand out.
By default oie segments are not exploded.
