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

/***/ "./public/js/idb.js":
/*!**************************!*\
  !*** ./public/js/idb.js ***!
  \**************************/
/***/ (() => {

eval("// create variable to hold db connection\nlet db;\n// establish a connection to IndexedDB database called 'budget' and set it to version 1\nconst request = indexedDB.open(\"budget\", 1);\n\n// this event will emit if the database version changes (nonexistant to version 1, v1 to v2, etc.)\nrequest.onupgradeneeded = function (event) {\n  // save a reference to the database\n  const db = event.target.result;\n  // create an object store (table) called `budget` & `expenses`, set it to have an auto incrementing primary key of sorts\n  db.createObjectStore(\"transaction\", { autoIncrement: true });\n};\n// upon a successful\nrequest.onsuccess = function (event) {\n  // when db is successfully created with its object store (from onupgradedneeded event above) or simply established a connection, save reference to db in global variable\n  db = event.target.result;\n\n  // check if app is online, if yes run sendTransaction() function to send all local db data to api\n  if (navigator.onLine) {\n    uploadTransaction();\n  }\n};\n\nrequest.onerror = function (event) {\n  // log error here\n  console.log(event.target.errorCode);\n};\n\n// This function will be executed if we attempt to submit a new budget or expense and there's no internet connection\nfunction saveRecord(record) {\n  // open a new transaction with the database with read and write permissions\n  const transaction = db.transaction([\"transaction\"], \"readwrite\");\n\n  // access the object store for `budget` or `expense`\n  const budgetObjectStore = transaction.objectStore(\"transaction\");\n\n  // add record to your store with add method\n  budgetObjectStore.add(record);\n}\n\nfunction uploadTransaction() {\n  // open a transaction on your db\n  const transaction = db.transaction([\"transaction\"], \"readwrite\");\n\n  // access object store\n  const budgetObjectStore = transaction.objectStore(\"transaction\");\n\n  // get all records from store and set to a variable\n  const getAll = budgetObjectStore.getAll();\n\n  getAll.onsuccess = function () {\n    // if there was data in indexedDb's store, send it to the api server\n    if (getAll.result.length > 0) {\n      fetch(\"/api/transaction\", {\n        method: \"POST\",\n        body: JSON.stringify(getAll.result),\n        headers: {\n          Accept: \"application/json, text/plain, */*\",\n          \"Content-Type\": \"application/json\",\n        },\n      })\n        .then((response) => response.json())\n        .then((serverResponse) => {\n          if (serverResponse.message) {\n            throw new Error(serverResponse);\n          }\n          // open one more transaction\n          const transaction = db.transaction([\"transaction\"], \"readwrite\");\n          // access the transaction object store\n          const budgetObjectStore = transaction.objectStore(\"transaction\");\n          // clear all items in your store\n          budgetObjectStore.clear();\n\n          alert(\"All saved transactions has been submitted!\");\n        })\n        .catch((err) => {\n          console.log(err);\n        });\n    }\n  };\n}\n// listen for app coming back online\nwindow.addEventListener('online', uploadTransaction);\n\n//# sourceURL=webpack://budget-app/./public/js/idb.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./public/js/idb.js"]();
/******/ 	
/******/ })()
;