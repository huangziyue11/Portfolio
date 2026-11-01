# Hazel Huang Portfolio

个人作品集网站，使用 React、Vite 和 GSAP。页面包含首页、项目详情、关于、工作经历和联系信息。项目详情页当前使用滚动驱动的多层视差展示，并预留了多张项目图片位置。

## 在另一台电脑上打开

1. 解压 `作品集-跨设备交接.zip`。
2. 安装 Node.js（建议使用当前 LTS 版本）。
3. 在项目目录打开终端，安装 pnpm（若系统尚未提供）：

   ```sh
   corepack enable
   ```

4. 安装项目依赖并启动本地预览：

   ```sh
   pnpm install --frozen-lockfile
   pnpm dev
   ```

5. 在终端显示的本地地址打开网站，通常是 `http://localhost:5173/`。

如果新电脑没有 Corepack，也可以先安装 pnpm，再运行以上命令。不要把 `node_modules` 或 `.pnpm-store` 从旧电脑复制过去；依赖应在新电脑重新安装。

## 常用命令

```sh
pnpm dev       # 启动开发服务器
pnpm build     # 构建生产文件到 dist/
pnpm preview   # 本地预览生产构建
```

## 项目结构

```text
src/
  App.jsx                  页面、项目数据和路由
  PortfolioMotion.jsx      GSAP 页面动效
  GrainientBackground.jsx  背景效果
  StarCursor.jsx           自定义光标效果
  main.jsx                 React 入口
styles.css                 全站样式、响应式和视差样式
public/                    图片、视频、二维码、简历等静态素材
参考链接.md                 设计参考来源记录
```

项目详情图像占位和场景由 `src/App.jsx` 中的项目数据生成；替换素材时，将文件放入 `public/`，再更新对应项目数据或占位内容。页面样式集中在根目录 `styles.css`。

## 当前项目素材

`public/` 中包含首页视频、Sound & Wave 视频、项目预览图、头像、微信二维码和简历 PDF。更换或补充素材时请保留文件名，或同步更新代码中的引用路径。

## 交接说明

项目交接、当前状态和后续编辑提示见 [PROJECT_HANDOFF.md](PROJECT_HANDOFF.md)。当前目录原先没有 Git 仓库或远程地址；压缩包适合直接复制到另一台电脑继续编辑。若需要跨电脑同步后续改动，可在新电脑上将解压目录纳入 Git 并关联你自己的远程仓库。
