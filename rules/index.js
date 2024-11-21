const ruleFalse = {
    admin: false,
    user: false
}

const ruleTrue = {
    admin: true,
    user: true
}

const admin = { ...ruleFalse, admin: true }


const rules = {
    //FOR AUTH
    "POST /api/auth/login": ruleTrue,

    //FOR ADMIN
    "POST /api/movies/create": admin,

    //FOR ADMIN AND USER
    "GET /api/movies/": ruleTrue,
    "GET /api/movies/movieBanner": ruleTrue,
    "GET /api/movies/trending": ruleTrue
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
