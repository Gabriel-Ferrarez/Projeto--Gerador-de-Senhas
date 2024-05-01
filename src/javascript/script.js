function getCharTypes(){
    const uppercase = document.querySelector('#include_uppercase').checked;
    const lowercase = document.querySelector('#include_lowercase').checked;
    const number  = document.querySelector('#include_number').checked;
    const specialcharacter  = document.querySelector('#include_special_character').checked;

    const charTypes = [];

    if (uppercase){
        charTypes.push('ABCDEFGHIJKLMNOPQRSTUVWXYZ');
    }

    if (lowercase){
        charTypes.push('abcdefghijklmnopqrstuvwxyz');
    }

    if (number){
        charTypes.push('0123456789');
    }

    if (specialcharacter){
        charTypes.push('!@#$%^&*()_-+={}[]|\\/?><:;"\'.,~`');
    }

    return charTypes;
}

function getPasswordSize() {
    const size = document.querySelector('#size').value;
    if (isNaN(size) || size < 4 || size > 128){
        message('Tamanho inválido, digite um número entre 4 e 128!', '#dc2626');
    }

    return size
}


function randomCharType(charTypes){
    const randomIndex = Math.floor(Math.random() * charTypes.length);


    return charTypes[randomIndex][Math.floor(Math.random() * charTypes[randomIndex].length)]; 
}

function generatePassword(size, charTypes){
    let passwordGenerated = '';

    while (passwordGenerated.length < size){
        passwordGenerated += randomCharType(charTypes)

    }

        return passwordGenerated;
    
}

function message (text, background){
    Toastify({
        text: text,
        durantion: 2000,
        style: {
            background: background,
            boxShadow: 'none'
        }
    }).showToast();

}

document.querySelector('#generate').addEventListener('click', function () {
    const size = getPasswordSize();
    const charTypes = getCharTypes();

    if(!size){
        return;
    }

    if(!charTypes.length){
        message('Selecione no mínimo um tipo de caractere!', '#dc2626');
        return;
    }

    const passwordGenerated = generatePassword(size, charTypes);

    document.querySelector('#password_container').classList.add('show');
    document.querySelector('#password').textContent = passwordGenerated;
});

document.querySelector('#copy').addEventListener('click', function(){
    navigator.clipboard.writeText(document.querySelector('#password').textContent);
    message('Senha copiada com sucesso!', '#7B68EE');
});