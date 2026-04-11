import { loadingSpinner, WEB_APP_URL } from "./config.js";
import dadProfileImg from '/assets/images/dad.jpeg';
import momProfileImg from '/assets/images/mom.jpeg';
import sonProfileImg from '/assets/images/son.jpeg';


const translations = {
    en: {
        appTitle1: "Our", appTitle2: "Daily Activities",
        subtitle: "We Wakeup At 5A.M Every Day And Go To Bed Early!",
        Family: "Family", Me: "Paa Paa", Wife: "Maa Maa", Son: "Son",
        totalSessions: "Total Sessions", effortTime: "Effort Time",
        FamilyView: "Family", MeView: "Paa Paa", WifeView: "Maa Maa",
        motto: "We Wakeup At 5A.M Every Day And Go To Bed Early!",
        timeline: "Timeline", sessions: "sessions",
        noActivity: "No activity found for this filter",
        duration: "Duration",
        types: {
            coding: "Coding", meditation: "Meditation", walking: "Walking",
            running: "Running", learning: "Learning", gym: "Gym",
            cardio: "Cardio", workout: "Workout", reading: "Reading", stretching: "Stretching"
        }
    },
    my: {
        appTitle1: "ဇနီးမောင်နှံ", appTitle2: "တိုးတက်ရေး",
        subtitle: "မနက် ၅ နာရီတိုင်းထပြီး စောစောအိပ်ကြသည်!",
        Family: "မိသားစု", Me: "ဖေကြီး", Wife: "မေကြီး", Son: "သားသား",
        totalSessions: "စုစုပေါင်းအကြိမ်", effortTime: "စုစုပေါင်းကြာချိန်",
        FamilyView: "မိသားစု", MeView: "ဖေကြီး", WifeView: "မေကြီး", SonView: "သားသား",
        motto: "မနက် ၅ နာရီတိုင်းထပြီး စောစောအိပ်ကြသည်!",
        timeline: "အချိန်မှတ်တမ်း", sessions: "ကြိမ်",
        noActivity: "ဤစစ်ထုတ်မှုအတွက် မှတ်တမ်းမရှိပါ",
        duration: "ကြာချိန်",
        types: {
            coding: "ကုဒ်ရေးခြင်း", meditation: "တရားထိုင်ခြင်း", walking: "လမ်းလျှောက်ခြင်း",
            running: "ပြေးခြင်း", learning: "လေ့လာခြင်း", gym: "အလေးမခြင်း",
            cardio: "နှလုံးကျန်းမာရေးလေ့ကျင့်ခန်း", workout: "လေ့ကျင့်ခန်း", reading: "စာဖတ်ခြင်း", stretching: "ကိုယ်လက်ဆန့်ခြင်း"
        }
    },
    ja: {
        appTitle1: "カップル", appTitle2: "スライヴ",
        subtitle: "毎朝5時に起きて、早寝早起きを徹底！",
        Family: "家族", Me: "パパ", Wife: "ママ", Son: "息子",
        totalSessions: "合計セッション", effortTime: "努力時間",
        FamilyView: "家族ビュー", MeView: "パパ", WifeView: "ママ", SonView: "息子",
        motto: "毎朝5時に起きて、早寝早起きを徹底！",
        timeline: "タイムライン", sessions: "セッション",
        noActivity: "アクティビティはありません",
        duration: "時間",
        types: {
            coding: "コーディング", meditation: "瞑想", walking: "ウォーキング",
            running: "ランニング", learning: "学習", gym: "筋トレ",
            cardio: "有酸素運動", workout: "ワークアウト", reading: "読書", stretching: "ストレッチ"
        }
    }
};

let currentLang = 'en';
let currentUser = 'Me';

/**
 * DATA STORAGE
 * In a live environment with a web server, you can fetch this from memory.json.
 * For the current preview environment, we keep it here to ensure it loads correctly.
 */
let memory = [];
// Sample Data
// [
//     { "user": "Me", "type": "Coding", "time": "02:30", "date": "2026-02-25" },
//     { "user": "Wife", "type": "Meditation", "time": "00:20", "date": "2026-02-25" },
//     { "user": "Me", "type": "Walking", "time": "00:45", "date": "2026-02-25", "distance": "4.2" },
//     { "user": "Wife", "type": "Running", "time": "00:40", "date": "2026-02-24", "distance": "6.2" },
//     { "user": "Me", "type": "Learning", "time": "00:30", "date": "2026-02-24" },
//     { "user": "Wife", "type": "Gym", "time": "01:00", "date": "2026-02-23" },
//     { "user": "Me", "type": "Gym", "time": "01:15", "date": "2026-02-23" },
//     { "user": "Me", "type": "Cardio", "time": "00:45", "date": "2026-02-22" },
//     { "user": "Wife", "type": "Meditation", "time": "00:15", "date": "2026-02-22" },
//     { "user": "Me", "type": "Coding", "time": "01:00", "date": "2026-01-15" },
//     { "user": "Wife", "type": "Running", "time": "00:30", "date": "2026-01-12", "distance": "4.0" },
//     { "user": "Me", "type": "Gym", "time": "00:45", "date": "2026-01-10" },
//     { "user": "Me", "type": "Gym", "time": "00:45", "date": "2026-01-09" },
//     { "user": "Me", "type": "Gym", "time": "00:45", "date": "2026-01-08" },
//     { "user": "Me", "type": "Gym", "time": "00:45", "date": "2026-02-1" }
// ]


const container = document.getElementById('memory-container');
const emptyState = document.getElementById('empty-state');
const displayArea = document.getElementById('displayArea');
const userImage = document.getElementById('userImage');


// Initial Load
if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
} else {
    loadData();
}

function configureUserImage(user) {
    console.log("Configuring image for user:", user);
    const img = new Image();
    if (user === 'Me' || user === 'Paa Paa') {
        img.src = dadProfileImg;
    }
    if (user === 'Wife' || user === 'Maa Maa') {
        img.src = momProfileImg;
    }
    if (user === 'Son') {
        img.src = sonProfileImg;
    }
    img.alt = "Dad Image";
    img.className = "w-full h-full rounded-full object-cover border-2 border-white shadow-sm";
    userImage.innerHTML = '';
    userImage.appendChild(img);
};

/**
 * Use this function in your local development environment (with a server).
 * Standard browsers block fetch requests to local file:// paths for security.
 */
async function loadData() {
    
    displayArea.innerHTML = loadingSpinner('Data Loading.....');
    container.innerHTML = '';
    
    configureUserImage(currentUser);
   
    try {
        const response = await fetch(WEB_APP_URL);
        const data = await response.json();

        const validRows = data.filter(row => row && row.length >= 5 && row[1] !== 'User');

        if (validRows.length === 0) {
            displayArea.innerHTML = `<p class="text-slate-400 text-center py-10 text-sm">The history is currently empty.</p>`;
            return;
        }

        memory = validRows.map(entry => {
            return {
                "user": entry[1],
                "type": entry[2],
                "date": entry[3],
                "time": entry[4],
                "distance": entry[5]
            };
        }).sort((a, b) => {
            return a.date.localeCompare(b.date);
        });

        renderMemories(memory);
        displayArea.innerHTML = '';

    } catch (error) {
        console.error('Fetch error:', error);
        displayArea.innerHTML = `<p class="text-red-500 text-center py-10 text-sm">Error connecting to database.</p>`;
    }
}

const changeLang = (lang) => {
    currentLang = lang;
    renderMemories(memory);
};
const btnLangEn = document.getElementById('lang-en');
const btnLangMy = document.getElementById('lang-my');
const btnLangJa = document.getElementById('lang-ja');

btnLangEn.addEventListener('click', () => changeLang('en'));
btnLangMy.addEventListener('click', () => changeLang('my'));
btnLangJa.addEventListener('click', () => changeLang('ja'));

const changeUser = (user) => {
    currentUser = user;
    // renderMemories(memory);
    loadData();
};

// const btnFamily = document.getElementById('btn-Family');
const btnMe = document.getElementById('btn-Me');
const btnWife = document.getElementById('btn-Wife');
const btnSon = document.getElementById('btn-Son');

// btnFamily.addEventListener('click', () => changeUser('Family'));
btnMe.addEventListener('click', () => changeUser('Me'));
btnWife.addEventListener('click', () => changeUser('Wife'));
btnSon.addEventListener('click', () => changeUser('Son'));

function toggleMonth(monthId) {
    const content = document.getElementById(`content-${monthId}`);
    const icon = document.getElementById(`icon-${monthId}`);
    content.classList.toggle('collapsed');
    icon.classList.toggle('rotated');
}

function t(key) {
    return translations[currentLang][key] || key;
}

function getTranslatedType(type) {
    const typeKey = type.toLowerCase();
    return translations[currentLang].types[typeKey] || type;
}

function updateStaticTexts() {
    document.getElementById('txt-appTitle1').innerText = t('appTitle1');
    document.getElementById('txt-appTitle2').innerText = t('appTitle2');
    // document.getElementById('txt-subtitle').innerText = t('subtitle');
    // document.getElementById('btn-Family').innerText = t('Family');
    document.getElementById('btn-Me').innerText = t('Me');
    document.getElementById('btn-Wife').innerText = t('Wife');
    document.getElementById('btn-Son').innerText = t('Son');
    document.getElementById('txt-totalSessions').innerText = t('totalSessions');
    document.getElementById('txt-effortTime').innerText = t('effortTime');
    document.getElementById('txt-motto').innerText = t('motto');
    document.getElementById('txt-timeline').innerText = t('timeline');
    document.getElementById('txt-noActivity').innerText = t('noActivity');
    
    document.querySelectorAll('[id^="lang-"]').forEach(btn => btn.classList.remove('lang-active'));
    document.getElementById(`lang-${currentLang}`).classList.add('lang-active');
}

function renderMemories(activitiesMemory) {
    updateStaticTexts();

    document.querySelectorAll('.user-tab').forEach(btn => btn.classList.remove('user-tab-active'));
    const activeTab = document.getElementById(`btn-${currentUser}`);
    if (activeTab) activeTab.classList.add('user-tab-active');
    document.getElementById('active-user-label').innerText = t(`${currentUser}`);

    container.innerHTML = '';
    const filteredMemory = activitiesMemory.filter(item => {
        if(currentUser === 'Family'){
            return item
        }
        if(currentUser === 'Me'){
            return item.user === 'Me' || item.user === 'Paa Paa';
        } 
        if(currentUser === 'Wife'){
            return item.user === 'Wife' || item.user === 'Maa Maa';
        }
        if(currentUser === 'Son'){
            return item.user === 'Son';
        }
    });

    if (filteredMemory.length === 0) {
        emptyState.classList.remove('hidden');
        container.classList.add('hidden');
        document.getElementById('stat-count').innerText = "0";
        document.getElementById('stat-time').innerText = "0m";
        lucide.createIcons();
        return;
    }

    emptyState.classList.add('hidden');
    container.classList.remove('hidden');

    const currentMonthName = new Date().toLocaleString(currentLang, { month: 'long', year: 'numeric' });

    const monthlyData = {};
    let globalTotalMinutes = 0;

    filteredMemory.forEach(item => {
        const dateObj = new Date(item.date);
        const monthName = dateObj.toLocaleString(currentLang, { month: 'long', year: 'numeric' });
        const dateKey = item.date;

        const [hrs, mins] = (item.time || "00:00").split(':').map(Number);
        globalTotalMinutes += (hrs * 60) + mins;

        if (!monthlyData[monthName]) monthlyData[monthName] = {};
        if (!monthlyData[monthName][dateKey]) monthlyData[monthName][dateKey] = [];
        monthlyData[monthName][dateKey].push(item);
    });

    const sortedMonths = Object.keys(monthlyData).sort((a, b) => {
        const firstA = Object.keys(monthlyData[a])[0];
        const firstB = Object.keys(monthlyData[b])[0];
        return new Date(firstB) - new Date(firstA);
    });

    sortedMonths.forEach((month, mIdx) => {
        const monthId = `month-${mIdx}`;
        const monthContainer = document.createElement('div');
        monthContainer.className = "bg-white rounded-[2.5rem] border border-slate-200 shadow-sm overflow-hidden mb-6";

        let monthMinutes = 0;
        let monthSessions = 0;
        const activitySummary = {}; 

        Object.values(monthlyData[month]).forEach(dayItems => {
            monthSessions += dayItems.length;
            dayItems.forEach(item => {
                const [h, m] = item.time.split(':').map(Number);
                const duration = (h * 60) + m;
                monthMinutes += duration;
                if (!activitySummary[item.type]) activitySummary[item.type] = { km: 0, min: 0 };
                if (item.distance) activitySummary[item.type].km += parseFloat(item.distance);
                activitySummary[item.type].min += duration;
            });
        });

        const summaryParts = Object.keys(activitySummary).map(type => {
            const data = activitySummary[type];
            const translatedType = getTranslatedType(type);
            return data.km > 0 
                ? `<span class="whitespace-nowrap">${translatedType} <span class="text-slate-800 font-black">${data.km.toFixed(1)}KM</span></span>`
                : `<span class="whitespace-nowrap">${translatedType} <span class="text-slate-800 font-black">${formatDuration(data.min)}</span></span>`;
        });

        const monthHeader = document.createElement('button');
        monthHeader.className = "w-full p-7 bg-slate-50 hover:bg-slate-100/50 transition-colors border-b border-slate-200 text-left focus:outline-none";
        monthHeader.onclick = () => toggleMonth(monthId);

        monthHeader.innerHTML = `
            <div class="flex items-start gap-5 w-full">
                <div id="icon-${monthId}" class="rotate-icon text-slate-300 mt-1"><i data-lucide="chevron-down" class="w-6 h-6"></i></div>
                <div class="flex-grow">
                    <div class="flex flex-col sm:flex-row sm:items-center justify-between w-full mb-2">
                        <h3 class="text-xl font-black text-slate-800 uppercase tracking-tighter">${month}</h3>
                        <div class="flex items-center gap-3 mt-2 sm:mt-0">
                            <span class="text-[10px] font-black text-slate-400 uppercase tracking-widest">${monthSessions} ${t('sessions')}</span>
                            <span class="w-1.5 h-1.5 bg-slate-200 rounded-full"></span>
                            <span class="text-sm font-black text-indigo-600 uppercase tracking-tighter">${formatTotalTime(monthMinutes)}</span>
                        </div>
                    </div>
                    <div class="flex flex-wrap gap-x-4 gap-y-2 text-[10px] text-slate-400 uppercase tracking-[0.15em] font-bold">${summaryParts.join('<span class="text-slate-200 text-base leading-none">/</span>')}</div>
                </div>
            </div>
        `;

        const monthContent = document.createElement('div');
        monthContent.id = `content-${monthId}`;
        monthContent.className = "month-content p-7 space-y-8";
        if (month !== currentMonthName) monthContent.classList.add('collapsed');

        const sortedDays = Object.keys(monthlyData[month]).sort((a, b) => new Date(b) - new Date(a));
        sortedDays.forEach(date => {
            const dayGroup = document.createElement('div');
            dayGroup.className = "space-y-3";
            dayGroup.innerHTML = `<h4 class="text-[10px] font-black text-slate-300 uppercase tracking-[0.3em] mb-4 flex items-center gap-4"><span>${formatDate(date)}</span><div class="h-px bg-slate-100 flex-grow"></div></h4>`;

            monthlyData[month][date].forEach(item => {
                const config = getActivityConfig(item.type);
                const row = document.createElement('div');
                row.className = "group relative bg-white p-4 rounded-2xl border border-slate-100 flex items-center justify-between hover:border-indigo-100 hover:shadow-sm transition-all";
                row.innerHTML = `
                    <div class="flex items-center gap-4">
                        <div class="p-2.5 rounded-xl ${config.colorClass} shadow-sm group-hover:scale-110 transition-transform"><i data-lucide="${config.icon}" class="w-5 h-5"></i></div>
                        <div class="flex flex-col"><div class="flex items-center">
                            <span class="text-sm font-extrabold text-slate-700">${getTranslatedType(item.type)}</span>
                            ${item.distance != '-' ? `<span class="inline-flex items-center text-[9px] font-black px-2 py-0.5 rounded bg-indigo-50 text-indigo-500 border border-indigo-100 ml-2 uppercase tracking-tighter">${item.distance} km</span>` : ''}
                            ${currentUser === 'Family' ? `<span class="ml-2 text-[9px] font-black ${item.user === 'Me' || item.user === 'Paa Paa' ? 'text-blue-500 bg-blue-50' : 'text-rose-500 bg-rose-50'} px-2 py-0.5 rounded-full uppercase tracking-widest border border-current opacity-70">${t(item.user)}</span>` : ''}
                        </div></div>
                    </div>
                    <div class="text-right">
                        <span class="text-lg font-black font-mono text-slate-800 tracking-tighter">${item.time}</span>
                        <p class="text-[8px] font-black text-slate-300 uppercase tracking-widest">${t('duration')}</p>
                    </div>
                `;
                dayGroup.appendChild(row);
            });
            monthContent.appendChild(dayGroup);
        });

        monthContainer.appendChild(monthHeader);
        monthContainer.appendChild(monthContent);
        container.appendChild(monthContainer);
        if (month !== currentMonthName) {
            const icon = monthHeader.querySelector(`#icon-${monthId}`);
            if (icon) icon.classList.add('rotated');
        }
    });

    document.getElementById('stat-count').innerText = filteredMemory.length;
    document.getElementById('stat-time').innerText = formatTotalTime(globalTotalMinutes);
    document.getElementById('entry-count-label').innerText = `${filteredMemory.length} ${t('sessions')}`;
    lucide.createIcons();
}

function getActivityConfig(typeStr) {
    const type = (typeStr || 'Workout').toLowerCase();
    if (type.includes('learn')) return { icon: 'book-open', colorClass: 'bg-amber-100 text-amber-600' };
    if (type.includes('read')) return { icon: 'book', colorClass: 'bg-cyan-100 text-cyan-600' };
    if (type.includes('cardio')) return { icon: 'heart', colorClass: 'bg-rose-100 text-rose-600' };
    if (type.includes('gym')) return { icon: 'dumbbell', colorClass: 'bg-slate-100 text-slate-600' };
    if (type.includes('walk')) return { icon: 'footprints', colorClass: 'bg-emerald-100 text-emerald-600' };
    if (type.includes('run')) return { icon: 'sport-shoe', colorClass: 'bg-orange-100 text-orange-600' };
    if (type.includes('meditation')) return { icon: 'sparkles', colorClass: 'bg-purple-100 text-purple-600' };
    if (type.includes('coding')) return { icon: 'laptop', colorClass: 'bg-blue-100 text-blue-600' };
    return { icon: 'activity', colorClass: 'bg-indigo-100 text-indigo-600' };
}

function formatDate(dateStr) {
    if (!dateStr || dateStr === 'Unknown Date') return dateStr;
    try { return new Date(dateStr).toLocaleDateString(currentLang, { month: 'short', day: 'numeric' }); }
    catch(e) { return dateStr; }
}

function formatTotalTime(minutes) {
    const h = Math.floor(minutes / 60);
    const m = minutes % 60;
    return h === 0 ? `${m}m` : `${h}H ${m}M`;
}

function formatDuration(minutes) {
    const h = Math.floor(minutes / 60);
    const m = minutes % 60;
    return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}`;
}