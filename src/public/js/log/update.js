const userid = document.getElementById('userid')
const pwdusu = document.getElementById('pwdusu')
const emausu = document.getElementById('emausu')

togglePassword.addEventListener('click', function (e) {
  const type = pwdusu.getAttribute('type') === 'password' ? 'text' : 'password';
  pwdusu.setAttribute('type', type);
});

const validate = () => {
  const useridValue = userid.value.trim()
  const pwdusuValue = pwdusu.value.trim()
  const emausuValue = emausu.value.trim()

  if (useridValue === '') {
    setError(userid, 'Usuario requerido')
    setTimeout(function () {
      setSuccess(userid)
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
  if (emausuValue === '') {
    setError(emausu, 'Correo electrónico requerido')
    setTimeout(function () {
      setSuccess(emausu)
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
