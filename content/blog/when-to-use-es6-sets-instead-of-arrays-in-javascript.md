---
title: When to Use ES6 Sets Instead of Arrays in JavaScript
description: ES6 Sets are the right choice over traditional arrays for unique value storage and fast lookups, and why arrays remain essential for most list operations.
image: /images/blog/new-set-closeup.jpg
tags: JavaScript, ES6, Sets, Arrays
created: 1750255285
lastUpdated: 1750275732
---

If you've been writing JavaScript for a while, you probably reach for arrays by default when you need a list of things. They're familiar, flexible, and work for just about everything. But ES6 Sets provide an alternate collection that works best in in certain situations, like when uniqueness or large dataset performance is critical. Let's look closer at when it makes sense to use a Set instead of an array, and why both have their place in your projects.

### Uniqueness & Deduplication

Arrays allow duplicates, which means you may need extra logic to handle repeat values. Sets on the other hand, guarantee that every value is unique—no manual steps for de-duplication are necessary.

```js
const arr = ['apple', 'banana', 'apple'];
const uniqueArr = [...new Set(arr)]; // [ 'apple', 'banana' ]

const tags = new Set(['apple', 'banana', 'apple']);
console.log([...tags]); // [ 'apple', 'banana' ]
```

### Easy Existence Checks & Iteration

Checking if a value exists in an array (`arr.includes(value)`) is a linear operation that traverses and examines values, which can be slow for large lists. Sets use a hash-based structure, so lookup with `.has(value)` [is much quicker](https://github.com/anvaka/set-vs-object). 

Iterating over a Set is just as easy as iterating over an array, but you're guaranteed to only see unique values.

```js
const uniqueTags = new Set(['js', 'es6', 'js']);
for (const tag of uniqueTags) {
	console.log(tag); // 'js', 'es6'
}
```

### Advanced Usage

Modern JavaScript (ES2023+) now includes built-in methods for set operations, making unions, intersections, and logic based filtering much simpler:

```js
const a = new Set([1, 2, 3]);
const b = new Set([2, 3, 4]);

// Union
const union = a.union(b); // Set {1, 2, 3, 4}

// Intersection
const intersection = a.intersection(b); // Set {2, 3}

// Difference
const difference = a.difference(b); // Set {1}
```

### Sets in Reactive State Management

Sets are especially useful in reactive state management scenarios, such as with React's `useState` or similar hooks. When you need to track a collection of unique items (like selected IDs, toggled filters, or active tags), Sets simplify logic and improve performance for add/remove operations and existence checks.

For example, toggling selection in a React component:

```js
const [selectedIds, setSelectedIds] = useState(new Set());

function toggleId(id) {
  setSelectedIds(prev => {
    const next = new Set(prev);
    if (next.has(id)) {
      next.delete(id);
    } else {
      next.add(id);
    }
    return next;
  });
}
```

This approach ensures uniqueness, avoids array deduplication, and makes toggling efficient even for large sets of data.

### Limitations

While Sets offer unique advantages, arrays are still preferable in many scenarios:

- **Indexing & Ordering:** Arrays maintain the order of elements and allow direct access by index (e.g., `arr[2]`). Sets do not support index-based access.
- **Advanced Methods:** Arrays have methods like `map`, `filter`, `reduce`, and `sort` that are not available on Sets. If you need to transform or aggregate data, arrays are often more convenient.
- **Serialization & Compatibility:** Arrays can be easily serialized to JSON, while Sets require conversion first. Many libraries and APIs expect arrays, not Sets. Conversion adds brittle 'glue-code' to integrations.

## The Closing Tag

Sets are a valuable tool when you need to guarantee uniqueness or need fast lookups of very large lists. But the array remains the reigning champion of ordering, indexing, and manual manipulation. Reach for the right tool and you will produce code that's both efficient and clear.

---

### Related Links

- [MDN Web Docs: Set](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set)
- [MDN Web Docs: Array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array)
- [JavaScript.info: Map and Set](https://javascript.info/map-set)
- [ES6 In Depth: Collections](https://hacks.mozilla.org/2015/06/es6-in-depth-collections/)
