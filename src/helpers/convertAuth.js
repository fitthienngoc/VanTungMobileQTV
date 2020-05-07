import buffer from 'buffer';
export default function convertAuth() {
    var user = JSON.parse(localStorage.getItem('user'));
    var d = new Date();
    var n = d.getTime();
    var b = new buffer.Buffer(user.username + ':' + n);
    return b.toString('base64');
}