/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./node_modules/linked-list-tsagga/index.js":
/*!**************************************************!*\
  !*** ./node_modules/linked-list-tsagga/index.js ***!
  \**************************************************/
/***/ ((module) => {

eval("class Node {\n  constructor(key, value, next = null) {\n    this.next = next;\n    this.value = value;\n    this.key = key;\n  }\n}\n\nclass LinkedList {\n  list = null;\n\n  append(key, value) {\n    if (!this.list) {\n      this.list = new Node(key, value);\n      return;\n    }\n    let curr = this.list;\n    while (curr.next) {\n      curr = curr.next;\n    }\n    curr.next = new Node(key, value);\n  }\n  prepend(key, value) {\n    this.list = new Node(key, value, this.list);\n  }\n  getSize() {\n    let counter = 0;\n    let curr = this.list;\n    while (curr) {\n      curr = curr.next;\n      counter++;\n    }\n    return counter;\n  }\n  tail() {\n    let curr = this.list;\n    while (curr.next) {\n      curr = curr.next;\n    }\n    return curr;\n  }\n  head() {\n    return this.list;\n  }\n  atIndex(index) {\n    let curr = this.list;\n    for (let i = 0; i < index; i++) {\n      if (!curr.next) return null;\n      curr = curr.next;\n    }\n    return curr;\n  }\n  pop() {\n    let curr = this.list;\n    while (curr.next.next) {\n      curr = curr.next;\n    }\n    curr.next = null;\n  }\n  contains(v) {\n    let curr = this.list;\n    while (curr) {\n      if (curr.value == v) {\n        return true;\n      }\n      curr = curr.next;\n    }\n    return false;\n  }\n  find(v) {\n    let curr = this.list;\n    let counter = 0;\n    while (curr) {\n      if (curr.value == v) {\n        return counter;\n      }\n      curr = curr.next;\n      counter++;\n    }\n    return null;\n  }\n  toString() {\n    let curr = this.list;\n    let string = '';\n    while (curr) {\n      string += `( ${curr.value} ) => `;\n      curr = curr.next;\n    }\n    return (string += 'null');\n  }\n}\nmodule.exports = LinkedList;\n\n\n//# sourceURL=webpack://hashmap/./node_modules/linked-list-tsagga/index.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

eval("let LinkedList = __webpack_require__(/*! linked-list-tsagga */ \"./node_modules/linked-list-tsagga/index.js\");\nclass HashMap {\n  loadFactor = 0.8;\n  size = 0;\n  hashMap = Array.from({ length: 16 }, () => new LinkedList());\n\n  hash(key) {\n    let hashCode = 0;\n\n    const primeNumber = 31;\n    for (let i = 0; i < key.length; i++) {\n      hashCode =\n        (primeNumber * hashCode + key.charCodeAt(i)) % this.hashMap.length;\n    }\n\n    return hashCode;\n  }\n\n  set(key, value) {\n    if (this.hasHighLoadFactor()) this.rebuild();\n    const i = this.hash(key);\n    // if the key already exists overwrite, else append to Linked List\n    let curr = this.hashMap[i].list;\n    while (curr) {\n      if (curr.key == key) {\n        curr.value = value;\n        return;\n      }\n      curr = curr.next;\n    }\n    this.hashMap[i].prepend(key, value);\n    this.size += 1;\n  }\n  hasHighLoadFactor() {\n    if (this.size / this.hashMap.length > this.loadFactor) return true;\n    return false;\n  }\n  rebuild() {\n    let entries = this.entries();\n    this.clear();\n    this.hashMap = Array.from({ length: 32 }, () => new LinkedList());\n    entries.forEach((entry) => {\n      this.set(entry[0], entry[1]);\n    });\n  }\n  get(key) {\n    const i = this.hash(key);\n    let curr = this.hashMap[i].list;\n    while (curr) {\n      if (curr.key === key) {\n        return curr.value;\n      }\n      curr = curr.next;\n    }\n    return null;\n  }\n  has(key) {\n    const i = this.hash(key);\n    let curr = this.hashMap[i].list;\n    while (curr) {\n      if (curr.key === key) {\n        return true;\n      }\n      curr = curr.next;\n    }\n    return false;\n  }\n  remove(key) {\n    const i = this.hash(key);\n\n    let curr = this.hashMap[i].list;\n    if (curr.key === key) {\n      this.hashMap[i].list = curr.next;\n      this.size -= 1;\n      return true;\n    }\n    while (curr.next) {\n      if (curr.next.key == key) {\n        curr.next = curr.next.next || null;\n        this.size -= 1;\n        return true;\n      }\n      curr = curr.next;\n    }\n    return false;\n  }\n\n  clear() {\n    this.hashMap = Array.from({ length: 16 }, () => new LinkedList());\n    this.size = 0;\n  }\n  keys() {\n    const result = [];\n    for (let i = 0; i < this.hashMap.length; i++) {\n      let curr = this.hashMap[i].list;\n      while (curr) {\n        result.push(curr.key);\n        curr = curr.next;\n      }\n    }\n    return result;\n  }\n  values() {\n    const result = [];\n    for (let i = 0; i < this.hashMap.length; i++) {\n      let curr = this.hashMap[i].list;\n      while (curr) {\n        result.push(curr.value);\n        curr = curr.next;\n      }\n    }\n    return result;\n  }\n  entries() {\n    const result = [];\n    for (let i = 0; i < this.hashMap.length; i++) {\n      let curr = this.hashMap[i].list;\n      while (curr) {\n        result.push([curr.key, curr.value]);\n        curr = curr.next;\n      }\n    }\n    return result;\n  }\n}\n\nlet test = new HashMap();\n\ntest.set('key1', 'value1');\ntest.set('Tsagga', 'tsagga-val');\ntest.set('Tsagga', 'new-tsagga-val');\ntest.set('dog', 'brown');\ntest.set('key2', 'value1');\ntest.set('Tsagga2', 'tsagga-val');\n\nconsole.log(test.get('Tsagga'));\nconsole.log(test.hashMap);\n\n\n//# sourceURL=webpack://hashmap/./src/index.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.js");
/******/ 	
/******/ })()
;