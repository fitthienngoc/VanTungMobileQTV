export default function checkPermission(action) {
    let permissions = localStorage.getItem('permissions') ? JSON.parse(localStorage.getItem('permissions')) : [];
    return permissions.includes(action);
}