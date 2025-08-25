/**
 * 共享的样式常量
 * 用于减少重复的 CSS 类定义
 */

// 通用容器样式
export const CONTAINER_STYLES = {
  page: "min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100",
  center: "flex items-center justify-center p-4",
  card: "w-full max-w-md",
  glassCard: "bg-white bg-opacity-25 backdrop-blur-lg rounded-2xl border border-white border-opacity-30 shadow-xl p-8"
};

// 表单样式
export const FORM_STYLES = {
  input: "w-full px-4 py-3 bg-white bg-opacity-50 border border-white border-opacity-50 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition-all",
  label: "block mb-2 text-blue-900 font-medium",
  button: {
    primary: "w-full py-3 rounded-lg font-medium transition-all bg-gradient-to-r from-blue-500 to-blue-400 hover:from-blue-600 hover:to-blue-500 text-white shadow-lg hover:shadow-xl",
    disabled: "w-full py-3 rounded-lg font-medium transition-all bg-gray-300 cursor-not-allowed"
  }
};

// 文本样式
export const TEXT_STYLES = {
  title: "text-3xl font-bold text-blue-900",
  subtitle: "text-gray-600 mt-2",
  error: "mb-6 p-3 bg-red-100 text-red-700 rounded-lg",
  debug: "mb-6 p-3 bg-blue-100 text-blue-700 rounded-lg text-sm",
  success: "mb-6 p-3 bg-green-100 text-green-700 rounded-lg",
  link: "text-blue-600 hover:text-blue-800 font-medium"
};

// 布局样式
export const LAYOUT_STYLES = {
  section: "container mx-auto px-6 py-20",
  heroCard: "glass-card p-8 md:p-12 max-w-4xl mx-auto fade-in",
  nav: "glass-nav fixed top-0 left-0 right-0 z-50 px-6 py-4"
};
