const high = 999999;
const low = 100000;

export const dailySecretNumGenerator = () => {
    const seed: number = ((new Date().setHours(0, 0, 0, 0) % 63453452 * 48561 + 894651) % 8945123 + 4844 * 8411) 
    const dailySecretNum: number = ((seed % (high - low) + low));
    const secretNumToArr: number[] = (dailySecretNum + '').split('').map(e => +e)
    return secretNumToArr;
};


export const practiceSecretNumGenerator = () => {
    const  practiceSecretNum: number = Math.floor(Math.random() * (high - low) + low)
    const secretNumToArr: number[] = (practiceSecretNum + '').split('').map(e => +e);
    return secretNumToArr
};