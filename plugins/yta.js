import axios from 'axios';

export const command = {
    name: 'يوتا',
    alias: ['yta', 'صوت', 'اغنية', 'موسيقى'],
    category: 'تحميل',
    async execute(sock, from, msg, args) {
        if (!args[0]) return sock.sendMessage(from, { text: '⚠️ اكتب اسم الأغنية أو ضع الرابط بعد الأمر!\n\n*مثال:*\n.يوتا أذان الفجر\n.يوتا https://youtu.be/xxxxx' });

        try {
            const query = args.join(' ');
            await sock.sendMessage(from, { text: `🎵 جاري البحث والتحميل: *${query}*\n⏳ قد يستغرق الأمر بضع ثوان...` }, { quoted: msg });

            let audioData = null;

            // محاولة API الأولى - Vreden
            try {
                const response = await axios.get(`https://api.vreden.my.id/api/ytmp3?query=${encodeURIComponent(query)}`);
                if (response.data && response.data.result && response.data.result.download) {
                    audioData = response.data.result;
                }
            } catch (err) {
                console.log('Vreden API failed:', err.message);
            }

            // محاولة API البديلة - Agatz
            if (!audioData) {
                try {
                    const response = await axios.get(`https://api.agatz.xyz/api/ytmp3?message=${encodeURIComponent(query)}`);
                    if (response.data && response.data.data && response.data.data.url) {
                        audioData = {
                            download: response.data.data.url,
                            title: response.data.data.title || query
                        };
                    }
                } catch (err) {
                    console.log('Agatz API failed:', err.message);
                }
            }

            if (!audioData || !audioData.download) {
                return sock.sendMessage(from, { 
                    text: '❌ *فشل التحميل!*\n\n*الأسباب المحتملة:*\n• الأغنية غير متوفرة\n• جودة الاتصال ضعيفة\n• جرب البحث باسم آخر\n• تأكد من الرابط إذا كنت تستخدم رابط مباشر\n\nجرب مرة أخرى بعد قليل!' 
                }, { quoted: msg });
            }

            // إرسال الصوت
            await sock.sendMessage(from, { 
                audio: { url: audioData.download }, 
                mimetype: 'audio/mpeg',
                ptt: false,
                fileName: `${audioData.title || 'audio'}.mp3`
            }, { quoted: msg });

            // إرسال رسالة تأكيد
            await sock.sendMessage(from, { 
                text: `*─── 🎵 𝖸𝖮𝖴𝖳𝖴𝖡𝖤 𝖠𝖴𝖣𝖨𝖮 ───*\n\n✅ تـم الـتـحـمـيـل بـنـجـاح\n\n📌 *العنوان:* ${audioData.title}\n\n*⌞ 𝖣𝖠𝖱𝖪 𝖹𝖤𝖭𝖨𝖭 𝖡𝖮𝖳 𐙚 ⌟*`
            }, { quoted: msg });

        } catch (error) {
            console.error('YouTube audio download error:', error);
            await sock.sendMessage(from, { 
                text: '❌ *حدث خطأ غير متوقع!*\n\nيرجى:\n• التأكد من الاتصال بالإنترنت\n• المحاولة مرة أخرى بعد قليل\n• التواصل مع المطور إذا استمرت المشكلة' 
            }, { quoted: msg });
        }
    }
};
