import { HeapComparator, HeapConstructorProps } from "./types";

export class Heap<T> {
  protected elements: Array<T> = [];
  protected hasHigherPriority: HeapComparator<T> = (a: T, b: T) => a > b;

  constructor({ initialValues, comparator }: HeapConstructorProps<T> = {}) {
    this.hasHigherPriority = comparator ?? this.hasHigherPriority;

    if (initialValues?.length) {
      this.buildFromArray(initialValues);
    }
  }

  /** Clears the existing elements in the heap and builds a new one from an array of elements. */
  buildFromArray(array: Array<T>): void {
    this.elements = [];
    array.forEach(element => this.push(element));
  }

  /** Clears the existing elements in the heap and builds a heap from an array of elements, applying a transformation function to each element before adding it to the heap. */
  buildFromMappedArray<U>(array: Array<U>, callback: (value: U, index?: number, array?: Array<U>) => T): void {
    this.elements = [];
    array.forEach(element => this.push(callback(element)));
  }

  /** Adds a new element to the heap. */
  push(element: T): void {
    this.elements.push(element);
    this.bottomUpHeapify(this.elements);
  }

  /** Returns the element with the highest priority without removing it. */
  top(): T | undefined {
    return this.elements[0];
  }

  /** Removes and returns the element with the highest priority. */
  pop(): T | undefined {
    if (this.elements.length === 0) {
      return undefined;
    }

    [this.elements[0], this.elements[this.elements.length - 1]] = 
    [this.elements[this.elements.length - 1], this.elements[0]];
    
    const highestPriority = this.elements.pop();
    this.topDownHeapify(this.elements);

    return highestPriority;
  }

  /** Creates a new array containing all elements in the heap. Can receive a callback to transform each element before adding it to the array. */
  toArray<U>(callback: (value: T, index?: number, array?: Array<T>) => U = (value) => value! as U): Array<U> {
    return this.elements.map((value, index, array) => callback(value, index, array));
  }

  /** Creates a new array containing all elements in the heap, sorted in ascending order based on their priority. Can receive a callback to transform each element before adding it to the array. */
  toSortedArray<U>(callback: (value: T) => U = (value: T) => value! as U): Array<U> {
    const copy: Array<T> = [...this.elements];
    const array: Array<U> = [];

    while (copy.length > 0) {
      [copy[0], copy[copy.length - 1]] = [copy[copy.length - 1], copy[0]];
      array.push(callback(copy.pop()!));
      this.topDownHeapify(copy);
    }
    
    return array;
  }

  /** Creates a copy of the heap, optionally applying a transformation function (for breaking the references) to each element during the cloning process. */
  clone(callback?: (value: T, index?: number, array?: Array<T>) => T): Heap<T> {
    return new Heap<T>({ initialValues: callback ? this.elements.map(callback) : this.elements, comparator: this.hasHigherPriority });
  }

  /** Calls a provided function on each element in the heap. */
  forEach(callback: (value: T, index?: number, array?: T[]) => void): void {
    this.elements.forEach((value, index, array) => callback(value, index, array));
  }

  /** Removes all elements from the heap. */
  clear(): void {
    this.elements = [];
  }

  /** Checks if the heap is empty. */
  isEmpty(): boolean {
    return this.elements.length === 0;
  }

  /** Checks if the heap contains any elements. */
  hasElements(): boolean {
    return this.elements.length > 0;
  }

  /** Returns the number of elements in the heap. */
  size(): number {
    return this.elements.length;
  }

  /** Changes the comparison function used to determine element priority and rebuilds the heap to maintain heap structure based on the new comparison criteria. */
  changeHigherPriorityComparator(newComparator: HeapComparator<T>) {
    this.hasHigherPriority = newComparator;
    this.buildFromArray(this.elements);
  }

  protected bottomUpHeapify(elements: Array<T>): void {
    let index = elements.length - 1;
  
    while (index > 0) {
      const parentIndex = (index - 1) >> 1;
  
      if (!this.hasHigherPriority(elements[index], elements[parentIndex])) {
        break;
      }
  
      [elements[index], elements[parentIndex]] = [elements[parentIndex], elements[index]];
      index = parentIndex;
    }
  }

  protected topDownHeapify(elements: Array<T>): void {
    let index = 0;
  
    while (2 * index + 1 < elements.length) {
      const leftChildIndex = 2 * index + 1;
      const rightChildIndex = leftChildIndex + 1;
  
      const bestPriorityIndex = 
        rightChildIndex < elements.length && this.hasHigherPriority(elements[rightChildIndex], elements[leftChildIndex]) 
          ? rightChildIndex 
          : leftChildIndex;
  
      if (!this.hasHigherPriority(elements[bestPriorityIndex], elements[index])) {
        break;
      }
  
      [elements[index], elements[bestPriorityIndex]] = [elements[bestPriorityIndex], elements[index]];
      index = bestPriorityIndex;
    }
  }
}