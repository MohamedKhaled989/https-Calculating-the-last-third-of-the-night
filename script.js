let currentCity = "Cairo"; // Default to Egypt
let currentCountry = "Egypt"; // Default to Egypt

function parseTimeToMinutes(time) {
    const [hour, minute] = time.split(":").map(Number);
    return hour * 60 + minute;
}

function calculateLastThird() {
    const sunsetTime = document.getElementById("sunset").value;
    const fajrTime = document.getElementById("fajr").value;
    const resultDiv = document.getElementById("result");

    resultDiv.textContent = "";
    resultDiv.style.color = "#333";
    resultDiv.style.background = "#f9f9f9";

    if (!sunsetTime || !fajrTime) {
        resultDiv.textContent = "يرجى إدخال وقت المغرب والفجر.";
        resultDiv.style.color = "red";
        return;
    }

    const sunsetMinutes = parseTimeToMinutes(sunsetTime);
    let fajrMinutes = parseTimeToMinutes(fajrTime);
    if (fajrMinutes <= sunsetMinutes) {
        fajrMinutes += 24 * 60;
    }
    if (fajrMinutes - sunsetMinutes <= 0) {
        resultDiv.textContent = "وقت الفجر يجب أن يكون بعد وقت المغرب.";
        resultDiv.style.color = "red";
        return;
    }

    const totalNightMinutes = fajrMinutes - sunsetMinutes;
    const lastThirdStart = fajrMinutes - (totalNightMinutes / 3);
    const lastThirdHour = Math.floor(lastThirdStart / 60) % 24;
    const lastThirdMinute = Math.floor(lastThirdStart % 60);
    const formattedTime = `${String(lastThirdHour).padStart(2, "0")}:${String(lastThirdMinute).padStart(2, "0")}`;

    resultDiv.innerHTML = `<strong>يبدأ الثلث الأخير من الليل عند: ${formattedTime}</strong><br><em>وقد قال رسول الله صلى الله عليه وسلم: 'صلاة الليل مثنى مثنى'.</em>`;
    resultDiv.style.color = "#228b22";
}

async function fetchPrayerTimes() {
    const date = document.getElementById("date").value || new Date().toISOString().split('T')[0];
    const method = document.getElementById("method").value;
    const resultDiv = document.getElementById("result");

    resultDiv.textContent = "جاري التحميل...";
    resultDiv.style.color = "#333";

    try {
        const response = await fetch(`https://api.aladhan.com/v1/timingsByCity/${date}?city=${currentCity}&country=${currentCountry}&method=${method}`);
        const data = await response.json();
        if (data.code === 200) {
            const timings = data.data.timings;
            document.getElementById("sunset").value = timings.Maghrib;
            document.getElementById("fajr").value = timings.Fajr;
            resultDiv.textContent = `تم تحميل الأوقات لـ ${currentCity}, ${currentCountry} بتاريخ ${date}.`;
            resultDiv.style.color = "#228b22";
        } else {
            throw new Error("فشل في تحميل الأوقات.");
        }
    } catch (error) {
        resultDiv.textContent = "خطأ في تحميل الأوقات. تحقق من الاتصال أو أدخل الأوقات يدوياً.";
        resultDiv.style.color = "red";
    }
}

async function reverseGeocode(lat, lon) {
    try {
        const response = await fetch(`https://api.opencagedata.com/geocode/v1/json?q=${lat}+${lon}&key=your_api_key_here&language=ar`); // Replace with your OpenCage API key
        const data = await response.json();
        if (data.results && data.results.length > 0) {
            const components = data.results[0].components;
            currentCity = components.city || components.town || components.village || "Cairo";
            currentCountry = components.country || "Egypt";
        } else {
            throw new Error("No results from geocoding.");
        }
    } catch (error) {
        console.warn("Geocoding failed, using Egypt defaults:", error);
        currentCity = "Cairo";
        currentCountry = "Egypt";
    }
}

function getLocationAndFetch() {
    const resultDiv = document.getElementById("result");
    resultDiv.textContent = "جاري الحصول على الموقع...";
    resultDiv.style.color = "#333";

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(async (position) => {
            const { latitude, longitude } = position.coords;
            await reverseGeocode(latitude, longitude);
            await fetchPrayerTimes();
        }, (error) => {
            console.error("Geolocation error:", error);
            resultDiv.textContent = "فشل في الحصول على الموقع. استخدم الإدخال اليدوي أو تحقق من إعدادات الموقع.";
            resultDiv.style.color = "red";
            // Fallback to Egypt
            currentCity = "Cairo";
            currentCountry = "Egypt";
        });
    } else {
        resultDiv.textContent = "الموقع غير مدعوم في هذا المتصفح.";
        resultDiv.style.color = "red";
    }
}

function resetForm() {
    document.getElementById("date").value = "";
    document.getElementById("sunset").value = "";
    document.getElementById("fajr").value = "";
    document.getElementById("result").textContent = "";
    currentCity = "Cairo";
    currentCountry = "Egypt";
}

window.onload = () => {
    const today = new Date().toISOString().split('T')[0];
    document.getElementById("date").value = today; // Auto-set to today
    // Optional: fetchPrayerTimes(); // Uncomment to auto-load on page load
};