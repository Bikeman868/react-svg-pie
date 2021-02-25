import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Pie from './Pie';

export default {
  title: 'Pie',
  component: Pie,
  parameters: {
    controls: {
      hideNoControlsWarning: true,
    },
  },
};

export const Simple = () => {
  const data = [{ value: 10 }, { value: 35 }, { value: 19 }, { value: 27 }, { value: 6 }];
  return <Pie data={data} lineHeight={50} />;
};

export const OneSegment = () => {
  const data = [{ value: 10 }];
  return <Pie data={data} lineHeight={50} />;
};

export const TwoSegments = () => {
  const data = [{ value: 10 }, { value: 35 }];
  return <Pie data={data} lineHeight={50} />;
};

export const ThreeSegments = () => {
  const data = [{ value: 10 }, { value: 35 }, { value: 19 }, ];
  return <Pie data={data} lineHeight={50} />;
};

export const WithCaptions = () => {
  const data = [
    { value: 35, caption: 'USA $35M' },
    { value: 19, caption: 'Canada $19M' },
    { value: 10, caption: 'China $10M' },
    { value: 27, caption: 'Europe $27M' },
    { value: 12, caption: 'Other $12M' },
  ];
  return <Pie data={data} lineHeight={20} centerRadius={3} />;
};

export const CustomStyling = () => {
  const highlightStyles = makeStyles((theme) => ({
    text: {
      stroke: 'Red',
    },
    wedge: {
      fill: 'PapayaWhip',
      stroke: 'Red',
    },
  }));

  const regularStyles = makeStyles((theme) => ({
    text: {
      stroke: 'none',
      fill: 'White',
    },
    wedge: {
      fill: 'CornflowerBlue',
    },
  }));

  const highlightClasses = highlightStyles();
  const regularClasses = regularStyles();

  const data = [
    { value: 35, caption: 'USA $35M', classes: regularClasses },
    { value: 27, caption: 'Europe $27M', classes: regularClasses },
    { value: 19, caption: 'Canada $19M', classes: regularClasses },
    { value: 12, caption: 'Other $12M', classes: regularClasses },
    { value: 10, caption: 'China $10M', explode: 10, classes: highlightClasses },
  ];
  return <Pie data={data} radius={150} width={330} height={330} centerRadius={20} lineHeight={20} transform={'translate(15 15)'} />;
};

export const PieChart = () => {
  const classes = makeStyles((theme) => ({
    root: {
      stroke: 'Blue',
    },
    text: {
      fontSize: '17px',
    },
    wedge: {
      fill: 'LemonChiffon',
    },
  }))();
  const data = [
    { value: 35, caption: 'USA $35M', classes },
    { value: 19, caption: 'Canada $19M', classes },
    { value: 10, caption: 'China $10M', classes },
    { value: 27, caption: 'Europe $27M', classes },
    { value: 12, caption: 'Other $12M', classes },
  ];
  return <Pie data={data} lineHeight={20} centerRadius={0} margin={0} />;
};

export const PieMenu = () => {
  const classes = makeStyles((theme) => ({
    root: {
      stroke: 'Blue',
    },
    text: {
      fontSize: '17px',
    },
    wedge: {
      fill: 'CornflowerBlue',
      opacity: 0.2,
      '&:hover': {
        opacity: 0.5,
      },
    },
  }))();

  const data = [
    {
      value: 1,
      caption: 'Go to some other page',
      classes,
      onClick: () => {
        alert('Go to other page clicked');
      },
    },
    {
      value: 1,
      caption: 'Expand this node in the graph',
      classes,
      onClick: () => {
        alert('Expand clicked');
      },
    },
    {
      value: 1,
      caption: 'Hide this node',
      classes,
      onClick: () => {
        alert('Hide clicked');
      },
    },
    {
      value: 1,
      caption: 'Give me more like this',
      classes,
      onClick: () => {
        alert('More clicked');
      },
    },
    {
      value: 1,
      caption: 'Hide all other nodes except this one',
      classes,
      onClick: () => {
        alert('Hide others clicked');
      },
    },
  ];
  return <Pie data={data} centerRadius={40} />;
};
