let initData;
let myChart = null;
let dataArray = [];

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

function generateWarmHexColor() {
  // Генерация случайных значений для красного, зеленого и синего каналов
  const red = Math.floor(Math.random() * 128 + 128); // От 128 до 255 (теплые оттенки красного)
  const green = Math.floor(Math.random() * 128 + 128); // От 0 до 127 (зеленый канал в теплых оттенках)
  const blue = Math.floor(Math.random() * 128 + 128); // От 0 до 127 (синий канал в теплых оттенках)

  // Форматирование значений к шестнадцатеричному формату
  const redHex = red.toString(16).padStart(2, '0'); // Преобразование в шестнадцатеричную строку
  const greenHex = green.toString(16).padStart(2, '0');
  const blueHex = blue.toString(16).padStart(2, '0');

  // Сборка значения цвета в формате hexadecimal
  const hexColor = `#${redHex}${greenHex}${blueHex}`;

  return hexColor;
}

// Создание HTML-структуры на основе данных
const createForm = (data) => {
  const form = document.querySelector('#form');
  data.forEach((section, i) => {
    let className;
    if (i === 0) {
      className = `slide section section_${section.sectionName} active`;
    } else {
      className = `slide section section_${section.sectionName}`;
    }
    const fieldset = createElementWithClasses(
      'fieldset',
      className,
      section.sectionName
    );
    form.appendChild(fieldset);

    const h2 = document.createElement('h2');
    h2.textContent = toCamelCase(section.sectionName);
    fieldset.appendChild(h2);

    const collapseContainer = createCollapsibleBtn(
      'button',
      'collapse fa-solid fa-caret-down'
    );

    // const collapseContainer = createElementWithClasses(
    //   'button',
    //   'collapse fa-solid fa-caret-down'
    // );
    // setAttributes(collapseContainer, {
    //   'aria-hidden': false,
    // });
    // h2.after(collapseContainer);

    const gpoupingContainer = createElementWithClasses('div', 'inputs-group');
    h2.after(gpoupingContainer);

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
        maxlength: '5',
        autocomplete: 'one-time-code',
        inputmode: 'numeric',
        'data-inputLabeName': item.labelName,
        'data-category': section.sectionName,
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
          maxlength: '50',
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
  let isHidden;
  const a = e.target.closest('.flex-box');
  const b = a.querySelector('.data-container .flex-box');
  if (b) {
    toggleCollapse(e.target);
    toggleCaretIcon(e.target);
  } else if (!isHidden) {
    e.target.classList.add('hide');
    isHidden = true;
  } else {
    e.target.classList.remove('hide');
    isHidden = false;
  }
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

//function to create collapsible element

function createCollapsibleBtn(el, elClass) {
  const collapseContainer = createElementWithClasses(el, elClass);
  setAttributes(collapseContainer, {
    'aria-hidden': false,
  });
  return collapseContainer;
}

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
    const inputIndex = dataArray.findIndex(
      (item) => item.inputId === elementId
    );
    if (inputIndex >= 0) {
      dataArray.splice(inputIndex, 1);
    }
    input.remove();
    label.remove();
    e.target.remove();
  });
};

//Function to add a new input
const addInput = (addBtns) => {
  addBtns.forEach((btm) => {
    btm.addEventListener('click', (e) => {
      e.preventDefault();
      const addInputValue = e.target.previousElementSibling;
      const category = e.target
        .closest('.active')
        .querySelector('h2')
        .innerText.toLowerCase();
      const val = addInputValue.value;
      const allInputLabelsName = document.querySelectorAll('.input-set label');
      const errorContainer = e.target
        .closest('.input-set')
        .querySelector('.error-container');
      if (errorContainer) {
        errorContainer.remove();
      }
      let isNameExists = Array.from(allInputLabelsName).some((label) => {
        const labelText = label.innerText.replace(' Payment', '');
        return (
          toCamelCase(labelText) === toCamelCase(val) ||
          toCamelCase(label.innerText) === toCamelCase(val)
        );
      });
      const nextElTarget = e.target.nextElementSibling;
      const errorDivNoValue = createErrorContainer(
        'Please enter value for the field.'
      );
      const errorDivNameExists = createErrorContainer(
        'The field already exists.'
      );
      if (!val && !isNameExists) {
        if (!nextElTarget) {
          e.target.after(errorDivNoValue);
        } else {
          nextElTarget.classList.remove('hide');
        }
      } else if (val && isNameExists) {
        if (!nextElTarget) {
          e.target.after(errorDivNameExists);
          addInputValue.value = '';
        } else {
          nextElTarget.classList.remove('hide');
        }
      } else {
        if (nextElTarget) {
          nextElTarget.classList.add('hide');
        }
        const newEl = creatInput(val, e.target, category);
        newEl.focus();
        createDataArray(newEl);
      }
    });
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
function creatInput(val, el, category) {
  const label = document.createElement('label');
  val = val.trim();
  label.innerText = toCamelCase(val);
  const input = createElementWithClasses(
    'input',
    'new-input-added',
    val.replace(/\s+/g, '-')
  );
  setAttributes(input, {
    type: 'text',
    name: val,
    placeholder: 'Numbers Only',
    inputmode: 'numeric',
    maxlength: '5',
    'data-inputLabeName': toCamelCase(val),
    'data-category': category,
  });
  const removeButton = createElementWithClasses(
    'button',
    'remove-btm fa-solid fa-xmark',
    `${val.replace(/\s+/g, '-')}-remove-btm`
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

//function to wait for elemtn to be presernt on the page
function waitForElement(selector, timeout = 1000) {
  return new Promise((resolve, reject) => {
    const intervalId = setInterval(() => {
      const element = document.querySelector(selector);
      if (element) {
        clearInterval(intervalId);
        resolve(element);
      }
    }, 100);

    setTimeout(() => {
      clearInterval(intervalId);
      reject(new Error(`Element ${selector} not found within ${timeout}ms`));
    }, timeout);
  });
}

//function to create slider
const buildSlider = (slides) => {
  const nextBtn = document.getElementById('next');
  const previousBtn = document.getElementById('previous');
  const progressBar = document.getElementById('progress-bar');
  const totalIncomInput = document.getElementById('your-income');
  const totalIncomeContainer = document.querySelector('#total-income');
  const totalIncomeSpan = document.querySelector('#total-income-value');
  const currentStep = document.getElementById('current-step');
  const lastStep = document.getElementById('last-step');
  const calculate = document.getElementById('calculate');

  let isErrorDiv;
  let currentIndex = 0;

  const inputs = document.querySelectorAll(
    'fieldset.active input:not(.add-new-item)'
  );

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

  const calcBtns = document.querySelectorAll('.calculate');
  calcBtns.forEach((btn) => {
    btn.addEventListener('click', (e) => {
      const currentSlide = slides[currentIndex];

      if (currentSlide.tagName.toLowerCase() === 'fieldset') {
        const slideInputs = currentSlide.querySelectorAll(
          'input:not(.add-new-item)'
        );

        const currentSlideHeading = currentSlide.querySelector('h2');
        const id = currentSlideHeading.textContent.trim().toLowerCase();
        let sectionSum;
        let newEl;
        let totalSum;

        const expensesBreakpoints = document.getElementById(
          'expenses-breakpoints'
        );
        let dataSelector = expensesBreakpoints.querySelector(
          `[data-name='${id}']`
        );

        sectionSum = dataArray
          .filter((item) => item.category === id)
          .reduce((acc, obj) => acc + obj.inputValue, 0);
        totalSum = dataArray.reduce((acc, obj) => acc + obj.inputValue, 0);
        const totalExpensesText = `Total ${id} expenses: ${formatValue(
          sectionSum
        )}`;
        document.getElementById('sum').innerText = formatValue(totalSum);
        const collapseContainer = createCollapsibleBtn(
          'button',
          'collapse fa-solid fa-caret-down'
        );

        // const collapseContainer = createElementWithClasses(
        //   'div',
        //   'collapse fa-solid fa-caret-down'
        // );
        const dataContainer = createElementWithClasses(
          'div',
          'data-container hide'
        );

        const content = dataArray
          .filter((item) => item.category === id)
          .map(
            (item) =>
              `<div class='flex-box'>
              <div class="color-inner" style="background-color: ${
                item.randomColor
              }"></div>
                <div>${item.inputName}: ${formatValue(item.inputValue)}</div>
              </div>`
          )
          .join('');

        dataContainer.innerHTML = content;

        newEl = createElementWithClasses('div');
        setAttributes(newEl, {
          'data-name': id,
        });
        let newFlexBox = createElementWithClasses('div', `flex-box box-${id}`);
        if (!dataSelector) {
          newEl.innerText = totalExpensesText;
          expensesBreakpoints.appendChild(newFlexBox);
          newFlexBox.appendChild(newEl);
          if (sectionSum !== 0) {
            newEl.after(collapseContainer);
            collapseContainer.after(dataContainer);
          }
        } else {
          dataSelector.innerText = totalExpensesText;
          let dataBox = document.querySelector(`.box-${id}`);
          let updateDataContainer = dataBox.querySelector('.data-container');
          let calapseContainer = dataBox.querySelector('.collapse');
          if (sectionSum !== 0 && !calapseContainer) {
            dataSelector.after(collapseContainer);
            console.log(dataContainer);
            collapseContainer.after(dataContainer);
          }
          if (updateDataContainer) {
            updateDataContainer.innerHTML = content;
          }
        }
        document.querySelectorAll('.collapse').forEach((el) => {
          el.addEventListener('click', handleCollapseClick);
        });
      }
    });
  });

  nextBtn.addEventListener('click', (e) => {
    const errorDiv = createErrorContainer('Please enter your monthly income.');
    if (!totalIncomInput.value) {
      if (!isErrorDiv) {
        totalIncomInput.after(errorDiv);
        isErrorDiv = true;
      }
      return;
    }

    if (isErrorDiv) {
      let elToRemove = document.querySelector('.content .error-container');
      if (elToRemove) {
        elToRemove.remove();
        isErrorDiv = false;
      }
    }
    const targetElement = document.querySelector('.active h2');
    if (window.innerWidth <= 768) {
      targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }

    currentStep.innerText = currentIndex + 2;
    totalIncomeSpan.innerText = totalIncomInput.value;
    currentIndex = (currentIndex + 1) % slides.length;
    showSlides(currentIndex);

    previousBtn.disabled = false;
    if (currentIndex + 1 === slides.length) {
      nextBtn.classList.add('hide');
      calculate.classList.remove('hide');
    }
  });

  previousBtn.addEventListener('click', () => {
    currentIndex = (currentIndex - 1 + slides.length) % slides.length;
    showSlides(currentIndex);
    currentStep.innerText = currentIndex + 1;
    if (currentIndex + 1 === slides.length - 1) {
      nextBtn.classList.remove('hide');
      calculate.classList.add('hide');
    }
    if (currentIndex === 0) {
      previousBtn.disabled = true;
    }
    const targetElement = document.querySelector('.active h2');
    if (window.innerWidth <= 768) {
      targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });

  showSlides(currentIndex);
};

// Call createForm function with initData
document.addEventListener('DOMContentLoaded', () => {
  const xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      initData = JSON.parse(xhttp.responseText).data;
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

      //Add event listener for add button
      const addBtns = document.querySelectorAll('.add-btm');
      addInput(addBtns);

      //Inputs value validation
      document
        .querySelectorAll('.input-set input:not(.add-new-item)')
        .forEach((el) => {
          validation(el);
        });

      document
        .querySelectorAll('fieldset input:not(.add-new-item)')
        .forEach((el) => {
          createDataArray(el);
        });

      //build slider and progress bar
      buildSlider(document.querySelectorAll('.slide'));
    }
  };
  xhttp.open('GET', 'js/data.json', true);
  xhttp.send();
});

document.getElementById('calculate').addEventListener('click', (e) => {
  e.preventDefault();
  const chartHeadiong = document.getElementById('chart-title');
  waitForElement('div[dir]').then((element) => {
    chartHeadiong.classList.remove('hide');
    element.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });

  // let expensestoDisplay = document.querySelectorAll(
  //   '#expenses-breakpoints .data-container .flex-box'
  // );

  // let expensesText = [];

  // expensestoDisplay.forEach((i) => {
  //   if (!i.querySelector('div').classList.contains('test-color-inner')) {
  //     let div = i.querySelectorAll('div');
  //     div.forEach((item) => {
  //       // if (!item.classList.contains('.test-color-inner')) {
  //       let text = item.innerText.split(':');
  //       let number = text[1].replace('$', '');
  //       number = number.replace(',', '');
  //       const randomColor = generateWarmHexColor();
  //       const colorDiv = createElementWithClasses('div', 'test-color-inner');
  //       colorDiv.style.background = randomColor;
  //       item.before(colorDiv);
  //       let newItem = { name: text[0], value: +number, color: randomColor };
  //       expensesText.push(newItem);
  //       // }
  //     });
  //   }
  // });

  // console.log(expensesText);

  // Destroy previous chart if exists
  if (myChart) {
    myChart.destroy();
  }
  const inputs = document.querySelectorAll('fieldset input:not(.add-new-item)');

  createNewChart(dataArray.map((item) => item.inputValue));

  const arrOfArrays = dataArray.map((obj) => {
    // Return an object with 'key' and 'value' properties
    return [obj.inputName, obj.inputValue];
  });

  const colorsArr = dataArray.map((item) => item.randomColor);
  drawChart(arrOfArrays, colorsArr);
  google.charts.setOnLoadCallback(drawChart);

  // Display sum
  // const sum = inputsValues.reduce((acc, obj) => acc + obj.value, 0);
  // document.getElementById('sum').innerText = formatValue(sum);
});

//Function to create data array
function createDataArray(input) {
  input.addEventListener('blur', () => {
    let inputValue = +input.value.replace(/[$,]/g, '');
    const inputId = input.id;
    const inputName = input.dataset.inputlabename;
    const category = input.dataset.category;
    const randomColor = generateWarmHexColor(); // Generate random color
    const inputIndex = dataArray.findIndex((item) => item.inputId === inputId);

    if (inputIndex === -1 && inputValue !== 0) {
      dataArray.push({ inputId, inputName, inputValue, category, randomColor });
    } else if (inputIndex >= 0 && inputValue !== 0) {
      dataArray[inputIndex].inputValue = inputValue;
    } else if (inputIndex >= 0 && (inputValue === 0 || !inputValue)) {
      dataArray.splice(inputIndex, 1);
    }

    console.log(dataArray);
  });
}

function createNewChart(arr) {
  const keysArray = arr.map((obj) => obj.key);
  const valueArray = arr.map((obj) => obj.value);
  const ctx = document.getElementById('myChart');
  myChart = new Chart(ctx, {
    type: 'pie',
    data: {
      labels: keysArray,
      datasets: [
        {
          label: '$',
          data: valueArray,
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
}

// Load the Visualization API and the corechart package.
google.charts.load('current', { packages: ['corechart'] });

//Function to draws a chart.
function drawChart(arr, colorsArr) {
  // Create the data table.
  var data = new google.visualization.DataTable();
  data.addColumn('string', 'Topping');
  data.addColumn('number', 'Slices');
  data.addRows(arr);

  let width = 450;
  let height = 450;

  if (window.innerWidth <= 768) {
    width = 300;
    height = 300;
  }

  // Set chart options
  var options = {
    is3D: true,
    fontName: '"Open Sans", sans-serif',
    backgroundColor: 'transparent',
    width: width,
    height: height,
    legend: {
      position: 'bottom',
      alignment: 'center',
      textStyle: { color: '#52504f', fontSize: 16 },
    },
    chartArea: { width: '70%', height: '70%' },
    colors: colorsArr,
    titleTextStyle: {
      color: '#52504f',
      fontSize: 16,
      textAlign: 'center',
      bold: false,
    },
    titlePosition: 'center',
    tooltip: {
      color: '#52504f',
      fontName: '"Open Sans", sans-serif',
      fontSize: 12,
      bold: false,
      italic: true,
    },
  };

  // Instantiate and draw our chart, passing in some options.
  var chart = new google.visualization.PieChart(
    document.getElementById('chart_div')
  );
  chart.draw(data, options);
}

//END
