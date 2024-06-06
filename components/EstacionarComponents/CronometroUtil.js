const padToTwo = (number) => (number <= 9 ? `0${number}` : number);

export const displayTime = (centiseconds) => {
    let hours = 0;
    let minutes = 0;
    let seconds = 0;

    if (centiseconds < 100) {
        return `00:00:00:${padToTwo(centiseconds)}`;
    }

    let remainCentiseconds = centiseconds % 100;
    seconds = Math.floor(centiseconds / 100);

    if (seconds < 60) {
        return `00:00:${padToTwo(seconds)}:${padToTwo(remainCentiseconds)}`;
    }

    let remainSeconds = seconds % 60;
    minutes = Math.floor(seconds / 60);

    if (minutes < 60) {
        return `00:${padToTwo(minutes)}:${padToTwo(remainSeconds)}:${padToTwo(remainCentiseconds)}`;
    }

    let remainMinutes = minutes % 60;
    hours = Math.floor(minutes / 60);

    return `${padToTwo(hours)}:${padToTwo(remainMinutes)}:${padToTwo(remainSeconds)}:${padToTwo(remainCentiseconds)}`;
};
