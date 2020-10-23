let sessionDuration = 25;
let breakDuration = 5;
let status = 'stopped';
let timerType = 'session';
let timer = 1500;
let timerID = '';

function incTime(type, direction){
    if (status === 'stopped'){
        if (type === 1){
            if(direction === '+'){
                if (sessionDuration !== 60) {
                    sessionDuration +=1
                }

            } else {
                if (sessionDuration !== 1){
                    sessionDuration -= 1
                }
            }
        } else {
            if(direction === '+'){
                if (breakDuration !== 60){
                    breakDuration +=1
                }
            } else {
                if (breakDuration !== 1){
                    breakDuration -= 1
                }
            }
    }
    }
    updateDurations()
}

function updateDurations() {
    document.getElementById('session-length').textContent = sessionDuration
    document.getElementById('break-length').textContent = breakDuration
    if (status === 'stopped'){
        if (timerType === 'session'){
            timer = parseInt(sessionDuration) * 60;

        } else{
            timer = parseInt(breakDuration) * 60;
        }
        let min = Math.floor(timer / 60);
        let sec = '00'
        min = addLeadingZeroes(min)
        document.getElementById('time-left').textContent = `${min}:${sec}`;
    }
}

function timerUpdate(){

    if (timer === 0){
        document.getElementById('beep').play();
        if (timerType === 'session'){
            timerType = 'break'
            timer = parseInt(breakDuration) * 60
        } else{
            timerType = 'session'
            timer = parseInt(sessionDuration) * 60
        }

    }else {
        timer -= 1;
    }

    let min = Math.floor(timer / 60);
    let sec = Math.round(timer % 60 * 1000) / 1000;
    min = addLeadingZeroes(min)
    sec = addLeadingZeroes(sec)
    if (min === '00'){
        document.getElementById("time-left").style.color = "red";
    } else {
        document.getElementById("time-left").style.color = "black";
    }
    document.getElementById('time-left').textContent = `${min}:${sec}`;
    document.getElementById('timer-label').textContent = timerType;
}

function addLeadingZeroes(time) {
    return time < 10 ? `0${time}` : time
}

function timerStart(){
    if (status === 'stopped'){
        timerID = setInterval(timerUpdate, 1000);
        status = 'running';
        document.getElementById('status').textContent = status;
    } else{
        clearInterval(timerID);
        status = 'stopped';
        document.getElementById('status').textContent = status;
    }
}

function reset() {
    sessionDuration = 25;
    breakDuration = 5;
    updateDurations();
    status = 'stopped';
    timerType = 'session';
    document.getElementById('status').textContent = status;
    clearInterval(timerID);
    timer = 1500;
    let min = Math.floor(timer / 60);
    let sec = Math.round(timer % 60 * 1000) / 1000;
    min = addLeadingZeroes(min)
    sec = addLeadingZeroes(sec)
    document.getElementById("time-left").style.color = "black";
    document.getElementById('time-left').textContent = `${min}:${sec}`;
    document.getElementById('timer-label').textContent = timerType.charAt(0).toUpperCase() + timerType.slice(1);
    document.getElementById('beep').load()
}