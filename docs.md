<a id="readme-top"></a>

<br />
<div align="center">
  <a href="https://github.com/aleiva17/heap-happens">
    <img src="https://i.imgur.com/u8sEPPi.png" alt="Logo" width="80" height="80">
  </a>

  <h3 align="center">Heap happens docs</h3>

  <p align="center">
    A simple, flexible, and performant implementation of the heap data structure.
  </p>
</div>

## Table of Contents
<ol>
  <li><a href="#installation">Installation</a></li>
  <li><a href="#usage">Usage</a></li>
  <li>
    <a href="#types">Types</a>
    <ul>
      <li><a href="#heap-comparator">Heap Comparator</a></li>
      <li><a href="#heap-constructor-props">Heap Constructor Props</a></li>
    </ul>
  </li>
  <li><a href="#constructor">Constructor</a></li>
  <li>
    <a href="#methods">Methods</a>
    <ul>
      <li><a href="#build-from-array">buildFromArray</a></li>
      <li><a href="#build-from-mapped-array">buildFromMappedArray</a></li>
      <li><a href="#push">push</a></li>
      <li><a href="#top">top</a></li>
      <li><a href="#pop">pop</a></li>
      <li><a href="#to-array">toArray</a></li>
      <li><a href="#to-sorted-array">toSortedArray</a></li>
      <li><a href="#clone">clone</a></li>
      <li><a href="#for-each">forEach</a></li>
      <li><a href="#size">size</a></li>
      <li><a href="#clear">clear</a></li>
      <li><a href="#is-empty">isEmpty</a></li>
      <li><a href="#has-elements">hasElements</a></li>
      <li><a href="#change-comparator">changeHigherPriorityComparator</a></li>
    </ul>
  </li>
  <li><a href="#extending">Extending the Heap class</a></li>
</ol>
<br>

<!-- GETTING STARTED -->
## Installation

  ```sh
  npm install heap-happens
  ```

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- USAGE EXAMPLES -->
## Usage

Just import the `Heap` class from `heap-happens` with:

- ES Module
  ```js
  import { Heap } from "heap-happens";

  const heap = new Heap();
  heap.push(12);

  console.log(heap.top()); // 12
  ```

- CommonJS
  ```js
  const { Heap } = require("heap-happens");

  const heap = new Heap();
  heap.push(12);

  console.log(heap.top()); // 12
  ```

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- TYPES SECTION -->
## Types

<h3 id="heap-comparator">Heap Comparator</h3>

A type that defines how a heap comparator should be implemented. The comparator returns true when the first value has a higher priority than the second value.

```ts
type HeapComparator<T> = (firstValue: T, secondValue: T) => boolean
```

<h3 id="heap-constructor-props">Heap Constructor Props</h3>

A type that defines the props of the constructor.

```ts
type HeapConstructorProps<T> = {
  initialValues?: T[] | undefined;
  comparator?: HeapComparator<T> | undefined;
}
```

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- CONSTRUCTOR SECTION -->
## Constructor

### Basic info
- **Purpose:** Initializes a new Heap instance. 
- **Parameters:** 
  - `initialValues: Array<T>` (optional): An array of elements to initially populate the heap.
  - `comparator: HeapComparator<T>` (optional): A comparison function to determine element priority. Defaults to a function that prioritizes larger values (a > b).

### Examples

Using default props:
```ts
const heap = new Heap<number>();

heap.push(36);
heap.push(-72);
heap.push(96);

console.log(heap.top()); // 96
```

Using an array of initial values:
```ts
const heap = new Heap<number>({ initialValues: [15, 0, 5, 20, 10] });
console.log(heap.top()); // 20
```

Using a custom operator:
  - If `a.score` is greater than `b.score`, then `a` has higher priority.
    ```ts
    const heap = new Heap<Player>({ comparator: (a, b) => a.score > b.score });

    heap.push({ name: "Dobby", score: 200 });
    heap.push({ name: "Michelle", score: 500 });
    heap.push({ name: "Albert", score: 404 });

    console.log(heap.top()); // { name: "Michelle", score: 500 }
    ```

  - If `a.score` is lower than `b.score`, then `a` has higher priority.
    ```ts
    const heap = new Heap<Player>({ comparator: (a, b) => a.score < b.score });

    heap.push({ name: "Dobby", score: 200 });
    heap.push({ name: "Michelle", score: 500 });
    heap.push({ name: "Albert", score: 404 });

    console.log(heap.top()); // { name: "Dobby", score: 200 }
    ```

Using a custom operator and an array of initial values:
  ```ts
  const heap = new Heap<Customer>({ 
  initialValues: [
    { id: 1, fidelityPoints: 2500, callback: () => console.log("avi") },
    { id: 2, fidelityPoints: 5000, callback: () => console.log("foo") },
    { id: 3, fidelityPoints: 1200, callback: () => console.log("bar") }
  ],
  comparator: (a, b) => a.fidelityPoints > b.fidelityPoints
});

const customerWithHighestPriority = heap.top();

customerWithHighestPriority?.callback(); // foo
  ```

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## Methods

<h3 id="build-from-array">buildFromArray</h3>

#### Basic info
- **Purpose:** Builds a heap from an existing array of elements. 
- **Parameters:** 
  - `array: Array<T>` : The array of elements to build the heap from.
- **Behavior:** 
  - Clears the existing elements in the heap.
  - Pushes each element from the array into the heap, maintaining heap structure.

#### Examples
From an empty Heap:
```ts
const heap = new Heap<number>();
heap.buildFromArray([-3, 8, 4, 12, 7, -9]);
console.log(heap.top()) // 12
```

From a non-empty Heap:
```ts
const heap = new Heap<number>({ initialValues: [15, 15, 15, 15] });
heap.buildFromArray([-3, 8, 4, 12, 7, -9]);
console.log(heap.top()); // 12
```
<p align="right">(<a href="#readme-top">back to top</a>)</p>


<h3 id="build-from-mapped-array">buildFromMappedArray</h3>

#### Basic info
- **Purpose:** Builds a heap from an existing array of elements, applying a transformation function to each element before adding it to the heap. 
- **Parameters:** 
  - `array: Array<T>` : The array of elements to build the heap from.
  - `callback: (value: U, index?: number, array?: Array<U>) => T` A function that takes an element of type U from the array and returns an element of type T to be added to the heap.
- **Behavior:** 
  - Clears the existing elements in the heap.
  - Iterates through each element in the array.
  - For each element, calls the callback function to transform it into a value of type T.
  - Pushes the transformed value (callback(element)) onto the heap, maintaining the heap structure.

#### Examples

From an array of the same type:
```ts
const heap = new Heap<number>();
heap.buildFromMappedArray([1, 2, 3, 4], (value) => 2 * value);
console.log(heap.top()); // 8
```

From an array of a different type:
```ts
const heap = new Heap<string>();
heap.buildFromMappedArray([1, 2, 3, 4], (value) => value.toString());
console.log(heap.top()); // "4"
```

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<h3 id="push">push</h3>

#### Basic info
- **Purpose:** Adds a new element to the heap. 
- **Parameters:** 
  - `element: T` : The element to add.
- **Behavior:** 
  - Appends the element to the end of the internal array.
  - Rearrange elements (bottom-up heapify) to maintain heap structure.

#### Example

```ts
const heap = new Heap<number>();

heap.push(6);
heap.push(9);
heap.push(3);

console.log(heap.top()); // 9
```

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<h3 id="top">top</h3>

#### Basic info
- **Purpose:** Returns the element with the highest priority without removing it.
- **Parameters:** None
- **Returns:** The element with the highest priority, or `undefined` if the heap is empty.

#### Examples

From an empty heap:
```ts
const heap = new Heap<number>();
console.log(heap.top()); // undefined
```

From a non-empty heap:
```ts
const heap = new Heap<number>();

heap.push(100);
heap.push(0);
heap.push(50);

console.log(heap.top()); // 100
```

<p align="right">(<a href="#readme-top">back to top</a>)</p>


<h3 id="pop">pop</h3>

#### Basic info
- **Purpose:** Removes and returns the element with the highest priority.
- **Parameters:** None
- **Returns:** The element with the highest priority, or `undefined` if the heap is empty.


#### Examples

From an empty heap (after the pop, it remains empty):
```ts
const heap = new Heap<number>();
console.log(heap.pop()); // undefined
```

From a non-empty heap (after pop, it decreases in size):
```ts
const heap = new Heap<number>();

heap.push(100);
heap.push(0);
heap.push(50);

console.log(heap.pop()); // 100
console.log(heap.pop()); // 50
console.log(heap.pop()); // 0
console.log(heap.pop()); // undefined
```

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<h3 id="to-array">toArray</h3>

#### Basic info
- **Purpose:** Creates a new array (unordered) containing all elements in the heap. 
- **Parameters:** 
  - `callback?: (value: T, index?: number, array?: Array<T>) => U` (optional): A function to transform each element before adding it to the array. Defaults to returning the element itself.
- **Return:** A new array containing the transformed elements.

#### Examples
Without callback:
```ts
const heap = new Heap<number>({
  initialValues: [0, 23, 54, 99, 301, 1500]
});

const array = heap.toArray();

console.log(array); // [ 1500, 99, 301, 0, 54, 23 ]
```

With callback to an Array of the same type:
```ts
const heap = new Heap<BlogPost>({ 
  comparator: (a, b) => a.likes > b.likes,
  initialValues: [
    { 
      author: { id: 3, name: "Avi" }, 
      tags: ["r", "s", "t"],
      title: "Hello World!",
      likes: 3000
    },
    { 
      author: { id: 1, name: "Foo" }, 
      tags: ["a", "b", "c"],
      title: "My first blog post",
      likes: 4800
    },
    { 
      author: { id: 2, name: "Bar" }, 
      tags: ["x", "y"],
      title: "My last blog post",
      likes: 2100
    }
  ]
});

// In this case, you can use JSON.stringify
// and JSON.parse as well.
const array = heap.toArray(post => {
  return {
    ...post,
    author: { ...post.author },
    tags: [...post.tags]
  }
});

console.log(array); 
/*
  [ 
    { author: { id: 1, ... }, ... }, 
    { author: { id: 3, ... }, ... },
    { author: { id: 2, ... }, ... }
  ]
*/
```

With callback to an Array of a different type:
```ts
const heap = new Heap<Seller>({ 
  comparator: (a, b) => a.revenue > b.revenue,
  initialValues: [
    { id: 9, name: "Foo", revenue: 21000 },
    { id: 2, name: "Bar", revenue: 53000 },
    { id: 4, name: "Avi", revenue: 150000 }
  ]
});

const array = heap.toArray(seller => seller.name);

console.log(array); // [ "Avi", "Foo", "Bar" ]
```

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<h3 id="to-sorted-array">toSortedArray</h3>

#### Basic info
- **Purpose:** Creates a new array containing all elements in the heap, sorted in ascending order based on their priority.
- **Parameters:** 
  - `callback?: (value: T, index?: number, array?: Array<T>) => U` (optional): A function to transform each element before adding it to the array. Defaults to returning the element itself.
- **Return:** A new array containing the transformed elements.

#### Examples
Without callback:
```ts
const heap = new Heap<number>({
  initialValues: [900, 180, 540, 720, 360],
  comparator: (a, b) => a < b
});

const array = heap.toSortedArray();

console.log(array); // [ 180, 360, 540, 720, 900 ]
```

With callback to an Array of the same type:
```ts
const heap = new Heap<Profile>({
  initialValues: [
    { nickname: "Misty", hobbies: ["fishing", "working out"] },
    { nickname: "Araki", hobbies: ["drawing"] },
    { nickname: "Tommy", hobbies: ["reading"] },
    { nickname: "Athle", hobbies: ["skateboarding", "skiing", "riding a bike"] },
  ],
  comparator: (a, b) => a.hobbies.length > b.hobbies.length
});

const array = heap.toSortedArray(profile => JSON.parse(JSON.stringify(profile)));

console.log(array);
/* 
  [
    { nickname: "Athle", hobbies: ["skateboarding", "skiing", "riding a bike"] },
    { nickname: "Misty", hobbies: ["fishing", "working out"] },
    { nickname: "Tommy", hobbies: ["reading"] },
    { nickname: "Araki", hobbies: ["drawing"] }
  ]
*/
```

With callback to an Array of a different type:
```ts
const heap = new Heap<Pokemon>({
  initialValues: [
    { number: 69,  name: "Bellsprout", type: "grass" },
    { number: 1,   name: "Bulbasaur",  type: "grass" },
    { number: 136, name: "Flareon",    type: "fire"  },
    { number: 3,   name: "Charmander", type: "fire"  },
  ],
  // Fire has more priority than grass type. If they are the
  // same type, we prioritize the one with the lowest number.
  comparator: (a, b) => {
    if (a.type === b.type) {
      return a.number < b.number;
    }
    return a.type === "fire";
  }
});

const array = heap.toSortedArray(pokemon => pokemon.name);

console.log(array); // [ "Charmander", "Flareon", "Bulbasaur", "Bellsprout" ]
```

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<h3 id="clone">clone</h3>

#### Basic info
- **Purpose:** Creates a copy of the heap, optionally applying a transformation function to each element during the cloning process.
- **Parameters:** 
  - `callback?: (value: T, index?: number, array?: Array<T>) => T` (optional): A function that takes an element of type T from the original heap and returns a potentially modified element of type T to be inserted into the cloned heap.
- **Behavior:** 
  - Instantiates a new Heap object with the same comparator as the current heap.
  - If a `callback` function is provided, maps the elements of the current heap using the callback function, creating a new array with the potentially modified elements and uses this new array as the `initialValues` for the cloned heap.
  - If no `callback` function is provided, directly uses the current heap's elements as the `initialValues` for the cloned heap.
- **Return:** The newly created cloned heap.

#### Examples

Without a callback
```ts
const heap = new Heap<number>({ initialValues: [1, 2, 3, 4, 5]});
const otherHeap = heap.clone();

console.log(heap.top(), otherHeap.top()); // 5 5
otherHeap.push(9);
console.log(heap.top(), otherHeap.top()); // 5 9
```

With a callback
```ts
const heap = new Heap<LuckyNumber>({ 
  initialValues: [
    { owner: "Phi", value: 3 },
    { owner: "Foo", value: 7 },
    { owner: "Bar", value: 71 },
    { owner: "Avi", value: 13 }
  ],
  comparator: (a, b) => a.value < b.value
});

const otherHeap = heap.clone(luckyNumber => ({...luckyNumber}));

console.log(heap.top(), otherHeap.top()); 
// { owner: "Phi", value: 3 } { owner: "Phi", value: 3 }

heap.top()!.owner = "NotPhi";

console.log(heap.top(), otherHeap.top());
// { owner: "NotPhi", value: 3 } { owner: "Phi", value: 3 }
```

<p align="right">(<a href="#readme-top">back to top</a>)</p>


<h3 id="for-each">forEach</h3>

#### Basic info
- **Purpose:** Calls a provided function on each element in the heap (unordered).
- **Parameters:** 
  - `callback: (value: T, index?: number, array?: T[]) => void`: The function to call on each element.

#### Example

```ts
const heap = new Heap<string>({
  initialValues: ["Emily", "Andrea", "Michelle", "Claire", "Dobby", "Bob"],
  comparator: (a, b) => a < b
});

heap.forEach(name => console.log(`Hello, ${name}!`));
/*
  Hello, Andrea!
  Hello, Claire!
  Hello, Bob!
  Hello, Emily!
  Hello, Dobby!
  Hello, Michelle!
*/
```

<p align="right">(<a href="#readme-top">back to top</a>)</p>


<h3 id="size">size</h3>

#### Basic info
- **Purpose:** Returns the number of elements in the heap.
- **Returns:** The number of elements in the heap.

#### Example
```ts
const firstHeap = new Heap<number>();

const secondHeap = firstHeap.clone();
secondHeap.push(9);

const thirdHeap = secondHeap.clone();
thirdHeap.push(0);

console.log(firstHeap.size());  // 0
console.log(secondHeap.size()); // 1
console.log(thirdHeap.size());  // 2
```

<p align="right">(<a href="#readme-top">back to top</a>)</p>


<h3 id="clear">clear</h3>

#### Basic info
- **Purpose:** Removes all elements from the heap.
- **Parameters:** None.

#### Example
```ts
const heap = new Heap<string>({ initialValues: ["A", "B", "C"]});

console.log(heap.size()); // 3
heap.clear();
console.log(heap.size()); // 0
```

<p align="right">(<a href="#readme-top">back to top</a>)</p>


<h3 id="is-empty">isEmpty</h3>

#### Basic info
- **Purpose:** Checks if the heap is empty.
- **Returns:** `true` if the heap is empty, `false` otherwise.

#### Example
```ts
const heap = new Heap<number>({ initialValues: [1] });

console.log(heap.isEmpty()); // false
heap.pop();
console.log(heap.isEmpty()); // true
```

<p align="right">(<a href="#readme-top">back to top</a>)</p>


<h3 id="has-elements">hasElements</h3>

#### Basic info
- **Purpose:** Checks if the heap contains any elements.
- **Returns:** `true` if the heap has elements, `false` otherwise.

#### Example
```ts
const heap = new Heap<number>();

console.log(heap.hasElements()); // false
heap.push(100);
console.log(heap.hasElements()); // true
```

<p align="right">(<a href="#readme-top">back to top</a>)</p>


<h3 id="change-comparator">changeHigherPriorityComparator</h3>

#### Basic info
- **Purpose:** Changes the comparison function used to determine element priority.
- **Parameters:** 
  - `newComparator: HeapComparator<T>`: The new comparison function.
- **Behavior:** 
  - Sets the new comparison function.
  - Rebuilds the heap to maintain heap structure based on the new comparison criteria.

#### Example
```ts
const heap = new Heap<number>({ initialValues: [1, 2, 3, 4, 5]});

console.log(heap.top()); // 5
heap.changeHigherPriorityComparator((a, b) => a < b);
console.log(heap.top()); // 1
```

<p align="right">(<a href="#readme-top">back to top</a>)</p>


<h2 id="extending">Extending the Heap class</h2>  

If you want to add more functionality to the base implementation of Heap class, then you should consider extending it and avoid using the prototypes.

In this case we are going to implement a `map` method (like the one available on arrays) and another dummy method called `foo` that will log the array of elements (the heap).

```ts
class EnhancedHeap<T> extends Heap<T> {
  foo() {
    console.log("foo", this.elements);
  }

  map(callback) {
    return this.elements.map(callback);
  }
}

const superHeap = new EnhancedHeap<number>();
superHeap.buildFromArray([1, 2, 3, 4, 5]);

superHeap.foo();
// foo [ 5, 4, 2, 1, 3 ]

const doubles = superHeap.map(value => 2 * value);
console.log("bar", doubles);
// bar [ 10, 8, 4, 2, 6 ]
```

<p align="right">(<a href="#readme-top">back to top</a>)</p>