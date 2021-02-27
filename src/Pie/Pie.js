import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import TextWedge from '../TextWedge/TextWedge';

const useStyles = makeStyles((theme) => ({
  root: {},
}));

const Pie = (props) => {
  const classes = useStyles(props);
  let { width, height, radius, centerRadius, className, margin, padding, lineSpacing, lineHeight, data, startAngle, ...otherProps } = props;

  startAngle = startAngle == undefined ? -180 : startAngle;
  let totalValue = 0;
  data.forEach((d) => {
    totalValue += d.value;
  });

  radius = radius || 120;

  return (
    <svg width={width || radius * 2} height={height || radius * 2}>
      <g className={clsx(classes.root, className)} {...otherProps}>
        {data.map((wedge, index) => {
          const endAngle = startAngle + (wedge.value * 360) / totalValue;
          const { value, title, ...other } = wedge;
          const textWedge = (
            <TextWedge
              key={index}
              radius={radius}
              centerRadius={centerRadius}
              margin={margin}
              padding={padding}
              lineSpacing={lineSpacing}
              lineHeight={lineHeight}
              startAngle={startAngle}
              endAngle={endAngle}
              drawWedge
              {...other}>
              {title || value + ''}
            </TextWedge>
          );
          startAngle = endAngle;
          return textWedge;
        })}
      </g>
    </svg>
  );
};

export default Pie;
