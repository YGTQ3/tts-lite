# 🤝 贡献指南

感谢您对 TTS Website 项目的关注！我们欢迎任何形式的贡献。

## 如何贡献

### 🐛 报告 Bug
如果您发现了 bug，请：

1. 检查 [Issues](../../issues) 中是否已有相关报告
2. 如果没有，请创建新的 Issue，包含：
   - 详细的问题描述
   - 复现步骤
   - 期望的行为
   - 实际的行为
   - 环境信息（浏览器、操作系统等）
   - 截图（如果适用）

### 💡 功能建议
如果您有新功能的想法：

1. 检查 Issues 中是否已有类似建议
2. 创建 Feature Request Issue，包含：
   - 功能描述
   - 使用场景
   - 预期收益
   - 可能的实现方案

### 🔧 代码贡献

#### 开发环境设置
1. Fork 本仓库
2. 克隆您的 fork：
   ```bash
   git clone https://github.com/your-username/tts-website.git
   cd tts-website
   ```
3. 创建开发分支：
   ```bash
   git checkout -b feature/your-feature-name
   ```
4. 安装依赖：
   ```bash
   cd frontend
   npm install
   ```
5. 配置环境变量：
   ```bash
   cp .env.local.example .env.local
   # 编辑 .env.local，添加您的 API 密钥
   ```

#### 代码规范
- 使用 ESLint 进行代码检查
- 遵循现有的代码风格
- 添加必要的注释
- 确保代码在多种浏览器中兼容

#### 提交流程
1. 确保代码通过所有检查：
   ```bash
   npm run lint
   ```
2. 提交代码：
   ```bash
   git add .
   git commit -m "feat: 添加新功能描述"
   ```
3. 推送到您的 fork：
   ```bash
   git push origin feature/your-feature-name
   ```
4. 创建 Pull Request

#### 提交信息规范
使用以下格式：
- `feat:` 新功能
- `fix:` 修复 bug
- `docs:` 文档更新
- `style:` 代码格式化（不影响功能）
- `refactor:` 代码重构
- `test:` 添加测试
- `chore:` 构建过程或辅助工具的变动

### 📝 文档贡献
文档改进包括：
- 修复错别字
- 改进说明
- 添加示例
- 翻译文档

## Pull Request 指南

### 创建 PR 前的检查清单
- [ ] 代码通过 lint 检查
- [ ] 功能正常工作
- [ ] 添加了必要的测试（如果适用）
- [ ] 更新了相关文档
- [ ] 提交信息符合规范

### PR 描述模板
```markdown
## 变更类型
- [ ] Bug 修复
- [ ] 新功能
- [ ] 代码重构
- [ ] 文档更新
- [ ] 其他

## 变更描述
简要描述您的变更内容

## 测试
描述您如何测试了这些变更

## 截图（如适用）
如果有 UI 变更，请提供截图

## 相关 Issue
关闭 #issue_number
```

## 开发指南

### 项目结构
```
frontend/
├── components/     # React 组件
├── pages/         # Next.js 页面
├── styles/        # 样式文件
├── hooks/         # React Hooks
└── constants/     # 常量定义
```

### 关键文件
- `pages/api/tts/generate.js` - TTS API 端点
- `pages/index.js` - 主页面
- `components/AudioPlayer.js` - 音频播放器组件

### 常用命令
```bash
# 启动开发服务器
npm run dev

# 构建生产版本
npm run build

# 启动生产服务器
npm start

# 代码检查
npm run lint
```

## 代码审查过程

1. **自动检查**: GitHub Actions 会自动运行测试和代码检查
2. **人工审查**: 维护者会审查您的代码
3. **反馈处理**: 根据反馈修改代码
4. **合并**: 审查通过后合并到主分支

## 社区准则

### 行为准则
- 尊重所有贡献者
- 建设性地提供反馈
- 专注于解决问题
- 保持友好和专业

### 沟通方式
- **GitHub Issues**: 报告 bug 和功能请求
- **Pull Requests**: 代码贡献和讨论
- **Discussions**: 一般性讨论和问题

## 认可贡献者

我们感谢所有贡献者的努力！贡献者将会：
- 在 README 中被提及
- 获得 GitHub 贡献者徽章
- 成为项目社区的一部分

## 许可证

通过贡献代码，您同意您的贡献将在 MIT 许可证下授权。

## 需要帮助？

如果您有任何问题：
1. 查看现有的 Issues 和文档
2. 创建新的 Issue 寻求帮助
3. 在 Pull Request 中提问

再次感谢您的贡献！🎉