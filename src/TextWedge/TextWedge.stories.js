import React from 'react';
import { TextWedge } from './TextWedge';
import { makeStyles } from '@material-ui/core/styles';

export default {
  title: 'TextWedge',
  component: TextWedge,
  parameters: {
    controls: {
      hideNoControlsWarning: true,
    },
  },
};

const useStyles = makeStyles((theme) => ({
  root: {},
  svg: {},
}));

const navStyles = makeStyles((theme) => ({
  root: {
    stroke: 'red',
  },
  text: {
    fontSize: '25px',
    stroke: 'black',
  },
  wedge: {
    fill: 'pink',
    opacity: 0.2,
    '&:hover': {
      opacity: 0.4,
    },
  },
}));

const actionStyles = makeStyles((theme) => ({
  root: {
    stroke: 'blue',
  },
  text: {
    fontSize: '15px',
  },
  wedge: {
    fill: 'green',
    stroke: 'purple',
    strokeWidth: 2,
    opacity: 0.2,
    '&:hover': {
      opacity: 0.4,
    },
  },
}));

const largeStyles = makeStyles((theme) => ({
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

export const CustomStyle = () => {
  const classes = useStyles();
  const navClasses = navStyles();
  const actionClasses = actionStyles();
  return (
    <div className={classes.root}>
      <svg width="240" height="240" className={classes.svg}>
        <TextWedge startAngle={315} endAngle={45} centerRadius={70} drawWedge classes={actionClasses}>
          This is the first wedge!
        </TextWedge>
        <TextWedge startAngle={45} endAngle={225} centerRadius={70} drawWedge drawBaseline classes={navClasses}>
          This is the second wedge
        </TextWedge>
        <TextWedge startAngle={225} endAngle={260} centerRadius={70} classes={actionClasses} lineSpacing={12}>
          This is the third wedge
        </TextWedge>
        <TextWedge startAngle={260} endAngle={315} centerRadius={70} drawWedge classes={navClasses} lineSpacing={19} lineHeight={21}>
          This is the fourth wedge
        </TextWedge>
      </svg>
    </div>
  );
};

export const DefaultStyle = () => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <svg width="240" height="240" className={classes.svg}>
        <TextWedge startAngle={315} endAngle={45} drawWedge>
          This is the first wedge!
        </TextWedge>
        <TextWedge startAngle={45} endAngle={120} drawWedge>
          This is the second wedge
        </TextWedge>
        <TextWedge startAngle={120} endAngle={230} drawWedge>
          This is the third wedge
        </TextWedge>
        <TextWedge startAngle={230} endAngle={315} drawWedge>
          This is the fourth wedge
        </TextWedge>
      </svg>
    </div>
  );
};

export const LargerSize = () => {
  const classes = useStyles();
  const largeClasses = largeStyles();
  return (
    <div className={classes.root}>
      <svg width="550" height="550" className={classes.svg}>
        <TextWedge classes={largeClasses} radius={250} centerRadius={50} startAngle={315} endAngle={45} drawWedge margin={3} onClick={()=>{alert('Click!')}}>
          This is the first wedge!
        </TextWedge>
        <TextWedge classes={largeClasses} radius={250} centerRadius={50} startAngle={45} endAngle={135} drawWedge margin={3} explode={25}>
          This is the second wedge
        </TextWedge>
        <TextWedge classes={largeClasses} radius={250} centerRadius={50} startAngle={135} endAngle={225} drawWedge margin={3}>
          This is the third wedge
        </TextWedge>
        <TextWedge classes={largeClasses} radius={250} centerRadius={50} startAngle={225} endAngle={315} drawWedge margin={3}>
          This is the fourth wedge
        </TextWedge>
      </svg>
    </div>
  );
};

export const MultiplePies = () => {
  const classes = useStyles();
  const navClasses = navStyles();
  return (
    <div className={classes.root}>
      <svg width="500" height="500" className={classes.svg}>
        <g transform={'translate(0 15) scale(0.8)'}>
          <TextWedge classes={navClasses} radius={100} centerRadius={10} startAngle={315} endAngle={45} drawWedge margin={2} explode={15}>
            First
          </TextWedge>
          <TextWedge classes={navClasses} radius={100} centerRadius={10} startAngle={45} endAngle={135} drawWedge margin={2}>
            Second
          </TextWedge>
          <TextWedge classes={navClasses} radius={100} centerRadius={10} startAngle={135} endAngle={225} drawWedge margin={2}>
            Third
          </TextWedge>
          <TextWedge classes={navClasses} radius={100} centerRadius={10} startAngle={225} endAngle={315} drawWedge margin={2}>
            Fourth
          </TextWedge>
        </g>
        <g transform={'translate(230 15) scale(0.8)'}>
          <TextWedge classes={navClasses} radius={100} centerRadius={10} startAngle={315} endAngle={45} drawWedge margin={2}>
            1st
          </TextWedge>
          <TextWedge classes={navClasses} radius={100} centerRadius={10} startAngle={45} endAngle={135} drawWedge margin={2} explode={15}>
            2nd
          </TextWedge>
          <TextWedge classes={navClasses} radius={100} centerRadius={10} startAngle={135} endAngle={225} drawWedge margin={2}>
            3rd
          </TextWedge>
          <TextWedge classes={navClasses} radius={100} centerRadius={10} startAngle={225} endAngle={315} drawWedge margin={2}>
            4th
          </TextWedge>
        </g>
        <g transform={'translate(15 230) scale(0.8)'}>
          <TextWedge classes={navClasses} radius={100} centerRadius={10} startAngle={315} endAngle={45} drawWedge margin={2}>
            1st Place
          </TextWedge>
          <TextWedge classes={navClasses} radius={100} centerRadius={10} startAngle={45} endAngle={135} drawWedge margin={2}>
            2nd Place
          </TextWedge>
          <TextWedge classes={navClasses} radius={100} centerRadius={10} startAngle={135} endAngle={225} drawWedge margin={2} explode={15}>
            3rd Place
          </TextWedge>
          <TextWedge classes={navClasses} radius={100} centerRadius={10} startAngle={225} endAngle={315} drawWedge margin={2}>
            4th Place
          </TextWedge>
        </g>
        <g transform={'translate(230 230) scale(0.8)'}>
          <TextWedge classes={navClasses} radius={100} centerRadius={10} startAngle={315} endAngle={45} drawWedge margin={2}>
            Number 1
          </TextWedge>
          <TextWedge classes={navClasses} radius={100} centerRadius={10} startAngle={45} endAngle={135} drawWedge margin={2}>
            Number 2
          </TextWedge>
          <TextWedge classes={navClasses} radius={100} centerRadius={10} startAngle={135} endAngle={225} drawWedge margin={2}>
            Number 3
          </TextWedge>
          <TextWedge classes={navClasses} radius={100} centerRadius={10} startAngle={225} endAngle={315} drawWedge margin={2} explode={15}>
            Number 4
          </TextWedge>
        </g>
      </svg>
    </div>
  );
};
