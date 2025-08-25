// TTS语音生成API
export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { text, dialect = 'mandarin' } = req.body;

    // 输入验证
    if (!text || text.trim().length === 0) {
      return res.status(400).json({ error: '文本内容不能为空' });
    }

    if (text.length > 500) {
      return res.status(400).json({ error: '文本长度不能超过500字符' });
    }

    // 方言到音色的映射（基于文档支持的音色）
    const dialectToVoice = {
      'mandarin': 'Cherry',     // 普通话 - Cherry（女）
      'shanghai': 'Serena',     // 上海话 - Serena（女）
      'beijing': 'Ethan',       // 北京话 - Ethan（男）
      'cantonese': 'Chelsie',   // 粤语 - Chelsie（女）
      // 新增音色（需要使用 qwen-tts-latest 或 qwen-tts-2025-05-22 模型）
      'sichuan': 'Sunny',       // 四川话 - Sunny（女）
      'wu': 'Jada',             // 吴语 - Jada（女）
      'beijing_male': 'Dylan'   // 北京话男声 - Dylan（男）
    };

    const voice = dialectToVoice[dialect] || 'Cherry';

    // 调用TTS API（使用正确的端点和请求格式）
    const ttsResponse = await fetch('https://dashscope.aliyuncs.com/api/v1/services/aigc/multimodal-generation/generation', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.DASHSCOPE_API_KEY}`,
        'Content-Type': 'application/json'
        // 移除 X-DashScope-Async 头，因为我们不需要异步处理
      },
      body: JSON.stringify({
        model: 'qwen-tts',  // 使用文档中提到的稳定版模型
        input: {
          text: text,
          voice: voice  // 将voice移到input对象中
        }
        // 移除parameters对象，因为根据文档，参数应该在input中
      })
    });

    const ttsData = await ttsResponse.json();

    if (!ttsResponse.ok) {
      console.error('TTS API错误:', ttsData);
      return res.status(500).json({ error: 'TTS服务暂时不可用' });
    }

    res.status(200).json({
      success: true,
      audio_url: ttsData.output?.audio?.url,
      task_id: ttsData.output?.audio?.id
    });

  } catch (error) {
    console.error('TTS生成失败:', error);
    res.status(500).json({ error: '语音生成失败: ' + error.message });
  }
}
