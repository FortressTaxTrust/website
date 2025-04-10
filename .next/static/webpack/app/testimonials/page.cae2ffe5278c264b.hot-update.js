"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
self["webpackHotUpdate_N_E"]("app/testimonials/page",{

/***/ "(app-pages-browser)/./src/app/testimonials/page.tsx":
/*!***************************************!*\
  !*** ./src/app/testimonials/page.tsx ***!
  \***************************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

eval(__webpack_require__.ts("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": function() { return /* binding */ TestimonialsPage; }\n/* harmony export */ });\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"(app-pages-browser)/./node_modules/next/dist/compiled/react/jsx-dev-runtime.js\");\n/* harmony import */ var _components_Header__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @/components/Header */ \"(app-pages-browser)/./src/components/Header.tsx\");\n/* harmony import */ var next_image__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! next/image */ \"(app-pages-browser)/./node_modules/next/dist/api/image.js\");\n/* __next_internal_client_entry_do_not_use__ default auto */ \n\n\n// Testimonial data\nconst testimonials = [\n    {\n        id: 1,\n        name: \"Mike A.\",\n        position: \"Cranston, R.I.\",\n        image: \"/images/Testimonial Mike A..jpg\",\n        content: \"I was referred to Fortress Tax & Trust by a business associate. Their ability to use my pass through and business trusts in order to significantly reduce tax liabilities has been nothing short of amazing. When I have tax questions, they have answers. I have been sleeping much better at night.\",\n        rating: 5\n    },\n    {\n        id: 2,\n        name: \"Shelly W.\",\n        position: \"Seattle, WA\",\n        image: \"/images/Testimonial Shelly W..jpg\",\n        content: \"The Team at Fortress have been so easy to work with. From tax planning to filing my business and trust taxes, they have gone above and beyond my expectations!\",\n        rating: 5\n    },\n    {\n        id: 3,\n        name: \"Mitchell R.\",\n        position: \"Provo, UT\",\n        image: \"/images/Testimonial Mitchell R Provo, UT.jpg\",\n        content: \"After my CPA retired, I was referred to Fortress and the attention to detail and the way the Took the time to learn about me and my business and the results have been extraordinary.\",\n        rating: 5\n    },\n    {\n        id: 4,\n        name: \"Priya G.\",\n        position: \"Chicago, IL\",\n        image: \"/images/Testimonial Priya G..jpg\",\n        content: \"I needed help figuring out how to sell my business, direct the assets, and figure out how To transition to my next venture. The proferssionals at Fortress Tax & Trust stood by me and Saved me so much time and money.\",\n        rating: 5\n    },\n    {\n        id: 5,\n        name: \"Evan W.\",\n        position: \"Seattle, WA\",\n        image: \"/images/Testimonial Evan W..jpg\",\n        content: \"I needed someone to help me file 6 years of business and personal Taxes. Fortress made the process easy and as painless as it can be. They explained eVerything and helped me deal with the IRS.  I feel like A massive weight has been lifted off of me.\",\n        rating: 5\n    }\n];\n// Star rating component\nconst StarRating = (param)=>{\n    let { rating } = param;\n    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n        className: \"flex gap-1\",\n        children: [\n            1,\n            2,\n            3,\n            4,\n            5\n        ].map((star)=>/*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                className: \"w-4 h-4 relative\",\n                children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                    className: \"w-3.5 h-3.5 absolute left-0.5 top-0.5 \".concat(star <= rating ? \"bg-primary\" : \"bg-gray-200\")\n                }, void 0, false, {\n                    fileName: \"/Users/omer/TAX FORTRESS WEBSITE/src/app/testimonials/page.tsx\",\n                    lineNumber: 58,\n                    columnNumber: 11\n                }, undefined)\n            }, star, false, {\n                fileName: \"/Users/omer/TAX FORTRESS WEBSITE/src/app/testimonials/page.tsx\",\n                lineNumber: 57,\n                columnNumber: 9\n            }, undefined))\n    }, void 0, false, {\n        fileName: \"/Users/omer/TAX FORTRESS WEBSITE/src/app/testimonials/page.tsx\",\n        lineNumber: 55,\n        columnNumber: 5\n    }, undefined);\n};\n_c = StarRating;\nfunction TestimonialsPage() {\n    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n        className: \"min-h-screen bg-white\",\n        children: [\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_components_Header__WEBPACK_IMPORTED_MODULE_1__[\"default\"], {}, void 0, false, {\n                fileName: \"/Users/omer/TAX FORTRESS WEBSITE/src/app/testimonials/page.tsx\",\n                lineNumber: 72,\n                columnNumber: 7\n            }, this),\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                className: \"relative h-[300px] md:h-[400px] lg:h-[605px]\",\n                children: [\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(next_image__WEBPACK_IMPORTED_MODULE_2__[\"default\"], {\n                        src: \"/images/testimonials-hero.jpg\",\n                        alt: \"Testimonials Hero\",\n                        fill: true,\n                        style: {\n                            objectFit: \"cover\"\n                        },\n                        priority: true\n                    }, void 0, false, {\n                        fileName: \"/Users/omer/TAX FORTRESS WEBSITE/src/app/testimonials/page.tsx\",\n                        lineNumber: 76,\n                        columnNumber: 9\n                    }, this),\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                        className: \"absolute inset-0 bg-gradient-to-r from-black/20 via-[#5A6863]/30 to-[#5A6863]\"\n                    }, void 0, false, {\n                        fileName: \"/Users/omer/TAX FORTRESS WEBSITE/src/app/testimonials/page.tsx\",\n                        lineNumber: 83,\n                        columnNumber: 9\n                    }, this),\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                        className: \"absolute inset-0 flex flex-col justify-center px-4 md:px-8 lg:px-12\",\n                        children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                            className: \"max-w-7xl mx-auto w-full\",\n                            children: [\n                                /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                                    className: \"text-white text-sm md:text-base mb-2 md:mb-4\",\n                                    children: \"Home / Testimonials\"\n                                }, void 0, false, {\n                                    fileName: \"/Users/omer/TAX FORTRESS WEBSITE/src/app/testimonials/page.tsx\",\n                                    lineNumber: 87,\n                                    columnNumber: 13\n                                }, this),\n                                /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"h1\", {\n                                    className: \"text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 md:mb-6\",\n                                    children: \"What Our Clients Say\"\n                                }, void 0, false, {\n                                    fileName: \"/Users/omer/TAX FORTRESS WEBSITE/src/app/testimonials/page.tsx\",\n                                    lineNumber: 90,\n                                    columnNumber: 13\n                                }, this),\n                                /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"p\", {\n                                    className: \"text-white text-sm md:text-base max-w-xl\"\n                                }, void 0, false, {\n                                    fileName: \"/Users/omer/TAX FORTRESS WEBSITE/src/app/testimonials/page.tsx\",\n                                    lineNumber: 93,\n                                    columnNumber: 13\n                                }, this)\n                            ]\n                        }, void 0, true, {\n                            fileName: \"/Users/omer/TAX FORTRESS WEBSITE/src/app/testimonials/page.tsx\",\n                            lineNumber: 86,\n                            columnNumber: 11\n                        }, this)\n                    }, void 0, false, {\n                        fileName: \"/Users/omer/TAX FORTRESS WEBSITE/src/app/testimonials/page.tsx\",\n                        lineNumber: 85,\n                        columnNumber: 9\n                    }, this)\n                ]\n            }, void 0, true, {\n                fileName: \"/Users/omer/TAX FORTRESS WEBSITE/src/app/testimonials/page.tsx\",\n                lineNumber: 75,\n                columnNumber: 7\n            }, this),\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                className: \"py-12 md:py-16 lg:py-20 px-4 md:px-8 lg:px-12\",\n                children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                    className: \"max-w-7xl mx-auto\",\n                    children: [\n                        /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"h2\", {\n                            className: \"text-3xl md:text-4xl font-bold text-gray-900 mb-8 md:mb-12 text-center\",\n                            children: \"Client Testimonials\"\n                        }, void 0, false, {\n                            fileName: \"/Users/omer/TAX FORTRESS WEBSITE/src/app/testimonials/page.tsx\",\n                            lineNumber: 103,\n                            columnNumber: 11\n                        }, this),\n                        /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                            className: \"grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8\",\n                            children: testimonials.map((testimonial)=>/*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                                    className: \"border border-gray-200 rounded-lg p-6 md:p-8 flex flex-col\",\n                                    children: [\n                                        /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                                            className: \"flex items-start mb-6\",\n                                            children: [\n                                                /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                                                    className: \"relative w-16 h-16 md:w-20 md:h-20 rounded-full border border-primary overflow-hidden mr-4\",\n                                                    children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(next_image__WEBPACK_IMPORTED_MODULE_2__[\"default\"], {\n                                                        src: testimonial.image,\n                                                        alt: testimonial.name,\n                                                        fill: true,\n                                                        style: {\n                                                            objectFit: \"cover\"\n                                                        }\n                                                    }, void 0, false, {\n                                                        fileName: \"/Users/omer/TAX FORTRESS WEBSITE/src/app/testimonials/page.tsx\",\n                                                        lineNumber: 112,\n                                                        columnNumber: 21\n                                                    }, this)\n                                                }, void 0, false, {\n                                                    fileName: \"/Users/omer/TAX FORTRESS WEBSITE/src/app/testimonials/page.tsx\",\n                                                    lineNumber: 111,\n                                                    columnNumber: 19\n                                                }, this),\n                                                /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                                                    children: [\n                                                        /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"h3\", {\n                                                            className: \"text-xl md:text-2xl font-bold text-gray-900 mb-1\",\n                                                            children: testimonial.name\n                                                        }, void 0, false, {\n                                                            fileName: \"/Users/omer/TAX FORTRESS WEBSITE/src/app/testimonials/page.tsx\",\n                                                            lineNumber: 120,\n                                                            columnNumber: 21\n                                                        }, this),\n                                                        /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"p\", {\n                                                            className: \"text-primary text-sm md:text-base font-medium uppercase\",\n                                                            children: testimonial.position\n                                                        }, void 0, false, {\n                                                            fileName: \"/Users/omer/TAX FORTRESS WEBSITE/src/app/testimonials/page.tsx\",\n                                                            lineNumber: 123,\n                                                            columnNumber: 21\n                                                        }, this)\n                                                    ]\n                                                }, void 0, true, {\n                                                    fileName: \"/Users/omer/TAX FORTRESS WEBSITE/src/app/testimonials/page.tsx\",\n                                                    lineNumber: 119,\n                                                    columnNumber: 19\n                                                }, this)\n                                            ]\n                                        }, void 0, true, {\n                                            fileName: \"/Users/omer/TAX FORTRESS WEBSITE/src/app/testimonials/page.tsx\",\n                                            lineNumber: 110,\n                                            columnNumber: 17\n                                        }, this),\n                                        /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                                            className: \"border-t-4 border-gray-200 mb-6\"\n                                        }, void 0, false, {\n                                            fileName: \"/Users/omer/TAX FORTRESS WEBSITE/src/app/testimonials/page.tsx\",\n                                            lineNumber: 129,\n                                            columnNumber: 17\n                                        }, this),\n                                        /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"p\", {\n                                            className: \"text-gray-700 text-sm md:text-base mb-6 flex-grow\",\n                                            children: [\n                                                '\"',\n                                                testimonial.content,\n                                                '\"'\n                                            ]\n                                        }, void 0, true, {\n                                            fileName: \"/Users/omer/TAX FORTRESS WEBSITE/src/app/testimonials/page.tsx\",\n                                            lineNumber: 131,\n                                            columnNumber: 17\n                                        }, this),\n                                        /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(StarRating, {\n                                            rating: testimonial.rating\n                                        }, void 0, false, {\n                                            fileName: \"/Users/omer/TAX FORTRESS WEBSITE/src/app/testimonials/page.tsx\",\n                                            lineNumber: 135,\n                                            columnNumber: 17\n                                        }, this)\n                                    ]\n                                }, testimonial.id, true, {\n                                    fileName: \"/Users/omer/TAX FORTRESS WEBSITE/src/app/testimonials/page.tsx\",\n                                    lineNumber: 106,\n                                    columnNumber: 15\n                                }, this))\n                        }, void 0, false, {\n                            fileName: \"/Users/omer/TAX FORTRESS WEBSITE/src/app/testimonials/page.tsx\",\n                            lineNumber: 104,\n                            columnNumber: 11\n                        }, this)\n                    ]\n                }, void 0, true, {\n                    fileName: \"/Users/omer/TAX FORTRESS WEBSITE/src/app/testimonials/page.tsx\",\n                    lineNumber: 102,\n                    columnNumber: 9\n                }, this)\n            }, void 0, false, {\n                fileName: \"/Users/omer/TAX FORTRESS WEBSITE/src/app/testimonials/page.tsx\",\n                lineNumber: 101,\n                columnNumber: 7\n            }, this)\n        ]\n    }, void 0, true, {\n        fileName: \"/Users/omer/TAX FORTRESS WEBSITE/src/app/testimonials/page.tsx\",\n        lineNumber: 71,\n        columnNumber: 5\n    }, this);\n}\n_c1 = TestimonialsPage;\nvar _c, _c1;\n$RefreshReg$(_c, \"StarRating\");\n$RefreshReg$(_c1, \"TestimonialsPage\");\n\n\n;\n    // Wrapped in an IIFE to avoid polluting the global scope\n    ;\n    (function () {\n        var _a, _b;\n        // Legacy CSS implementations will `eval` browser code in a Node.js context\n        // to extract CSS. For backwards compatibility, we need to check we're in a\n        // browser context before continuing.\n        if (typeof self !== 'undefined' &&\n            // AMP / No-JS mode does not inject these helpers:\n            '$RefreshHelpers$' in self) {\n            // @ts-ignore __webpack_module__ is global\n            var currentExports = module.exports;\n            // @ts-ignore __webpack_module__ is global\n            var prevSignature = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevSignature) !== null && _b !== void 0 ? _b : null;\n            // This cannot happen in MainTemplate because the exports mismatch between\n            // templating and execution.\n            self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.id);\n            // A module can be accepted automatically based on its exports, e.g. when\n            // it is a Refresh Boundary.\n            if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {\n                // Save the previous exports signature on update so we can compare the boundary\n                // signatures. We avoid saving exports themselves since it causes memory leaks (https://github.com/vercel/next.js/pull/53797)\n                module.hot.dispose(function (data) {\n                    data.prevSignature =\n                        self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports);\n                });\n                // Unconditionally accept an update to this module, we'll check if it's\n                // still a Refresh Boundary later.\n                // @ts-ignore importMeta is replaced in the loader\n                module.hot.accept();\n                // This field is set when the previous version of this module was a\n                // Refresh Boundary, letting us know we need to check for invalidation or\n                // enqueue an update.\n                if (prevSignature !== null) {\n                    // A boundary can become ineligible if its exports are incompatible\n                    // with the previous exports.\n                    //\n                    // For example, if you add/remove/change exports, we'll want to\n                    // re-execute the importing modules, and force those components to\n                    // re-render. Similarly, if you convert a class component to a\n                    // function, we want to invalidate the boundary.\n                    if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevSignature, self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports))) {\n                        module.hot.invalidate();\n                    }\n                    else {\n                        self.$RefreshHelpers$.scheduleUpdate();\n                    }\n                }\n            }\n            else {\n                // Since we just executed the code for the module, it's possible that the\n                // new exports made it ineligible for being a boundary.\n                // We only care about the case when we were _previously_ a boundary,\n                // because we already accepted this update (accidental side effect).\n                var isNoLongerABoundary = prevSignature !== null;\n                if (isNoLongerABoundary) {\n                    module.hot.invalidate();\n                }\n            }\n        }\n    })();\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKGFwcC1wYWdlcy1icm93c2VyKS8uL3NyYy9hcHAvdGVzdGltb25pYWxzL3BhZ2UudHN4IiwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBRXlDO0FBRVY7QUFHL0IsbUJBQW1CO0FBQ25CLE1BQU1FLGVBQWU7SUFDbkI7UUFDRUMsSUFBSTtRQUNKQyxNQUFNO1FBQ05DLFVBQVU7UUFDVkMsT0FBTztRQUNQQyxTQUFTO1FBQ1RDLFFBQVE7SUFDVjtJQUNBO1FBQ0VMLElBQUk7UUFDSkMsTUFBTTtRQUNOQyxVQUFVO1FBQ1ZDLE9BQU87UUFDUEMsU0FBUztRQUNUQyxRQUFRO0lBQ1Y7SUFDQTtRQUNFTCxJQUFJO1FBQ0pDLE1BQU07UUFDTkMsVUFBVTtRQUNWQyxPQUFPO1FBQ1BDLFNBQVM7UUFDVEMsUUFBUTtJQUNWO0lBQ0E7UUFDRUwsSUFBSTtRQUNKQyxNQUFNO1FBQ05DLFVBQVU7UUFDVkMsT0FBTztRQUNQQyxTQUFTO1FBQ1RDLFFBQVE7SUFDVjtJQUNBO1FBQ0VMLElBQUk7UUFDSkMsTUFBTTtRQUNOQyxVQUFVO1FBQ1ZDLE9BQU87UUFDUEMsU0FBUztRQUNUQyxRQUFRO0lBQ1Y7Q0FDRDtBQUVELHdCQUF3QjtBQUN4QixNQUFNQyxhQUFhO1FBQUMsRUFBRUQsTUFBTSxFQUFzQjtJQUNoRCxxQkFDRSw4REFBQ0U7UUFBSUMsV0FBVTtrQkFDWjtZQUFDO1lBQUc7WUFBRztZQUFHO1lBQUc7U0FBRSxDQUFDQyxHQUFHLENBQUMsQ0FBQ0MscUJBQ3BCLDhEQUFDSDtnQkFBZUMsV0FBVTswQkFDeEIsNEVBQUNEO29CQUNDQyxXQUFXLHlDQUVWLE9BRENFLFFBQVFMLFNBQVMsZUFBZTs7Ozs7O2VBSDVCSzs7Ozs7Ozs7OztBQVVsQjtLQWRNSjtBQWdCUyxTQUFTSztJQUN0QixxQkFDRSw4REFBQ0o7UUFBSUMsV0FBVTs7MEJBQ2IsOERBQUNYLDBEQUFNQTs7Ozs7MEJBR1AsOERBQUNVO2dCQUFJQyxXQUFVOztrQ0FDYiw4REFBQ1Ysa0RBQUtBO3dCQUNKYyxLQUFJO3dCQUNKQyxLQUFJO3dCQUNKQyxJQUFJO3dCQUNKQyxPQUFPOzRCQUFFQyxXQUFXO3dCQUFRO3dCQUM1QkMsUUFBUTs7Ozs7O2tDQUVWLDhEQUFDVjt3QkFBSUMsV0FBVTs7Ozs7O2tDQUVmLDhEQUFDRDt3QkFBSUMsV0FBVTtrQ0FDYiw0RUFBQ0Q7NEJBQUlDLFdBQVU7OzhDQUNiLDhEQUFDRDtvQ0FBSUMsV0FBVTs4Q0FBK0M7Ozs7Ozs4Q0FHOUQsOERBQUNVO29DQUFHVixXQUFVOzhDQUFxRTs7Ozs7OzhDQUduRiw4REFBQ1c7b0NBQUVYLFdBQVU7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OzBCQVFuQiw4REFBQ0Q7Z0JBQUlDLFdBQVU7MEJBQ2IsNEVBQUNEO29CQUFJQyxXQUFVOztzQ0FDYiw4REFBQ1k7NEJBQUdaLFdBQVU7c0NBQXlFOzs7Ozs7c0NBQ3ZGLDhEQUFDRDs0QkFBSUMsV0FBVTtzQ0FDWlQsYUFBYVUsR0FBRyxDQUFDLENBQUNZLDRCQUNqQiw4REFBQ2Q7b0NBRUNDLFdBQVU7O3NEQUVWLDhEQUFDRDs0Q0FBSUMsV0FBVTs7OERBQ2IsOERBQUNEO29EQUFJQyxXQUFVOzhEQUNiLDRFQUFDVixrREFBS0E7d0RBQ0pjLEtBQUtTLFlBQVlsQixLQUFLO3dEQUN0QlUsS0FBS1EsWUFBWXBCLElBQUk7d0RBQ3JCYSxJQUFJO3dEQUNKQyxPQUFPOzREQUFFQyxXQUFXO3dEQUFROzs7Ozs7Ozs7Ozs4REFHaEMsOERBQUNUOztzRUFDQyw4REFBQ2U7NERBQUdkLFdBQVU7c0VBQ1hhLFlBQVlwQixJQUFJOzs7Ozs7c0VBRW5CLDhEQUFDa0I7NERBQUVYLFdBQVU7c0VBQ1ZhLFlBQVluQixRQUFROzs7Ozs7Ozs7Ozs7Ozs7Ozs7c0RBSzNCLDhEQUFDSzs0Q0FBSUMsV0FBVTs7Ozs7O3NEQUVmLDhEQUFDVzs0Q0FBRVgsV0FBVTs7Z0RBQW9EO2dEQUM3RGEsWUFBWWpCLE9BQU87Z0RBQUM7Ozs7Ozs7c0RBR3hCLDhEQUFDRTs0Q0FBV0QsUUFBUWdCLFlBQVloQixNQUFNOzs7Ozs7O21DQTVCakNnQixZQUFZckIsRUFBRTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBb0NuQztNQTFFd0JXIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vX05fRS8uL3NyYy9hcHAvdGVzdGltb25pYWxzL3BhZ2UudHN4P2ZlYzUiXSwic291cmNlc0NvbnRlbnQiOlsiJ3VzZSBjbGllbnQnO1xuXG5pbXBvcnQgSGVhZGVyIGZyb20gJ0AvY29tcG9uZW50cy9IZWFkZXInO1xuaW1wb3J0IEZvb3RlciBmcm9tICdAL2NvbXBvbmVudHMvRm9vdGVyJztcbmltcG9ydCBJbWFnZSBmcm9tICduZXh0L2ltYWdlJztcbmltcG9ydCBMaW5rIGZyb20gJ25leHQvbGluayc7XG5cbi8vIFRlc3RpbW9uaWFsIGRhdGFcbmNvbnN0IHRlc3RpbW9uaWFscyA9IFtcbiAge1xuICAgIGlkOiAxLFxuICAgIG5hbWU6ICdNaWtlIEEuJyxcbiAgICBwb3NpdGlvbjogJ0NyYW5zdG9uLCBSLkkuJyxcbiAgICBpbWFnZTogJy9pbWFnZXMvVGVzdGltb25pYWwgTWlrZSBBLi5qcGcnLFxuICAgIGNvbnRlbnQ6ICdJIHdhcyByZWZlcnJlZCB0byBGb3J0cmVzcyBUYXggJiBUcnVzdCBieSBhIGJ1c2luZXNzIGFzc29jaWF0ZS4gVGhlaXIgYWJpbGl0eSB0byB1c2UgbXkgcGFzcyB0aHJvdWdoIGFuZCBidXNpbmVzcyB0cnVzdHMgaW4gb3JkZXIgdG8gc2lnbmlmaWNhbnRseSByZWR1Y2UgdGF4IGxpYWJpbGl0aWVzIGhhcyBiZWVuIG5vdGhpbmcgc2hvcnQgb2YgYW1hemluZy4gV2hlbiBJIGhhdmUgdGF4IHF1ZXN0aW9ucywgdGhleSBoYXZlIGFuc3dlcnMuIEkgaGF2ZSBiZWVuIHNsZWVwaW5nIG11Y2ggYmV0dGVyIGF0IG5pZ2h0LicsXG4gICAgcmF0aW5nOiA1XG4gIH0sXG4gIHtcbiAgICBpZDogMixcbiAgICBuYW1lOiAnU2hlbGx5IFcuJyxcbiAgICBwb3NpdGlvbjogJ1NlYXR0bGUsIFdBJyxcbiAgICBpbWFnZTogJy9pbWFnZXMvVGVzdGltb25pYWwgU2hlbGx5IFcuLmpwZycsXG4gICAgY29udGVudDogJ1RoZSBUZWFtIGF0IEZvcnRyZXNzIGhhdmUgYmVlbiBzbyBlYXN5IHRvIHdvcmsgd2l0aC4gRnJvbSB0YXggcGxhbm5pbmcgdG8gZmlsaW5nIG15IGJ1c2luZXNzIGFuZCB0cnVzdCB0YXhlcywgdGhleSBoYXZlIGdvbmUgYWJvdmUgYW5kIGJleW9uZCBteSBleHBlY3RhdGlvbnMhJyxcbiAgICByYXRpbmc6IDVcbiAgfSxcbiAge1xuICAgIGlkOiAzLFxuICAgIG5hbWU6ICdNaXRjaGVsbCBSLicsXG4gICAgcG9zaXRpb246ICdQcm92bywgVVQnLFxuICAgIGltYWdlOiAnL2ltYWdlcy9UZXN0aW1vbmlhbCBNaXRjaGVsbCBSIFByb3ZvLCBVVC5qcGcnLFxuICAgIGNvbnRlbnQ6ICdBZnRlciBteSBDUEEgcmV0aXJlZCwgSSB3YXMgcmVmZXJyZWQgdG8gRm9ydHJlc3MgYW5kIHRoZSBhdHRlbnRpb24gdG8gZGV0YWlsIGFuZCB0aGUgd2F5IHRoZSBUb29rIHRoZSB0aW1lIHRvIGxlYXJuIGFib3V0IG1lIGFuZCBteSBidXNpbmVzcyBhbmQgdGhlIHJlc3VsdHMgaGF2ZSBiZWVuIGV4dHJhb3JkaW5hcnkuJyxcbiAgICByYXRpbmc6IDVcbiAgfSxcbiAge1xuICAgIGlkOiA0LFxuICAgIG5hbWU6ICdQcml5YSBHLicsXG4gICAgcG9zaXRpb246ICdDaGljYWdvLCBJTCcsXG4gICAgaW1hZ2U6ICcvaW1hZ2VzL1Rlc3RpbW9uaWFsIFByaXlhIEcuLmpwZycsXG4gICAgY29udGVudDogJ0kgbmVlZGVkIGhlbHAgZmlndXJpbmcgb3V0IGhvdyB0byBzZWxsIG15IGJ1c2luZXNzLCBkaXJlY3QgdGhlIGFzc2V0cywgYW5kIGZpZ3VyZSBvdXQgaG93IFRvIHRyYW5zaXRpb24gdG8gbXkgbmV4dCB2ZW50dXJlLiBUaGUgcHJvZmVyc3Npb25hbHMgYXQgRm9ydHJlc3MgVGF4ICYgVHJ1c3Qgc3Rvb2QgYnkgbWUgYW5kIFNhdmVkIG1lIHNvIG11Y2ggdGltZSBhbmQgbW9uZXkuJyxcbiAgICByYXRpbmc6IDVcbiAgfSxcbiAge1xuICAgIGlkOiA1LFxuICAgIG5hbWU6ICdFdmFuIFcuJyxcbiAgICBwb3NpdGlvbjogJ1NlYXR0bGUsIFdBJyxcbiAgICBpbWFnZTogJy9pbWFnZXMvVGVzdGltb25pYWwgRXZhbiBXLi5qcGcnLFxuICAgIGNvbnRlbnQ6ICdJIG5lZWRlZCBzb21lb25lIHRvIGhlbHAgbWUgZmlsZSA2IHllYXJzIG9mIGJ1c2luZXNzIGFuZCBwZXJzb25hbCBUYXhlcy4gRm9ydHJlc3MgbWFkZSB0aGUgcHJvY2VzcyBlYXN5IGFuZCBhcyBwYWlubGVzcyBhcyBpdCBjYW4gYmUuIFRoZXkgZXhwbGFpbmVkIGVWZXJ5dGhpbmcgYW5kIGhlbHBlZCBtZSBkZWFsIHdpdGggdGhlIElSUy4gIEkgZmVlbCBsaWtlIEEgbWFzc2l2ZSB3ZWlnaHQgaGFzIGJlZW4gbGlmdGVkIG9mZiBvZiBtZS4nLFxuICAgIHJhdGluZzogNVxuICB9XG5dO1xuXG4vLyBTdGFyIHJhdGluZyBjb21wb25lbnRcbmNvbnN0IFN0YXJSYXRpbmcgPSAoeyByYXRpbmcgfTogeyByYXRpbmc6IG51bWJlciB9KSA9PiB7XG4gIHJldHVybiAoXG4gICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGdhcC0xXCI+XG4gICAgICB7WzEsIDIsIDMsIDQsIDVdLm1hcCgoc3RhcikgPT4gKFxuICAgICAgICA8ZGl2IGtleT17c3Rhcn0gY2xhc3NOYW1lPVwidy00IGgtNCByZWxhdGl2ZVwiPlxuICAgICAgICAgIDxkaXYgXG4gICAgICAgICAgICBjbGFzc05hbWU9e2B3LTMuNSBoLTMuNSBhYnNvbHV0ZSBsZWZ0LTAuNSB0b3AtMC41ICR7XG4gICAgICAgICAgICAgIHN0YXIgPD0gcmF0aW5nID8gJ2JnLXByaW1hcnknIDogJ2JnLWdyYXktMjAwJ1xuICAgICAgICAgICAgfWB9XG4gICAgICAgICAgLz5cbiAgICAgICAgPC9kaXY+XG4gICAgICApKX1cbiAgICA8L2Rpdj5cbiAgKTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIFRlc3RpbW9uaWFsc1BhZ2UoKSB7XG4gIHJldHVybiAoXG4gICAgPGRpdiBjbGFzc05hbWU9XCJtaW4taC1zY3JlZW4gYmctd2hpdGVcIj5cbiAgICAgIDxIZWFkZXIgLz5cbiAgICAgIFxuICAgICAgey8qIEhlcm8gU2VjdGlvbiAqL31cbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwicmVsYXRpdmUgaC1bMzAwcHhdIG1kOmgtWzQwMHB4XSBsZzpoLVs2MDVweF1cIj5cbiAgICAgICAgPEltYWdlXG4gICAgICAgICAgc3JjPVwiL2ltYWdlcy90ZXN0aW1vbmlhbHMtaGVyby5qcGdcIlxuICAgICAgICAgIGFsdD1cIlRlc3RpbW9uaWFscyBIZXJvXCJcbiAgICAgICAgICBmaWxsXG4gICAgICAgICAgc3R5bGU9e3sgb2JqZWN0Rml0OiAnY292ZXInIH19XG4gICAgICAgICAgcHJpb3JpdHlcbiAgICAgICAgLz5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJhYnNvbHV0ZSBpbnNldC0wIGJnLWdyYWRpZW50LXRvLXIgZnJvbS1ibGFjay8yMCB2aWEtWyM1QTY4NjNdLzMwIHRvLVsjNUE2ODYzXVwiIC8+XG4gICAgICAgIFxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImFic29sdXRlIGluc2V0LTAgZmxleCBmbGV4LWNvbCBqdXN0aWZ5LWNlbnRlciBweC00IG1kOnB4LTggbGc6cHgtMTJcIj5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIm1heC13LTd4bCBteC1hdXRvIHctZnVsbFwiPlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ0ZXh0LXdoaXRlIHRleHQtc20gbWQ6dGV4dC1iYXNlIG1iLTIgbWQ6bWItNFwiPlxuICAgICAgICAgICAgICBIb21lIC8gVGVzdGltb25pYWxzXG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDxoMSBjbGFzc05hbWU9XCJ0ZXh0LTN4bCBtZDp0ZXh0LTR4bCBsZzp0ZXh0LTV4bCBmb250LWJvbGQgdGV4dC13aGl0ZSBtYi00IG1kOm1iLTZcIj5cbiAgICAgICAgICAgICAgV2hhdCBPdXIgQ2xpZW50cyBTYXlcbiAgICAgICAgICAgIDwvaDE+XG4gICAgICAgICAgICA8cCBjbGFzc05hbWU9XCJ0ZXh0LXdoaXRlIHRleHQtc20gbWQ6dGV4dC1iYXNlIG1heC13LXhsXCI+XG4gICAgICAgICAgICAgICBcbiAgICAgICAgICAgIDwvcD5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L2Rpdj5cbiAgICAgIFxuICAgICAgey8qIFRlc3RpbW9uaWFscyBHcmlkICovfVxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJweS0xMiBtZDpweS0xNiBsZzpweS0yMCBweC00IG1kOnB4LTggbGc6cHgtMTJcIj5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJtYXgtdy03eGwgbXgtYXV0b1wiPlxuICAgICAgICAgIDxoMiBjbGFzc05hbWU9XCJ0ZXh0LTN4bCBtZDp0ZXh0LTR4bCBmb250LWJvbGQgdGV4dC1ncmF5LTkwMCBtYi04IG1kOm1iLTEyIHRleHQtY2VudGVyXCI+Q2xpZW50IFRlc3RpbW9uaWFsczwvaDI+XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJncmlkIGdyaWQtY29scy0xIHNtOmdyaWQtY29scy0yIGxnOmdyaWQtY29scy0zIGdhcC02IG1kOmdhcC04XCI+XG4gICAgICAgICAgICB7dGVzdGltb25pYWxzLm1hcCgodGVzdGltb25pYWwpID0+IChcbiAgICAgICAgICAgICAgPGRpdiBcbiAgICAgICAgICAgICAgICBrZXk9e3Rlc3RpbW9uaWFsLmlkfSBcbiAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJib3JkZXIgYm9yZGVyLWdyYXktMjAwIHJvdW5kZWQtbGcgcC02IG1kOnAtOCBmbGV4IGZsZXgtY29sXCJcbiAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1zdGFydCBtYi02XCI+XG4gICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInJlbGF0aXZlIHctMTYgaC0xNiBtZDp3LTIwIG1kOmgtMjAgcm91bmRlZC1mdWxsIGJvcmRlciBib3JkZXItcHJpbWFyeSBvdmVyZmxvdy1oaWRkZW4gbXItNFwiPlxuICAgICAgICAgICAgICAgICAgICA8SW1hZ2VcbiAgICAgICAgICAgICAgICAgICAgICBzcmM9e3Rlc3RpbW9uaWFsLmltYWdlfVxuICAgICAgICAgICAgICAgICAgICAgIGFsdD17dGVzdGltb25pYWwubmFtZX1cbiAgICAgICAgICAgICAgICAgICAgICBmaWxsXG4gICAgICAgICAgICAgICAgICAgICAgc3R5bGU9e3sgb2JqZWN0Rml0OiAnY292ZXInIH19XG4gICAgICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgIDxkaXY+XG4gICAgICAgICAgICAgICAgICAgIDxoMyBjbGFzc05hbWU9XCJ0ZXh0LXhsIG1kOnRleHQtMnhsIGZvbnQtYm9sZCB0ZXh0LWdyYXktOTAwIG1iLTFcIj5cbiAgICAgICAgICAgICAgICAgICAgICB7dGVzdGltb25pYWwubmFtZX1cbiAgICAgICAgICAgICAgICAgICAgPC9oMz5cbiAgICAgICAgICAgICAgICAgICAgPHAgY2xhc3NOYW1lPVwidGV4dC1wcmltYXJ5IHRleHQtc20gbWQ6dGV4dC1iYXNlIGZvbnQtbWVkaXVtIHVwcGVyY2FzZVwiPlxuICAgICAgICAgICAgICAgICAgICAgIHt0ZXN0aW1vbmlhbC5wb3NpdGlvbn1cbiAgICAgICAgICAgICAgICAgICAgPC9wPlxuICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJib3JkZXItdC00IGJvcmRlci1ncmF5LTIwMCBtYi02XCI+PC9kaXY+XG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgPHAgY2xhc3NOYW1lPVwidGV4dC1ncmF5LTcwMCB0ZXh0LXNtIG1kOnRleHQtYmFzZSBtYi02IGZsZXgtZ3Jvd1wiPlxuICAgICAgICAgICAgICAgICAgXCJ7dGVzdGltb25pYWwuY29udGVudH1cIlxuICAgICAgICAgICAgICAgIDwvcD5cbiAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICA8U3RhclJhdGluZyByYXRpbmc9e3Rlc3RpbW9uaWFsLnJhdGluZ30gLz5cbiAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICApKX1cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L2Rpdj5cbiAgICA8L2Rpdj5cbiAgKTtcbn0gIl0sIm5hbWVzIjpbIkhlYWRlciIsIkltYWdlIiwidGVzdGltb25pYWxzIiwiaWQiLCJuYW1lIiwicG9zaXRpb24iLCJpbWFnZSIsImNvbnRlbnQiLCJyYXRpbmciLCJTdGFyUmF0aW5nIiwiZGl2IiwiY2xhc3NOYW1lIiwibWFwIiwic3RhciIsIlRlc3RpbW9uaWFsc1BhZ2UiLCJzcmMiLCJhbHQiLCJmaWxsIiwic3R5bGUiLCJvYmplY3RGaXQiLCJwcmlvcml0eSIsImgxIiwicCIsImgyIiwidGVzdGltb25pYWwiLCJoMyJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(app-pages-browser)/./src/app/testimonials/page.tsx\n"));

/***/ })

});