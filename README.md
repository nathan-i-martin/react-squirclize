# react-squirclize [![npm](https://badgen.net/npm/v/react-squirclize)](https://www.npmjs.com/package/react-squirclize)
Make anything a squircle in your React project!

## Installation
```
npm i react-squirclize
```

## Introduction
React is a powerful, component-based, tool that streamlines the process of developing clean readable website code! And through the use of React Hooks, developers can easily add and create additional functionalities which aren't already in React! react-squirclize encapsulates the unnecessary details of setting and updating state away so you can make typical Javascript calls to your data types without having to worry about updating your state properly.

## Getting Started
To get started, install react-squirclize in your project.

```
npm i react-squirclize
```

Squirclize adds the `squircle` component which extends all other vanilla html elements. To create a new squircle you simply add `squircle.` to the beginning of the element you want.
```typescript
<squircle.div />
```
Squirclize will then convert that component into a squircle!

### Rounding

If you decide you want to adjust the amount that the edged are rounded by, you can use the `rounding` parameter:
```typescript
<squircle.div rounding={0.5} />
```
`rounding` can be any decimal number between 0 and 1, where 0 is no rounding at all (a perfect square), and 1 is full rounding (a perfect circle).

### Clip Quality
The squircle uses a clipping algorithm for generating it's shape. The default algorithm makes 45 cuts along the edge of the shape it's cutting.
You can adjust this number by setting the `quality` parameter.
```typescript
<squircle.div quality={"quarter"} />
```
`quality` can be set to a number of different values:
> `full` - 360 segments | You'll basically never need this.
>
> `half` - 180 segments
>
> `quarter` - 90 segments
>
> `lowest` - 45 segments
>
> `custom` - Any number between 45 and 360

### Common Properties
As you would expect, any element that's a squircle also lets you add typical React props to that element!
```typescript
<squircle.div
    quality={"lowest"}
    rounding={0.1}
    className="bg-white rounded-full"
    style={{
        backgroundImage: "url(./example.png)"
    }}
    />
```


## Limitations
Squircles use the CSS `clip-path` style for defining the shape of the component. Display elements such as borders and inset shadows will also get clipped by the squircle.