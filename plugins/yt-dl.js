import { youtubeSearch } from '@bochilteam/scraper'
let handler = async (m, { conn, command, text, usedPrefix }) => {
  if (!text) throw `*أدخل رابط الفيديو أو اسم الأغنية التي تبحث عنها*\n\n*مثال:* _${usedPrefix + command} سورة البقرة_`
  let vid = (await youtubeSearch(text)).video[0]
  if (!vid) throw 'لم يتم العثور على نتائج!'
  let { title, description, thumbnail, videoId, durationH, viewH, publishedTime } = vid
  let url = 'https://www.youtube.com/watch?v=' + videoId
  let caption = `📌 *العنوان:* ${title}\n⏱️ *المدة:* ${durationH}\n👁️ *المشاهدات:* ${viewH}\n📅 *نشر في:* ${publishedTime}\n🔗 *الرابط:* ${url}`
  
  // إرسال الصورة مع وصف الفيديو
  await conn.sendFile(m.chat, thumbnail, 'thumb.jpg', caption, m)
  
  // إرسال الفيديو (سيتم تحميله تلقائياً)
  await conn.sendMessage(m.chat, { video: { url: url }, fileName: `${title}.mp4`, mimetype: 'video/mp4' }, { quoted: m })
}

handler.help = ['ytv']
handler.tags = ['downloader']
handler.command = ['ytv', 'يوتيوب', 'تحميل']

export default handler
