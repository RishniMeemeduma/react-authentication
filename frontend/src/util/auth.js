import { redirect } from "react-router-dom";

export function getAuthToken() {
    const token =  localStorage.getItem('TOKEN');

    if (!token) return;
    
    const duration = getTokenDuration();

    if(duration< 0)  {
        return 'EXPIRED';
    }
    return token;
}

export function tokenLoader() {
    return getAuthToken();
}

export function checkAuth() {
    const token = getAuthToken();
    if (!token) {
        return redirect('/auth');
    }
}

export function getTokenDuration() {
    const storedExpiration = localStorage.getItem('EXPIRATION');
    const expirationDate = new Date(storedExpiration);
    const now = new Date();
    const duration = expirationDate.getTime() - now.getTime();
    return duration;
}