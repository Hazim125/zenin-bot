const { sticker } = require('../lib/sticker')

let handler = async (m, { conn, args, usedPrefix, command }) => {
    let stiker = false
    try {
        let q = m.quoted ? m.quoted : m
        let mime = (q.msg || q).mimetype || ''
        
        if (/image|video|webp/.test(mime)) {
            let img = await q.download()
            // استخدام الماكينة الاحترافية مع الحقوق
            stiker = await sticker(img, false, "صلـي على مـحمـد❤‍🩹", "DARK ZENIN BOT ♚")
        } else if (args[0] && /https?:\/\//.test(args[0])) {
            stiker = await sticker(false, args[0], "صلـي على مـحمـد❤‍🩹", "DARK ZENIN BOT ♚")
        }

        if (stiker) {
            await conn.sendFile(m.chat, stiker, 'sticker.webp', '', m)
        } else {
            m.reply(`*رد على صورة أو فيديو بكلمة ${usedPrefix + command}*`)
        }
    } catch (e) {
        console.error(e)
        m.reply('*حدث خطأ! تأكد من وجود ملف sticker.js في مجلد lib*')
    }
}

handler.command = ['ملصق', 'sticker']
module.exports = handler
