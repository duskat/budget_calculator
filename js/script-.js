// import Handlebars from 'handlebars';
// const initData2 = template({
//   data: [
//     {
//       sectioName: 'essentials',
//       items: [
//         {
//           id: 'mortgage',
//           labelName: 'Mortgage Payment',
//         },
//         {
//           id: 'hoa',
//           labelName: 'HOA Payment',
//         },
//         {
//           id: 'car-lease',
//           labelName: 'Car Lease Payment',
//         },
//         {
//           id: 'car-insurance',
//           labelName: 'car insurancet Payment',
//         },
//         {
//           id: 'day-care',
//           labelName: 'day care Payment',
//         },
//         {
//           id: 'add-essential',
//           labelName: 'add essential payment',
//         },
//       ],
//     },
//     {
//       sectioName: 'utilities',
//       items: [
//         {
//           id: 'electricity',
//           labelName: 'electricity Payment',
//         },
//         {
//           id: 'gas',
//           labelName: 'gas Payment',
//         },
//         {
//           id: 'water',
//           labelName: 'water Payment',
//         },
//         {
//           id: 'internet',
//           labelName: 'internet Payment',
//         },
//         {
//           id: 'mobile-phone',
//           labelName: 'mobile phone Payment',
//         },
//         {
//           id: 'add-utilitie',
//           labelName: 'add utilitie Payment',
//         },
//       ],
//     },
//     {
//       sectioName: 'others',
//       items: [
//         {
//           id: 'groceries',
//           labelName: 'groceries',
//         },
//         {
//           id: 'entertainments',
//           labelName: 'entertainments',
//         },
//         {
//           id: 'eating-out',
//           labelName: 'eating out',
//         },
//         {
//           id: 'gym',
//           labelName: 'gym',
//         },
//         {
//           id: 'miscellaneous',
//           labelName: 'Miscellaneous',
//         },
//         {
//           id: 'add-other',
//           labelName: 'add other Payment',
//         },
//       ],
//     },
//   ],
// });
// const newForm = document.getElementById('new-form').innerHTML;
// const form2 = document.getElementById(newForm);
// const template = Handlebars.compile(newForm);
// form2.innerHTML += template;

// const initData = [
//   {
//     sectioName: 'essentials',
//     items: [
//       {
//         id: 'mortgage',
//         labelName: 'Mortgage Payment',
//       },
//       {
//         id: 'hoa',
//         labelName: 'HOA Payment',
//       },
//       {
//         id: 'car-lease',
//         labelName: 'Car Lease Payment',
//       },
//       {
//         id: 'car-insurance',
//         labelName: 'car insurancet Payment',
//       },
//       {
//         id: 'day-care',
//         labelName: 'day care Payment',
//       },
//       {
//         id: 'add-essential',
//         labelName: 'add essential payment',
//       },
//     ],
//   },
//   {
//     sectioName: 'utilities',
//     items: [
//       {
//         id: 'electricity',
//         labelName: 'electricity Payment',
//       },
//       {
//         id: 'gas',
//         labelName: 'gas Payment',
//       },
//       {
//         id: 'water',
//         labelName: 'water Payment',
//       },
//       {
//         id: 'internet',
//         labelName: 'internet Payment',
//       },
//       {
//         id: 'mobile-phone',
//         labelName: 'mobile phone Payment',
//       },
//       {
//         id: 'add-utilitie',
//         labelName: 'add utilitie Payment',
//       },
//     ],
//   },
//   {
//     sectioName: 'others',
//     items: [
//       {
//         id: 'groceries',
//         labelName: 'groceries',
//       },
//       {
//         id: 'entertainments',
//         labelName: 'entertainments',
//       },
//       {
//         id: 'eating-out',
//         labelName: 'eating out',
//       },
//       {
//         id: 'gym',
//         labelName: 'gym',
//       },
//       {
//         id: 'miscellaneous',
//         labelName: 'Miscellaneous',
//       },
//       {
//         id: 'add-other',
//         labelName: 'add other Payment',
//       },
//     ],
//   },
// ];

// let initData;

// const xhttp = new XMLHttpRequest();
// xhttp.onreadystatechange = function () {
//   if (this.readyState == 4 && this.status == 200) {
//     initData = JSON.parse(xhttp.responseText);
//     initData = initData.data;
//     console.log(initData);
//   }
// };
// xhttp.open('GET', 'js/data.json', true);
// xhttp.send();

// const heading = document.querySelector('h1');

// // Функция для создания элемента с заданным тегом и классами
// const createElementWithClasses = (tagName, classes) => {
//   const element = document.createElement(tagName);
//   if (classes) {
//     element.classList.add(...classes.split(' '));
//   }
//   return element;
// };

// // Функция для создания и добавления атрибутов к элементу
// const setAttributes = (element, attributes) => {
//   for (const key in attributes) {
//     element.setAttribute(key, attributes[key]);
//   }
// };

// // Создание HTML-структуры на основе данных
// const createForm = (data) => {
//   const form = document.getElementById('form');
//   data.forEach((section) => {
//     const fieldset = createElementWithClasses('fieldset', 'section');
//     fieldset.id = section.sectionName;
//     form.appendChild(fieldset);

//     const h2 = document.createElement('h2');
//     h2.textContent = section.sectioName;
//     fieldset.appendChild(h2);

//     const collapseSpan = createElementWithClasses(
//       'span',
//       'collapse fa-solid fa-caret-down'
//     );
//     h2.after(collapseSpan);

//     const gpoupSpan = createElementWithClasses('span', 'input-group');
//     collapseSpan.after(gpoupSpan);

//     section.items.forEach((item, index) => {
//       const label = document.createElement('label');
//       setAttributes(label, { for: item.id });
//       label.textContent = toCamelCase(item.labelName);

//       const input = document.createElement('input');
//       setAttributes(input, {
//         type: 'text',
//         placeholder: 'Numbers Only',
//         min: '0.00',
//         max: '10000.00',
//         step: '0.01',
//         id: item.id,
//         name: item.id,
//       });

//       const addButton = createElementWithClasses(
//         'button',
//         'add-btm fa-solid fa-plus'
//       );
//       addButton.id = `add-${section.sectionName}-bttm`;

//       const removeButton = createElementWithClasses(
//         'button',
//         `remove-btm fa-solid fa-xmark`
//       );
//       removeButton.id = `${item.id}-remove-btm`;

//       gpoupSpan.appendChild(label);
//       label.after(input);
//       input.after(removeButton);

//       if (index === section.items.length - 1) {
//         input.after(addButton);
//         input.classList.add('add-new-item');
//         removeButton.remove();
//       }
//     });
//   });
// };

// // Вызываем функцию createForm с вашими данными initData
// createForm(initData);

// const toggleCollapse = (target) => {
//   target.nextElementSibling.classList.toggle('hide');
// };

// const toggleCaretIcon = (target) => {
//   const isCaretUp = target.classList.contains('fa-caret-up');
//   target.classList.replace(
//     isCaretUp ? 'fa-caret-up' : 'fa-caret-down',
//     isCaretUp ? 'fa-caret-down' : 'fa-caret-up'
//   );
// };

// document.querySelectorAll('.collapse').forEach((el) => {
//   el.addEventListener('click', (e) => {
//     toggleCollapse(e.target);
//     toggleCaretIcon(e.target);
//   });
// });

// function toCamelCase(value) {
//   if (value) {
//     const valueTrimed = value.trim();
//     const str = valueTrimed.split(' ').filter((el) => el !== '');
//     return str.map((lt) => lt[0].toUpperCase() + lt.slice(1)).join(' ');
//   }
// }

let initData;

// Функция для создания элемента с заданным тегом и классами
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

// Функция для создания и добавления атрибутов к элементу
const setAttributes = (element, attributes) => {
  for (const key in attributes) {
    element.setAttribute(key, attributes[key]);
  }
};

// Создание HTML-структуры на основе данных
const createForm = (data) => {
  const form = document.getElementById('form');
  data.forEach((section) => {
    const fieldset = createElementWithClasses(
      'fieldset',
      `section section_${section.sectionName}`,
      section.sectionName
    );
    form.appendChild(fieldset);

    const h2 = document.createElement('h2');
    h2.textContent = toCamelCase(section.sectionName);
    fieldset.appendChild(h2);

    const collapseSpan = createElementWithClasses(
      'span',
      'collapse fa-solid fa-caret-down'
    );
    h2.after(collapseSpan);

    const gpoupSpan = createElementWithClasses('span', 'input-group');
    collapseSpan.after(gpoupSpan);

    section.items.forEach((item, index) => {
      const label = document.createElement('label');
      setAttributes(label, { for: item.id });
      label.textContent = toCamelCase(item.labelName);

      const input = document.createElement('input');
      setAttributes(input, {
        type: 'text',
        placeholder: 'Numbers Only',
        id: item.id,
        name: item.id,
      });

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

      gpoupSpan.appendChild(label);
      label.after(input);
      input.after(removeButton);

      if (index === section.items.length - 1) {
        input.after(addButton);
        input.classList.add('add-new-item');
        removeButton.remove();
      }
    });
  });
};

// Функция для обработки клика на кнопку сворачивания
const handleCollapseClick = (e) => {
  toggleCollapse(e.target);
  toggleCaretIcon(e.target);
};

// Вызываем функцию createForm с вашими данными initData
document.addEventListener('DOMContentLoaded', () => {
  const xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      initData = JSON.parse(xhttp.responseText).data; // Исправлено: initData.data
      console.log(initData);
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
      //
      document.querySelectorAll('.add-btm').forEach((btm) => {
        btm.addEventListener('click', (e) => {
          e.preventDefault();
          const addInputValue = e.target.previousElementSibling;
          const val = addInputValue.value;
          const nextElTarget = e.target.nextElementSibling;
          const errorDiv = createErrorContainer('Please enter some values');
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
            creatInput(val, e.target);
          }
        });
      });
    }
  };
  xhttp.open('GET', 'js/data.json', true);
  xhttp.send();
});

// Функция для переключения состояния сворачивания
const toggleCollapse = (target) => {
  target.nextElementSibling.classList.toggle('hide');
};

// Функция для переключения иконки стрелки
const toggleCaretIcon = (target) => {
  const isCaretUp = target.classList.contains('fa-caret-up');
  target.classList.replace(
    isCaretUp ? 'fa-caret-up' : 'fa-caret-down',
    isCaretUp ? 'fa-caret-down' : 'fa-caret-up'
  );
};

const inputs = document.getElementsByTagName('input');

const newInputsArray = Array.from(inputs).filter(
  (input) => !input.classList.contains('add-new-item')
);

newInputsArray.forEach((i) => {
  validation(i);
});

function creatInput(val, el) {
  const label = document.createElement('label');
  val = val.trim();
  label.innerText = toCamelCase(val);
  label.setAttribute('for', val);
  const input = createElementWithClasses('input', 'new-input-added', val);
  setAttributes(input, {
    type: 'text',
    name: val,
  });
  const removeButton = createElementWithClasses(
    'button',
    'remove-btm fa-solid fa-xmark',
    `${val}-remove-btm`
  );
  const addNewItemInputField = el
    .closest('fieldset')
    .querySelector('.add-new-item');
  const beforeEl = addNewItemInputField.previousSibling;
  beforeEl.before(label);
  label.after(input);
  input.after(removeButton);
  addNewItemInputField.value = '';
  validation(input);
  deleteInput(removeButton);
}

function deleteInput(btm) {
  btm.addEventListener('click', (e) => {
    e.preventDefault();
    const elementId = e.target.id.split('-remove-bt')[0];
    console.log(elementId);
    const input = document.getElementById(elementId);
    const label = input.previousElementSibling;
    const errorContainer = input.nextElementSibling.nextElementSibling;
    if (errorContainer.classList.contains('error-container')) {
      errorContainer.remove();
    }
    input.remove();
    label.remove();
    e.target.remove();
  });
}

function createErrorContainer(message) {
  let errorDiv = document.createElement('div');
  errorDiv.className = 'error-container';
  errorDiv.innerText = message;
  return errorDiv;
}

function validation(el) {
  el.addEventListener('blur', (e) => {
    let inputVal = e.target.value;
    let val = Number(inputVal);
    const errorDiv = createErrorContainer('Please enter numbers only');
    const sibling = e.target.nextElementSibling;
    if (isNaN(val)) {
      if (sibling && !sibling.classList.contains('error-container')) {
        e.target.nextElementSibling.after(errorDiv);
        e.target.classList.add('validation-error');
        e.target.value = '';
      }
      if (val === 0) {
        errorDiv.innerText = 'Please entre the value';
      }
    } else {
      let newVal = new Intl.NumberFormat('en', {
        style: 'currency',
        currency: 'USD',
      }).format(val);
      console.log(newVal);
      e.target.value = newVal;
      if (sibling && sibling.classList.contains('error-container')) {
        sibling.classList.add('hide');
      } else {
        sibling.classList.remove('hide');
      }
    }
  });
}
