const createBackdrop = () => {
	const backdrop = document.createElement('div');
	backdrop.classList.add('backdrop');

	return backdrop;
}

const removeBackdrop = () => {
	const backdrop = document.querySelector('.backdrop');

	return backdrop;
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

	modal.appendChild(congrats);
	modal.appendChild(found);

	return modal;
}

const removeModal = () => {
	const modal = document.querySelector('.modal');
	
	return modal;
}

const createTargetCircle = (event) => {
	const targetCircle = document.createElement('div');
	const display = document.querySelector('.display');
	targetCircle.setAttribute('id', 'targetCircle');
	targetCircle.style.position = 'absolute';
	targetCircle.style.left = (event.clientX - (display.offsetLeft + 25)) + 'px';
	targetCircle.style.top = (event.clientY - (display.offsetTop + 25)) + 'px';

	return targetCircle;
}

const removeTargetCircle = () => {
	const targetCircle = document.getElementById('targetCircle');
	
	return targetCircle;
}

const createTarget = () => {
	const target = document.createElement('div');
	target.classList.add('target');
	
	const xhr = new XMLHttpRequest();
	const img = document.getElementsByTagName('img');
	const id = img[0].getAttribute('id');

	xhr.open('GET', '/maps/' + id + '.json');
	xhr.setRequestHeader('Content-Type', 'application/json');
	xhr.onload = function() {
		const data = JSON.parse(this.responseText);
			if (xhr.status === 200) {
				target.style.top = data['y_coordinate'] + '%';
				target.style.left = data['x_coordinate'] + '%';
			}
			else if (xhr.status !== 200) {
					console.log('Request failed.  Returned status of ' + xhr.status);
			}
	};
	auth_token = document.head.querySelector("[name=csrf-token]").content;
	xhr.send(encodeURI('&authenticity_token=' + auth_token));	

	return target;
}

document.addEventListener("turbolinks:load", () => {
	const display = document.querySelector('.display');
	const target = display.appendChild(createTarget());

	display.addEventListener('mousedown', (event) => {
		display.appendChild(createTargetCircle(event));
	});

	display.addEventListener('mouseup', () => {			
		display.removeChild(removeTargetCircle());
	});

	target.addEventListener('click', () => {
		display.appendChild(createBackdrop());
		display.appendChild(createModal());
	});
	
	setInterval(() => {
		if (document.querySelector('.backdrop')) {
			const backdrop = document.querySelector('.backdrop');

			backdrop.addEventListener('mousedown', () => {
				display.removeChild(removeBackdrop());
				display.removeChild(removeModal());
			}, { once: true });
		}
	}, 500);
});
