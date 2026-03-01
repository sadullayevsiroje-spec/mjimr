# Vercel'da Admin Parolni O'rnatish

## 🚨 MUHIM: Darhol Bajaring!

Admin panel himoyalangan, lekin Vercel'da parol o'rnatilmagan. Quyidagi qadamlarni bajaring:

## 📝 Qadamlar

### 1. Vercel Dashboard'ga Kiring
1. [vercel.com](https://vercel.com) ga kiring
2. `mjimr` projectni toping va oching

### 2. Environment Variables'ga O'ting
1. **Settings** tab'ni oching
2. Chap menuda **Environment Variables** ni toping
3. Bosing

### 3. Yangi Variable Qo'shing
1. **Add New** tugmasini bosing
2. Quyidagilarni to'ldiring:

   **Name (Key):**
   ```
   ADMIN_PASSWORD
   ```

   **Value:**
   ```
   [Kuchli parolingizni kiriting]
   ```
   
   Masalan:
   - `Mjimr@2026!SecureAdmin`
   - `MyM3d!c@lJ0urn@l#2026`
   - `J0urn@l$Adm1n!Str0ng`

   **Environment:**
   - ✅ Production
   - ✅ Preview (ixtiyoriy)
   - ✅ Development (ixtiyoriy)

3. **Save** tugmasini bosing

### 4. Redeploy Qilish

Parol qo'shgandan keyin, Vercel avtomatik redeploy qilmaydi. Qo'lda redeploy qiling:

**Variant 1: Vercel Dashboard'da**
1. **Deployments** tab'ga o'ting
2. Eng oxirgi deployment'ni toping
3. **...** (3 nuqta) tugmasini bosing
4. **Redeploy** ni tanlang

**Variant 2: Git Push**
```bash
# Kichik o'zgarish qiling
git commit --allow-empty -m "chore: trigger redeploy for env vars"
git push
```

### 5. Tekshirish

1. `https://mjimr.com/admin` ga o'ting
2. Login dialog paydo bo'lishi kerak
3. **Username:** admin (yoki istalgan narsa)
4. **Password:** Vercel'da o'rnatgan parol
5. Kirish muvaffaqiyatli bo'lishi kerak

## ✅ Muvaffaqiyatli O'rnatildi!

Agar login dialog paydo bo'lsa va parol ishlasa - hammasi tayyor!

## ❌ Muammolar?

### Login dialog paydo bo'lmayapti?
- Redeploy qilganingizni tekshiring
- Browser cache'ni tozalang (Ctrl+Shift+R)
- Incognito/Private mode'da sinab ko'ring

### Parol ishlamayapti?
- Vercel'da parol to'g'ri yozilganini tekshiring
- Space yoki maxsus belgilar to'g'ri kiritilganini tekshiring
- Redeploy qilganingizni tasdiqlang

### Hali ham ishlamayapti?
1. Vercel Logs'ni tekshiring:
   - Deployments → Latest → View Function Logs
2. Console'da xatolarni qidiring
3. Environment Variables to'g'ri o'rnatilganini tekshiring

## 🔐 Parolni Eslab Qolish

Parolni xavfsiz joyda saqlang:
- ✅ Password manager (1Password, LastPass, Bitwarden)
- ✅ Xavfsiz note (encrypted)
- ❌ Browser'da saqlamang (agar shared computer bo'lsa)
- ❌ Plain text file'da saqlamang

## 📞 Yordam

Agar muammo bo'lsa, `docs/ADMIN-SECURITY.md` faylini o'qing yoki qo'shimcha yordam so'rang.
