# react-squirclize [![npm](https://badgen.net/npm/v/react-squirclize)](https://www.npmjs.com/package/react-squirclize)
Make anything a squircle in your React project!

## Installation
```
npm i react-squirclize
```

## Getting Started
To get started, install react-squirclize in your project.

```
npm i react-squirclize
```

Squirclize adds the `Squircle` component which extends the HTML div.
```typescript
<Squircle />
```

### Rounding

If you decide you want to adjust the amount that the edged are rounded by, you can use the `radius` parameter:
```typescript
<squircle.div radius="20px" />
```
`radius` supports a number of CSS standard measurement units such as "px", "pt", and "pc". You can also set it to "full" for full corner rounding.

### Clip Quality
Squirclize uses a polygon mask for generating it's shape. The default algorithm makes 45 cuts along the edge of the shape it's cutting.
You can adjust this number by setting the `quality` parameter.
```typescript
<Squircle quality="quarter" />
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

If you don't set a quality level, Squirclize will instead check the radius you've set and calculate the best quality setting based on that.

### Borders
Squircle provides an in-built border system.
```typescript
<Squircle borderWidth="1px" borderColor="white" />
```
By setting the `borderWidth` and `borderColor` params you can adjust the border for Squircles!

Both `borderWidth` and `borderColor` support the typical CSS types that you would expect them to.

Additionally, Squircle borders also allow you to set transparent backgrounds for your Squircles, a limitation which many other Squircle border implementations don't account for.

## Limitations
- Squircles use `clip-path` to crop the underlying element. Some CSS styles such as `border`, `box-shadow`, and `border-radius` will not be visible.
- Squircles always have `overflow` set as `hidden`.
- Squircles always have `position` set as `relative`.
- Squircles will always override any `clip-path` you have set.
- Squircles will always ignore `border` and `border-radius` styles you have set.

## Optimizing
Squirclize uses the `useCoordinates` hook to generate coordinate values that it then uses for it's polygon mask. `useCoordinates` is memoized and will only execute if the radius, component width, and component height, have changed. Component re-renders won't cause the hook to re-run.

If you want to further optimize your Squircle, you can consider setting the `frozen` parameter:
```typescript
<Squircle frozen={true}>
```
`frozen` will disable the Squircle's dynamic transform observer, this effectively breaks the ability for you to use non-absolute unit measurements such as `%`, `min-content`, `max-content`, `vh`, or `vw`, with the small performance boost of not having another listener running.

Additionally, you can consider memoizing the Squircle component if you'd like even more control over when it re-renders.