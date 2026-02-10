# YouTube Download Features

## تحميل الفيديو من يوتيوب

تم تحسين وظيفة تحميل الفيديو من اليوتيوب مع إضافة ميزات جديدة:

### الأوامر المتاحة

#### 1. تحميل الفيديو
```
.يوت [اسم الفيديو أو الرابط]
.ytv [اسم الفيديو أو الرابط]
.فيديو [اسم الفيديو أو الرابط]
.يوتيوب [اسم الفيديو أو الرابط]
```

**أمثلة:**
- `.يوت سورة الكهف`
- `.يوت https://youtu.be/xxxxx`
- `.فيديو تلاوة خاشعة`

#### 2. تحميل الصوت (جديد)
```
.يوتا [اسم الأغنية أو الرابط]
.yta [اسم الأغنية أو الرابط]
.صوت [اسم الأغنية أو الرابط]
.اغنية [اسم الأغنية أو الرابط]
.موسيقى [اسم الأغنية أو الرابط]
```

**أمثلة:**
- `.يوتا أذان الفجر`
- `.صوت https://youtu.be/xxxxx`
- `.اغنية قرآن كريم`

### المميزات الجديدة

1. **دعم الروابط المباشرة**: يمكنك الآن استخدام رابط يوتيوب مباشر أو البحث باسم الفيديو
2. **APIs احتياطية متعددة**: يستخدم البوت 3 APIs مختلفة لضمان نجاح التحميل
   - Vreden API (الأساسي)
   - Agatz API (احتياطي أول)
   - Widipe API (احتياطي ثاني)
3. **رسائل خطأ مفصلة**: رسائل واضحة عند فشل التحميل مع شرح الأسباب المحتملة
4. **تحميل الصوت**: أمر جديد لتحميل الصوت فقط من يوتيوب
5. **واجهة محسنة**: رسائل أنيقة ومنسقة مع معلومات العنوان

### التحسينات التقنية

- معالجة أخطاء محسنة
- دعم متعدد اللغات (عربي وإنجليزي)
- تجربة مستخدم أفضل مع رسائل الانتظار
- أسماء بديلة متعددة للأوامر

### ملاحظات

- قد يستغرق التحميل بضع ثوان حسب سرعة الإنترنت
- تأكد من أن الفيديو متاح للمشاهدة على يوتيوب
- البوت يدعم معظم فيديوهات يوتيوب ما لم تكن محمية أو محظورة

---

## YouTube Download Features

Enhanced YouTube download functionality with new features:

### Available Commands

#### 1. Video Download
```
.يوت [video name or URL]
.ytv [video name or URL]
.فيديو [video name or URL]
.يوتيوب [video name or URL]
```

#### 2. Audio Download (New)
```
.يوتا [song name or URL]
.yta [song name or URL]
.صوت [song name or URL]
.اغنية [song name or URL]
.موسيقى [song name or URL]
```

### New Features

1. **Direct Link Support**: Use YouTube URLs directly or search by video name
2. **Multiple Fallback APIs**: Uses 3 different APIs to ensure download success
3. **Detailed Error Messages**: Clear messages when download fails
4. **Audio Download**: New command for audio-only downloads
5. **Improved UI**: Elegant formatted messages with title information

### Technical Improvements

- Enhanced error handling
- Multi-language support (Arabic and English)
- Better user experience with waiting messages
- Multiple command aliases
