import { WEB_APP_URL, getBasePath, loadingSpinner, tokenCheck } from "./config.js";

const authenticating = document.getElementById('authenticating');
const mainContainer = document.getElementById('mainContainer');
const form = document.getElementById('userForm');
const submitBtn = document.getElementById('submitBtn');
const btnText = document.getElementById('btnText');
const btnLoader = document.getElementById('btnLoader');
const statusMsg = document.getElementById('statusMessage');
const displayArea = document.getElementById('displayArea');
const user =document.getElementById('user');
const typeSelect = document.getElementById('type');
const distanceContainer = document.getElementById('distanceContainer');
const distanceInput = document.getElementById('distance');
const loadDataBtn = document.getElementById('loadDataBtn');
const logoutBtn = document.getElementById('logoutBtn');
const admin = document.getElementById('adminName');
const timeInputContainer = document.getElementById('timeInputContainer');
const happyBirthday = document.getElementById('happyBirthday');
const userPageLink = document.getElementById('userPage');
userPageLink.onclick = () => { window.open(getBasePath(), '_blank'); };

// Set default date and time to now
const now = new Date().toLocaleDateString(('ja-JP'), { year: 'numeric', month: '2-digit', day: '2-digit' }).split('/').join('-');
document.getElementById('date').value = now;

const durationOptions = [
    '00:15', '00:30', '00:45', '01:00', '01:15', '01:30', 
    '01:45', '02:00', '02:15', '02:30', '02:45', '03:00'
];

// Load Data
async function loadData() {
    if (WEB_APP_URL.includes('YOUR_WEB_APP_URL')) return;

    displayArea.innerHTML = loadingSpinner('Data Loading .....');

    try {
        const response = await fetch(WEB_APP_URL);
        const data = await response.json();
        const memory = data.sort((a, b) => {
            const dateA = a[3];
            const dateB = b[3];
            return dateA.localeCompare(dateB);
        });
        renderData(memory);
    } catch (error) {
        console.error('Fetch error:', error);
        displayArea.innerHTML = `<p class="text-red-500 text-center py-10 text-sm">Error connecting to database.</p>`;
    }
}

loadDataBtn.addEventListener("click", loadData);

const init = async () => {
    const result = await tokenCheck('admin'); 
    if(result && result.status === 'success'){
        admin.textContent = result.name;
        user.value = result.user;
        if(result.birthdayInfo.today){
            birthdayWish(result.birthdayInfo);
        }
        authenticating.classList.add('hidden');
        mainContainer.classList.remove('hidden');
        loadData();
    }
};

if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
} else {
    init();
}

// Handle Distance Visibility
function toggleDistanceVisibility() {
    const selectedType = typeSelect.value;
    if (['Walking', 'Running'].includes(selectedType)) {
        distanceContainer.classList.remove('hidden');
        distanceInput.required = true;
        timeInputContainer.innerHTML = `
            <input type="time" id="time" step="1" required value="00:00:00" class="w-full px-4 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition">
        `;
    } else {
        distanceContainer.classList.add('hidden');
        distanceInput.required = false;
        distanceInput.value = '';

        let optionsHtml = durationOptions.map(opt => `<option value="${opt}">${opt}</option>`).join('');
        timeInputContainer.innerHTML = `
            <select id="time" required class="w-full px-4 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition bg-white">
                ${optionsHtml}
            </select>
        `;
    }
}

typeSelect.addEventListener('change', toggleDistanceVisibility);
toggleDistanceVisibility();

// Handle Submission
form.addEventListener('submit', async function(e) {
    e.preventDefault();
    
    if (WEB_APP_URL.includes('YOUR_WEB_APP_URL')) {
        showMessage('Please provide a valid Web App URL.', 'error');
        return;
    }

    setLoading(true);

    const payload = {
        user: String(user.value),
        type: String(document.getElementById('type').value),
        date: "'" + String(document.getElementById('date').value), // Forced Plain Text
        time: "'" + String(document.getElementById('time').value), // Forced Plain Text
        distance: distanceInput.value ? String(distanceInput.value) : '-',
        admin: admin.textContent
    };

    try {
        await fetch(WEB_APP_URL, {
            method: 'POST',
            mode: 'no-cors',
            cache: 'no-cache',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });

        showMessage('Activity successfully recorded!', 'success');
        form.reset();
        
        // Reset defaults
        const resetNow = new Date();
        document.getElementById('date').valueAsDate = resetNow;
        document.getElementById('time').value = resetNow.toTimeString().substring(0, 5);
        
        toggleDistanceVisibility();
        
        // Fetch data after a short delay to allow Google Sheets to process
        setTimeout(loadData, 1000);

    } catch (error) {
        console.error('Error:', error);
        showMessage('Network error. Check console.', 'error');
    } finally {
        setLoading(false);
    }
});

/**
 * Renders the rows from the spreadsheet.
 * Assumes data structure: [Timestamp, User, Type, Date, Time, Distance]
 */
function renderData(rows) {
    // Filter out empty rows or headers if they exist
    const validRows = rows.filter(row => row && row.length >= 5 && row[1] !== 'User');

    if (validRows.length === 0) {
        displayArea.innerHTML = `<p class="text-slate-400 text-center py-10 text-sm">The history is currently empty.</p>`;
        return;
    }

    // We reverse the array to show the newest entries at the top
    const sortedRows = [...validRows].reverse();

    displayArea.innerHTML = sortedRows.map(row => {
        const id = row[0]; // Assuming the first column is a unique ID or timestamp
        const userName = row[1];
        const activityType = row[2];
        const activityDate = row[3];
        const activityTime = row[4];
        const distanceValue = row[5];
        
        const isCardio = ['Walking', 'Running'].includes(activityType);
        const userColorClass = userName === 'Wife' || userName === 'Maa Maa' ? 'bg-pink-100 text-pink-700' : 'bg-blue-100 text-blue-700';

        return `
        <div class="p-4 bg-white border border-slate-100 rounded-xl hover:border-slate-300 hover:shadow-md transition-all group">
            <div class="flex justify-between items-start mb-2">
                <span class="px-2 py-0.5 ${userColorClass} text-[10px] font-bold rounded uppercase tracking-wider">${userName}</span>
                <div class="flex items-center gap-2">
                        <div class="text-[10px] text-slate-400 font-medium">${activityDate}</div>
                        <button class='hidden' onclick="startEdit(${id})" 
                                class="p-1.5 text-slate-300 hover:text-blue-500 hover:bg-blue-50 transition-all rounded-md" title="Edit entry">
                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"></path></svg>
                        </button>
                </div>
            </div>
            <div class="flex items-end justify-between">
                <div>
                    <span class="block text-xs text-slate-400 uppercase font-semibold tracking-tight">Activity</span>
                    <span class="font-bold text-slate-800 text-lg">${activityType}</span>
                </div>
                ${isCardio && distanceValue !== '-' ? `
                    <div class="text-right">
                        <span class="block text-xs text-slate-400 uppercase font-semibold tracking-tight">Distance</span>
                        <span class="text-blue-600 font-black text-xl">${distanceValue} <span class="text-[10px] text-slate-400 font-normal ml-0.5">KM (${activityTime})</span></span>
                    </div>
                ` : ''}
                ${!isCardio && distanceValue == '-' ? `
                    <div class="text-right">
                        <span class="block text-xs text-slate-400 uppercase font-semibold tracking-tight">Duration</span>
                        <span class="text-blue-600 font-black text-xl">${activityTime}</span>
                    </div>
                ` : ''}
            </div>
        </div>
        `;
    }).join('');
}

function startEdit(id) {
    console.log('Edit entry with ID:', id);
    
    // Populate form
    document.getElementById('user').value = user;
    document.getElementById('type').value = type;
    document.getElementById('date').value = date;
    document.getElementById('time').value = time;
    distanceInput.value = distance === '-' ? '' : distance;
    
    // UI Feedback
    formTitle.innerHTML = `<svg class="w-5 h-5 mr-2 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path></svg> Editing Entry`;
    btnText.textContent = 'Update Entry';
    cancelEditBtn.classList.remove('hidden');
    
    toggleDistanceVisibility();
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function setLoading(isLoading) {
    submitBtn.disabled = isLoading;
    if (isLoading) {
        btnText.textContent = 'Submitting Data...';
        btnLoader.classList.remove('hidden');
        submitBtn.classList.add('opacity-80', 'cursor-not-allowed');
    } else {
        btnText.textContent = 'Save to Spreadsheet';
        btnLoader.classList.add('hidden');
        submitBtn.classList.remove('opacity-80', 'cursor-not-allowed');
    }
}

function showMessage(text, type) {
    statusMsg.textContent = text;
    statusMsg.className = `mt-4 p-3 rounded-lg text-sm text-center block font-medium ${
        type === 'success' ? 'bg-green-50 text-green-700 border border-green-100' : 'bg-red-50 text-red-700 border border-red-100'
    }`;
    setTimeout(() => statusMsg.classList.add('hidden'), 5000);
}

function birthdayWish(birthdayInfo){ 
    happyBirthday.textContent = birthdayInfo.message;
    happyBirthday.classList.remove('hidden');
}

function logout() {
    document.cookie = "userToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    window.location.href = getBasePath() + "admin/login/";
}

logoutBtn.addEventListener("click", logout);