class StorageService {
    static set(key: string, value: any) {
        localStorage.setItem(key, JSON.stringify(value));
    }

    static get(key: string) {
        try {
            return JSON.parse(localStorage.getItem(key) || "");
        } catch (error) {
            return null;
        }
    }

    static remove(key: string) {
        localStorage.removeItem(key);
    }

    static clearAll() {
        localStorage.clear();
    }

    static getTokenInfo() {
        const token = this.get("t");
        const base64Url = token.split(".")[1]; // Get the payload part of the token
        const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/"); // Replace URL-safe characters
        const jsonPayload = decodeURIComponent(
            atob(base64)
                .split("")
                .map(function (c) {
                    return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
                })
                .join("")
        );
        // return the user info
        return JSON.parse(jsonPayload);
    }
}

export default StorageService;
