export default function authHeader() {
    let users = JSON.parse(localStorage.getItem('users'));
    if (users && users.users && users.users.authenticate) {
        return { 
            'Authorization': users.users.authenticate,
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        };
    } else {
        return {};
    }
}