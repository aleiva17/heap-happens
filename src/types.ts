/** Comparator that returns true if the first value has a higher priority than the second value. */
export type HeapComparator<T> = (firstValue: T, secondValue: T) => boolean;

export type HeapConstructorProps<T> = {
  initialValues?: Array<T>
  comparator?: HeapComparator<T>
}