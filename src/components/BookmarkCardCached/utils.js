export function truncate(s, maxLength) {
    if (s.length > maxLength) {
        return s.substring(0, maxLength) + "...";
    }
    return s;
}
