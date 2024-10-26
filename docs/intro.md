---
sidebar_position: 1
---

# 关于本站

关于二战的相关数据.

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
```bash
cd my-website
npm run build
```
