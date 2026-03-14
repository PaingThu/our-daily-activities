export const COMMON = {
    ipaddress: await fetch('https://api.ipify.org?format=json')
                .then(res => res.json())
                .then(data => data.ip)
                .catch(() => 'Unknown')
};

export const WEB_APP_URL = 'https://script.google.com/macros/s/AKfycbzgsuA7_mjRWvpcuagCPKYlE91vxq0V2M4XGXT9udM3yLZ2mvr8TBL0eFYv7VvoVnpK/exec';

export const getBasePath = () => {
    const path = window.location.pathname;
    // If on GitHub Pages, the first part of the path is the repo name
    if (window.location.hostname.includes("github.io")) {
        return "/" + path.split('/')[1] + "/";
    }
    return "/"; // Localhost root
};

const getCookie = (name) => {
    // 1. Get all cookies and split them by the semicolon
    let cookieArr = document.cookie.split(";");

    // 2. Loop through each cookie pair
    for (let i = 0; i < cookieArr.length; i++) {
        let cookiePair = cookieArr[i].split("=");

        // 3. Remove whitespace and check if the name matches
        if (name === cookiePair[0].trim()) {
            // 4. Return the value (the token)
            return decodeURIComponent(cookiePair[1]);
        }
    }
    // Return null if the cookie was not found
    return null;
};
export const token = getCookie("userToken");

export const deleteCookie = (name) => {
    document.cookie = name + '=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
}

export async function tokenCheck(pageType = 'login') {
    if (token) {
        let payload = {
            action: 'getLoginInfo',
            token: token,
            userIp: COMMON.ipaddress
        };
        try {
            const response = await fetch(WEB_APP_URL, {
                method: 'POST',
                body: JSON.stringify(payload)
            });

            if (!response.ok) {
                throw new Error("Server returned status " + response.status);
            }

            const result = await response.json();

            if (result.status === 'success') {
                if (pageType === 'login') {
                    window.location.href = getBasePath() + "admin/";
                }
            } else {
                deleteCookie("userToken");
                throw new Error("Authentication failed: " + result.message);
            } 
            
        } catch (err) {
            console.error(err);
            if(pageType === 'admin'){
                window.location.href = getBasePath() + "admin/login/";
            } 
        }
    }else{
        if(pageType === 'admin'){
            window.location.href = getBasePath() + "admin/login/";
        }
    }
}

