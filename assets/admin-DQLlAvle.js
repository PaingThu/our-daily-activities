import{a as e,i as t,n,o as r,r as i,t as a}from"./config-gCVx2Jys.js";r((async()=>{await i();var r=document.getElementById(`authenticating`),o=document.getElementById(`mainContainer`),s=document.getElementById(`userForm`),c=document.getElementById(`submitBtn`),l=document.getElementById(`btnText`),u=document.getElementById(`btnLoader`),d=document.getElementById(`statusMessage`),f=document.getElementById(`displayArea`),p=document.getElementById(`user`),m=document.getElementById(`type`),h=document.getElementById(`distanceContainer`),g=document.getElementById(`distance`),_=document.getElementById(`loadDataBtn`),v=document.getElementById(`logoutBtn`),y=document.getElementById(`adminName`),b=document.getElementById(`timeInputContainer`),x=document.getElementById(`happyBirthday`),S=document.getElementById(`userPage`);S.onclick=()=>{window.open(n(),`_blank`)};var C=new Date().toLocaleDateString(`ja-JP`,{year:`numeric`,month:`2-digit`,day:`2-digit`}).split(`/`).join(`-`);document.getElementById(`date`).value=C;var w=[`00:15`,`00:30`,`00:45`,`01:00`,`01:15`,`01:30`,`01:45`,`02:00`,`02:15`,`02:30`,`02:45`,`03:00`];async function T(){if(!`https://script.google.com/macros/s/AKfycbzgsuA7_mjRWvpcuagCPKYlE91vxq0V2M4XGXT9udM3yLZ2mvr8TBL0eFYv7VvoVnpK/exec`.includes(`YOUR_WEB_APP_URL`)){f.innerHTML=t(`Data Loading .....`);try{O((await(await fetch(a)).json()).sort((e,t)=>{let n=e[3],r=t[3];return n.localeCompare(r)}))}catch(e){console.error(`Fetch error:`,e),f.innerHTML=`<p class="text-red-500 text-center py-10 text-sm">Error connecting to database.</p>`}}}_.addEventListener(`click`,T);var E=async()=>{let t=await e(`admin`);t&&t.status===`success`&&(y.textContent=t.name,p.value=t.user,t.birthdayInfo.today&&j(t.birthdayInfo),r.classList.add(`hidden`),o.classList.remove(`hidden`),T())};document.readyState===`loading`?document.addEventListener(`DOMContentLoaded`,E):E();function D(){let e=m.value;[`Walking`,`Running`].includes(e)?(h.classList.remove(`hidden`),g.required=!0,b.innerHTML=`
            <input type="time" id="time" step="1" required value="00:00:00" class="w-full px-4 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition">
        `):(h.classList.add(`hidden`),g.required=!1,g.value=``,b.innerHTML=`
            <select id="time" required class="w-full px-4 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition bg-white">
                ${w.map(e=>`<option value="${e}">${e}</option>`).join(``)}
            </select>
        `)}m.addEventListener(`change`,D),D(),s.addEventListener(`submit`,async function(e){if(e.preventDefault(),`https://script.google.com/macros/s/AKfycbzgsuA7_mjRWvpcuagCPKYlE91vxq0V2M4XGXT9udM3yLZ2mvr8TBL0eFYv7VvoVnpK/exec`.includes(`YOUR_WEB_APP_URL`)){A(`Please provide a valid Web App URL.`,`error`);return}k(!0);let t={user:String(p.value),type:String(document.getElementById(`type`).value),date:`'`+String(document.getElementById(`date`).value),time:`'`+String(document.getElementById(`time`).value),distance:g.value?String(g.value):`-`,admin:y.textContent};try{await fetch(a,{method:`POST`,mode:`no-cors`,cache:`no-cache`,headers:{"Content-Type":`application/json`},body:JSON.stringify(t)}),A(`Activity successfully recorded!`,`success`),s.reset();let e=new Date;document.getElementById(`date`).valueAsDate=e,document.getElementById(`time`).value=e.toTimeString().substring(0,5),D(),setTimeout(T,1e3)}catch(e){console.error(`Error:`,e),A(`Network error. Check console.`,`error`)}finally{k(!1)}});function O(e){let t=e.filter(e=>e&&e.length>=5&&e[1]!==`User`);if(t.length===0){f.innerHTML=`<p class="text-slate-400 text-center py-10 text-sm">The history is currently empty.</p>`;return}f.innerHTML=[...t].reverse().map(e=>{let t=e[0],n=e[1],r=e[2],i=e[3],a=e[4],o=e[5],s=[`Walking`,`Running`].includes(r);return`
        <div class="p-4 bg-white border border-slate-100 rounded-xl hover:border-slate-300 hover:shadow-md transition-all group">
            <div class="flex justify-between items-start mb-2">
                <span class="px-2 py-0.5 ${n===`Wife`||n===`Maa Maa`?`bg-pink-100 text-pink-700`:`bg-blue-100 text-blue-700`} text-[10px] font-bold rounded uppercase tracking-wider">${n}</span>
                <div class="flex items-center gap-2">
                        <div class="text-[10px] text-slate-400 font-medium">${i}</div>
                        <button class='hidden' onclick="startEdit(${t})" 
                                class="p-1.5 text-slate-300 hover:text-blue-500 hover:bg-blue-50 transition-all rounded-md" title="Edit entry">
                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"></path></svg>
                        </button>
                </div>
            </div>
            <div class="flex items-end justify-between">
                <div>
                    <span class="block text-xs text-slate-400 uppercase font-semibold tracking-tight">Activity</span>
                    <span class="font-bold text-slate-800 text-lg">${r}</span>
                </div>
                ${s&&o!==`-`?`
                    <div class="text-right">
                        <span class="block text-xs text-slate-400 uppercase font-semibold tracking-tight">Distance</span>
                        <span class="text-blue-600 font-black text-xl">${o} <span class="text-[10px] text-slate-400 font-normal ml-0.5">KM (${a})</span></span>
                    </div>
                `:``}
                ${!s&&o==`-`?`
                    <div class="text-right">
                        <span class="block text-xs text-slate-400 uppercase font-semibold tracking-tight">Duration</span>
                        <span class="text-blue-600 font-black text-xl">${a}</span>
                    </div>
                `:``}
            </div>
        </div>
        `}).join(``)}function k(e){c.disabled=e,e?(l.textContent=`Submitting Data...`,u.classList.remove(`hidden`),c.classList.add(`opacity-80`,`cursor-not-allowed`)):(l.textContent=`Save to Spreadsheet`,u.classList.add(`hidden`),c.classList.remove(`opacity-80`,`cursor-not-allowed`))}function A(e,t){d.textContent=e,d.className=`mt-4 p-3 rounded-lg text-sm text-center block font-medium ${t===`success`?`bg-green-50 text-green-700 border border-green-100`:`bg-red-50 text-red-700 border border-red-100`}`,setTimeout(()=>d.classList.add(`hidden`),5e3)}function j(e){x.textContent=e.message,x.classList.remove(`hidden`)}function M(){document.cookie=`userToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`,window.location.href=n()+`admin/login/`}v.addEventListener(`click`,M)}))();