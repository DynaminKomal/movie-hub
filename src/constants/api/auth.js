export const ApiEndpoints  = Object.freeze({
    login:{
        url: '/auth/login',
        method: "POST",
    },
    forgetPassword:{
        url: '/auth/forget-password',
        method: "POST",
    },
    resetToken:{
        url: '/auth/reset-password/:token',
        method: "PATCH",
    },
    signup:{
        url: '/auth/signup',
        method: "POST",
    },
})