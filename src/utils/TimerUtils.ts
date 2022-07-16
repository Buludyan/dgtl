import dayjs from 'dayjs';

export function getRemainingTimeUntilMsTimestamp() {
    const timestampDayjs = dayjs(new Date().setHours(0, 0, 0, 0) + 86400000);
    const nowDayjs = dayjs();

    if(nowDayjs.isSame(timestampDayjs, 'second')) {

        return {
            seconds: '00',
            minutes: '00',
            hours: '00',
        }
    }

    return {
        seconds : getRemainingSeconds(nowDayjs, timestampDayjs),
        minutes : getRemainingMinutes(nowDayjs, timestampDayjs),
        hours : getRemainingHours(nowDayjs, timestampDayjs),
    } ;
}

function getRemainingSeconds(nowDayjs: any, timestampDayjs: any) {
    const seconds = timestampDayjs.diff(nowDayjs, 'seconds') % 60;
    return padWithZeros(seconds, 2);
}

function getRemainingMinutes(nowDayjs: any, timestampDayjs: any) {
    const minutes = timestampDayjs.diff(nowDayjs, 'minutes') % 60;
    return padWithZeros(minutes, 2);
}

function getRemainingHours(nowDayjs: any, timestampDayjs: any) {
    const hours = timestampDayjs.diff(nowDayjs, 'hours') % 24;
    return padWithZeros(hours, 2);
}

function padWithZeros(number: number, minLength: number) {
    const numberString = number.toString();
    if(numberString.length >= minLength) return numberString;
    return "0".repeat(minLength - numberString.length) +  numberString;
}