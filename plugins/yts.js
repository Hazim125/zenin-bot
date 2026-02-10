import axios from 'axios';

export const command = {
    name: 'يوت',
    alias: ['ytv', 'فيديو', 'يوتيوب'],
    category: 'تحميل',
    async execute(sock, from, msg, args) {
        if (!args[0]) return sock.sendMessage(from, { text: '⚠️ اكتب اسم الفيديو أو ضع الرابط بعد الأمر!\n\n*مثال:*\n.يوت سورة الكهف\n.يوت https://youtu.be/xxxxx' });

        try {
            const query = args.join(' ');
            await sock.sendMessage(from, { text: `🔍 جاري البحث والتحميل: *${query}*\n⏳ قد يستغرق الأمر بضع ثوان...` }, { quoted: msg });

            let videoData = null;
            let apiUsed = null;

            // محاولة API الأولى - Vreden
            try {
                const response = await axios.get(`https://api.vreden.my.id/api/ytplayv2?query=${encodeURIComponent(query)}`);
                if (response.data && response.data.result && response.data.result.video) {
                    videoData = response.data.result;
                    apiUsed = 'vreden';
                }
            } catch (err) {
                console.log('Vreden API failed:', err.message);
            }

            // محاولة API البديلة الثانية - AgatzAPI
            if (!videoData) {
                try {
                    const response = await axios.get(`https://api.agatz.xyz/api/ytplay?message=${encodeURIComponent(query)}`);
                    if (response.data && response.data.data && response.data.data.url) {
                        videoData = {
                            video: response.data.data.url,
                            title: response.data.data.title || query
                        };
                        apiUsed = 'agatz';
                    }
                } catch (err) {
                    console.log('Agatz API failed:', err.message);
                }
            }

            // محاولة API البديلة الثالثة - Widipe
            if (!videoData) {
                try {
                    const response = await axios.get(`https://widipe.com/download/ytdl?url=${encodeURIComponent(query)}`);
                    if (response.data && response.data.result && response.data.result.mp4) {
                        videoData = {
                            video: response.data.result.mp4,
                            title: response.data.result.title || query
                        };
                        apiUsed = 'widipe';
                    }
                } catch (err) {
                    console.log('Widipe API failed:', err.message);
                }
            }

            if (!videoData || !videoData.video) {
                return sock.sendMessage(from, { 
                    text: '❌ *فشل التحميل!*\n\n*الأسباب المحتملة:*\n• الفيديو غير متوفر\n• جودة الاتصال ضعيفة\n• جرب البحث باسم آخر\n• تأكد من الرابط إذا كنت تستخدم رابط مباشر\n\nجرب مرة أخرى بعد قليل!' 
                }, { quoted: msg });
            }

            // إرسال الفيديو
            await sock.sendMessage(from, { 
                video: { url: videoData.video }, 
                caption: `*─── 📥 𝖸𝖮𝖴𝖳𝖴𝖡𝖤 𝖣𝖮𝖶𝖭𝖫𝖮𝖠𝖣𝖤𝖱 ───*\n\n✅ تـم الـتـحـمـيـل بـنـجـاح\n\n📌 *العنوان:* ${videoData.title}\n\n*⌞ 𝖣𝖠𝖱𝖪 𝖹𝖤𝖭𝖨𝖭 𝖡𝖮𝖳 𐙚 ⌟*`,
                mimetype: 'video/mp4'
            }, { quoted: msg });

        } catch (error) {
            console.error('YouTube download error:', error);
            await sock.sendMessage(from, { 
                text: '❌ *حدث خطأ غير متوقع!*\n\nيرجى:\n• التأكد من الاتصال بالإنترنت\n• المحاولة مرة أخرى بعد قليل\n• التواصل مع المطور إذا استمرت المشكلة' 
            }, { quoted: msg });
        }
    }
};

