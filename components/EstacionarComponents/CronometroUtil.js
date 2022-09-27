
const padToTwo = (number) => (number <=9 ? `0${number}` : number);

export const displayTime = (centiseconds) => {

    let minutes = 0;
    let seconds = 0;

    if (centiseconds < 100) {
        return `00:00:00:${padToTwo(centiseconds)}`;
    }

    let remainCentiseconds = centiseconds % 100;
    seconds = (centiseconds -remainCentiseconds) / 100;

    if (seconds < 60) {
        return `00:00:${padToTwo(seconds)}:${padToTwo(remainCentiseconds)}`;
    }

    let remainSeconds = seconds % 60;
    minutes = (seconds - remainSeconds) / 60;

    if (minutes < 60) {
        return `00:${padToTwo(minutes)}:${padToTwo(seconds)}:${padToTwo(remainCentiseconds)}`;
    }

    let remainMinutes = minutes % 60;
    hours = (minutes - remainMinutes) / 60;

    return `${padToTwo(hours)}:${padToTwo(minutes)}:${padToTwo(seconds)}:${padToTwo(remainCentiseconds)}`;

}