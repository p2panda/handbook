/* eslint-disable no-undef */
const GRAY = '#d3d0c8';
const BLACK = '#2d2d2d';
const GREEN = '#9ddab3';
const YELLOW = '#ffcc66';
const BLUE = '#6699cc';
const MAGENTA = '#cc99cc';
const CYAN = '#66cccc';
const WHITE = '#f2f0ec';

module.exports = {
  plain: {
    color: GRAY,
    backgroundColor: BLACK,
  },
  styles: [
    {
      types: ['prolog'],
      style: {
        color: WHITE,
      },
    },
    {
      types: ['comment'],
      style: {
        color: CYAN,
      },
    },
    {
      types: ['builtin', 'changed', 'interpolation-punctuation'],
      style: {
        color: BLUE,
      },
    },
    {
      types: ['keyword'],
      style: {
        color: YELLOW,
      },
    },
    {
      types: ['number', 'inserted'],
      style: {
        color: MAGENTA,
      },
    },
    {
      types: ['constant'],
      style: {
        color: BLUE,
      },
    },
    {
      types: ['attr-name', 'variable'],
      style: {
        color: WHITE,
      },
    },
    {
      types: ['deleted', 'string', 'attr-value', 'template-punctuation'],
      style: {
        color: MAGENTA,
      },
    },
    {
      types: ['selector'],
      style: {
        color: WHITE,
      },
    },
    {
      // Fix tag color
      types: ['tag'],
      style: {
        color: WHITE,
      },
    },
    {
      // Fix tag color for HTML
      types: ['tag'],
      languages: ['markup'],
      style: {
        color: WHITE,
      },
    },
    {
      types: ['punctuation', 'operator'],
      style: {
        color: WHITE,
      },
    },
    {
      // Fix punctuation color for HTML
      types: ['punctuation'],
      languages: ['markup'],
      style: {
        color: WHITE,
      },
    },
    {
      types: ['function'],
      style: {
        color: CYAN,
        fontWeight: 'bold',
      },
    },
    {
      types: ['class-name'],
      style: {
        color: GREEN,
      },
    },
    {
      types: ['char'],
      style: {
        color: WHITE,
      },
    },
  ],
};
