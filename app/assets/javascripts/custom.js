const createBackdrop = () => {
	const backdrop = document.createElement('div');
	backdrop.classList.add('backdrop');

	return backdrop;
}

const removeBackdrop = () => {
	const backdrop = document.querySelector('.backdrop');

	return backdrop;
}

const sendScore = (name, time) => {
	const img = document.getElementsByTagName('img');
	const id = img[0].getAttribute('id');
	
	const data = {
		score: {
			name: name,
			time: time
		}
	}

	return fetch('/maps/' + id + '/scores', {
		headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json',
			'X-CSRF-Token': Rails.csrfToken(),
			'X-Requested-With': 'xhrRequest'
		},
		method: 'POST',
		body: JSON.stringify(data),
		credentials: 'same-origin'
	})
}

const createModal = () => {
	const modal = document.createElement('div');
	modal.classList.add('modal');
	
	const congrats = document.createElement('h1');
	congrats.innerHTML = 'CONGRATULATIONS';
	congrats.style.textAlign = 'center';
	
	const found = document.createElement('h3');	
	found.innerHTML = 'You Found Waldo';
	found.style.textAlign = 'center';	

	const enterName = document.createElement('input');
	enterName.setAttribute('type', 'text');
	enterName.placeholder = 'Enter Name';

	const submit = document.createElement('input');
	submit.setAttribute('type', 'submit');

	modal.appendChild(congrats);
	modal.appendChild(found);
	modal.appendChild(enterName);
	modal.appendChild(submit);

	return modal;
}

const removeModal = () => {
	const modal = document.querySelector('.modal');
	
	return modal;
}

const createTargetCircle = (event) => {
	const targetCircle = document.getElementById('targetCircle');
	const display = document.querySelector('.display');
	targetCircle.setAttribute('id', 'targetCircle');
	targetCircle.style.position = 'absolute';
	targetCircle.style.left = (event.clientX -= (display.offsetLeft + 25)) + 'px';
	targetCircle.style.top = (event.clientY -= (display.offsetTop + 25)) + 'px';
	targetCircle.style.display = 'none';

	return targetCircle;
}

const removeTargetCircle = () => {
	const targetCircle = document.getElementById('targetCircle');
	targetCircle.style.display = 'inline-block';
	
	return targetCircle;
}

const createTarget = () => {
	const target = document.createElement('div');
	target.classList.add('target');
	
	const img = document.getElementsByTagName('img');
	const id = img[0].getAttribute('id');

	fetch('/maps/' + id + '.json')
		.then(response => {
			return response.json();
		})
		.then(response => {
			target.style.top = response.y_coordinate + '%';
			target.style.left = response.x_coordinate + '%';
		})

	return target;
}

const calculateTime = (startTime, endTime) => {
	const modal = document.querySelector('.modal');

	const score = document.createElement('p');
	score.style.textAlign = 'center';
	score.style.fontSize = '16px';

	const seconds = (endTime - startTime) / 1000
	score.innerHTML = 'Your time is ' + seconds.toFixed(2) + ' seconds';

	modal.appendChild(score);

	return seconds ;
}

document.addEventListener("turbolinks:load", () => {
	const display = document.querySelector('.display');
	// const targetCircle = document.createElement('div');
	// targetCircle.setAttribute('id', 'targetCircle');
	// display.appendChild(targetCircle);

	if (display) {
		const target = display.appendChild(createTarget());
		let startTime = Date.now();
		let endTime;

		display.addEventListener('mousemove', (event) => {
			// const targetCircle = document.getElementById('targetCircle');
			createTargetCircle(event);

			// display.addEventListener('click', (event) => {
			// 	if (targetCircle.style.visibility === 'visible') {
			// 		removeTargetCircle();
			// 	} else {
			// 		createTargetCircle(event);
			// 	}
			// })

			display.addEventListener('mousedown', (event) => {
				createTargetCircle(event);
			})

			display.addEventListener('mouseup', () => {
				removeTargetCircle();
			})
		});

		target.addEventListener('click', () => {
			endTime = Date.now();
			display.appendChild(createBackdrop());
			display.appendChild(createModal());
			const score = calculateTime(startTime, endTime);

			if (document.querySelector('input[type=submit]')) {
				const img = document.getElementsByTagName('img');
				const id = img[0].getAttribute('id');
				const submit = document.querySelector('input[type=submit]');
				const name = document.querySelector('input[type=text]');
				name.focus();
	
				submit.addEventListener('click', () => {
					sendScore(name.value, score.toFixed(2))
						.then(() => {
							window.location.assign('/maps/' + id + '/scores')
						})					
				})
			}
		});
		
		setInterval(() => {
			if (document.querySelector('.backdrop')) {
				const backdrop = document.querySelector('.backdrop');

				backdrop.addEventListener('mousedown', () => {
					display.removeChild(removeBackdrop());
					display.removeChild(removeModal());
					startTime = Date.now();
				}, { once: true });
			}
		}, 500);
	}
});
