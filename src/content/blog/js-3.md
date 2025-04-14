---
title: JavaScript's Asynchronous Processing and Event Loop
description: ""
pubDate: 2025-03-04T02:43:56.929Z
image: "/images/blog/js.png"
categories: ["Javascript"]
---

This article contains information I've organized during my studies. It may not cover everything and there might be some incomplete parts, so please use it as a reference. Feedback is welcome! 🙌

## Background
JavaScript is a single-threaded language. It can only process one task at a time. Because of this characteristic, time-consuming tasks such as network requests or file reading are processed asynchronously.

## Asynchronous Processing Before ES6
### Execution Environment
JavaScript code runs in runtime environments like browsers or Node.js. This environment consists of three main parts:

1. **JavaScript Engine**
   - Executes code and manages function calls through the Call Stack
   - Examples: V8 (Chrome, Node.js), SpiderMonkey (Firefox)

2. **Web APIs**
   - Asynchronous processing features provided by browsers
   - DOM manipulation (addEventListener)
   - AJAX (XMLHttpRequest)
   - Timers (setTimeout, setInterval)

3. **Event Loop and Callback Queue**
   - Only a single Callback Queue exists
   - Callbacks for all asynchronous operations are stored sequentially in this queue
   - Tasks are processed in FIFO (First In First Out) order

### Event Loop Operation
1. Check if the Call Stack is empty
2. If empty, move the oldest task from the Callback Queue to the Call Stack
3. Execute the task

## Asynchronous Processing After ES6
### Added Components
1. **Introduction of Promise and async/await**
2. **Separation of Queues**
   - Task Queue (Macrotask Queue): Same as the original Callback Queue
   - Job Queue (Microtask Queue): Newly added queue

### Types of Queues and Priorities
1. **Task Queue (Macrotask Queue)**
   - setTimeout, setInterval
   - UI rendering
   - Event callbacks
   - XMLHttpRequest, fetch

2. **Job Queue (Microtask Queue)**
   - Promise's then/catch/finally handlers
   - async/await
   - process.nextTick (Node.js)
   - MutationObserver

### New Event Loop Operation
1. Check if the Call Stack is empty
2. If empty, first process all tasks in the Job Queue (Microtask Queue)
3. Then process tasks from the Task Queue one by one

## Example Code
```javascript
// Before ES6
console.log('1');
setTimeout(() => console.log('2'), 0);
console.log('3');
// Output: 1, 3, 2

// After ES6
console.log('1');
setTimeout(() => console.log('2'), 0);  // Task Queue
Promise.resolve()
    .then(() => console.log('3'));      // Job Queue
console.log('4');
// Output: 1, 4, 3, 2
```

## Keywords
- Single Thread
- Call Stack
- Event Loop
- Web APIs
- Callback Queue (Before ES6)
- Task Queue & Job Queue (After ES6)
- Promise
- Asynchronous Processing