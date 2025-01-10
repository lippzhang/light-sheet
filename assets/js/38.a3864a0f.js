(window.webpackJsonp=window.webpackJsonp||[]).push([[38],{362:function(t,s,a){"use strict";a.r(s);var e=a(17),r=Object(e.a)({},(function(){var t=this,s=t._self._c;return s("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[s("h1",{attrs:{id:"操作"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#操作"}},[t._v("#")]),t._v(" 操作")]),t._v(" "),s("p",[t._v("每当用户在表格上做操作，一个"),s("code",[t._v("Op")]),t._v("列表会通过"),s("code",[t._v("onOp")]),t._v("回调发出。op描述了如何从当前数据修改为用户操作后的新数据的步骤。例如，当用户在A2单元格上设置了加粗，生成的op如下：")]),t._v(" "),s("div",{staticClass:"language-json extra-class"},[s("pre",{pre:!0,attrs:{class:"language-json"}},[s("code",[s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),t._v("\n    "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n        "),s("span",{pre:!0,attrs:{class:"token property"}},[t._v('"op"')]),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token string"}},[t._v('"replace"')]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n        "),s("span",{pre:!0,attrs:{class:"token property"}},[t._v('"id"')]),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token string"}},[t._v('"0"')]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n        "),s("span",{pre:!0,attrs:{class:"token property"}},[t._v('"path"')]),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),s("span",{pre:!0,attrs:{class:"token string"}},[t._v('"data"')]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token number"}},[t._v("1")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token number"}},[t._v("0")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token string"}},[t._v('"bl"')]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n        "),s("span",{pre:!0,attrs:{class:"token property"}},[t._v('"value"')]),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token number"}},[t._v("1")]),t._v("\n    "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),t._v("\n")])])]),s("p",[t._v("op对后端数据修改和同步在线协同数据非常有用。")]),t._v(" "),s("p",[t._v("我们在 "),s("code",[t._v("backend-demo")]),t._v(" 目录中展示了一个例子，使用 "),s("code",[t._v("Express")]),t._v(" (后端) and "),s("code",[t._v("MongoDB")]),t._v(" (数据库) 实现。")]),t._v(" "),s("p",[t._v("通过 "),s("code",[t._v("node index.js")]),t._v(" 运行后端服务器，然后访问 "),s("a",{attrs:{href:"https://ruilisi.github.io/fortune-sheet-demo/?path=/story/collabration--example",target:"_blank",rel:"noopener noreferrer"}},[t._v("Collabration example"),s("OutboundLink")],1),t._v(" 即可体验。")]),t._v(" "),s("blockquote",[s("p",[t._v("可通过 http://localhost:8081/init 初始化数据")])]),t._v(" "),s("h2",{attrs:{id:"格式"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#格式"}},[t._v("#")]),t._v(" 格式")]),t._v(" "),s("p",[t._v("每个 "),s("code",[t._v("Op")]),t._v(" 的格式如下")]),t._v(" "),s("div",{staticClass:"language-ts extra-class"},[s("pre",{pre:!0,attrs:{class:"language-ts"}},[s("code",[s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n    "),s("span",{pre:!0,attrs:{class:"token string-property property"}},[t._v('"op"')]),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token builtin"}},[t._v("string")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n    "),s("span",{pre:!0,attrs:{class:"token string-property property"}},[t._v('"id"')]),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token builtin"}},[t._v("string")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n    "),s("span",{pre:!0,attrs:{class:"token string-property property"}},[t._v('"path"')]),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token builtin"}},[t._v("any")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n    "),s("span",{pre:!0,attrs:{class:"token string-property property"}},[t._v('"value"')]),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token builtin"}},[t._v("any")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n")])])]),s("p",[t._v("其中")]),t._v(" "),s("table",[s("thead",[s("tr",[s("th",[t._v("键")]),t._v(" "),s("th",[t._v("描述")])])]),t._v(" "),s("tbody",[s("tr",[s("td",[t._v("op")]),t._v(" "),s("td",[t._v("操作名, 应为 "),s("code",[t._v("add")]),t._v(", "),s("code",[t._v("remove")]),t._v(", "),s("code",[t._v("replce")]),t._v(", "),s("code",[t._v("insertRowCol")]),t._v(", "),s("code",[t._v("deleteRowCol")]),t._v(", "),s("code",[t._v("addSheet")]),t._v(", "),s("code",[t._v("deleteSheet")]),t._v(" 其中之一")])]),t._v(" "),s("tr",[s("td",[t._v("id")]),t._v(" "),s("td",[t._v("当前Sheet的id")])]),t._v(" "),s("tr",[s("td",[t._v("path")]),t._v(" "),s("td",[t._v("要更新数据的路径")])]),t._v(" "),s("tr",[s("td",[t._v("value")]),t._v(" "),s("td",[t._v("更新的数据")])])])]),t._v(" "),s("h2",{attrs:{id:"操作名"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#操作名"}},[t._v("#")]),t._v(" 操作名")]),t._v(" "),s("table",[s("thead",[s("tr",[s("th",[t._v("名称")]),t._v(" "),s("th",[t._v("描述")])])]),t._v(" "),s("tbody",[s("tr",[s("td",[t._v("add")]),t._v(" "),s("td",[t._v("在path添加值")])]),t._v(" "),s("tr",[s("td",[t._v("replace")]),t._v(" "),s("td",[t._v("在path替换值")])]),t._v(" "),s("tr",[s("td",[t._v("remove")]),t._v(" "),s("td",[t._v("在path删除值")])]),t._v(" "),s("tr",[s("td",[t._v("insertRowCol")]),t._v(" "),s("td",[t._v("特殊op, 查看 "),s("a",{attrs:{href:"#insertrowcol"}},[t._v("insertRowCol")])])]),t._v(" "),s("tr",[s("td",[t._v("deleteRowCol")]),t._v(" "),s("td",[t._v("特殊op, 查看 "),s("a",{attrs:{href:"#deleterowcol"}},[t._v("deleteRowCol")])])]),t._v(" "),s("tr",[s("td",[t._v("addSheet")]),t._v(" "),s("td",[t._v("特殊op, 查看 "),s("a",{attrs:{href:"#addsheet"}},[t._v("addSheet")])])]),t._v(" "),s("tr",[s("td",[t._v("deleteSheet")]),t._v(" "),s("td",[t._v("特殊op, 查看 "),s("a",{attrs:{href:"#deletesheet"}},[t._v("deleteSheet")])])])])]),t._v(" "),s("h2",{attrs:{id:"特殊op"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#特殊op"}},[t._v("#")]),t._v(" 特殊op")]),t._v(" "),s("p",[t._v("特殊op是一些无法用 "),s("code",[t._v("add")]),t._v(", "),s("code",[t._v("replace")]),t._v(" 或 "),s("code",[t._v("remove")]),t._v(" 表达的操作, 因为用它们表达产生的op过大, 不适合作为op使用.")]),t._v(" "),s("h3",{attrs:{id:"insertrowcol"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#insertrowcol"}},[t._v("#")]),t._v(" insertRowCol")]),t._v(" "),s("p",[t._v("代表用户做了插入行列操作。")]),t._v(" "),s("p",[t._v("此时 "),s("code",[t._v("value")]),t._v(" 的格式为:")]),t._v(" "),s("div",{staticClass:"language-ts extra-class"},[s("pre",{pre:!0,attrs:{class:"language-ts"}},[s("code",[s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n  type"),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token string"}},[t._v('"row"')]),t._v(" "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("|")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token string"}},[t._v('"column"')]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n  index"),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token builtin"}},[t._v("number")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n  count"),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token builtin"}},[t._v("number")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n  direction"),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token string"}},[t._v('"lefttop"')]),t._v(" "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("|")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token string"}},[t._v('"rightbottom"')]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n  id"),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token builtin"}},[t._v("string")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n")])])]),s("p",[t._v("where")]),t._v(" "),s("table",[s("thead",[s("tr",[s("th",[t._v("名称")]),t._v(" "),s("th",[t._v("描述")])])]),t._v(" "),s("tbody",[s("tr",[s("td",[t._v("type")]),t._v(" "),s("td",[s("code",[t._v("row")]),t._v(" 或 "),s("code",[t._v("column")])])]),t._v(" "),s("tr",[s("td",[t._v("index")]),t._v(" "),s("td",[t._v("要插入行列的起始位置")])]),t._v(" "),s("tr",[s("td",[t._v("count")]),t._v(" "),s("td",[t._v("插入的数量")])]),t._v(" "),s("tr",[s("td",[t._v("direction")]),t._v(" "),s("td",[t._v("插入的方向，"),s("code",[t._v("lefttop")]),t._v(" 或 "),s("code",[t._v("rightbottom")])])]),t._v(" "),s("tr",[s("td",[t._v("id")]),t._v(" "),s("td",[t._v("当前操作表格的id")])])])]),t._v(" "),s("h3",{attrs:{id:"deleterowcol"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#deleterowcol"}},[t._v("#")]),t._v(" deleteRowCol")]),t._v(" "),s("p",[t._v("代表用户做了删除行列操作。")]),t._v(" "),s("p",[t._v("此时 "),s("code",[t._v("value")]),t._v(" 的格式为:")]),t._v(" "),s("div",{staticClass:"language-ts extra-class"},[s("pre",{pre:!0,attrs:{class:"language-ts"}},[s("code",[s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n  type"),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token string"}},[t._v('"row"')]),t._v(" "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("|")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token string"}},[t._v('"column"')]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n  start"),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token builtin"}},[t._v("number")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n  end"),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token builtin"}},[t._v("number")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n  id"),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token builtin"}},[t._v("string")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n")])])]),s("p",[t._v("其中")]),t._v(" "),s("table",[s("thead",[s("tr",[s("th",[t._v("名称")]),t._v(" "),s("th",[t._v("描述")])])]),t._v(" "),s("tbody",[s("tr",[s("td",[t._v("type")]),t._v(" "),s("td",[s("code",[t._v("row")]),t._v(" 或 "),s("code",[t._v("column")])])]),t._v(" "),s("tr",[s("td",[t._v("start")]),t._v(" "),s("td",[t._v("删除行列的起始位置")])]),t._v(" "),s("tr",[s("td",[t._v("end")]),t._v(" "),s("td",[t._v("删除行列的终止位置")])]),t._v(" "),s("tr",[s("td",[t._v("id")]),t._v(" "),s("td",[t._v("当前操作表格的id")])])])]),t._v(" "),s("h3",{attrs:{id:"addsheet"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#addsheet"}},[t._v("#")]),t._v(" addSheet")]),t._v(" "),s("p",[t._v("代表用户做了新增表格操作。")]),t._v(" "),s("p",[t._v("此时 "),s("code",[t._v("value")]),t._v(" 是新表格的完整数据。")]),t._v(" "),s("h3",{attrs:{id:"deletesheet"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#deletesheet"}},[t._v("#")]),t._v(" deleteSheet")]),t._v(" "),s("p",[t._v("代表用户做了删除表格操作。")]),t._v(" "),s("p",[t._v("此时 "),s("code",[t._v("value")]),t._v(" 的格式为:")]),t._v(" "),s("div",{staticClass:"language-ts extra-class"},[s("pre",{pre:!0,attrs:{class:"language-ts"}},[s("code",[s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n  id"),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token builtin"}},[t._v("string")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n")])])]),s("p",[t._v("其中")]),t._v(" "),s("table",[s("thead",[s("tr",[s("th",[t._v("名称")]),t._v(" "),s("th",[t._v("描述")])])]),t._v(" "),s("tbody",[s("tr",[s("td",[t._v("id")]),t._v(" "),s("td",[t._v("要删除的表格id")])])])])])}),[],!1,null,null,null);s.default=r.exports}}]);