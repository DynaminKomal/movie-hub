const ruleFalse = {
    admin: false,
    user: false
}

const ruleTrue = {
    admin: true,
    user: true
}

const admin = { ...ruleFalse, admin: true }
const user = { ...ruleFalse, user: true }


const rules = {
    //FOR AUTH
    "POST /api/auth/login": ruleTrue,
    "POST /api/auth/forget-password": ruleTrue,
    "PATCH /api/auth/reset-password/:token": ruleTrue,

    //FOR ADMIN
    "POST /api/movies/create": admin,
    "POST /api/movies/upcoming-movies/create": admin,
    "POST /api/tv-series/create": admin,
    "PATCH /api/tv-series/:id/seasons": admin,
    "DELETE /api/tv-series/:id": admin,
    "PATCH /api/tv-series/:id/update": admin,
    "POST /api/actor/create": admin,
    "PATCH /api/actor/:id/update": admin,

    //FOR ADMIN AND USER
    "GET /api/movies/": ruleTrue,
    "GET /api/movies/movieBanner": ruleTrue,
    "GET /api/movies/trending": ruleTrue,
    "GET /api/movies/upcoming-movies": ruleTrue,
    "GET /api/tv-series/": ruleTrue,
    "PATCH /api/user/update-profile": ruleTrue,
    "PATCH /api/user/update-profile": ruleTrue,
    
    //FOR User
    "GET /api/user/:id/search-query": user,

};

// Convert paths to regular expressions
const regexRules = Object.entries(rules).map(([path, rule]) => {
    const regexPath = path.replace(/:\w+/g, '([^/]+)');
    const finalRegexPath = path.includes('/reset-password') ? `${regexPath}(/[^/]+)?$` : `${regexPath}$`;
    return { regex: new RegExp(`^${finalRegexPath}`), rule };
});

const hasPermission = (path, role) => {
    for (const { regex, rule } of regexRules) {
        if (regex.test(path)) {
            if (rule[role] === true) {
                return { allowed: true, message: "Access granted" };
            } else {
                return { allowed: false, message: "Access denied" }; // Role does not have permission
            }
        }
    }

    return { allowed: false, message: "Invalid path" }; // Path not found
};

module.exports = hasPermission;
