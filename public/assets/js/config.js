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

export const getCookie = (name) => {
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

