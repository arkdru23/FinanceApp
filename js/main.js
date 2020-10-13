const tasks = [];

const tbody = document.querySelector("tbody");
const taskFrom = document.querySelector(".form");
const amoutInput = document.querySelector(".amount__input");
const taskTtitleInput = document.querySelector(".name__input");
const spanAmountError = document.querySelector(".inputbox__amountError");
const spanTaskError = document.querySelector(".inputbox__taskError");
const displayEuroRate = document.querySelector(".row-container__euroRate");
const totalAmount = document.querySelector(".total");
const iconsSortByName = document.querySelector(".content__icons--name");
const iconsSortByPln = document.querySelector(".content__icons--pln");
const iconsSortByEuro = document.querySelector(".content__icons--euro");

let isNumber = false;

const euroRate = 4.8282;

const sortByName = (e) => {
	if (e.target.className === "icon icon--top") {
		tasks.sort((a, b) => {
			if (a.children[0].textContent < b.children[0].textContent)
				return -1;
			if (a.children[0].textContent > b.children[0].textContent)
				return 1;
			return 0;
		});

		tbody.textContent = "";

		tasks.forEach((task) => {
			tbody.appendChild(task);
		});
	} else if (e.target.className === "icon icon--bottom") {
		tasks.sort((a, b) => {
			if (a.children[0].textContent < b.children[0].textContent)
				return 1;
			if (a.children[0].textContent > b.children[0].textContent)
				return -1;
			return 0;
		});

		tbody.textContent = "";

		tasks.forEach((task) => {
			tbody.appendChild(task);
		});
	}
};

const sortByPln = (e) => {
	if (e.target.className === "icon icon--top") {
		tasks.sort((a, b) => {
			const aPlnToNumber = parseInt(a.children[1].textContent, 10);
			const bPlnToNumber = parseInt(b.children[1].textContent, 10);

			if (aPlnToNumber > bPlnToNumber) return -1;
			if (aPlnToNumber < bPlnToNumber) return 1;
			return 0;
		});

		tbody.textContent = "";

		tasks.forEach((task) => {
			tbody.appendChild(task);
		});
	} else if (e.target.className === "icon icon--bottom") {
		tasks.sort((a, b) => {
			const aPlnToNumber = parseInt(a.children[1].textContent, 10);
			const bPlnToNumber = parseInt(b.children[1].textContent, 10);

			if (aPlnToNumber < bPlnToNumber) return -1;
			if (aPlnToNumber > bPlnToNumber) return 1;
			return 0;
		});

		tbody.textContent = "";

		tasks.forEach((task) => {
			tbody.appendChild(task);
		});
	}
};

const sortByEuro = (e) => {
	if (e.target.className === "icon icon--top") {
		tasks.sort((a, b) => {
			const aEuroToNumber = parseInt(a.children[2].textContent, 10);
			const bEuroToNumber = parseInt(b.children[2].textContent, 10);

			if (aEuroToNumber > bEuroToNumber) return -1;
			if (aEuroToNumber < bEuroToNumber) return 1;
			return 0;
		});

		tbody.textContent = "";

		tasks.forEach((task) => {
			tbody.appendChild(task);
		});
	} else if (e.target.className === "icon icon--bottom") {
		tasks.sort((a, b) => {
			const aEuroToNumber = parseInt(a.children[2].textContent, 10);
			const bEuroToNumber = parseInt(b.children[2].textContent, 10);

			if (aEuroToNumber < bEuroToNumber) return -1;
			if (aEuroToNumber > bEuroToNumber) return 1;
			return 0;
		});

		tbody.textContent = "";

		tasks.forEach((task) => {
			tbody.appendChild(task);
		});
	}
};

const removeTask = (e) => {
	e.target.parentNode.remove();
	const index = e.target.parentNode.dataset.key;
	let delateTask = tasks.splice(index, 1);

	renderList();
	renderTotalAmount(delateTask);
};

const renderTotalAmount = (delateTask) => {
	delateTask.forEach((task) => {
		const amountPln = task.children[1].dataset.pln;
		const amountEuro = task.children[2].dataset.euro;

		const amountPlnToNumber = parseInt(amountPln, 10);
		const amountEuroToNumber = parseInt(amountEuro, 10);

		const counterAmountPln = totalAmount.textContent.split(":")[1];
		const counterAmountEuro = totalAmount.textContent.split("(")[1];

		let totalPlnInCounter = parseInt(counterAmountPln, 10);
		let totalEuroInCounter = parseInt(counterAmountEuro, 10);

		const checkPln =
			totalPlnInCounter - amountPlnToNumber > 2
				? `Suma: ${totalPlnInCounter - amountPlnToNumber}PLN`
				: "Suma:";
		const checkEuro =
			totalEuroInCounter - amountEuroToNumber > 2
				? `(${totalEuroInCounter - amountEuroToNumber} EURO)`
				: "";
		totalAmount.textContent = `${checkPln}${checkEuro}`;
	});
};

const formValid = (e) => {
	e.preventDefault();
	const title = taskTtitleInput.value;
	const amount = amoutInput.value;

	if (title.length >= 5 && isNumber) {
		spanTaskError.classList.remove("inputbox__taskError--active");

		addTask(title, amount);
		taskTtitleInput.value = "";
		amoutInput.value = "";
		spanAmountError.classList.remove("inputbox__amountError--active");
	} else {
		spanTaskError.classList.add("inputbox__taskError--active");
	}
};

const addTask = (title, amount) => {
	const tr = document.createElement("tr");
	tr.className = "list";
	const tdTitle = document.createElement("td");
	tdTitle.className = "title";
	const tdAmountPln = document.createElement("td");
	tdAmountPln.className = "amountPln";
	tdAmountPln.dataset.pln = amount;
	const tdAmountEuro = document.createElement("td");
	tdAmountEuro.dataset.euro = (amount / euroRate).toFixed(2);
	tdAmountEuro.className = "amountEuro";
	const tdRemove = document.createElement("td");
	tdRemove.className = "remove";
	tdRemove.innerHTML = '<span class="fas fa-trash"></span> Usuń';
	displayEuroRate.textContent = `1 euro = ${euroRate}`;

	tdTitle.textContent = title;
	tdAmountPln.textContent = `${amount} PLN`;
	tdAmountEuro.textContent = `${(amount / euroRate).toFixed(2)}  EUR`;

	tr.appendChild(tdTitle);
	tr.appendChild(tdAmountPln);
	tr.appendChild(tdAmountEuro);
	tr.appendChild(tdRemove);

	tasks.push(tr);
	renderList();
	tbody.appendChild(tr);

	displayTotalValue(tasks);

	tr.querySelector(".remove").addEventListener("click", removeTask);
	iconsSortByName.addEventListener("click", sortByName);
	iconsSortByPln.addEventListener("click", sortByPln);
	iconsSortByEuro.addEventListener("click", sortByEuro);
};

const displayTotalValue = (tasks) => {
	const total = tasks.reduce((acc, task) => {
		let sum = task.children[1].innerHTML;

		let sumNumber = parseInt(sum, 10);
		return acc + sumNumber;
	}, 0);

	totalAmount.textContent = `Suma: ${total}PLN (${(total / euroRate).toFixed(
		2
	)} EURO)`;
};

amoutInput.addEventListener("keyup", function (e) {
	if ((e.which != 8 && e.which != 0 && e.which < 48) || e.which > 57) {
		this.value = this.value.replace(/\D/g, "");
		spanAmountError.classList.add("inputbox__amountError--active");
		isNumber = false;
	} else {
		spanAmountError.classList.remove("inputbox__amountError--active");
		isNumber = true;
	}
});

const renderList = () => {
	tbody.textContent = "";
	tasks.forEach((task, key) => {
		task.dataset.key = key;
		tbody.appendChild(task);
	});
};

taskFrom.addEventListener("submit", formValid);
