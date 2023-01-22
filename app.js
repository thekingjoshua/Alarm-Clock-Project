'use strict';
// Selecting the needed elements
const clock = document.querySelector('.clock'),
	select = document.querySelectorAll('select'),
	alarmBtn = document.querySelector('button'),
	alarmSound = document.querySelector('audio'),
	timeLeftCont = document.querySelector('.time__left');
let currentHour;
let currentMin;
let currentSec;
setInterval(function updateClock() {
	let currentTime = new Date();
	currentHour = currentTime.getHours();
	currentMin = currentTime.getMinutes();
	currentSec = currentTime.getSeconds();
	clock.innerHTML = `
    <span>${String(currentHour).padStart(2, 0)}:</span><span>${String(currentMin).padStart(
		2,
		0
	)}:</span><span>${String(currentSec).padStart(2, 0)}</span> <span>${
		currentHour < 12 ? 'AM' : 'PM'
	}</span>`;
}, 1000); // updating the time every 1 second

(function () {
	// select options for hours
	for (let i = 0; i < 24; i++) {
		let option = `<option value=${i}>${String(i).padStart(2, 0)}</option>`;
		select[0].insertAdjacentHTML(`beforeend`, option);
	}
	// select options for hours
	for (let i = 0; i < 60; i++) {
		let option = `<option value=${i}>${String(i).padStart(2, 0)}</option>`;
		select[1].insertAdjacentHTML(`beforeend`, option);
	}
})();

alarmBtn.addEventListener('click', () => {
	if (alarmBtn.textContent === 'Set Alarm') {
		// the code below will be executed if the text content of the alarm button is 'SET ALARM'
		let count = 0;
		let interval = setInterval(function () {
			// changing the data types of the selected values from string to number
			let hourSelection = Number(select[0].value);
			let minSelection = Number(select[1].value);
			// checking if the time set for the alarm has been reached
			if (currentHour === hourSelection && currentMin === minSelection) {
				alarmSound.play(); // playing the alarm sound if the time has reached
			} else {
				alarmSound.pause(); // pausing the alarm sound if the time has not been reached
			}
			// checking if the alarm sound is playing
			if (!alarmSound.paused) {
				if (count === 30) {
					// stopping the count increment if the count is 30
					count = count;
					alarmSound.pause(); // pausing the alarm sound if the count is 30
					alarmSound.currentTime = 0;
				} else {
					// incrementing the count if the count is less than 30
					count++; // incrementing the count every 1 second
				}
			}
		}, 1000);
		let now = new Date();
		let h = select[0].value;
		let m = select[1].value;
		let userDate = new Date(
			`${now.getMonth() + 1} ${now.getDate()} ${now.getFullYear()} ${h}:${m}`
		);
		let distance = userDate - now;
		let userHr = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
		let userMin = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
		let userSec = Math.floor((distance % (1000 * 60)) / 1000);
		timeLeftCont.innerHTML = `<p>Alarm set for ${
			userHr < 1 ? '' : String(userHr).padStart(2, 0) + ' hours, '
		}${userMin < 1 ? '' : String(userMin).padStart(2, 0) + ' minutes, '} ${
			userSec < 1 ? '' : String(userSec).padStart(2, 0) + ' seconds'
		} from now.</p>`;
		if (timeLeftCont.classList.contains('hidden')) {
			// tim
		}
		timeLeftCont.classList.remove('hidden');
		setTimeout(function () {
			timeLeftCont.classList.add('hidden');
		}, 3000);
		alarmBtn.textContent = 'Reset Alarm'; // changing the text content of the Alarm Button to 'Reset Alarm'
		select.forEach(el => {
			el.classList.add('disabled');
		});
	} else if (alarmBtn.textContent === 'Reset Alarm') {
		// the code below will be executed if the text content of the alarm button is 'RESET ALARM'
		select.forEach(el => {
			el.classList.remove('disabled');
			el.value = '';
			alarmSound.pause();
			alarmSound.currentTime = 0;
		});
		setTimeout(function () {
			timeLeftCont.classList.add('hidden');
		}, 3000);
		alarmBtn.textContent = 'Set Alarm'; // changing the text content of the Alarm Button to 'Set Alarm'
	}
});

// /00:00:00
