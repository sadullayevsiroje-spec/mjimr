# Vercel'da Environment Variables O'rnatish - Rasmli Qo'llanma

## 📱 Qadam-baqadam Ko'rsatma

### QADAM 1: Vercel'ga Kirish

1. **Browser'ni oching** (Chrome, Firefox, Safari)

2. **Vercel saytiga o'ting:**
   ```
   https://vercel.com
   ```

3. **Login qiling:**
   - Yuqori o'ng burchakda **"Login"** tugmasini bosing
   - GitHub, GitLab yoki Email orqali kiring
   - (Siz allaqachon login qilgansiz, chunki mjimr deploy qilgansiz)

---

### QADAM 2: Project'ni Toping

1. **Dashboard'ga o'ting:**
   - Login qilgandan keyin avtomatik dashboard ochiladi
   - Yoki: https://vercel.com/dashboard

2. **mjimr projectni toping:**
   - Sahifada barcha projectlaringiz ko'rinadi
   - **"mjimr"** nomli projectni qidiring
   - Uning ustiga bosing

---

### QADAM 3: Settings'ga O'ting

1. **Project sahifasi ochiladi:**
   - Yuqorida bir necha tab ko'rinadi:
     - Overview
     - Deployments
     - Analytics
     - Logs
     - **Settings** ← Bu kerak!

2. **Settings tab'ni bosing**

---

### QADAM 4: Environment Variables'ni Toping

1. **Settings sahifasida chap tomonda menyu bor:**
   ```
   General
   Domains
   Git
   → Environment Variables  ← Bu kerak!
   Deployment Protection
   ...
   ```

2. **"Environment Variables" ni bosing**

---

### QADAM 5: Birinchi Variable Qo'shish (ADMIN_PASSWORD)

1. **Sahifada "Add New" tugmasi bor:**
   - O'ng yuqori burchakda
   - Yashil yoki ko'k rangda
   - **"Add New"** yoki **"Add Environment Variable"** deb yozilgan

2. **"Add New" tugmasini bosing**

3. **Dialog oynasi ochiladi:**

   ```
   ┌─────────────────────────────────────────────┐
   │ Add Environment Variable                    │
   ├─────────────────────────────────────────────┤
   │                                             │
   │ Key (Name)                                  │
   │ ┌─────────────────────────────────────────┐ │
   │ │ ADMIN_PASSWORD                          │ │
   │ └─────────────────────────────────────────┘ │
   │                                             │
   │ Value                                       │
   │ ┌─────────────────────────────────────────┐ │
   │ │ Mjimr@Admin2026!Secure                  │ │
   │ └─────────────────────────────────────────┘ │
   │                                             │
   │ Environments                                │
   │ ☑ Production                                │
   │ ☐ Preview                                   │
   │ ☐ Development                               │
   │                                             │
   │         [Cancel]  [Save]                    │
   └─────────────────────────────────────────────┘
   ```

4. **To'ldiring:**

   **Key (Name) maydoniga:**
   ```
   ADMIN_PASSWORD
   ```
   (Katta harflar bilan, bo'sh joy yo'q)

   **Value maydoniga:**
   ```
   Mjimr@Admin2026!Secure
   ```
   (Aynan shu parol, katta-kichik harflar muhim!)

   **Environments:**
   - ✅ **Production** - Albatta belgilang!
   - ☐ Preview - Ixtiyoriy
   - ☐ Development - Ixtiyoriy

5. **"Save" tugmasini bosing**

---

### QADAM 6: Ikkinchi Variable Qo'shish (ADMIN_SECRET_TOKEN)

1. **Yana "Add New" tugmasini bosing**

2. **Dialog oynasi ochiladi:**

   ```
   ┌─────────────────────────────────────────────┐
   │ Add Environment Variable                    │
   ├─────────────────────────────────────────────┤
   │                                             │
   │ Key (Name)                                  │
   │ ┌─────────────────────────────────────────┐ │
   │ │ ADMIN_SECRET_TOKEN                      │ │
   │ └─────────────────────────────────────────┘ │
   │                                             │
   │ Value                                       │
   │ ┌─────────────────────────────────────────┐ │
   │ │ mjimr-secret-x9k2m7p4-df50689-2026      │ │
   │ └─────────────────────────────────────────┘ │
   │                                             │
   │ Environments                                │
   │ ☑ Production                                │
   │ ☐ Preview                                   │
   │ ☐ Development                               │
   │                                             │
   │         [Cancel]  [Save]                    │
   └─────────────────────────────────────────────┘
   ```

3. **To'ldiring:**

   **Key (Name) maydoniga:**
   ```
   ADMIN_SECRET_TOKEN
   ```

   **Value maydoniga:**
   ```
   mjimr-secret-x9k2m7p4-df50689-2026
   ```

   **Environments:**
   - ✅ **Production** - Albatta!

4. **"Save" tugmasini bosing**

---

### QADAM 7: Natijani Tekshirish

1. **Environment Variables sahifasida endi 2 ta variable ko'rinadi:**

   ```
   Environment Variables (2)
   
   ┌──────────────────────┬─────────────┬──────────────┬─────────┐
   │ Key                  │ Value       │ Environments │ Actions │
   ├──────────────────────┼─────────────┼──────────────┼─────────┤
   │ ADMIN_PASSWORD       │ ••••••••••• │ Production   │ [Edit]  │
   │ ADMIN_SECRET_TOKEN   │ ••••••••••• │ Production   │ [Edit]  │
   └──────────────────────┴─────────────┴──────────────┴─────────┘
   ```

2. **Value ustuni "•••" ko'rsatadi** - Bu normal, xavfsizlik uchun

---

### QADAM 8: Redeploy Qilish

Environment variables qo'shgandan keyin, Vercel avtomatik redeploy qilmaydi. Qo'lda redeploy qilish kerak:

#### Usul 1: Vercel Dashboard'da

1. **Yuqori menuda "Deployments" tab'ni bosing**

2. **Eng oxirgi deployment'ni toping:**
   - Eng yuqorida, yashil "Ready" belgisi bilan

3. **O'ng tomonda 3 nuqta (•••) tugmasi bor:**
   - Uning ustiga bosing

4. **Dropdown menyu ochiladi:**
   ```
   Promote to Production
   → Redeploy  ← Bu kerak!
   View Function Logs
   View Build Logs
   ...
   ```

5. **"Redeploy" ni bosing**

6. **Tasdiqlash dialog oynasi:**
   ```
   ┌─────────────────────────────────────┐
   │ Redeploy to Production?             │
   ├─────────────────────────────────────┤
   │ This will create a new deployment   │
   │ with the same source code.          │
   │                                     │
   │ ☑ Use existing Build Cache          │
   │                                     │
   │     [Cancel]  [Redeploy]            │
   └─────────────────────────────────────┘
   ```

7. **"Redeploy" tugmasini bosing**

8. **Deployment boshlandi!**
   - Progress bar ko'rinadi
   - 1-3 daqiqa davom etadi
   - "Building..." → "Deploying..." → "Ready" ✅

#### Usul 2: Git Push (Osonroq)

Agar Vercel dashboard'da qiyin bo'lsa:

```bash
# Terminal'da:
git commit --allow-empty -m "chore: trigger redeploy"
git push
```

Vercel avtomatik yangi deployment yaratadi.

---

### QADAM 9: Test Qilish

1. **Deployment "Ready" bo'lguncha kuting** (1-3 daqiqa)

2. **Browser'da maxfiy URL'ga o'ting:**
   ```
   https://mjimr.com/secret-admin-panel-x9k2m7p4
   ```

3. **Login dialog paydo bo'lishi kerak:**
   ```
   ┌─────────────────────────────────────┐
   │ Authentication Required             │
   ├─────────────────────────────────────┤
   │ The site says:                      │
   │ "Admin Area"                        │
   │                                     │
   │ User Name: [admin              ]    │
   │ Password:  [••••••••••••••••••]    │
   │                                     │
   │     [Cancel]  [Sign In]             │
   └─────────────────────────────────────┘
   ```

4. **Kirish ma'lumotlarini kiriting:**
   - User Name: `admin`
   - Password: `Mjimr@Admin2026!Secure`

5. **"Sign In" yoki "OK" tugmasini bosing**

6. **Admin panelga kirasiz!** ✅

---

## 🎯 Qisqa Xulosa

```
1. vercel.com → Login
2. mjimr projectni oching
3. Settings → Environment Variables
4. Add New → ADMIN_PASSWORD = Mjimr@Admin2026!Secure
5. Add New → ADMIN_SECRET_TOKEN = mjimr-secret-x9k2m7p4-df50689-2026
6. Deployments → ... → Redeploy
7. Test: https://mjimr.com/secret-admin-panel-x9k2m7p4
```

---

## 🔧 Muammolar va Yechimlar

### Muammo 1: "Add New" tugmasi yo'q

**Yechim:**
- Settings → Environment Variables sahifasida ekanligingizni tekshiring
- Sahifani refresh qiling (F5)
- Boshqa browser'da sinab ko'ring

### Muammo 2: Save bosganda xato

**Yechim:**
- Key nomida bo'sh joy yo'qligini tekshiring
- Value to'g'ri copy qilinganini tekshiring
- Production checkbox belgilanganini tekshiring

### Muammo 3: Redeploy qilgandan keyin ham ishlamayapti

**Yechim:**
- Deployment "Ready" bo'lguncha kuting
- Browser cache'ni tozalang (Ctrl+Shift+R)
- Incognito/Private mode'da sinab ko'ring
- 5-10 daqiqa kuting (Vercel cache)

### Muammo 4: Login dialog paydo bo'lmayapti

**Yechim:**
- URL to'g'ri ekanligini tekshiring:
  ```
  https://mjimr.com/secret-admin-panel-x9k2m7p4
  ```
- Vercel logs'ni tekshiring:
  - Deployments → Latest → View Function Logs
- Environment variables to'g'ri o'rnatilganini qayta tekshiring

### Muammo 5: Parol ishlamayapti

**Yechim:**
- Katta-kichik harflarni tekshiring
- Copy-paste qiling (typing xatosi bo'lmasligi uchun)
- Vercel'da Value'ni Edit qilib qayta tekshiring
- Redeploy qiling

---

## 📞 Qo'shimcha Yordam

Agar hali ham muammo bo'lsa:

1. **Vercel Documentation:**
   - https://vercel.com/docs/concepts/projects/environment-variables

2. **Screenshot yuboring:**
   - Environment Variables sahifasining screenshot'i
   - Xato xabarining screenshot'i

3. **Logs tekshiring:**
   - Deployments → Latest → View Function Logs
   - Xatolarni qidiring

---

## ✅ Muvaffaqiyat Belgisi

Agar quyidagilar ishlasa - hammasi to'g'ri:

- ✅ Vercel'da 2 ta environment variable ko'rinadi
- ✅ Deployment "Ready" holati
- ✅ Login dialog paydo bo'ladi
- ✅ Parol bilan kiriladi
- ✅ Admin panel ochiladi

**Tabriklaymiz! Admin panelingiz to'liq himoyalangan va ishga tayyor!** 🎉
