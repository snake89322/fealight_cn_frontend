# 目的
移动端 React 重构，技术升级，模块化管理。

# 范围
mi_com_i18n_mobile


# 目录结构
```
.
├── __mocks__  # Jest 测试 mock module 模块，包含但不限于用来忽略 Jest 中 css|scss 模块的引用
├── package.json
├── package-lock.json
├── README.md
├── server.js # HMR node 服务
├── shell # 用于开发和生产模式转换 sed 文件中 css|js 路径
│   ├── dev.sh
│   └── prod.sh
├── src # 源代码
│   ├── _components # 标准组件，可以从组件库拓展
│   ├── _examples # 一些编写例子，含 Jest React 测试
│   ├── _modules # 公用模块，包含但不限于 Header，Footer
│   ├── _styles # 共用 scss，专门用于其他 scss @import 使用
│   ├── _utils # 工具库
│   ├── product # 项目文件名称，生产主要输出节点
│   │   ├── _context # React Context 管理，包含但不限于 数据视图，i18n翻译，交互状态
│   │   ├── _modules # 构成该项目的模块文件夹
│   │   ├── index.html # 唯一的 html
│   │   ├── index.js # 唯一的入口文件
│   │   └── index.scss # 公用的 scss 文件，编写 :global{ } 样式
│   └── _utils # 公用方法库
├── webpack # webpack config 文件
│   ├── entry # 入口文件配置
│   ├── module # 模块编译配置
│   ├── optimization # chunk 配置
│   └── plugins # 插件配置
└── webpack.config.babel.js # webpack 主文件
```

# 创建项目文件
* 在 `src` 目录下创建文件夹，带有 `_`  以及 `component[s]?` 的文件表示私有，不会被  webpack 打入 entry 模块
* 比如创建了 `src/product`
* 在创建的项目 `procuct` 下创建 `_modules`，项目均由模块组成，非模块在 _component 中引用即可，或者在 自己项目下创建 `component` 即可
* 创建 `index.html` 及 `index.js`
* 创建各个模块，方式参考 `_examples`
* 开启工作流，享受编码乐趣

# 工作流

* 老产品站工作流(优先启动，会生成 _react 下的项目文件，触发老产品站 gulp 工作流编译模板)

```
# 在 mi_com_i18n_mobile/ 根目录下运行
npx gulp
```

* 开发模式

```
# 运行全部项目开发模式
npm run dev

# 运行指定项目开发模式
npm run dev -- --project=<project-name>
```

* 生产模式

```
# 运行全部项目开发模式

# 由于 vendor 是从各个项目中共同提取，所以发版时候需要进行编译
npm run prod

# 指定项目的 prod 禁止🚫使用，可能改变 vendor.js，发版后其他项目不可用
```

* 开发地址

使用之前产品站地址，路由来自老产品站静态路由模式


# 测试
参考 [jest](http://jestjs.io/) 官网

```
npm run jest
```

# 功能说明

## src/product M 站详情页 React 化项目

此项目为商城 React 化的里程碑，首次重构更新技术栈。

## src/misc 小米产品编号查询项目

跑这个项目可以不用开启老产品站的 gulp
打包后在路径 `mobile.mi.com/mi_com_i18n_mobile/public/react` 下寻找静态资源
然后把 tpl 单独拆出来（纯静态 html），资源文件引用线上 M 站资源地址：1个 css，2个 js
html 发布至 https://micode.be.xiaomi.com/mengchao/china_www_mi_com 项目下
文件名 china_www_mi_com/views/pages/verify.php 以后修订应该仅涉及 hash，已经组件化了

test
