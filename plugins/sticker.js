import { downloadContentFromMessage } from '@whiskeysockets/baileys';

export const command = {
    name: "ملصق",
    alias: ["sticker", "stiker", "سوي_ملصق"],
    execute: async (sock, from, msg, args) => {
        try {
            // تحديد محتوى الرسالة (سواء كانت أصلية أو مقتبسة)
            const type = Object.keys(msg.message)[0];
            const quoted = msg.message[type]?.contextInfo?.quotedMessage;
            const target = quoted ? quoted : msg.message;
            
            // التأكد من وجود صورة أو فيديو
            const content = target.imageMessage || target.videoMessage || target.stickerMessage;
            if (!content) return sock.sendMessage(from, { text: '⚠️ يا كينج، رد على صورة أو فيديو بكلمة .ملصق' }, { quoted: msg });

            const mime = content.mimetype || '';
            if (/image|video|webp/.test(mime)) {
                const messageType = mime.split('/')[0] === 'image' ? 'image' : 'video';
                const stream = await downloadContentFromMessage(content, messageType);
                let buffer = Buffer.from([]);
                for await (const chunk of stream) {
                    buffer = Buffer.concat([buffer, chunk]);
                }

                // إرسال الملصق مع الحقوق الفخمة
                await sock.sendMessage(from, { 
                    sticker: buffer,
                    packname: "صلـي على مـحمـد❤‍🩹\nDARK ZENIN BOT ♚", 
                    author: "Dark Zenin" 
                }, { quoted: msg });
            }
        } catch (e) {
            console.error(e);
            await sock.sendMessage(from, { text: '❌ حدث خطأ! تأكد أن الفيديو قصير جداً.' });
        }
    }
};

