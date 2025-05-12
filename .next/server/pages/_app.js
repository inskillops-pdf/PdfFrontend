/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(() => {
var exports = {};
exports.id = "pages/_app";
exports.ids = ["pages/_app"];
exports.modules = {

/***/ "(pages-dir-node)/./src/lib/firebase.js":
/*!*****************************!*\
  !*** ./src/lib/firebase.js ***!
  \*****************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {\n__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   auth: () => (/* binding */ auth),\n/* harmony export */   db: () => (/* binding */ db)\n/* harmony export */ });\n/* harmony import */ var firebase_app__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! firebase/app */ \"firebase/app\");\n/* harmony import */ var firebase_auth__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! firebase/auth */ \"firebase/auth\");\n/* harmony import */ var firebase_firestore__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! firebase/firestore */ \"firebase/firestore\");\nvar __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([firebase_app__WEBPACK_IMPORTED_MODULE_0__, firebase_auth__WEBPACK_IMPORTED_MODULE_1__, firebase_firestore__WEBPACK_IMPORTED_MODULE_2__]);\n([firebase_app__WEBPACK_IMPORTED_MODULE_0__, firebase_auth__WEBPACK_IMPORTED_MODULE_1__, firebase_firestore__WEBPACK_IMPORTED_MODULE_2__] = __webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__);\n\n\n\n// Default configuration for development\nconst firebaseConfig = {\n    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY || \"AIzaSyBdevelopment-key-placeholder123\",\n    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || \"demo-app.firebaseapp.com\",\n    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || \"demo-project-id\",\n    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || \"demo-project.appspot.com\",\n    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || \"123456789\",\n    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID || \"1:123456789:web:abcdef123456\",\n    measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID || \"G-ABCDEF123\"\n};\n// Initialize Firebase\nlet auth = null;\nlet db = null;\nlet app = null;\ntry {\n    app = (0,firebase_app__WEBPACK_IMPORTED_MODULE_0__.initializeApp)(firebaseConfig);\n    auth = (0,firebase_auth__WEBPACK_IMPORTED_MODULE_1__.getAuth)(app);\n    db = (0,firebase_firestore__WEBPACK_IMPORTED_MODULE_2__.getFirestore)(app);\n} catch (error) {\n    console.error(\"Firebase initialization error:\", error.message);\n    // Create mock implementations for development\n    auth = {\n        currentUser: null,\n        onAuthStateChanged: (callback)=>{\n            callback(null);\n            return ()=>{};\n        },\n        signOut: ()=>Promise.resolve()\n    };\n    db = {\n        collection: ()=>({\n                doc: ()=>({\n                        get: ()=>Promise.resolve({\n                                exists: false,\n                                data: ()=>({})\n                            }),\n                        set: ()=>Promise.resolve()\n                    })\n            })\n    };\n}\n\n\n__webpack_async_result__();\n} catch(e) { __webpack_async_result__(e); } });//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHBhZ2VzLWRpci1ub2RlKS8uL3NyYy9saWIvZmlyZWJhc2UuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUFBNkM7QUFDTDtBQUNVO0FBRWxELHdDQUF3QztBQUN4QyxNQUFNRyxpQkFBaUI7SUFDckJDLFFBQVFDLFFBQVFDLEdBQUcsQ0FBQ0MsNEJBQTRCLElBQUk7SUFDcERDLFlBQVlILFFBQVFDLEdBQUcsQ0FBQ0csZ0NBQWdDLElBQUk7SUFDNURDLFdBQVdMLFFBQVFDLEdBQUcsQ0FBQ0ssK0JBQStCLElBQUk7SUFDMURDLGVBQWVQLFFBQVFDLEdBQUcsQ0FBQ08sbUNBQW1DLElBQUk7SUFDbEVDLG1CQUFtQlQsUUFBUUMsR0FBRyxDQUFDUyx3Q0FBd0MsSUFBSTtJQUMzRUMsT0FBT1gsUUFBUUMsR0FBRyxDQUFDVywyQkFBMkIsSUFBSTtJQUNsREMsZUFBZWIsUUFBUUMsR0FBRyxDQUFDYSxtQ0FBbUMsSUFBSTtBQUNwRTtBQUVBLHNCQUFzQjtBQUN0QixJQUFJQyxPQUFPO0FBQ1gsSUFBSUMsS0FBSztBQUNULElBQUlDLE1BQU07QUFFVixJQUFJO0lBQ0ZBLE1BQU10QiwyREFBYUEsQ0FBQ0c7SUFDcEJpQixPQUFPbkIsc0RBQU9BLENBQUNxQjtJQUNmRCxLQUFLbkIsZ0VBQVlBLENBQUNvQjtBQUNwQixFQUFFLE9BQU9DLE9BQU87SUFDZEMsUUFBUUQsS0FBSyxDQUFDLGtDQUFrQ0EsTUFBTUUsT0FBTztJQUM3RCw4Q0FBOEM7SUFDOUNMLE9BQU87UUFDTE0sYUFBYTtRQUNiQyxvQkFBb0IsQ0FBQ0M7WUFDbkJBLFNBQVM7WUFDVCxPQUFPLEtBQU87UUFDaEI7UUFDQUMsU0FBUyxJQUFNQyxRQUFRQyxPQUFPO0lBQ2hDO0lBQ0FWLEtBQUs7UUFDSFcsWUFBWSxJQUFPO2dCQUNqQkMsS0FBSyxJQUFPO3dCQUNWQyxLQUFLLElBQU1KLFFBQVFDLE9BQU8sQ0FBQztnQ0FBRUksUUFBUTtnQ0FBT0MsTUFBTSxJQUFPLEVBQUM7NEJBQUc7d0JBQzdEQyxLQUFLLElBQU1QLFFBQVFDLE9BQU87b0JBQzVCO1lBQ0Y7SUFDRjtBQUNGO0FBRW9CIiwic291cmNlcyI6WyJDOlxcVXNlcnNcXHJlaG91XFxEb2N1bWVudHNcXGRyZWFtdjRcXGFpcHJvZmVzc2lvbmFsc3VuaXZlcnNpdHlcXHNyY1xcbGliXFxmaXJlYmFzZS5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBpbml0aWFsaXplQXBwIH0gZnJvbSAnZmlyZWJhc2UvYXBwJztcclxuaW1wb3J0IHsgZ2V0QXV0aCB9IGZyb20gJ2ZpcmViYXNlL2F1dGgnO1xyXG5pbXBvcnQgeyBnZXRGaXJlc3RvcmUgfSBmcm9tICdmaXJlYmFzZS9maXJlc3RvcmUnO1xyXG5cclxuLy8gRGVmYXVsdCBjb25maWd1cmF0aW9uIGZvciBkZXZlbG9wbWVudFxyXG5jb25zdCBmaXJlYmFzZUNvbmZpZyA9IHtcclxuICBhcGlLZXk6IHByb2Nlc3MuZW52Lk5FWFRfUFVCTElDX0ZJUkVCQVNFX0FQSV9LRVkgfHwgXCJBSXphU3lCZGV2ZWxvcG1lbnQta2V5LXBsYWNlaG9sZGVyMTIzXCIsXHJcbiAgYXV0aERvbWFpbjogcHJvY2Vzcy5lbnYuTkVYVF9QVUJMSUNfRklSRUJBU0VfQVVUSF9ET01BSU4gfHwgXCJkZW1vLWFwcC5maXJlYmFzZWFwcC5jb21cIixcclxuICBwcm9qZWN0SWQ6IHByb2Nlc3MuZW52Lk5FWFRfUFVCTElDX0ZJUkVCQVNFX1BST0pFQ1RfSUQgfHwgXCJkZW1vLXByb2plY3QtaWRcIixcclxuICBzdG9yYWdlQnVja2V0OiBwcm9jZXNzLmVudi5ORVhUX1BVQkxJQ19GSVJFQkFTRV9TVE9SQUdFX0JVQ0tFVCB8fCBcImRlbW8tcHJvamVjdC5hcHBzcG90LmNvbVwiLFxyXG4gIG1lc3NhZ2luZ1NlbmRlcklkOiBwcm9jZXNzLmVudi5ORVhUX1BVQkxJQ19GSVJFQkFTRV9NRVNTQUdJTkdfU0VOREVSX0lEIHx8IFwiMTIzNDU2Nzg5XCIsXHJcbiAgYXBwSWQ6IHByb2Nlc3MuZW52Lk5FWFRfUFVCTElDX0ZJUkVCQVNFX0FQUF9JRCB8fCBcIjE6MTIzNDU2Nzg5OndlYjphYmNkZWYxMjM0NTZcIixcclxuICBtZWFzdXJlbWVudElkOiBwcm9jZXNzLmVudi5ORVhUX1BVQkxJQ19GSVJFQkFTRV9NRUFTVVJFTUVOVF9JRCB8fCBcIkctQUJDREVGMTIzXCJcclxufTtcclxuXHJcbi8vIEluaXRpYWxpemUgRmlyZWJhc2VcclxubGV0IGF1dGggPSBudWxsO1xyXG5sZXQgZGIgPSBudWxsO1xyXG5sZXQgYXBwID0gbnVsbDtcclxuXHJcbnRyeSB7XHJcbiAgYXBwID0gaW5pdGlhbGl6ZUFwcChmaXJlYmFzZUNvbmZpZyk7XHJcbiAgYXV0aCA9IGdldEF1dGgoYXBwKTtcclxuICBkYiA9IGdldEZpcmVzdG9yZShhcHApO1xyXG59IGNhdGNoIChlcnJvcikge1xyXG4gIGNvbnNvbGUuZXJyb3IoXCJGaXJlYmFzZSBpbml0aWFsaXphdGlvbiBlcnJvcjpcIiwgZXJyb3IubWVzc2FnZSk7XHJcbiAgLy8gQ3JlYXRlIG1vY2sgaW1wbGVtZW50YXRpb25zIGZvciBkZXZlbG9wbWVudFxyXG4gIGF1dGggPSB7XHJcbiAgICBjdXJyZW50VXNlcjogbnVsbCxcclxuICAgIG9uQXV0aFN0YXRlQ2hhbmdlZDogKGNhbGxiYWNrKSA9PiB7XHJcbiAgICAgIGNhbGxiYWNrKG51bGwpO1xyXG4gICAgICByZXR1cm4gKCkgPT4ge307XHJcbiAgICB9LFxyXG4gICAgc2lnbk91dDogKCkgPT4gUHJvbWlzZS5yZXNvbHZlKCksXHJcbiAgfTtcclxuICBkYiA9IHtcclxuICAgIGNvbGxlY3Rpb246ICgpID0+ICh7XHJcbiAgICAgIGRvYzogKCkgPT4gKHtcclxuICAgICAgICBnZXQ6ICgpID0+IFByb21pc2UucmVzb2x2ZSh7IGV4aXN0czogZmFsc2UsIGRhdGE6ICgpID0+ICh7fSkgfSksXHJcbiAgICAgICAgc2V0OiAoKSA9PiBQcm9taXNlLnJlc29sdmUoKSxcclxuICAgICAgfSksXHJcbiAgICB9KSxcclxuICB9O1xyXG59XHJcblxyXG5leHBvcnQgeyBhdXRoLCBkYiB9OyAiXSwibmFtZXMiOlsiaW5pdGlhbGl6ZUFwcCIsImdldEF1dGgiLCJnZXRGaXJlc3RvcmUiLCJmaXJlYmFzZUNvbmZpZyIsImFwaUtleSIsInByb2Nlc3MiLCJlbnYiLCJORVhUX1BVQkxJQ19GSVJFQkFTRV9BUElfS0VZIiwiYXV0aERvbWFpbiIsIk5FWFRfUFVCTElDX0ZJUkVCQVNFX0FVVEhfRE9NQUlOIiwicHJvamVjdElkIiwiTkVYVF9QVUJMSUNfRklSRUJBU0VfUFJPSkVDVF9JRCIsInN0b3JhZ2VCdWNrZXQiLCJORVhUX1BVQkxJQ19GSVJFQkFTRV9TVE9SQUdFX0JVQ0tFVCIsIm1lc3NhZ2luZ1NlbmRlcklkIiwiTkVYVF9QVUJMSUNfRklSRUJBU0VfTUVTU0FHSU5HX1NFTkRFUl9JRCIsImFwcElkIiwiTkVYVF9QVUJMSUNfRklSRUJBU0VfQVBQX0lEIiwibWVhc3VyZW1lbnRJZCIsIk5FWFRfUFVCTElDX0ZJUkVCQVNFX01FQVNVUkVNRU5UX0lEIiwiYXV0aCIsImRiIiwiYXBwIiwiZXJyb3IiLCJjb25zb2xlIiwibWVzc2FnZSIsImN1cnJlbnRVc2VyIiwib25BdXRoU3RhdGVDaGFuZ2VkIiwiY2FsbGJhY2siLCJzaWduT3V0IiwiUHJvbWlzZSIsInJlc29sdmUiLCJjb2xsZWN0aW9uIiwiZG9jIiwiZ2V0IiwiZXhpc3RzIiwiZGF0YSIsInNldCJdLCJpZ25vcmVMaXN0IjpbXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(pages-dir-node)/./src/lib/firebase.js\n");

/***/ }),

/***/ "(pages-dir-node)/./src/pages/_app.js":
/*!***************************!*\
  !*** ./src/pages/_app.js ***!
  \***************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {\n__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"react/jsx-dev-runtime\");\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _styles_globals_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../styles/globals.css */ \"(pages-dir-node)/./src/styles/globals.css\");\n/* harmony import */ var _styles_globals_css__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_styles_globals_css__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _styles_code_css__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../styles/code.css */ \"(pages-dir-node)/./src/styles/code.css\");\n/* harmony import */ var _styles_code_css__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_styles_code_css__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _styles_mermaid_css__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../styles/mermaid.css */ \"(pages-dir-node)/./src/styles/mermaid.css\");\n/* harmony import */ var _styles_mermaid_css__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_styles_mermaid_css__WEBPACK_IMPORTED_MODULE_3__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! react */ \"react\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_4__);\n/* harmony import */ var _lib_firebase__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../lib/firebase */ \"(pages-dir-node)/./src/lib/firebase.js\");\n/* harmony import */ var firebase_auth__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! firebase/auth */ \"firebase/auth\");\nvar __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_lib_firebase__WEBPACK_IMPORTED_MODULE_5__, firebase_auth__WEBPACK_IMPORTED_MODULE_6__]);\n([_lib_firebase__WEBPACK_IMPORTED_MODULE_5__, firebase_auth__WEBPACK_IMPORTED_MODULE_6__] = __webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__);\n\n\n\n\n\n\n\nfunction MyApp({ Component, pageProps }) {\n    const [user, setUser] = (0,react__WEBPACK_IMPORTED_MODULE_4__.useState)(null);\n    const [loading, setLoading] = (0,react__WEBPACK_IMPORTED_MODULE_4__.useState)(true);\n    (0,react__WEBPACK_IMPORTED_MODULE_4__.useEffect)({\n        \"MyApp.useEffect\": ()=>{\n            const unsubscribe = (0,firebase_auth__WEBPACK_IMPORTED_MODULE_6__.onAuthStateChanged)(_lib_firebase__WEBPACK_IMPORTED_MODULE_5__.auth, {\n                \"MyApp.useEffect.unsubscribe\": (user)=>{\n                    if (user) {\n                        setUser(user);\n                    } else {\n                        setUser(null);\n                    }\n                    setLoading(false);\n                }\n            }[\"MyApp.useEffect.unsubscribe\"]);\n            return ({\n                \"MyApp.useEffect\": ()=>unsubscribe()\n            })[\"MyApp.useEffect\"];\n        }\n    }[\"MyApp.useEffect\"], []);\n    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(Component, {\n        ...pageProps,\n        user: user,\n        loading: loading\n    }, void 0, false, {\n        fileName: \"C:\\\\Users\\\\rehou\\\\Documents\\\\dreamv4\\\\aiprofessionalsuniversity\\\\src\\\\pages\\\\_app.js\",\n        lineNumber: 26,\n        columnNumber: 5\n    }, this);\n}\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (MyApp);\n\n__webpack_async_result__();\n} catch(e) { __webpack_async_result__(e); } });//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHBhZ2VzLWRpci1ub2RlKS8uL3NyYy9wYWdlcy9fYXBwLmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQStCO0FBQ0g7QUFDRztBQUNhO0FBQ0w7QUFDWTtBQUVuRCxTQUFTSSxNQUFNLEVBQUVDLFNBQVMsRUFBRUMsU0FBUyxFQUFFO0lBQ3JDLE1BQU0sQ0FBQ0MsTUFBTUMsUUFBUSxHQUFHUCwrQ0FBUUEsQ0FBQztJQUNqQyxNQUFNLENBQUNRLFNBQVNDLFdBQVcsR0FBR1QsK0NBQVFBLENBQUM7SUFFdkNELGdEQUFTQTsyQkFBQztZQUNSLE1BQU1XLGNBQWNSLGlFQUFrQkEsQ0FBQ0QsK0NBQUlBOytDQUFFLENBQUNLO29CQUM1QyxJQUFJQSxNQUFNO3dCQUNSQyxRQUFRRDtvQkFDVixPQUFPO3dCQUNMQyxRQUFRO29CQUNWO29CQUNBRSxXQUFXO2dCQUNiOztZQUVBO21DQUFPLElBQU1DOztRQUNmOzBCQUFHLEVBQUU7SUFFTCxxQkFDRSw4REFBQ047UUFBVyxHQUFHQyxTQUFTO1FBQUVDLE1BQU1BO1FBQU1FLFNBQVNBOzs7Ozs7QUFFbkQ7QUFFQSxpRUFBZUwsS0FBS0EsRUFBQyIsInNvdXJjZXMiOlsiQzpcXFVzZXJzXFxyZWhvdVxcRG9jdW1lbnRzXFxkcmVhbXY0XFxhaXByb2Zlc3Npb25hbHN1bml2ZXJzaXR5XFxzcmNcXHBhZ2VzXFxfYXBwLmpzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAnLi4vc3R5bGVzL2dsb2JhbHMuY3NzJztcbmltcG9ydCAnLi4vc3R5bGVzL2NvZGUuY3NzJztcbmltcG9ydCAnLi4vc3R5bGVzL21lcm1haWQuY3NzJztcbmltcG9ydCB7IHVzZUVmZmVjdCwgdXNlU3RhdGUgfSBmcm9tICdyZWFjdCc7XG5pbXBvcnQgeyBhdXRoIH0gZnJvbSAnLi4vbGliL2ZpcmViYXNlJztcbmltcG9ydCB7IG9uQXV0aFN0YXRlQ2hhbmdlZCB9IGZyb20gJ2ZpcmViYXNlL2F1dGgnO1xuXG5mdW5jdGlvbiBNeUFwcCh7IENvbXBvbmVudCwgcGFnZVByb3BzIH0pIHtcbiAgY29uc3QgW3VzZXIsIHNldFVzZXJdID0gdXNlU3RhdGUobnVsbCk7XG4gIGNvbnN0IFtsb2FkaW5nLCBzZXRMb2FkaW5nXSA9IHVzZVN0YXRlKHRydWUpO1xuXG4gIHVzZUVmZmVjdCgoKSA9PiB7XG4gICAgY29uc3QgdW5zdWJzY3JpYmUgPSBvbkF1dGhTdGF0ZUNoYW5nZWQoYXV0aCwgKHVzZXIpID0+IHtcbiAgICAgIGlmICh1c2VyKSB7XG4gICAgICAgIHNldFVzZXIodXNlcik7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBzZXRVc2VyKG51bGwpO1xuICAgICAgfVxuICAgICAgc2V0TG9hZGluZyhmYWxzZSk7XG4gICAgfSk7XG5cbiAgICByZXR1cm4gKCkgPT4gdW5zdWJzY3JpYmUoKTtcbiAgfSwgW10pO1xuXG4gIHJldHVybiAoXG4gICAgPENvbXBvbmVudCB7Li4ucGFnZVByb3BzfSB1c2VyPXt1c2VyfSBsb2FkaW5nPXtsb2FkaW5nfSAvPlxuICApO1xufVxuXG5leHBvcnQgZGVmYXVsdCBNeUFwcDsgIl0sIm5hbWVzIjpbInVzZUVmZmVjdCIsInVzZVN0YXRlIiwiYXV0aCIsIm9uQXV0aFN0YXRlQ2hhbmdlZCIsIk15QXBwIiwiQ29tcG9uZW50IiwicGFnZVByb3BzIiwidXNlciIsInNldFVzZXIiLCJsb2FkaW5nIiwic2V0TG9hZGluZyIsInVuc3Vic2NyaWJlIl0sImlnbm9yZUxpc3QiOltdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(pages-dir-node)/./src/pages/_app.js\n");

/***/ }),

/***/ "(pages-dir-node)/./src/styles/code.css":
/*!*****************************!*\
  !*** ./src/styles/code.css ***!
  \*****************************/
/***/ (() => {



/***/ }),

/***/ "(pages-dir-node)/./src/styles/globals.css":
/*!********************************!*\
  !*** ./src/styles/globals.css ***!
  \********************************/
/***/ (() => {



/***/ }),

/***/ "(pages-dir-node)/./src/styles/mermaid.css":
/*!********************************!*\
  !*** ./src/styles/mermaid.css ***!
  \********************************/
/***/ (() => {



/***/ }),

/***/ "firebase/app":
/*!*******************************!*\
  !*** external "firebase/app" ***!
  \*******************************/
/***/ ((module) => {

"use strict";
module.exports = import("firebase/app");;

/***/ }),

/***/ "firebase/auth":
/*!********************************!*\
  !*** external "firebase/auth" ***!
  \********************************/
/***/ ((module) => {

"use strict";
module.exports = import("firebase/auth");;

/***/ }),

/***/ "firebase/firestore":
/*!*************************************!*\
  !*** external "firebase/firestore" ***!
  \*************************************/
/***/ ((module) => {

"use strict";
module.exports = import("firebase/firestore");;

/***/ }),

/***/ "react":
/*!************************!*\
  !*** external "react" ***!
  \************************/
/***/ ((module) => {

"use strict";
module.exports = require("react");

/***/ }),

/***/ "react/jsx-dev-runtime":
/*!****************************************!*\
  !*** external "react/jsx-dev-runtime" ***!
  \****************************************/
/***/ ((module) => {

"use strict";
module.exports = require("react/jsx-dev-runtime");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = (__webpack_exec__("(pages-dir-node)/./src/pages/_app.js"));
module.exports = __webpack_exports__;

})();