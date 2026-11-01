# 项目交接说明

## 当前状态

- 项目：Hazel Huang 作品集网站。
- 技术栈：React 19、Vite、GSAP。
- 开发入口：`src/main.jsx`，主页面和项目数据在 `src/App.jsx`。
- 主要样式：根目录 `styles.css`。
- 静态媒体：`public/`。
- 详情页包含多个场景占位，并使用滚动驱动的多层视差效果；将真实项目图加入 `public/` 后，可继续替换这些占位图。
- 项目通过 Vite 开发服务器运行，不需要单独的后端服务。

## 重点文件

| 文件 | 用途 |
| --- | --- |
| `src/App.jsx` | 页面组件、项目清单、工作经历和项目信息 |
| `src/PortfolioMotion.jsx` | GSAP 入场动效和滚动动效 |
| `src/GrainientBackground.jsx` | 背景渐变效果 |
| `src/StarCursor.jsx` | 自定义指针效果 |
| `styles.css` | 布局、颜色、响应式规则和详情页视差样式 |
| `public/` | 视频、图片、二维码、简历等网站素材 |
| `package.json` / `pnpm-lock.yaml` | 命令、依赖版本和锁定依赖 |

## 新电脑启动

在项目根目录运行：

```sh
corepack enable
pnpm install --frozen-lockfile
pnpm dev
```

打开 Vite 显示的本地地址。停止服务器时在终端按 `Ctrl+C`。之后改代码，开发预览会自动刷新。

## 编辑建议

1. 更新首页视频或项目素材时，把文件放入 `public/`，并检查 `src/App.jsx` 中的 `/文件名` 引用。
2. 修改项目名称、顺序、时间或介绍时，编辑 `src/App.jsx` 顶部的 `projects` 数组。
3. 修改滚动动画时查看 `src/PortfolioMotion.jsx`；修改视觉细节时查看根目录 `styles.css`。
4. `dist/` 是构建输出，`node_modules/` 和 `.pnpm-store/` 是本机依赖数据，不需要手动搬运。

## 当前交接包

`作品集-跨设备交接.zip` 包含源码、锁文件、网站所需静态素材和本文档，不包含依赖目录及构建缓存。在新电脑解压后按上面的命令安装依赖即可。

当前工作目录尚未配置 Git 仓库或远程同步地址。若需要两台电脑之间持续同步，建议在新电脑创建或关联私有 Git 仓库；不要把 `node_modules/`、`.pnpm-store/` 或 `dist/` 提交进去。
