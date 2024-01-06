# Heap happens

Need a fast and efficient heap/priority queue in your JavaScript/TypeScript projects? Look no further!

This package offers a simple, flexible, and performant implementation of the Heap data structure, ready to tackle your most demanding tasks.

## Examples

Push, top and change higher priority comparator method.

```ts
const heap = new Heap<number>();

heap.push(404);
heap.push(200);
heap.push(500);

console.log(heap.top()); // 500
heap.changeHigherPriorityComparator((a, b) => a < b);
console.log(heap.top()); // 200
```

Default custom comparator and toSortedArray method.

```ts
const heap = new Heap<Profile>({
  comparator: (a, b) => a.points > b.points
  // if a.points is greater than b.points, then 'a' has higher priority
});

heap.push({ name: "Avi", points: 500 });
heap.push({ name: "Foo", points: 900 });
heap.push({ name: "Bar", points: 700 });

console.log(heap.top()); // { name: "Foo", points: 900 }
console.log(heap.toSortedArray(profile => profile.name)); // ["Foo", "Bar", "Avi"]
```

## Docs

For better examples and details about the methods and good practices, please see the following [documentation](https://github.com/aleiva17/heap-happens/blob/master/docs.md).

## Contributing

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

If you have a suggestion that would make this better, please fork the repo and create a pull request. You can also simply open an issue with the tag "enhancement".
Don't forget to give the project a star! Thanks again!

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'feat: add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License
Distributed under the MIT License. See `LICENSE.txt` for more information.

## Contact
Aleiva - [@aleiva17](https://github.com/aleiva17) - aleiva1700@gmail.com