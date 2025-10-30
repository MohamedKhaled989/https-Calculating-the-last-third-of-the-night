/* ============================
  script.js — محدث: قوائم محافظات/مدن مختصرة وآمنة + أحاديث نبوية عند عرض وقت قيام الليل
  يحافظ على باقي وظائف الموقع: جلب الأوقات من AlAdhan, حساب الثلث الأخير,
  الوضع الداكن، التخزين المحلي، إعادة التعيين، إلخ.
  ============================ */

/* ======== بيانات المحافظات والمدن ======== */
const egyptData = {
  "Cairo": [
    { value: "Cairo", label: "القاهرة" },
    { value: "Helwan", label: "حلوان" },
    { value: "NewCairo", label: "القاهرة الجديدة" },
    { value: "NasrCity", label: "مدينة نصر" },
  ],
  "Giza": [
    { value: "Giza", label: "الجيزة" },
    { value: "6th of October", label: "الشيخ زايد / 6 أكتوبر" },
    { value: "Imbaba", label: "إمبابة" },
    { value: "SheikhZayed", label: "الشيخ زايد" }
  ],
  "Alexandria": [
    { value: "Alexandria", label: "الإسكندرية" },
    { value: "Borg El Arab", label: "برج العرب" },
    { value: "Smouha", label: "سموحة" }
  ],
  "Qalyubia": [
    { value: "Banha", label: "بنها" },
    { value: "Qalyub", label: "قليوب" },
    { value: "ShubraElKheima", label: "شبرا الخيمة" },
    { value: "Khanka", label: "الخانكة" },
    { value: "Toukh", label: "طوخ" }
  ],
  "Sharqia": [
    { value: "Zagazig", label: "الزقازيق" },
    { value: "10th of Ramadan", label: "العاشر من رمضان" },
    { value: "Belbeis", label: "بلبيس" }
  ],
  "Dakahlia": [
    { value: "Mansoura", label: "المنصورة" },
    { value: "Talkha", label: "طلخا" },
    { value: "MeetGhamr", label: "ميت غمر" }
  ],
  "Gharbia": [
    { value: "Tanta", label: "طنطا" },
    { value: "Mahalla", label: "المحلة الكبرى" },
    { value: "KafrElZayat", label: "كفر الزيات" }
  ],
  "Monufia": [
    { value: "ShebinElKom", label: "شبين الكوم" },
    { value: "Menouf", label: "منوف" },
    { value: "Quesna", label: "قويسنا" }
  ],
  "Beheira": [
    { value: "Damanhour", label: "دمنهور" },
    { value: "KafrElDawwar", label: "كفر الدوار" },
    { value: "Rashid", label: "رشيد" }
  ],
  "Kafr El Sheikh": [
    { value: "Kafr El Sheikh", label: "كفر الشيخ" },
    { value: "Desouq", label: "دسوق" },
    { value: "Baltim", label: "بلطيم" }
  ],
  "Fayoum": [
    { value: "Faiyum", label: "الفيوم" },
    { value: "Sinnuris", label: "سنورس" },
    { value: "Tamiya", label: "طامية" }
  ],
  "Beni Suef": [
    { value: "Beni Suef", label: "بني سويف" },
    { value: "Nasser", label: "الواسطى / ناصر" }
  ],
  "Minya": [
    { value: "Minya", label: "المنيا" },
    { value: "BeniMazar", label: "بني مزار" },
    { value: "Maghagha", label: "ملوى / مغاغة" }
  ],
  "Assiut": [
    { value: "Assiut", label: "أسيوط" },
    { value: "AbuTig", label: "أبو تيج" },
    { value: "Manfalut", label: "منفلوط" }
  ],
  "Sohag": [
    { value: "Sohag", label: "سوهاج" },
    { value: "Akhmim", label: "أخميم" },
    { value: "Girga", label: "جرجا" }
  ],
  "Qena": [
    { value: "Qena", label: "قنا" },
    { value: "Deshna", label: "دشنا" },
    { value: "NajHammadi", label: "نجع حمادي" }
  ],
  "Luxor": [
    { value: "Luxor", label: "الأقصر" },
    { value: "Esna", label: "إسنا" }
  ],
  "Aswan": [
    { value: "Aswan", label: "أسوان" },
    { value: "Edfu", label: "إدفو" },
    { value: "Kom Ombo", label: "كوم أمبو" }
  ],
  "Red Sea": [
    { value: "Hurghada", label: "الغردقة" },
    { value: "Safaga", label: "سفاجا" },
    { value: "RasGharib", label: "رأس غارب" }
  ],
  "New Valley": [
    { value: "Kharga", label: "الخارجة" },
    { value: "Dakhla", label: "الداخلة" }
  ],
  "Matruh": [
    { value: "MersaMatruh", label: "مرسى مطروح" },
    { value: "Siwa", label: "سيوة" }
  ],
  "North Sinai": [
    { value: "Arish", label: "العريش" },
    { value: "Rafah", label: "رفح" }
  ],
  "South Sinai": [
    { value: "SharmElSheikh", label: "شرم الشيخ" },
    { value: "Nuweiba", label: "نويبع" },
    { value: "Taba", label: "طابا" }
  ],
  "Port Said": [{ value: "Port Said", label: "بورسعيد" }],
  "Suez": [{ value: "Suez", label: "السويس" }],
  "Ismailia": [{ value: "Ismailia", label: "الإسماعيلية" }],
  "Damietta": [
    { value: "Damietta", label: "دمياط" },
    { value: "Ras El Bar", label: "رأس البر" }
  ]
};

/* ---------- Arabic names for provinces mapping ---------- */
const governorateArabic = {
  "Cairo":"القاهرة","Giza":"الجيزة","Alexandria":"الإسكندرية","Qalyubia":"القليوبية",
  "Sharqia":"الشرقية","Dakahlia":"الدقهلية","Gharbia":"الغربية","Monufia":"المنوفية",
  "Beheira":"البحيرة","Kafr El Sheikh":"كفر الشيخ","Fayoum":"الفيوم","Beni Suef":"بني سويف",
  "Minya":"المنيا","Assiut":"أسيوط","Sohag":"سوهاج","Qena":"قنا","Luxor":"الأقصر",
  "Aswan":"أسوان","Red Sea":"البحر الأحمر","New Valley":"الوادي الجديد","Matruh":"مطروح",
  "North Sinai":"شمال سيناء","South Sinai":"جنوب سيناء","Port Said":"بورسعيد","Suez":"السويس",
  "Ismailia":"الإسماعيلية","Damietta":"دمياط"
};

/* ---------- DOM Elements ---------- */
const govSelect = document.getElementById('governorate');
const citySelect = document.getElementById('city');
const fetchBtn = document.getElementById('fetchTimes');
const resultDiv = document.getElementById('result');
const sunsetInput = document.getElementById('sunset');
const fajrInput = document.getElementById('fajr');
const calcBtn = document.getElementById('calcBtn');
const resetBtn = document.getElementById('resetBtn');
const themeToggle = document.getElementById('themeToggle');

/* ---------- Populate Governorates ---------- */
function populateGovernorates(){
  Object.keys(egyptData).forEach(govEng => {
    const opt = document.createElement('option');
    opt.value = govEng;
    opt.textContent = governorateArabic[govEng] || govEng;
    govSelect.appendChild(opt);
  });
}
populateGovernorates();

/* ---------- Populate Cities ---------- */
govSelect.addEventListener('change', (e) => {
  const key = e.target.value;
  citySelect.innerHTML = '<option value="">-- اختر المدينة --</option>';
  sunsetInput.value = '';
  fajrInput.value = '';
  resultDiv.textContent = '';
  if (!key) return;
  (egyptData[key] || []).forEach(item => {
    const op = document.createElement('option');
    op.value = item.value;
    op.textContent = item.label;
    citySelect.appendChild(op);
  });
});

/* ---------- Helpers ---------- */
function parseTimeToMinutes(time){ if(!time)return 0; const [h,m]=time.split(':').map(Number); return h*60+(m||0);}
function formatTwo(n){ return String(n).padStart(2,'0');}
function showResult(html,type){ resultDiv.innerHTML=html; resultDiv.style.color=type==='danger'?'var(--danger)':'var(--card-text)'; }

/* ---------- API ---------- */
async function fetchPrayerTimesFor(cityEng){
  if(!govSelect.value){
    showResult('⚠️ يرجى اختيار المحافظة أولاً.', 'danger');
    return;
  }
  if(!cityEng){
    showResult('⚠️ يرجى اختيار المدينة أولاً.', 'danger');
    return;
  }

  showResult('⏳ جاري جلب المواعيد...');
  try{
    const url=`https://api.aladhan.com/v1/timingsByCity?city=${encodeURIComponent(cityEng)}&country=Egypt&method=5`;
    const resp=await fetch(url); const data=await resp.json();
    if(data?.code===200 && data.data?.timings){
      const normalize=t=>(t||'').split(' ')[0].trim();
      const fajr=normalize(data.data.timings.Fajr);
      const maghrib=normalize(data.data.timings.Maghrib||data.data.timings.Sunset);
      if(fajr)fajrInput.value=fajr; if(maghrib)sunsetInput.value=maghrib;
      const govArabic=governorateArabic[govSelect.value]||govSelect.value;
      const cityArabic=citySelect.options[citySelect.selectedIndex].text;
      showResult(`✔ تم تحميل الأوقات لمدينة <strong>${cityArabic}</strong> بمحافظة <strong>${govArabic}</strong>.`);
    }else showResult('❌ تعذّر جلب المواعيد، حاول لاحقًا أو جرّب مدينة قريبة.', 'danger');
  }catch(err){ console.error(err); showResult('❌ خطأ في الاتصال، تحقق من الإنترنت وحاول مجددًا.', 'danger'); }
}

/* ---------- حساب الثلث الأخير + حديث نبوي ---------- */
function calculateLastThirdFromInputs(){
  const maghrib=sunsetInput.value, fajr=fajrInput.value;
  if(!maghrib||!fajr){ showResult('⚠️ الرجاء تحميل أوقات المغرب والفجر أولاً.', 'danger'); return;}
  const mag=parseTimeToMinutes(maghrib); let faj=parseTimeToMinutes(fajr);
  if(faj<=mag) faj+=1440;
  const total=faj-mag, lastThirdStart=faj-total/3;
  const hour=Math.floor(lastThirdStart/60)%24, minute=Math.floor(lastThirdStart%60);
  const formatted=`${formatTwo(hour)}:${formatTwo(minute)}`;
  const today=new Date().toLocaleDateString('ar-EG',{weekday:'long',year:'numeric',month:'long',day:'numeric'});

  const ahadith = [
    "قال رسول الله ﷺ: «أفضل الصلاة بعد الفريضة صلاة الليل» (رواه مسلم)",
    "قال رسول الله ﷺ: «ينزل ربنا إلى السماء الدنيا حين يبقى ثلث الليل الآخر...» (متفق عليه)",
    "قال رسول الله ﷺ: «عليكم بقيام الليل، فإنه دأب الصالحين قبلكم...» (رواه الترمذي)",
    "قال رسول الله ﷺ: «من قام بعشر آيات لم يُكتب من الغافلين...» (رواه أبو داود)",
    "«تَتَجَافَىٰ جُنُوبُهُمْ عَنِ الْمَضَاجِعِ يَدْعُونَ رَبَّهُمْ خَوْفًا وَطَمَعًا وَمِمَّا رَزَقْنَاهُمْ يُنفِقُونَ » (السجدة: 16)",
    "عن أبي هريرة رضي الله عنه قال: قال رسول الله ﷺ: «أفضل الصيام بعد رمضان شهر الله المحرم، وأفضل الصلاة بعد الفريضة صلاة الليل» (رواه مسلم)"
  ];

  const randomHadith = ahadith[Math.floor(Math.random() * ahadith.length)];

  showResult(`
    <strong>📍 المحافظة:</strong> ${governorateArabic[govSelect.value] || govSelect.value}<br>
    <strong>🏙️ المدينة:</strong> ${citySelect.options[citySelect.selectedIndex]?.text || 'غير محددة'}<br>
    <strong>📅 التاريخ:</strong> ${today}<br>
    <strong>🌙 يبدأ الثلث الأخير من الليل عند:</strong> ${formatted}<br><br>
    <blockquote class="hadith">📖 ${randomHadith}</blockquote>
    <p class="tip">🌙 <em>نصيحة: اغتنم هذا الوقت في الدعاء والاستغفار، فإنها ساعة استجابة.</em></p>
  `);
}

/* ---------- reset ---------- */
function resetForm(){
  govSelect.selectedIndex=0;
  citySelect.innerHTML='<option value="">-- اختر المدينة --</option>';
  sunsetInput.value=fajrInput.value='';
  resultDiv.textContent='';
}

/* ---------- theme ---------- */
function applySavedTheme() {
  const saved = localStorage.getItem("themeMode");
  if (saved === "dark") document.body.classList.add("dark-mode");
  else document.body.classList.remove("dark-mode");
}

themeToggle.addEventListener("click", () => {
  const isDark = document.body.classList.toggle("dark-mode");
  localStorage.setItem("themeMode", isDark ? "dark" : "light");
});

/* ---------- listeners ---------- */
fetchBtn.addEventListener('click',()=>fetchPrayerTimesFor(citySelect.value));
calcBtn.addEventListener('click',calculateLastThirdFromInputs);
resetBtn.addEventListener('click',resetForm);
const manualBtn = document.getElementById('manualBtn');
manualBtn.addEventListener('click', () => {
  sunsetInput.removeAttribute('readonly');
  fajrInput.removeAttribute('readonly');
  showResult('✏️ يمكنك الآن إدخال أوقات المغرب والفجر يدويًا.', 'info');
});

/* ---------- init ---------- */
window.addEventListener('DOMContentLoaded',applySavedTheme);
