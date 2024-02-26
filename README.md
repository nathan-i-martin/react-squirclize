# react-state-fully [![npm](https://badgen.net/npm/v/react-state-fully)](https://www.npmjs.com/package/react-state-fully)
Fully encapsulated state management for specific state types.

## Installation
```
npm i react-state-fully
```

## Introduction
React is a powerful, component-based, tool that streamlines the process of developing clean readable website code! And through the use of React Hooks, developers can easily add and create additional functionalities which aren't already in React! react-state-fully encapsulates the unnecessary details of setting and updating state away so you can make typical Javascript calls to your data types without having to worry about updating your state properly.

## Getting Started
To get started, install react-state-fully in your project.

```
npm i react-state-fully
```

## Abstractions
The name State-Fully is derived from the idea that we attempted to encapsulate common data-type methods so that they'd properly leverage React's state system.

### Some React code comparisons:

```typescript
{
    // Traditional method for concatting a string in React
    const [ value, setValue ] = useState("This is some text!");
    console.log(value);

    setValue(value + "Plus some more!");
}
{
    // State-Fully method for concatting a string in React
    const value = State.useString("This is some text!");
    console.log(value);

    value.concat('Plus some more!'); // Concat automatically handles state so you don't have to!
}
```

```typescript
{
    // Traditional method for incrementing a number in React
    const [ value, setValue ] = useState(10);
    console.log(value);

    setValue(value + 1);
}
{
    // State-Fully method for incrementing a number in React
    const value = State.useNumber(10);
    console.log(value);

    value.increment();
}
```

```typescript
{
    // Traditional method for adding/removing values from a Set in React
    const [ values, setValues ] = useState(new Set<string>());
    console.log(values);

    { // Add value
        const newSet = new Set<string>([...values, "some value"]);
        setValues(newSet);
    }

    { // Remove value
        const newSet = new Set<string>(values);
        newSet.delete("some other value");
        setValues(newSet);
    }
}
{
    // State-Fully method for adding/removing values from a Set in React
    const values = State.useSet();
    console.log(value);

    values.add("some value");
    values.remove("some other value");
}
```

## Using State-Fully
To get started, install react-state-fully in your project.

```
npm i react-state-fully
```
From there, all of the encapsulated data types can be fetched via the `State` object. When you use one the contained hooks, it'll instantiate a new state for the specified datatype.
```typescript
const array = State.useArray<string>();
const set = State.useSet<string>();
const map = State.useMap<string, any>();
const number = State.useNumber();
const string = State.useString();
const boolean = State.useBoolean();
```
Something you'll notice is that we only get back one variable instead of a state variable and a setter variable. Users from languages such as Java will be right at home here because reading and altering state can now all be done from the same variable.
There's also a generic state type for if you have your own custom object that you want to be able to handle using `.get()` and `.set()` methods.
```typescript
const object = State.useGeneric<MyObject>({}); // Initial value is required on useGeneric
```