const userid = document.getElementById('userid')
const pwdact = document.getElementById('pwdact')
const pwdusu = document.getElementById('pwdusu')
//const togglePasswordAct = document.querySelector('#togglePasswordAct');
const togglePasswordNew = document.querySelector('#togglePasswordNew');

// togglePasswordAct.addEventListener('click', function (e) {
//   const type = pwdact.getAttribute('type') === 'password' ? 'text' : 'password';
//   pwdact.setAttribute('type', type);
//   //this.classList.toggle("bi-eye");
// });
togglePasswordNew.addEventListener('click', function (e) {
  const type = pwdusu.getAttribute('type') === 'password' ? 'text' : 'password';
  pwdusu.setAttribute('type', type);
  //this.classList.toggle("bi-eye");
});

const validate = () => {
  const useridValue = userid.value.trim()
  const pwdactValue = pwdact.value.trim()
  const pwdusuValue = pwdusu.value.trim()

  if (useridValue === '') {
    setError(userid, 'Usuario requerido')
    setTimeout(function () {
      setSuccess(userid)
    }, 3000)
    return false
  }
  if (pwdactValue === '') {
    setError(pwdact, 'Contraseña requerida')
    setTimeout(function () {
      setSuccess(pwdact)
    }, 3000)
    return false
  }
  if (pwdusuValue === '') {
    setError(pwdusu, 'Contraseña requerida')
    setTimeout(function () {
      setSuccess(pwdusu)
    }, 3000)
    return false
  }

  return true
}
const setSuccess = (element) => {
  const inputControl = element.parentElement;
  const errorDisplay = inputControl.querySelector('.invalid-feedback');

  errorDisplay.innerText = '';
  inputControl.classList.add('is-valid');
  element.classList.remove('is-invalid');
}
const setError = (element, message) => {
  const inputControl = element.parentElement;
  const errorDisplay = inputControl.querySelector('.invalid-feedback');

  errorDisplay.innerText = message;
  element.classList.add('is-invalid');
  inputControl.classList.remove('is-valid');
}
