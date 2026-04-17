let clockInterval;

function updateClock() {
    const clockElement = document.getElementById('clockDisplay');
    if (!clockElement) return;

    const now = new Date();
    let hours = now.getHours();
    let minutes = now.getMinutes();
    let seconds = now.getSeconds();
    let ampm = hours >= 12 ? 'PM' : 'AM';

    hours = hours % 12;
    hours = hours ? hours : 12;

    hours = hours < 10 ? '0' + hours : hours;
    minutes = minutes < 10 ? '0' + minutes : minutes;
    seconds = seconds < 10 ? '0' + seconds : seconds;

    clockElement.textContent = `${hours}:${minutes}:${seconds} ${ampm}`;
}

function generateCalendar() {
    const monthDisplay = document.getElementById('monthDisplay');
    const datesDisplay = document.getElementById('datesDisplay');

    if (!monthDisplay || !datesDisplay) return;

    const now = new Date();
    const year = now.getFullYear();
    const month = now.getMonth();
    const today = now.getDate();

    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    monthDisplay.textContent = `${monthNames[month]} ${year}`;

    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    datesDisplay.innerHTML = '';

    for (let i = 0; i < firstDay; i++) {
        let emptyCell = document.createElement('span');
        emptyCell.classList.add('empty');
        datesDisplay.appendChild(emptyCell);
    }

    for (let i = 1; i <= daysInMonth; i++) {
        let dayCell = document.createElement('span');
        dayCell.textContent = i;
        if (i === today) {
            dayCell.classList.add('today');
        }
        datesDisplay.appendChild(dayCell);
    }
}

function initCalendarWidgets() {
    if (clockInterval) {
        clearInterval(clockInterval);
    }

    updateClock();
    clockInterval = setInterval(updateClock, 1000);
    generateCalendar();
}

document.addEventListener("DOMContentLoaded", initCalendarWidgets);