import React, { Fragment } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';

const useStyles = makeStyles((theme) => ({
  root: {},
  text: {
    pointerEvents: 'none',
  },
  wedge: {
    fill: 'none',
    stroke: 'black',
  },
  baseline: {
    fill: 'none',
    strokeDasharray: '4',
  },
}));

class WedgeShape {
  constructor(innerRadius, outerRadius, angle, margin) {
    this.innerRadius = innerRadius;
    this.outerRadius = outerRadius;
    this.angle = angle;
    this.margin = margin;
    this.outerAngle = angle - margin / outerRadius;
    this.innerAngle = innerRadius <= 0 ? angle : angle - margin / innerRadius;
    if (this.innerAngle < 0) this.innerAngle = 0;
  }

  wedgePath() {
    const innerX = Math.sin(this.innerAngle) * this.innerRadius;
    const outerX = Math.sin(this.outerAngle) * this.outerRadius;

    const innerY = Math.cos(this.innerAngle) * this.innerRadius;
    const outerY = Math.cos(this.outerAngle) * this.outerRadius;

    const largeArc = outerY < 0 ? 1 : 0;

    return (
      'M' + -outerX + ' ' + -outerY +
      'L' + -innerX + ' ' + -innerY +
      'A' + this.innerRadius + ' ' + this.innerRadius + ' 0 ' + largeArc + ' 1 ' + innerX + ' ' + -innerY +
      'L' + outerX + ' ' + -outerY +
      'A' + this.outerRadius + ' ' + this.outerRadius + ' 0 ' + largeArc + ' 0 ' + -outerX + ' ' + -outerY
    );
  }

  textPath() {
    const innerX = Math.sin(this.innerAngle) * this.innerRadius;
    const innerY = Math.cos(this.innerAngle) * this.innerRadius;
    const largeArc = innerY < 0 ? 1 : 0;

    return 'M' + -innerX + ' ' + -innerY + 'A' + this.innerRadius + ' ' + this.innerRadius + ' 0 ' + largeArc + ' 1 ' + innerX + ' ' + -innerY;
  }

  right(radius) {
    return Math.sin(this.angle - this.margin / radius) * radius;
  }

  left(radius) {
    return -this.right(radius);
  }

  y(radius) {
    return -Math.cos(this.angle - this.margin / radius) * radius;
  }
}

class TextShape extends WedgeShape {
  constructor(radius, lineNumber, lineHeight, lineSpacing, angle, margin) {
    const topRadius = radius - lineSpacing * (lineNumber - 1) - lineHeight;
    const bottomRadius = topRadius - lineSpacing;
    super(bottomRadius, topRadius, angle, margin);
    this.lineNumber = lineNumber;
    this.pathLength = this.innerRadius * this.innerAngle * 2;
  }

  setText(text, textLength) {
    this.text = text;
    this.textLength = textLength;
    this.startOffset = ((this.pathLength - this.textLength) / (2 * this.pathLength)) * 100 + '%';
  }
}

const calculateDimensions = function(text, className) {
  const words = text.split(/\s+/);
  var svgElement = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  var textElement = document.createElementNS('http://www.w3.org/2000/svg', 'text');
  textElement.classList.add(...className.split(' '));
  svgElement.appendChild(textElement);
  document.body.appendChild(svgElement);

  const wordsWithComputedWidth = words.map((word) => {
    textElement.textContent = word;
    return { word, width: textElement.getComputedTextLength() };
  });

  textElement.textContent = '\u00A0';
  const bbox = textElement.getBBox();

  document.body.removeChild(svgElement);

  return { words: wordsWithComputedWidth, spaceWidth: bbox.width, lineHeight: bbox.height };
};

const wrapWords = function(radius, centerRadius, lineHeight, lineSpacing, angleRad, margin, dimensions) {
  const lines = [];

  let line;
  let text;
  let textLength;

  const newLine = function() {
    if (line) lines.push(line);
    line = new TextShape(radius, lines.length, lineHeight, lineSpacing, angleRad, margin);
    text = '';
    textLength = 0;
    return line.innerRadius > centerRadius;
  };

  if (!newLine()) return lines;
  let done = false;

  dimensions.words.forEach((w) => {
    if (!done) {
      let newLength = textLength ? textLength + dimensions.spaceWidth + w.width : w.width;
      if (newLength > line.pathLength) {
        if (textLength) {
          line.setText(text, textLength);
          if (!newLine()) {
            done = true;
            return;
          }
        }
        text = w.word;
        textLength = w.width;
      } else {
        text = textLength ? text + ' ' + w.word : w.word;
        textLength = newLength;
      }
    }
  });

  if (textLength) {
    line.setText(text, textLength);
    lines.push(line);
  }

  return lines;
};

// eslint-disable-next-line complexity
const TextWedge = (props) => {
  const classes = useStyles(props);

  let {
    radius,
    centerRadius,
    startAngle,
    endAngle,
    children,
    className,
    lineHeight,
    lineSpacing,
    padding,
    drawWedge,
    margin,
    drawBaseline,
    explode,
    ...otherProps
  } = props;

  const dimensions = calculateDimensions(children, classes.text);

  radius = radius || 120;
  lineSpacing = lineSpacing || dimensions.lineHeight;
  lineHeight = lineHeight || lineSpacing * 0.8;
  explode = explode || 0;
  centerRadius = centerRadius === undefined ? 10 : centerRadius;
  padding = padding === undefined ? 5 : padding;
  margin = margin === undefined ? 3 : margin;

  if (startAngle > endAngle) startAngle -= 360;
  const angleRad = ((endAngle - startAngle) * Math.PI) / 360;
  const wedgeShape = new WedgeShape(centerRadius + explode, radius + explode, angleRad, margin + explode / 2);

  const textMargin = (drawWedge ? padding + margin : padding) + explode / 2;
  var textLines = wrapWords(radius + explode, centerRadius + explode, lineHeight, lineSpacing, angleRad, textMargin, dimensions);

  const uniqueId =
    Date.now().toString(36) +
    Math.random()
      .toString(36)
      .substring(2);

  return (
    <>
      <defs>
        {textLines.map((l) => (
          <path key={l.lineNumber} id={uniqueId + l.lineNumber} d={l.textPath()} />
        ))}
      </defs>
      <g
        className={clsx(classes.root, className)}
        transform={'translate(' + radius + ',' + radius + ') rotate(' + (endAngle + startAngle) / 2 + ')'}
        {...otherProps}>
        {drawWedge && <path className={classes.wedge} d={wedgeShape.wedgePath()} />}
        {textLines.map((l) => (
          <Fragment key={l.lineNumber}>
            {drawBaseline && <use className={classes.baseline} href={'#' + uniqueId + l.lineNumber} />}
            <text className={classes.text}>
              <textPath href={'#' + uniqueId + l.lineNumber} startOffset={l.startOffset}>
                {l.text}
              </textPath>
            </text>
          </Fragment>
        ))}
      </g>
    </>
  );
};

export default TextWedge;