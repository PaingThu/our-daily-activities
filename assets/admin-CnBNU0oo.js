import{a as e,i as t,n,o as r,r as i,s as a,t as o}from"./config-CssH42La.js";a((async()=>{await t();var a=document.getElementById(`authenticating`),s=document.getElementById(`mainContainer`),c=document.getElementById(`userForm`),l=document.getElementById(`submitBtn`),u=document.getElementById(`btnText`),d=document.getElementById(`btnLoader`),f=document.getElementById(`statusMessage`),p=document.getElementById(`displayArea`),m=document.getElementById(`user`),h=document.getElementById(`type`),g=document.getElementById(`distanceContainer`),_=document.getElementById(`distance`),v=document.getElementById(`loadDataBtn`),y=document.getElementById(`logoutBtn`),b=document.getElementById(`adminName`),x=document.getElementById(`timeInputContainer`),S=document.getElementById(`happyBirthday`),C=document.getElementById(`userPage`);C.onclick=()=>{window.open(i(),`_blank`)};var w=new Date().toLocaleDateString(`ja-JP`,{year:`numeric`,month:`2-digit`,day:`2-digit`}).split(`/`).join(`-`);document.getElementById(`date`).value=w;var T=[`00:15`,`00:30`,`00:45`,`01:00`,`01:15`,`01:30`,`01:45`,`02:00`,`02:15`,`02:30`,`02:45`,`03:00`];async function E(){if(!`https://script.google.com/macros/s/AKfycbzgsuA7_mjRWvpcuagCPKYlE91vxq0V2M4XGXT9udM3yLZ2mvr8TBL0eFYv7VvoVnpK/exec`.includes(`YOUR_WEB_APP_URL`)){p.innerHTML=e(`Data Loading .....`);try{k((await(await fetch(n)).json()).sort((e,t)=>{let n=e[3],r=t[3];return n.localeCompare(r)}))}catch(e){console.error(`Fetch error:`,e),p.innerHTML=`<p class="text-red-500 text-center py-10 text-sm">Error connecting to database.</p>`}}}v.addEventListener(`click`,E);var D=async()=>{let e=await r(`admin`);e&&e.status===`success`&&(b.textContent=e.name,m.value=e.user,e.birthdayInfo.today&&M(e.birthdayInfo),a.classList.add(`hidden`),s.classList.remove(`hidden`),E())};document.readyState===`loading`?document.addEventListener(`DOMContentLoaded`,D):D();function O(){let e=h.value;[`Walking`,`Running`].includes(e)?(g.classList.remove(`hidden`),_.required=!0,x.innerHTML=`
            <input type="time" id="time" step="1" required value="00:00:00" class="w-full px-4 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition">
        `):(g.classList.add(`hidden`),_.required=!1,_.value=``,x.innerHTML=`
            <select id="time" required class="w-full px-4 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition bg-white">
                ${T.map(e=>`<option value="${e}">${e}</option>`).join(``)}
            </select>
        `)}h.addEventListener(`change`,O),O(),c.addEventListener(`submit`,async function(e){if(e.preventDefault(),`https://script.google.com/macros/s/AKfycbzgsuA7_mjRWvpcuagCPKYlE91vxq0V2M4XGXT9udM3yLZ2mvr8TBL0eFYv7VvoVnpK/exec`.includes(`YOUR_WEB_APP_URL`)){j(`Please provide a valid Web App URL.`,`error`);return}A(!0);let t={action:`addActivity`,user:String(m.value),type:String(document.getElementById(`type`).value),date:`'`+String(document.getElementById(`date`).value),time:`'`+String(document.getElementById(`time`).value),distance:_.value?String(_.value):`-`,admin:b.textContent,userIp:o.ipaddress};try{await fetch(n,{method:`POST`,mode:`no-cors`,cache:`no-cache`,headers:{"Content-Type":`application/json`},body:JSON.stringify(t)}),j(`Activity successfully recorded!`,`success`);let e=m.value;c.reset(),m.value=e;let r=new Date;document.getElementById(`date`).valueAsDate=r,document.getElementById(`time`).value=r.toTimeString().substring(0,5),O(),setTimeout(E,1e3)}catch(e){console.error(`Error:`,e),j(`Network error. Check console.`,`error`)}finally{A(!1)}});function k(e){let t=e.filter(e=>e&&e.length>=5&&e[1]!==`User`);if(t.length===0){p.innerHTML=`<p class="text-slate-400 text-center py-10 text-sm">The history is currently empty.</p>`;return}p.innerHTML=[...t].reverse().map(e=>{let t=e[0],n=e[1],r=e[2],i=e[3],a=e[4],o=e[5],s=[`Walking`,`Running`].includes(r);return`
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
        `}).join(``)}function A(e){l.disabled=e,e?(u.textContent=`Submitting Data...`,d.classList.remove(`hidden`),l.classList.add(`opacity-80`,`cursor-not-allowed`)):(u.textContent=`Save to Spreadsheet`,d.classList.add(`hidden`),l.classList.remove(`opacity-80`,`cursor-not-allowed`))}function j(e,t){f.textContent=e,f.className=`mt-4 p-3 rounded-lg text-sm text-center block font-medium ${t===`success`?`bg-green-50 text-green-700 border border-green-100`:`bg-red-50 text-red-700 border border-red-100`}`,setTimeout(()=>f.classList.add(`hidden`),5e3)}function M(e){S.textContent=e.message,S.classList.remove(`hidden`)}function N(){document.cookie=`userToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`,window.location.href=i()+`admin/login/`}y.addEventListener(`click`,N)}))();