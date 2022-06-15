export const UserReducer = (user, action) => {
    switch(action.type) {
        case "LOGIN":
            return {
                token : action.token
            };
        case "LOGOUT":
            return {
                token : null
            };
        default:
            return user;
    }
}