const check = document.getElementById('check');
const spinner = document.getElementById('spinner');
const decifrar = document.getElementById("Decifrar");
const cifrar = document.getElementById('Cifrar');
const mensaje = document.getElementById('cadena');
const key = document.getElementById('key');
var text_valid = false;
var key_valid = false;
var re = (/([a-z])/ig);
var re2 = (/([0-9])/ig);

function isLetter(str) {
    return str.length === 1 && str.match(/[a-zA-Z]/i)
}

function isUpperCase(character) {
    if (character === character.toUpperCase()) {
        return true
    }
    if (character === character.toLowerCase()) {
        return false
    }
}

function encode(message, key) {
    var result = ''

    for (var i = 0, j = 0; i < message.length; i++) {
        const c = message.charAt(i)
        if (isLetter(c)) {
            if (isUpperCase(c)) {
                result += String.fromCharCode((c.charCodeAt(0) + key.toUpperCase().charCodeAt(j) - 2 * 65) % 26 + 65) // A: 65
            } else {
                result += String.fromCharCode((c.charCodeAt(0) + key.toLowerCase().charCodeAt(j) - 2 * 97) % 26 + 97) // a: 97
            }
        } else {
            result += c
        }
        j = ++j % key.length
    }
    return result
}

function decode (message, key) {
    var result = ''
   
    for (var i = 0, j = 0; i < message.length; i++) {
      const c = message.charAt(i)
      if (isLetter(c)) {
        if (isUpperCase(c)) {
          result += String.fromCharCode(90 - (25 - (c.charCodeAt(0) - key.toUpperCase().charCodeAt(j))) % 26)
        } else {
          result += String.fromCharCode(122 - (25 - (c.charCodeAt(0) - key.toLowerCase().charCodeAt(j))) % 26)
        }
      } else {
        result += c
      }
      j = ++j % key.length
    }
    return result
}

mensaje.oninput = function () {
    if(re.test(this.value)){
        text_valid = true;
    } else {
        text_valid = false;
    }
    form_valid(text_valid, key_valid)
}

key.oninput = function () {
    if(re.test(this.value)){
        key_valid = true;
    } else {
        key_valid = false;
    }
    form_valid(text_valid, key_valid)
}

function form_valid (text_valid, key_valid){
    if(text_valid && key_valid){
        spinner.style.display = "none"
        check.style.display = 'block'
        cifrar.classList.add('valid')
        decifrar.classList.add('valid')
        check.classList.add('up')
    } else {
        spinner.style.display = "block"
        check.style.display = 'none'
        cifrar.classList.remove('valid')
        decifrar.classList.remove('valid')
        check.classList.remove('up')
    }
}

cifrar.onclick = function(){
    decifrar.classList.remove('valid')
    document.getElementById('resultado').innerHTML = encode(mensaje.value, key.value)
}

decifrar.onclick = function(){
    cifrar.classList.remove('valid')
    document.getElementById('resultado').innerHTML = decode(mensaje.value, key.value)
}