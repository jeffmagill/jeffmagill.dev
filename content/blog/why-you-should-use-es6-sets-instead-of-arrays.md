---
title: Why You Should Use ES6 Sets Instead of Arrays
description: Let's examine the advantages of using ES6 Sets over traditional arrays for unique value storage, better performance, and cleaner code.
image: /images/blog/new-set-closeup.jpg
tags: JavaScript, ES6, Sets, Arrays
created: 1750255285
lastUpdated:
---

For too long, I defaulted to arrays and objects for most lists in JavaScript, they work and they're familiar. But sticking with arrays out of habit meant I was missing out on the advantages that Sets can provide. Looking deeper, I realized sets can make your code faster and easier to read, especially when you need unique values. Here are some practical benefits: 

### Uniqueness & Deduplication

Arrays allow duplicates, which means you may need extra logic to handle repeat values. Sets on the other hand, guarantee that every value is unique—no manual steps for de-duplication are necessary. 

```js
const arr = ['apple', 'banana', 'apple'];
const uniqueArr = [...new Set(arr)]; // [ 'apple', 'banana' ]

const tags = new Set(['apple', 'banana', 'apple']);
console.log([...tags]); // [ 'apple', 'banana' ]
```

### Easy Existence Checks

Checking if a value exists in an array (`arr.includes(value)`) is a linear operation that traverses and examines values, which can be slow for large lists. Sets use a hash-based structure, so lookup with `.has(value)` [is much quicker](https://github.com/anvaka/set-vs-object).

### Iteration

Iterating over a Set is just as easy as iterating over an array, but you're guaranteed to only see unique values.

```js
const uniqueTags = new Set(['js', 'es6', 'js']);
for (const tag of uniqueTags) {
  console.log(tag); // 'js', 'es6'
}
```

### Advanced Usage

Using the spread operator and the filter method can help perform list manipulations or mathematical set operations :

```js
const a = new Set([1, 2, 3]);
const b = new Set([2, 3, 4]);

// Union
const union = new Set([...a, ...b]); // Set {1, 2, 3, 4}

// Intersection
const intersection = new Set([...a].filter(x => b.has(x))); // Set {2, 3}

// Difference
const difference = new Set([...a].filter(x => !b.has(x))); // Set {1}
```

### Limitations

While Sets offer unique advantages, arrays are still preferable in many scenarios:
- **Index and Order:** Arrays maintain the order of elements and allow direct access by index (e.g., `arr[2]`). Sets do not support index-based access.
- **Methods:** Arrays have set of methods like `map`, `filter`, `reduce`, and `sort` that are not available on Sets. If you need to transform or aggregate data, arrays are often more convenient.
- **Serialization:** Arrays can be easily serialized to JSON, while Sets require conversion first.
- **Compatibility:** Many libraries and APIs expect arrays, not Sets.

## The Closing Tag

In practice, Sets are a useful upgrade over traditional arrays when you need unique values, fast lookups, and cleaner logic. They help you write code that's not only more efficient, but also easier to understand and maintain. Sets won't make you a better person or whiten your teeth, but they might help improve your code and skillset.

---

### Related Links
- [MDN Web Docs: Set](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set)
- [MDN Web Docs: Array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array)
- [JavaScript.info: Map and Set](https://javascript.info/map-set)
- [ES6 In Depth: Collections](https://hacks.mozilla.org/2015/06/es6-in-depth-collections/)
