// script.js
function calculateLastThird() {
    const sunsetTime = document.getElementById("sunset").value;
    const fajrTime = document.getElementById("fajr").value;

    if (!sunsetTime || !fajrTime) {
        alert("يرجى إدخال وقت المغرب والفجر.");
        return;
    }

    // تحويل الوقت إلى دقائق من منتصف الليل
    const [sunsetHour, sunsetMinute] = sunsetTime.split(":").map(Number);
    const [fajrHour, fajrMinute] = fajrTime.split(":").map(Number);
    
    let sunsetInMinutes = sunsetHour * 60 + sunsetMinute;
    let fajrInMinutes = fajrHour * 60 + fajrMinute;

    // التأكد من أن الفجر يقع في اليوم التالي
    if (fajrInMinutes <= sunsetInMinutes) {
        fajrInMinutes += 24 * 60; // إضافة 24 ساعة
    }

    // حساب مدة الليل الإجمالية
    const totalNightMinutes = fajrInMinutes - sunsetInMinutes;
    
    // حساب الثلث الأخير
    const lastThirdStart = fajrInMinutes - (totalNightMinutes / 3);

    // تحويل الوقت إلى صيغة ساعات ودقائق
    const lastThirdHour = Math.floor(lastThirdStart / 60) % 24;
    const lastThirdMinute = Math.floor(lastThirdStart % 60);

    // تنسيق العرض (مع إضافة صفر للرقم الأحادي)
    const formattedTime = `${String(lastThirdHour).padStart(2, "0")}:${String(lastThirdMinute).padStart(2, "0")}`;
    
    document.getElementById("result").textContent = `يبدأ الثلث الأخير من الليل عند: ${formattedTime}`;
}
