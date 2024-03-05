let initData;

// Функция для создания элемента с заданным тегом, классами и идентификатором
const createElementWithClasses = (tagName, classes, id) => {
  const element = document.createElement(tagName);
  if (classes) {
    element.classList.add(...classes.split(' '));
  }
  if (id) {
    element.id = id;
  }
  return element;
};

// Функция для добавления атрибутов к элементу
const setAttributes = (element, attributes) => {
  for (const key in attributes) {
    element.setAttribute(key, attributes[key]);
  }
};

// Функция для преобразования строки к camelCase
function toCamelCase(value) {
  if (value) {
    const valueTrimed = value.trim();
    const str = valueTrimed.split(' ').filter((el) => el !== '');
    return str.map((lt) => lt[0].toUpperCase() + lt.slice(1)).join(' ');
  }
}

// Создание HTML-структуры на основе данных
const createForm = (data) => {
  const form = document.querySelector('form');
  data.forEach((section, i) => {
    let classNmae;
    if (i === 0) {
      classNmae = `slide section section_${section.sectionName} active`;
    } else {
      classNmae = `slide section section_${section.sectionName}`;
    }
    const fieldset = createElementWithClasses(
      'fieldset',
      classNmae,
      section.sectionName
    );
    form.appendChild(fieldset);

    const h2 = document.createElement('h2');
    h2.textContent = toCamelCase(section.sectionName);
    fieldset.appendChild(h2);

    const collapseContainer = createElementWithClasses(
      'div',
      'collapse fa-solid fa-caret-down'
    );
    h2.after(collapseContainer);

    const gpoupingContainer = createElementWithClasses('div', 'inputs-group');
    collapseContainer.after(gpoupingContainer);

    section.items.forEach((item, index) => {
      const label = document.createElement('label');
      setAttributes(label, {
        for: item.id,
      });
      label.textContent = toCamelCase(item.labelName);

      const input = document.createElement('input');
      setAttributes(input, {
        type: 'text',
        placeholder: 'Please enter numbers only',
        id: item.id,
        name: item.id,
        autocomplete: 'one-time-code',
        inputmode: 'numeric',
      });

      const inputsSet = createElementWithClasses('div', 'input-set');

      const addButton = createElementWithClasses(
        'button',
        'add-btm fa-solid fa-plus',
        `add-${section.sectionName}-bttm`
      );

      const removeButton = createElementWithClasses(
        'button',
        `remove-btm fa-solid fa-xmark`,
        `${item.id}-remove-btm`
      );

      gpoupingContainer.appendChild(inputsSet);
      inputsSet.appendChild(label);
      label.after(input);
      input.after(removeButton);

      if (index === section.items.length - 1) {
        input.after(addButton);
        setAttributes(input, {
          type: 'text',
          class: 'add-new-item',
          placeholder: 'Please enter the payment name',
          id: item.id,
          name: item.id,
          inputmode: 'text',
        });
        input.classList.add('add-new-item');
        removeButton.remove();
      }
      if (!input.classList.contains('add-new-item')) {
        validation(input);
      }
    });
  });
};

// Функция для обработки клика на кнопку сворачивания
const handleCollapseClick = (e) => {
  toggleCollapse(e.target);
  toggleCaretIcon(e.target);
};

// Функция для обработки клика на кнопку calculate
const calculate = (e) => {
  document.querySelectorAll('input[name="text"]').forEach((el) => {
    el.addEventListener('click', () => {
      let value = el.value;
      console.log(value);
    });
  });
};

// Функция для переключения иконки стрелки
const toggleCaretIcon = (target) => {
  const isCaretUp = target.classList.contains('fa-caret-up');
  target.classList.replace(
    isCaretUp ? 'fa-caret-up' : 'fa-caret-down',
    isCaretUp ? 'fa-caret-down' : 'fa-caret-up'
  );
};

// Функция для переключения состояния сворачивания
const toggleCollapse = (target) => {
  target.nextElementSibling.classList.toggle('hide');
};

// Функция для удаления ввода
const deleteInput = (btm) => {
  btm.addEventListener('click', (e) => {
    e.preventDefault();
    const elementId = e.target.id.split('-remove-bt')[0];
    console.log(elementId);
    const input = document.getElementById(elementId);
    const label = input.previousElementSibling;
    const errorContainer = input.nextElementSibling.nextElementSibling;
    if (
      errorContainer &&
      errorContainer.classList.contains('error-container')
    ) {
      errorContainer.remove();
    }
    input.remove();
    label.remove();
    e.target.remove();
  });
};

// Функция для создания контейнера ошибки
const createErrorContainer = (message) => {
  let errorDiv = document.createElement('div');
  errorDiv.className = 'error-container';
  errorDiv.innerText = message;
  return errorDiv;
};

//Function to add a new input field
function creatInput(val, el) {
  const label = document.createElement('label');
  val = val.trim();
  label.innerText = toCamelCase(val);
  const input = createElementWithClasses('input', 'new-input-added', val);
  setAttributes(input, {
    type: 'text',
    name: val,
    placeholder: 'Numbers Only',
    inputmode: 'numeric',
  });
  const removeButton = createElementWithClasses(
    'button',
    'remove-btm fa-solid fa-xmark',
    `${val}-remove-btm`
  );
  const inputsSet = createElementWithClasses('span', 'input-set');
  const addNewItemInputField = el
    .closest('fieldset')
    .querySelector('.add-new-item');
  const beforeEl = addNewItemInputField.previousSibling;
  beforeEl.before(inputsSet);
  inputsSet.appendChild(label);
  label.after(input), input.after(removeButton);
  addNewItemInputField.value = '';
  validation(input);
  deleteInput(removeButton);
  return input;
}

// function to convert calue into currency
const formatValue = (val) => {
  let newVal = new Intl.NumberFormat('en', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
    minimumFractionDigits: 0,
  }).format(val);
  return newVal;
};

// Функция для валидации ввода
// const validation = (el) => {
//   el.addEventListener('blur', (e) => {
//     let inputVal = e.target.value;
//     let val = Number(inputVal);
//     const n = e.target.closest('.input-set');
//     let errorContainer = n.querySelector('.error-container');
//     const sibling = e.target.nextElementSibling;
//     if (isNaN(val) && val !== 0) {
//       if (!errorContainer) {
//         let errorDiv = createErrorContainer('Please enter numbers only');
//         e.target.nextElementSibling.after(errorDiv);
//         e.target.classList.add('validation-error');
//         e.target.value = '';
//       } else if (errorContainer) {
//         e.target.value = '';
//         return;
//       }
//     } else if (!isNaN(val) && val !== 0) {
//       const newVal = formatValue(val);
//       console.log(newVal);
//       e.target.value = newVal;
//       e.target.classList.remove('validation-error');
//       if (errorContainer) {
//         errorContainer.remove();
//       }
//     }
//   });
// };

const validation = (el) => {
  el.addEventListener('blur', (e) => {
    if (e.target.value && e.target.value.indexOf('$') === -1) {
      e.target.value = formatValue(+e.target.value);
    }
  });
  el.addEventListener('input', function (event) {
    formatValue(+event.target.value);
    let inputValue = event.target.value;
    console.log(typeof inputValue);
    // Remove non-numeric characters using a regular expression
    var numericValue = inputValue.replace(/\D/g, '');
    event.target.value = numericValue;
  });
};

//

const buildSlider = (slides) => {
  const nextBtn = document.getElementById('next');
  const previousBtn = document.getElementById('previous');
  const progressBar = document.getElementById('progress-bar');
  const totalIncomInput = document.getElementById('your-income');
  const totalIncomeContainer = document.querySelector('#total-income');
  const totalIncomeSpan = document.querySelector('#total-income-value');
  const currentStep = document.getElementById('current-step');
  const lastStep = document.getElementById('last-step');

  let currentIndex = 0;

  currentStep.innerText = currentIndex + 1;
  lastStep.innerText = slides.length;

  function showSlides(index) {
    slides.forEach((slide, i) => {
      slide.classList.toggle('active', i === index);
      updateProgressBar();
    });
  }

  function updateProgressBar() {
    const percent = ((currentIndex + 1) / slides.length) * 100;
    progressBar.style.width = percent + '%';
  }
  let isErrorDiv;
  nextBtn.addEventListener('click', (e) => {
    const errorDiv = createErrorContainer('Please enter your montly income.');
    if (!totalIncomInput.value && !isErrorDiv) {
      totalIncomInput.after(errorDiv);
      isErrorDiv = true;
      return;
    } else if (!totalIncomInput.value && isErrorDiv) {
      return;
    } else if (totalIncomInput.value && isErrorDiv) {
      const elToRemove = e.target.closest('.input-set');
      elToRemove.querySelector('.error-container').remove();
    }

    const totalSectionExpenses = document.querySelectorAll(
      'fieldset.active input'
    );
    currentStep.innerText = currentIndex + 2;

    console.log(totalSectionExpenses);
    totalIncomeSpan.innerText = totalIncomInput.value;
    currentIndex = (currentIndex + 1) % slides.length;
    showSlides(currentIndex);
    previousBtn.disabled = false;
    if (currentIndex + 1 === slides.length) {
      nextBtn.disabled = true;
    }
  });

  previousBtn.addEventListener('click', () => {
    currentIndex = (currentIndex - 1 + slides.length) % slides.length;
    showSlides(currentIndex);
    currentStep.innerText = currentIndex + 1;
    if (currentIndex + 1 === slides.length - 1) {
      nextBtn.disabled = false;
    }
    if (currentIndex === 0) {
      previousBtn.disabled = true;
    }
  });

  showSlides(currentIndex);
};

// Вызываем функцию createForm с вашими данными initData
document.addEventListener('DOMContentLoaded', () => {
  const xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      initData = JSON.parse(xhttp.responseText).data; // Исправлено: initData.data
      // console.log(initData);
      createForm(initData);

      // Добавляем обработчики событий на кнопки сворачивания
      document.querySelectorAll('.collapse').forEach((el) => {
        el.addEventListener('click', handleCollapseClick);
      });

      //Добавляем обработчики событий на кнопку удаления
      const deleteBtm = document.querySelectorAll('.remove-btm');
      deleteBtm.forEach((btm) => {
        deleteInput(btm);
      });

      document.querySelectorAll('.add-btm').forEach((btm) => {
        btm.addEventListener('click', (e) => {
          e.preventDefault();
          const addInputValue = e.target.previousElementSibling;
          const val = addInputValue.value;
          const nextElTarget = e.target.nextElementSibling;
          const errorDiv = createErrorContainer(
            'Please enter value for the field.'
          );
          // if (val && !nextElTarget) {
          //   creatInput(val, e.target);
          // } else if (!val && !nextElTarget) {
          //   e.target.after(errorDiv);
          // } else if (!val && nextElTarget) {
          //   nextElTarget.classList.remove('hide');
          // } else if (val && !nextElTarget.classList.contains('hide')) {
          //   nextElTarget.classList.add('hide');
          //   creatInput(val, e.target);
          // } else if (val && nextElTarget.classList.contains('hide')) {
          //   creatInput(val, e.target);
          // }

          if (!val) {
            if (!nextElTarget) {
              e.target.after(errorDiv);
            } else {
              nextElTarget.classList.remove('hide');
            }
          } else {
            if (nextElTarget) {
              nextElTarget.classList.add('hide');
            }
            const newEl = creatInput(val, e.target);
            newEl.focus();
          }
        });
      });

      //Inputs value validation
      document
        .querySelectorAll('.input-set input:not(.add-new-item)')
        .forEach((el) => {
          validation(el);
        });

      //build slider and progress bar
      buildSlider(document.querySelectorAll('.slide'));
    }
  };
  xhttp.open('GET', 'js/data.json', true);
  xhttp.send();
});

let myChart = null;

document.getElementById('calculate').addEventListener('click', (e) => {
  e.preventDefault();

  // Destroy previous chart if exists
  if (myChart) {
    myChart.destroy();
  }

  // Initialize variables
  let arrValues = [];
  let arrKeys = [];

  // Collect input values
  const inputs = document.querySelectorAll(
    '.input-set input:not(.add-new-item #your-income)'
  );
  inputs.forEach((el) => {
    const value = el.value.replace(/[$,]/g, ''); // Remove '$' and ',' from input values
    if (value) {
      arrValues.push(+value); // Convert to number and push to values array
      arrKeys.push(el.id); // Push ID to keys array
    }
  });

  // Create new chart
  const ctx = document.getElementById('myChart');
  myChart = new Chart(ctx, {
    type: 'pie',
    data: {
      labels: arrKeys,
      datasets: [
        {
          label: '$',
          data: arrValues,
          borderWidth: 1,
        },
      ],
    },
    options: {
      responsive: true,
      plugins: {
        legend: {
          position: 'bottom',
        },
        title: {
          display: true,
          text: 'Your monthly budget',
        },
      },
    },
  });

  // Display sum
  const sum = arrValues.reduce((acc, cur) => acc + cur, 0);
  document.getElementById('sum').innerText = formatValue(sum);
});

//END
