
import axios from 'axios'

let handler = async (m, { conn, text, args }) => {
  if (!args[0]) return m.reply('⚠️ يرجى وضع رابط فيديو يوتيوب\nمثال: .yt https://youtu.be/xxxx')

  m.reply('⏳ جاري جلب الفيديو، انتظر قليلاً...')

  try {
    // استخدام API خارجي لتحويل الرابط
    const response = await axios.get(`https://api.popcat.xyz/youtube-dl?url=${encodeURIComponent(args[0])}`)
    const data = response.data

    let caption = `✅ *تم التحميل بنجاح*\n\n`
    caption += `📝 *العنوان:* ${data.title}\n`
    caption += `👤 *القناة:* ${data.channel}\n`
    caption += `👀 *المشاهدات:* ${data.views}`

    // إرسال الفيديو
    await conn.sendMessage(m.chat, { 
      video: { url: data.link }, 
      caption: caption 
    }, { quoted: m })

  } catch (e) {
    console.error(e)
    m.reply('❌ عذراً، حدث خطأ أثناء التحميل. قد يكون الرابط غير صحيح أو الـ API متوقف حالياً.')
  }
}

handler.help = ['yt']
handler.tags = ['downloader']
handler.command = /^(yt|تحميل|ytdl)$/i

export default handler

