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
	// target.style.height = '9%';
	// target.style.width = '4%';
	// target.style.backgroundColor = 'red';
	// target.style.position = 'absolute';
	target.style.top = '32%';
	target.style.left = '51%';
	// target.style.zIndex = 400;

	return target;
}

document.addEventListener("turbolinks:load", () => {
	const display = document.querySelector('.display');
	const container = document.querySelector('.container');
	const target = display.appendChild(createTarget());

	display.addEventListener('mousedown', (event) => {
		display.appendChild(createTargetCircle(event));
	});

	display.addEventListener('mouseup', () => {			
		display.removeChild(removeTargetCircle());
	});

	target.addEventListener('click', () => {
		container.appendChild(createBackdrop());
		container.appendChild(createModal());
	});
        
	container.addEventListener('click', () => {
		display.removeChild(removeBackdrop());
		display.removeChild(removeModal());
	});
});
