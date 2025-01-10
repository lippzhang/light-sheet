(window.webpackJsonp=window.webpackJsonp||[]).push([[29],{353:function(t,e,a){"use strict";a.r(e);var s=a(17),r=Object(s.a)({},(function(){var t=this,e=t._self._c;return e("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[e("h1",{attrs:{id:"operation"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#operation"}},[t._v("#")]),t._v(" Operation")]),t._v(" "),e("p",[t._v("Each time a user operates on the sheet, an array of "),e("code",[t._v("Op")]),t._v(" will be emiited through "),e("code",[t._v("onOp")]),t._v(" callback. An op describes how to modify the current data to reach the new data after the user's operation. For example, here is an op when user sets the cell font to be bold on cell A2.")]),t._v(" "),e("div",{staticClass:"language-json extra-class"},[e("pre",{pre:!0,attrs:{class:"language-json"}},[e("code",[e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),t._v("\n    "),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n        "),e("span",{pre:!0,attrs:{class:"token property"}},[t._v('"op"')]),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token string"}},[t._v('"replace"')]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n        "),e("span",{pre:!0,attrs:{class:"token property"}},[t._v('"id"')]),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token string"}},[t._v('"0"')]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n        "),e("span",{pre:!0,attrs:{class:"token property"}},[t._v('"path"')]),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),e("span",{pre:!0,attrs:{class:"token string"}},[t._v('"data"')]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token number"}},[t._v("1")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token number"}},[t._v("0")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token string"}},[t._v('"bl"')]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n        "),e("span",{pre:!0,attrs:{class:"token property"}},[t._v('"value"')]),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token number"}},[t._v("1")]),t._v("\n    "),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),t._v("\n")])])]),e("p",[t._v("The op is useful for database modification and syncing state in online collabration.")]),t._v(" "),e("p",[t._v("A working example with "),e("code",[t._v("Express")]),t._v(" (backend server) and "),e("code",[t._v("MongoDB")]),t._v(" (data persistence) is avaiable in "),e("code",[t._v("backend-demo")]),t._v(" folder.")]),t._v(" "),e("p",[t._v("Run it with "),e("code",[t._v("node index.js")]),t._v(" and visit "),e("a",{attrs:{href:"https://ruilisi.github.io/fortune-sheet-demo/?path=/story/collabration--example",target:"_blank",rel:"noopener noreferrer"}},[t._v("Collabration example"),e("OutboundLink")],1)]),t._v(" "),e("blockquote",[e("p",[t._v("You can initialize data by visiting http://localhost:8081/init")])]),t._v(" "),e("h2",{attrs:{id:"format"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#format"}},[t._v("#")]),t._v(" Format")]),t._v(" "),e("p",[t._v("Each "),e("code",[t._v("Op")]),t._v(" has the following structure.")]),t._v(" "),e("div",{staticClass:"language-ts extra-class"},[e("pre",{pre:!0,attrs:{class:"language-ts"}},[e("code",[e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n    "),e("span",{pre:!0,attrs:{class:"token string-property property"}},[t._v('"op"')]),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token builtin"}},[t._v("string")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n    "),e("span",{pre:!0,attrs:{class:"token string-property property"}},[t._v('"id"')]),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token builtin"}},[t._v("string")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n    "),e("span",{pre:!0,attrs:{class:"token string-property property"}},[t._v('"path"')]),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token builtin"}},[t._v("any")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n    "),e("span",{pre:!0,attrs:{class:"token string-property property"}},[t._v('"value"')]),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token builtin"}},[t._v("any")]),t._v("\n"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n")])])]),e("p",[t._v("where")]),t._v(" "),e("table",[e("thead",[e("tr",[e("th",[t._v("Field")]),t._v(" "),e("th",[t._v("Description")])])]),t._v(" "),e("tbody",[e("tr",[e("td",[t._v("op")]),t._v(" "),e("td",[t._v("Operation name, should be one of "),e("code",[t._v("add")]),t._v(", "),e("code",[t._v("remove")]),t._v(", "),e("code",[t._v("replce")]),t._v(", "),e("code",[t._v("insertRowCol")]),t._v(", "),e("code",[t._v("deleteRowCol")]),t._v(", "),e("code",[t._v("addSheet")]),t._v(", "),e("code",[t._v("deleteSheet")])])]),t._v(" "),e("tr",[e("td",[t._v("id")]),t._v(" "),e("td",[t._v("Sheet id of the operation")])]),t._v(" "),e("tr",[e("td",[t._v("path")]),t._v(" "),e("td",[t._v("Path of the value to be updated")])]),t._v(" "),e("tr",[e("td",[t._v("value")]),t._v(" "),e("td",[t._v("Value to be updated")])])])]),t._v(" "),e("h2",{attrs:{id:"operation-name"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#operation-name"}},[t._v("#")]),t._v(" Operation name")]),t._v(" "),e("table",[e("thead",[e("tr",[e("th",[t._v("Name")]),t._v(" "),e("th",[t._v("Description")])])]),t._v(" "),e("tbody",[e("tr",[e("td",[t._v("add")]),t._v(" "),e("td",[t._v("Add the value to path")])]),t._v(" "),e("tr",[e("td",[t._v("replace")]),t._v(" "),e("td",[t._v("Replace the value at path")])]),t._v(" "),e("tr",[e("td",[t._v("remove")]),t._v(" "),e("td",[t._v("Remove the value at path")])]),t._v(" "),e("tr",[e("td",[t._v("insertRowCol")]),t._v(" "),e("td",[t._v("Special op, see "),e("a",{attrs:{href:"#insertrowcol"}},[t._v("insertRowCol")])])]),t._v(" "),e("tr",[e("td",[t._v("deleteRowCol")]),t._v(" "),e("td",[t._v("Special op, see "),e("a",{attrs:{href:"#deleterowcol"}},[t._v("deleteRowCol")])])]),t._v(" "),e("tr",[e("td",[t._v("addSheet")]),t._v(" "),e("td",[t._v("Special op, see "),e("a",{attrs:{href:"#addsheet"}},[t._v("addSheet")])])]),t._v(" "),e("tr",[e("td",[t._v("deleteSheet")]),t._v(" "),e("td",[t._v("Special op, see "),e("a",{attrs:{href:"#deletesheet"}},[t._v("deleteSheet")])])])])]),t._v(" "),e("h2",{attrs:{id:"special-ops"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#special-ops"}},[t._v("#")]),t._v(" Special ops")]),t._v(" "),e("p",[t._v("Special ops are ops that are hard to be described by "),e("code",[t._v("add")]),t._v(", "),e("code",[t._v("replace")]),t._v(" or "),e("code",[t._v("remove")]),t._v(", because the op data size will be too large.")]),t._v(" "),e("h3",{attrs:{id:"insertrowcol"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#insertrowcol"}},[t._v("#")]),t._v(" insertRowCol")]),t._v(" "),e("p",[t._v("Indicates that user performed row or column insertion.")]),t._v(" "),e("p",[e("code",[t._v("value")]),t._v(" will be in the format:")]),t._v(" "),e("div",{staticClass:"language-ts extra-class"},[e("pre",{pre:!0,attrs:{class:"language-ts"}},[e("code",[e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n  type"),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token string"}},[t._v('"row"')]),t._v(" "),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v("|")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token string"}},[t._v('"column"')]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n  index"),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token builtin"}},[t._v("number")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n  count"),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token builtin"}},[t._v("number")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n  direction"),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token string"}},[t._v('"lefttop"')]),t._v(" "),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v("|")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token string"}},[t._v('"rightbottom"')]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n  id"),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token builtin"}},[t._v("string")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n")])])]),e("p",[t._v("where")]),t._v(" "),e("table",[e("thead",[e("tr",[e("th",[t._v("Field")]),t._v(" "),e("th",[t._v("Description")])])]),t._v(" "),e("tbody",[e("tr",[e("td",[t._v("type")]),t._v(" "),e("td",[e("code",[t._v("row")]),t._v(" or "),e("code",[t._v("column")])])]),t._v(" "),e("tr",[e("td",[t._v("index")]),t._v(" "),e("td",[t._v("Start index of row or column to be inserted")])]),t._v(" "),e("tr",[e("td",[t._v("count")]),t._v(" "),e("td",[t._v("Amount of the rows or columns to insert")])]),t._v(" "),e("tr",[e("td",[t._v("direction")]),t._v(" "),e("td",[t._v("Insert direction, "),e("code",[t._v("lefttop")]),t._v(" or "),e("code",[t._v("rightbottom")])])]),t._v(" "),e("tr",[e("td",[t._v("id")]),t._v(" "),e("td",[t._v("id of the operated sheet")])])])]),t._v(" "),e("h3",{attrs:{id:"deleterowcol"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#deleterowcol"}},[t._v("#")]),t._v(" deleteRowCol")]),t._v(" "),e("p",[t._v("Indicates that user performed row or column deletion.")]),t._v(" "),e("p",[e("code",[t._v("value")]),t._v(" will be in the format:")]),t._v(" "),e("div",{staticClass:"language-ts extra-class"},[e("pre",{pre:!0,attrs:{class:"language-ts"}},[e("code",[e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n  type"),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token string"}},[t._v('"row"')]),t._v(" "),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v("|")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token string"}},[t._v('"column"')]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n  start"),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token builtin"}},[t._v("number")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n  end"),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token builtin"}},[t._v("number")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n  id"),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token builtin"}},[t._v("string")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n")])])]),e("p",[t._v("where")]),t._v(" "),e("table",[e("thead",[e("tr",[e("th",[t._v("Field")]),t._v(" "),e("th",[t._v("Description")])])]),t._v(" "),e("tbody",[e("tr",[e("td",[t._v("type")]),t._v(" "),e("td",[e("code",[t._v("row")]),t._v(" or "),e("code",[t._v("column")])])]),t._v(" "),e("tr",[e("td",[t._v("start")]),t._v(" "),e("td",[t._v("Start index of row or column to be deleted")])]),t._v(" "),e("tr",[e("td",[t._v("end")]),t._v(" "),e("td",[t._v("End index of row or column to be deleted")])]),t._v(" "),e("tr",[e("td",[t._v("id")]),t._v(" "),e("td",[t._v("id of the operated sheet")])])])]),t._v(" "),e("h3",{attrs:{id:"addsheet"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#addsheet"}},[t._v("#")]),t._v(" addSheet")]),t._v(" "),e("p",[t._v("Indicates that user created a new sheet.")]),t._v(" "),e("p",[e("code",[t._v("value")]),t._v(" will be the new sheet data.")]),t._v(" "),e("h3",{attrs:{id:"deletesheet"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#deletesheet"}},[t._v("#")]),t._v(" deleteSheet")]),t._v(" "),e("p",[t._v("Indicates that user deleted a sheet.")]),t._v(" "),e("p",[e("code",[t._v("value")]),t._v(" will be in the format")]),t._v(" "),e("div",{staticClass:"language-ts extra-class"},[e("pre",{pre:!0,attrs:{class:"language-ts"}},[e("code",[e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n  id"),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token builtin"}},[t._v("string")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n")])])]),e("p",[t._v("where")]),t._v(" "),e("table",[e("thead",[e("tr",[e("th",[t._v("Field")]),t._v(" "),e("th",[t._v("Description")])])]),t._v(" "),e("tbody",[e("tr",[e("td",[t._v("id")]),t._v(" "),e("td",[t._v("id of the sheet to be deleted")])])])])])}),[],!1,null,null,null);e.default=r.exports}}]);