const selectedAll = document.querySelectorAll(".selected");
const selectBox = document.querySelector(".select-box");
const selectedValidate = document.querySelector(".selected");
const companyValidate = document.querySelector(".company__input");
const inputBox = document.querySelector(".inputbox input");
const error = document.querySelector(".inputbox__error");
const companyForm = document.querySelector(".company-form");

selectedAll.forEach((selected) => {
	const optionsContainer = selected.previousElementSibling;
	const searchBox = selected.nextElementSibling;

	const optionsList = optionsContainer.querySelectorAll(".option");

	selected.addEventListener("click", () => {
		selectBox.classList.toggle("select-box--active");

		if (optionsContainer.classList.contains("active")) {
			optionsContainer.classList.remove("active");
		} else {
			let currentActive = document.querySelector(
				".options-container.active"
			);

			if (currentActive) {
				currentActive.classList.remove("active");
			}

			optionsContainer.classList.add("active");
		}

		searchBox.value = "";
		filterList("");

		if (optionsContainer.classList.contains("active")) {
			searchBox.focus();
		}
	});

	optionsList.forEach((o) => {
		o.addEventListener("click", (e) => {
			selected.innerHTML = o.querySelector("label").innerHTML;
			optionsContainer.classList.remove("active");
			selectBox.classList.remove("select-box--active");
		});
	});

	searchBox.addEventListener("keyup", function (e) {
		filterList(e.target.value);
	});

	const filterList = (searchTerm) => {
		searchTerm = searchTerm.toLowerCase();
		optionsList.forEach((option) => {
			let label = option.firstElementChild.nextElementSibling.innerText.toLowerCase();
			if (label.indexOf(searchTerm) != -1) {
				option.style.display = "flex";
			} else {
				option.style.display = "none";
			}
		});
	};
});
