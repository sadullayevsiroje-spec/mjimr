# Google Scholar'da Indekslanish - To'liq Qo'llanma

## ✅ Sizning Saytingiz Hozirgi Holati

### Tayyor Bo'lgan Narsalar:

1. **Google Scholar Meta Tags** ✅
   - `citation_title`
   - `citation_author`
   - `citation_publication_date`
   - `citation_journal_title`
   - `citation_volume`
   - `citation_issue`
   - `citation_firstpage` / `citation_lastpage`
   - `citation_doi`
   - `citation_issn`
   - `citation_abstract_html_url`
   - `citation_pdf_url`

2. **Structured Data (JSON-LD)** ✅
   - ScholarlyArticle schema
   - ScholarlyJournal schema

3. **SEO Optimizatsiya** ✅
   - Sitemap
   - Robots.txt
   - Canonical URLs
   - Meta descriptions

## ❌ Google Scholar Uchun Qo'shimcha Talablar

### 1. PDF Fayllar (MAJBURIY!)

**Muammo:** Hozir PDF URL'lar bor, lekin haqiqiy PDF fayllar yo'q.

**Yechim:**
```typescript
// Har bir maqola uchun PDF fayl kerak:
article.pdfUrl = "/pdfs/article-123.pdf"
```

**Google Scholar talabi:**
- Har bir maqolaning to'liq matni PDF formatida bo'lishi kerak
- PDF fayllar ochiq (public) bo'lishi kerak
- PDF ichida to'liq matn bo'lishi kerak

### 2. Jurnal Reputatsiyasi

**Google Scholar quyidagilarni tekshiradi:**

#### a) ISSN Raqami
- ✅ Sizda bor: `2789-1234`
- ⚠️ Lekin bu haqiqiy ISSN emas (placeholder)
- 📝 Haqiqiy ISSN olish kerak: https://www.issn.org

#### b) Muntazam Nashr
- ❌ Hozir maqolalar yo'q
- 📝 Kamida 5-10 ta maqola kerak
- 📝 Muntazam (har chorakda) nashr qilish kerak

#### c) Peer Review Jarayoni
- 📝 Haqiqiy peer review bo'lishi kerak
- 📝 Editorial board bo'lishi kerak (✅ sizda bor)
- 📝 Review policy bo'lishi kerak (✅ sizda bor)

### 3. Jurnal Sahifasi

**Google Scholar quyidagi sahifalarni kutadi:**

- ✅ Home page
- ✅ About page
- ✅ Editorial board
- ✅ Author guidelines
- ✅ Policies
- ✅ Contact
- ✅ Archive
- ❌ Past issues (hozir bo'sh)

### 4. Maqola Formati

**Har bir maqola quyidagilarni o'z ichiga olishi kerak:**

- ✅ Title
- ✅ Authors (full names)
- ✅ Affiliations
- ✅ Abstract
- ✅ Keywords
- ✅ Full text
- ✅ References
- ✅ Publication date
- ✅ DOI (ixtiyoriy, lekin tavsiya etiladi)
- ❌ PDF file (MAJBURIY!)

## 📋 Google Scholar'ga Qo'shilish Jarayoni

### Qadam 1: Tayyorgarlik (1-2 oy)

1. **Haqiqiy ISSN Oling**
   - https://www.issn.org ga murojaat qiling
   - $100-200 to'lov
   - 2-4 hafta davom etadi

2. **5-10 Ta Sifatli Maqola Yig'ing**
   - Peer review qiling
   - PDF formatga o'tkazing
   - Saytga joylashtiring

3. **Editorial Board To'ldiring**
   - Kamida 5-7 ta mutaxassis
   - Turli universitetlardan
   - Haqiqiy email va affiliation

### Qadam 2: Saytni To'ldirish (2-4 hafta)

1. **Birinchi Son (Issue) Yarating**
   ```
   Volume 1, Issue 1 (2026)
   - 5-10 ta maqola
   - Har birida PDF
   - To'liq metadata
   ```

2. **PDF Fayllarni Joylashtiring**
   ```
   public/pdfs/
   ├── vol1-issue1-article1.pdf
   ├── vol1-issue1-article2.pdf
   ├── vol1-issue1-article3.pdf
   └── ...
   ```

3. **DOI Oling (Ixtiyoriy)**
   - Crossref.org orqali
   - Har bir maqola uchun unique DOI
   - $1-2 per DOI

### Qadam 3: Google Scholar'ga Murojaat (1 kun)

1. **Google Scholar Inclusion Form**
   - https://scholar.google.com/intl/en/scholar/inclusion.html
   - "Submit your publication for inclusion"

2. **Kerakli Ma'lumotlar:**
   ```
   Journal Name: Medical Journal of International Multidisciplinary Research
   Journal URL: https://mjimr.com
   ISSN: [Haqiqiy ISSN]
   Publisher: MJIMR Publishing
   Contact Email: editor@mjimr.com
   Sample Article URLs: [5 ta maqola URL'i]
   ```

3. **Tekshiruv:**
   - Google 2-4 hafta ichida tekshiradi
   - Email orqali javob beradi
   - Qabul qilinsa, avtomatik indekslanadi

### Qadam 4: Kutish va Monitoring (2-8 hafta)

1. **Google'ning Javobi:**
   - ✅ Qabul qilindi → Indekslanish boshlanadi
   - ❌ Rad etildi → Sabablari ko'rsatiladi

2. **Indekslanish:**
   - 2-4 hafta davom etadi
   - Har bir maqola alohida indekslanadi
   - Google Scholar'da qidiruv orqali tekshiring

## 🎯 Minimal Talablar (Google Scholar Uchun)

### Jurnal Darajasida:
- ✅ Professional website
- ✅ Haqiqiy ISSN
- ✅ Editorial board (5+ members)
- ✅ Clear policies
- ✅ Contact information
- ✅ Regular publication schedule

### Maqola Darajasida:
- ✅ Full text (HTML yoki PDF)
- ✅ PDF version (MAJBURIY!)
- ✅ Complete metadata
- ✅ Author information
- ✅ Abstract
- ✅ References
- ✅ Publication date

### Texnik Talablar:
- ✅ Google Scholar meta tags
- ✅ Structured data
- ✅ Accessible URLs
- ✅ No login required (open access)
- ✅ Fast loading
- ✅ Mobile-friendly

## 📊 Sizning Hozirgi Holatingiz

### Tayyor (90%):
- ✅ Website structure
- ✅ Meta tags
- ✅ SEO optimization
- ✅ Structured data
- ✅ Policies
- ✅ Editorial board page

### Kerak (10%):
- ❌ Haqiqiy ISSN
- ❌ 5-10 ta maqola
- ❌ PDF fayllar
- ❌ Google Scholar'ga murojaat

## 🚀 Keyingi Qadamlar

### 1. ISSN Olish (Darhol)
**Vaqt:** 2-4 hafta  
**Narx:** $100-200  
**Havola:** https://www.issn.org

### 2. Maqolalar Yig'ish (1-2 oy)
- Peer review jarayonini boshlang
- 5-10 ta sifatli maqola toping
- PDF formatga o'tkazing

### 3. PDF Fayllar Tayyorlash (1 hafta)
- Har bir maqolani PDF ga export qiling
- `public/pdfs/` papkasiga joylashtiring
- Database'da `pdfUrl` ni yangilang

### 4. Google Scholar'ga Murojaat (1 kun)
- Inclusion form to'ldiring
- 5 ta sample article URL bering
- Javobni kuting (2-4 hafta)

## ⏱️ Umumiy Vaqt Jadvali

```
Hafta 1-2:   ISSN uchun murojaat
Hafta 3-8:   Maqolalar yig'ish va peer review
Hafta 9:     PDF fayllar tayyorlash
Hafta 10:    Saytga joylashtirish
Hafta 11:    Google Scholar'ga murojaat
Hafta 12-16: Tekshiruv va indekslanish
```

**Jami:** 3-4 oy

## 💡 Muhim Maslahatlar

### 1. Sifat Muhim
- Google Scholar sifatni tekshiradi
- Yomon maqolalar rad etiladi
- Peer review haqiqiy bo'lishi kerak

### 2. Muntazamlik
- Har chorakda yangi son chiqaring
- Schedule'ni saqlang
- Consistency muhim

### 3. Ochiqlik
- Open access bo'lishi kerak
- PDF fayllar bepul bo'lishi kerak
- Login talab qilinmasligi kerak

### 4. Texnik Jihatlar
- PDF fayllar searchable bo'lishi kerak
- Metadata to'g'ri bo'lishi kerak
- URL'lar o'zgarmasligi kerak

## ✅ Xulosa

**Savol:** 5-6 ta maqola joylasam indekslanadimi?

**Javob:** Ha, lekin quyidagilar kerak:

1. ✅ **Haqiqiy ISSN** (2-4 hafta)
2. ✅ **PDF fayllar** (har bir maqola uchun)
3. ✅ **Sifatli maqolalar** (peer reviewed)
4. ✅ **Google Scholar'ga murojaat** (inclusion form)
5. ✅ **Kutish** (2-4 hafta tekshiruv)

**Umumiy vaqt:** 3-4 oy

**Sizning saytingiz texnik jihatdan tayyor!** Faqat kontent (maqolalar va PDF'lar) va haqiqiy ISSN kerak.

## 📞 Qo'shimcha Yordam

- **ISSN:** https://www.issn.org
- **Google Scholar:** https://scholar.google.com/intl/en/scholar/inclusion.html
- **Crossref (DOI):** https://www.crossref.org
- **DOAJ (Directory):** https://doaj.org

---

**Omad tilaymiz! Saytingiz professional va Google Scholar uchun deyarli tayyor!** 🎉
