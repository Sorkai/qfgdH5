# 清风工大 · 青年创廉 H5

> “扣好人生第一粒扣子” —— 互动式廉洁教育 H5 网页应用。

本项目是为响应“清风工大·青年创廉”主题创意大赛而开发的互动 H5。用户通过模拟“扣扣子”的动作，体验诚信、自律、担当三个廉洁主题关卡，并最终生成带有个人姓名和唯一编号的专属承诺海报。

## ✨ 核心亮点

*   **沉浸式互动体验**：通过触摸/鼠标拖拽模拟真实的扣扣子动作，配合震动反馈（Haptics）和音效，增强代入感。
*   **动态视觉体验**：
    *   精细的 CSS3 动画与转场。
    *   支持全景图（Panorama）横向扫描与呼吸缩放效果。
    *   拟物化 UI 设计（衬衫纹理、缝线细节）。
*   **高性能海报生成**：
    *   摒弃传统的 DOM 截图方案，采用 **原生 Canvas API** 绘制。
    *   完美解决跨设备（iOS/Android）文字偏移、图片模糊、跨域资源裁切等问题。
    *   支持生成 2 倍高清图片，适合朋友圈分享。
*   **实时计数系统**：后端记录参与人数，每位用户获得独一无二的承诺编号。

## 🛠️ 技术栈

*   **前端**：HTML5, JavaScript (ES6+), Canvas API
*   **样式**：Tailwind CSS (CDN 引入), Animate.css
*   **后端**：PHP (轻量级计数接口)
*   **存储**：文本文件 (无需数据库)

## 📂 目录结构

```text
├── LICENSE.md
├── README.md
├── counter/
│   ├── count.txt       # 存储计数数据（需写权限）
│   └── counter.php     # 计数接口逻辑
└── h5/
    ├── index.html      # H5 主程序
    ├── fonts/          # 字体文件
    ├── img/            # 图片资源
    └── js/             # 脚本文件
```

## 🚀 快速部署

### 1. 环境要求
*   任意支持 PHP 的 Web 服务器 (Apache, Nginx, IIS 等)。
*   若仅需前端展示（无真实计数），可直接打开 HTML 文件（将自动降级为模拟数据模式）。

### 2. 部署步骤
1.  将项目文件上传至服务器。
2.  确保 `counter/` 目录及 `counter/count.txt` 文件具有**写入权限** (Linux/Unix 下通常为 777 或 755，视用户组而定)。
    ```bash
    chmod 777 counter/count.txt
    ```
3.  修改 `h5/index.html` 中的接口地址（可选）：
    *   搜索 `fetch` 请求，将 URL 修改为你部署的 `counter.php` 路径。
    *   *默认代码中可能配置了远程演示接口，建议改为相对路径 `./../counter/counter.php` 或你的实际域名路径。*

## ⚙️ 配置指南

### 修改关卡内容
在 `h5/index.html` 的 `<script>` 区域找到 `stages` 数组：
```javascript
const stages = [
    {
        title: "第一粒扣子：诚信",
        desc: "...",
        bg: "图片URL", 
        isPanorama: false // true 为全景横移模式，false 为呼吸缩放模式
    },
    // ...
];
```

### 修改校徽与资源
*   **校徽**：搜索 `badgeImg.src` 进行替换。
*   **背景图**：直接在 `stages` 数组中替换 URL。

## 👨‍💻 作者

**王锴 (Kai Wang)**
*   个人主页：[https://www.sorkai.com/](https://www.sorkai.com/)

## 📄 开源协议

本项目采用 MIT 协议开源。
