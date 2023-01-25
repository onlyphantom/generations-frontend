const timeAgo = (date) => {
    const diff = Number(new Date()) - date;
    const minute = 60 * 1000;
    const hour = minute * 60;
    const day = hour * 24;
    const week = day * 7;
    const month = day * 30;
    const year = day * 365;
    switch (true) {
        case diff < minute:
            const seconds = Math.round(diff / 1000);
            return `${seconds} ${seconds > 1 ? 'seconds' : 'second'} ago`
        case diff < hour:
            return Math.round(diff / minute) + ' minutes ago';
        case diff < day:
            return Math.round(diff / hour) + ' hours ago';
        case diff < 2 * week:
            return Math.round(diff / day) + ' days ago';
        case diff < 2 * month:
            return Math.round(diff / week) + ' weeks ago';
        case diff < 2 * year:
            return Math.round(diff / month) + ' months ago';
        case diff > 2 * year:
            return Math.round(diff / year) + ' years ago';
        default:
            return "";
    }
};

export default timeAgo