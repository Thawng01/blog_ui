export function getCookie(name: string) {
    let cookies = document.cookie.split(";").map((cookie) => cookie.trim());
    for (let cookie of cookies) {
        if (cookie.startsWith(`${name}=`)) {
            return cookie.substring(name.length + 1);
        }
    }
    return null;
}