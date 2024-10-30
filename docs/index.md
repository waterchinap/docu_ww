---
sidebar_position: 1
---

# 关于本站

关于二战的每日相关历史数据.

## 顶部导航
不同屏幕大小会显示为顶部导航按键或者折叠主菜单。

### 关键节点
可以做为按年、月、日查看事件的导航器。

点击进入后，可以在面页上选择年、月、日，进入链接后可以查看当天的事件。同时，在页面上显示了一些关键节点信息。

### 日期导航
可以做为特定日期，事件汇总。

点击进入后，可在页面上选择一个日期，然后查看该日期的汇总信息。

### 二战档案
点击后显示本页面。侧边栏显示
- `关于本站`：本页面。
- `二战每一天`：和`关键节点`的功能接近。选择特定一天查看档案，包括1939-01-01至1945-12-31,每天的事件。
- `二战每一日期`：和`日期导航`的功能接近。选择特定日期查看档案，包括1939到1945年该日期的事件。

## 相关技术

- docusaurus
- reactjs

### 相关要求

- [Node.js](https://nodejs.org/en/download/) version 18.0 or above:
  - When installing Node.js, you are recommended to check all checkboxes related to dependencies.
- github:
  - 先建立一个空库。
  - 本地克隆空库。

## 建站过程

- `npx create`建立骨架。然后将全部内容拷贝到本地库中。

```bash
npx create docusaurus@latest docu_ww2 classic
```
- 修改几个文件的相关内容
  - docusaurs.config.js
  - `src/pages/index.js`

- 将所有的文档拷贝到doc目录或子目录下。
  - 在相应子目录中新建一个index.md文件，可用一级目录定义显示在侧边栏的名字。这个文件相当于子目录的首页。
  - 在相应子目录中新建一个`_category_.json`文件，可用于在子目录首页创建一个子文档的列表。
  - 

## 开发和使用

开发:

```bash
cd my-website
npm run start
```

部署：
- build: 这一步不确定是否必须的。因为我通过cloudflare进行部署。
```bash
cd my-website
npm run build
```
- 在cloudflare中设置好
  - 先创建pages
  - 在domain中新建立一个CNAME,以建立一个二级域名。
  - 回到pages中，将pages指向二级域名。

- git push：如果无误，每次同步时，都会自动部署。