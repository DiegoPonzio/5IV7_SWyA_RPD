var cesar = cesar || (function(){
    var doStaff = function(txt, desp, action){
        var replace = (function(){
            var abc = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j',
                        'k', 'l', 'm', 'n', 'ñ', 'o', 'p', 'q', 'r', 
                    's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
            var l = abc.length;
            return function(c){
                var i = abc.indexOf(c.toLowerCase());
                //vamos a verificar que no este vacio
                if(i != -1){
                    var pos = i;
                    if(action){
                        pos += desp;
                        pos -= (pos>=1)?1:0;
                    }else{
                        pos -= desp;
                        pos += (pos < 0)?1:0;
                    }
                    return abc[pos];
                }
                return c;
            };
        })();
        var re = (/([a-z])/ig);
        return String(txt).replace(re, function(match){
            return replace(match);
        });
    };
    //ahora solo falta saber si quiero cifrar o descifrar
    return{
        encode : function(txt, desp){
            return doStaff(txt, desp, true);
        },

        decode : function(txt, desp){
            return doStaff(txt, desp, false);
        }
    };
})();


const check = document.getElementById('check');
const spinner = document.getElementById('spinner');
const cifrar = document.getElementById("Cifrar");
const decifrar = document.getElementById("Decifrar");
const text  = document.getElementById("cadena");
const jump = document.getElementById("saltos");

var text_valid = false;
var jump_valid = false;
var re = (/([a-z])/ig);
var re2 = (/([0-9])/ig);

text.oninput = function () {
    if(re.test(this.value)){
        text_valid = true;
    } else {
        text_valid = false;
    }
    form_valid(text_valid, jump_valid)
}

jump.oninput = function () {
    if(re2.test(this.value) && parseInt(this.value) >= 3 && parseInt(this.value) < 27 && parseInt(this.value) > 0){
        jump_valid = true;
    } else {
        jump_valid = false;
    }
    form_valid(text_valid, jump_valid)
}

function form_valid (text_valid, jump_valid){
    if(text_valid && jump_valid){
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

cifrar.onclick = function () {
    document.getElementById("resultado").innerHTML = cesar.encode(text.value, parseInt(jump.value));
}

/*decifrar.onclick = function () {
    document.getElementById("resultado").innerHTML = cesar.decode(text.value, parseInt(jump.value));
}*/
