import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import { TextWedge } from './TextWedge/TextWedge';

const useStyles = makeStyles((theme) => ({
  root: {},
}));

export const Pie = (props) => {
  const classes = useStyles(props);
  const { width, height, radius, centerRadius, className, margin, padding, lineSpacing, lineHeight, data, ...otherProps } = props;

  let startAngle = 0;
  let totalValue = 0;
  data.forEach((d) => {
    totalValue += d.value;
  });

  return (
    <svg width={width || 240} height={height || 240}>
      <g className={clsx(classes.root, className)} {...otherProps}>
        {data.map((wedge, index) => {
          const endAngle = startAngle + (wedge.value * 360) / totalValue;
          const { value, caption, ...other } = wedge;
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
              {caption || value + ''}
            </TextWedge>
          );
          startAngle = endAngle;
          return textWedge;
        })}
      </g>
    </svg>
  );
};
