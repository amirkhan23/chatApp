const monthsArr = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

export function getIndianTime(): string {
    const utcTimeStamp = Date.now();
    const indianTimeStamp = utcTimeStamp + (5.5 * 60 * 60 * 1000);
    const date = new Date(indianTimeStamp);

    let a = `${date.getUTCDate()}:${monthsArr[date.getUTCMonth()]} ${date.getUTCHours()}:${date.getUTCMinutes()}:${date.getUTCSeconds()}:${date.getUTCMilliseconds()}`;

    return a;
}