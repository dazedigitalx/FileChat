const TOKEN_KEY = 'accessToken';

const TokenService = {
    getLocalAccessToken() {
        return localStorage.getItem(TOKEN_KEY);
    },

    setLocalAccessToken(token) {
        localStorage.setItem(TOKEN_KEY, token);
    },

    removeLocalAccessToken() {
        localStorage.removeItem(TOKEN_KEY);
    }
};


export default TokenService;
