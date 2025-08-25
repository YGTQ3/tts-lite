import { useState, useEffect } from 'react';

export default function LoadingAnimation({ isVisible, message = "正在生成语音..." }) {
  const [dots, setDots] = useState('');
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (!isVisible) return;

    // 动态点点点效果
    const dotsInterval = setInterval(() => {
      setDots(prev => {
        if (prev.length >= 3) return '';
        return prev + '.';
      });
    }, 500);

    // 模拟进度条
    const progressInterval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 90) return prev;
        return prev + Math.random() * 10;
      });
    }, 200);

    return () => {
      clearInterval(dotsInterval);
      clearInterval(progressInterval);
    };
  }, [isVisible]);

  useEffect(() => {
    if (isVisible) {
      setProgress(0);
      setDots('');
    }
  }, [isVisible]);

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="glass-card p-6 sm:p-8 max-w-md w-full mx-auto">
        <div className="text-center">
          {/* 主要加载动画 */}
          <div className="relative mb-6">
            <div className="w-20 h-20 mx-auto relative">
              {/* 外圈旋转 */}
              <div className="absolute inset-0 border-4 border-blue-200 rounded-full animate-spin border-t-blue-500"></div>
              
              {/* 内圈脉冲 */}
              <div className="absolute inset-2 bg-blue-100 rounded-full flex items-center justify-center">
                <div className="w-8 h-8 bg-blue-500 rounded-full animate-pulse"></div>
              </div>
              
              {/* 音波效果 */}
              <div className="absolute -inset-4 flex items-center justify-center">
                <div className="w-6 h-1 bg-blue-400 rounded-full animate-ping opacity-75"></div>
              </div>
            </div>
          </div>

          {/* 加载文本 */}
          <h3 className="text-xl font-semibold text-blue-900 mb-2">
            {message}{dots}
          </h3>
          
          <p className="text-blue-600 mb-6">
            正在使用 Qwen-TTS 为您生成高质量语音
          </p>

          {/* 进度条 */}
          <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
            <div 
              className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full transition-all duration-300 ease-out"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          
          <div className="text-sm text-gray-600">
            {Math.round(progress)}% 完成
          </div>

          {/* 装饰性音频波形 */}
          <div className="flex items-center justify-center space-x-1 mt-6">
            {[...Array(5)].map((_, i) => (
              <div
                key={i}
                className="w-1 bg-blue-400 rounded-full animate-pulse"
                style={{
                  height: `${Math.random() * 20 + 10}px`,
                  animationDelay: `${i * 0.1}s`,
                  animationDuration: '1s'
                }}
              ></div>
            ))}
          </div>

          {/* 提示信息 */}
          <div className="mt-6 p-3 bg-blue-50 rounded-lg">
            <div className="flex items-center justify-center text-sm text-blue-700">
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              通常需要 3-10 秒，请耐心等待
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
