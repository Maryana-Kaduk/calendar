const monthElement = document.querySelector('.month');
const dateNumberElements = [...document.querySelectorAll('.date-number')];

const buttonPrevious = document.querySelector('.previous');
const buttonNext = document.querySelector('.next')

const dateObject = new Date();

let currentMonth = dateObject.getMonth();
let currentYear = dateObject.getFullYear();

const monthIndexToName = {
    0: 'January',
    1: 'February',
    2: 'March',
    3: 'April',
    4: 'May',
    5: 'June',
    6: 'July',
    7: 'August',
    8: 'September',
    9: 'October',
    10: 'November',
    11: 'December'
};

const renderMonth = (monthIndex, year) => {
    monthElement.textContent = `${monthIndexToName[monthIndex]} / ${year}`;

    const firstDateOfMonth = new Date(year, monthIndex, 1);
    const firstDayName = firstDateOfMonth.getDay();

    const numberOfDaysInMonth = new Date(year, monthIndex+1, 0).getDate();

    dateNumberElements.forEach((date, i) => {
        const dateNumber = i+1 - firstDayName;
        date.innerHTML = (dateNumber > 0) && (dateNumber <= numberOfDaysInMonth) ? dateNumber : '*';
        
        const today = new Date();
        checkDate(today, monthIndex, year, dateNumber, date, 'today');

        const schoolDay = new Date(2023, 8, 1);
        checkDate(schoolDay, monthIndex, year, dateNumber, date, 'schoolDay');

        const christmas = new Date(2023, 11, 31);
        checkDate(christmas, monthIndex, year, dateNumber, date, 'christmas');

        const birthday = new Date(2023, 8, 23);
        checkDate(birthday, monthIndex, year, dateNumber, date, 'birthday');

        const holidays = {
            'schoolDay': schoolDay,
            'christmas': christmas,
            'birthday': birthday
        }
        // console.log(holidays);

        date.addEventListener('click', (e) => {
            const hint = document.createElement('div');
            hint.classList.add('hint')

            if(e.target.classList.contains('today')) {
                if(e.target.childElementCount >= 1) {
                    e.target.childNodes.length = 1
                } else {
                    creatingElement(e, date, hint);

                    const startTime = new Date();
                    const endTime = new Date(`${2023}-${monthIndex + 1}-${dateNumber+1}T00:00:00`);

                    const millieSeconds = endTime.getTime() - startTime.getTime();

                    const hoursLeft = Math.floor(millieSeconds/(1000*60*60));
                    const minutesLeft = Math.ceil(millieSeconds/(1000*60)%60);

                    hint.textContent = `time left: ${hoursLeft} hours ${minutesLeft} minutes`
                }
            } else if(e.target.classList.contains('schoolDay') || e.target.classList.contains('christmas') || e.target.classList.contains('birthday')) {
                if(e.target.childElementCount >= 1) {
                    e.target.childNodes.length = 1
                } else {
                    creatingElement(e, date, hint);

                    const holidayName = holidays[e.target.classList[1]]

                    const time = holidayName.getTime() - today.getTime()
                    // console.log(time);

                    const daysLeft = Math.ceil(time/(1000*60*60*24));
                    console.log(daysLeft);

                    if(daysLeft > 0) {
                        hint.textContent = `days left: ${daysLeft} days`
                    } else {
                        hint.textContent = `days from this date: ${-(daysLeft)} days`
                    }
                }
            }
        })

    });

};

const creatingElement = (action, parent, child) => {
    parent.append(child);
    parent.style.position = 'relative';

    setTimeout(() => {
        if(action.target.childNodes.length === 1) {
            return;
        } else {
            action.target.childNodes[1].remove()
        }
    }, 2000)
}

const checkDate = (whichDate, month, yearName, dateNumber, item, className) => {
    if((whichDate.getMonth() === month) && (whichDate.getFullYear() === yearName) && (whichDate.getDate() === dateNumber)) {
        item.classList.add(className);
    } else {
        item.classList.remove(className);
    };
};

buttonPrevious.addEventListener('click', () => {
    if(currentMonth === 0) {
        currentMonth = 11;
        currentYear--;
    } else {currentMonth--};

    renderMonth(currentMonth, currentYear);
});

buttonNext.addEventListener('click', () => {
    if(currentMonth === 11) {
        currentMonth = 0;
        currentYear++;
    } else {currentMonth++};

    renderMonth(currentMonth, currentYear);
});

renderMonth(currentMonth, currentYear);