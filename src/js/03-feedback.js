import throttle from 'lodash.throttle';
const FORM_DATA_KEY = 'feedback-form-state';

const refs = {
  formEl: document.querySelector('.feedback-form'),
  emailEl: document.querySelector('input'),
  messageEl: document.querySelector('textarea'),
};

refs.formEl.addEventListener('submit', handleFormSubmit);
refs.emailEl.addEventListener('input', throttle(handleFormInput, 500));
refs.messageEl.addEventListener('input', throttle(handleFormInput, 500));

let data = JSON.parse(localStorage.getItem(FORM_DATA_KEY)) || {};

refs.emailEl.value = data.email || '';
refs.messageEl.value = data.message || '';

function handleFormInput(e) {
  data[e.target.name] = e.target.value;
  localStorage.setItem(FORM_DATA_KEY, JSON.stringify(data));
}

function handleFormSubmit(e) {
  e.preventDefault();
  if (!(refs.emailEl.value && refs.messageEl.value)) {
    alert('Please, fill all fields');
    return;
  }
  console.log(data);
  clearForm();
}
function clearForm() {
  localStorage.removeItem(FORM_DATA_KEY);
  data = {};
  refs.emailEl.value = '';
  refs.messageEl.value = '';
}
