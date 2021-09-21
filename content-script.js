function getEstudanteIndexByName(name, inputs){
    // 4 é o número de avaliações cadastradas no SIGAA - TODO: parametrizar
    for(let index = 0; index < inputs.length; index+=4){
        if(inputs[index].parentElement.previousElementSibling.innerText.toUpperCase().includes(name.toUpperCase())){
            return index;
        }
    }
    return false;
}

window.onload = function() {
    chrome.runtime.onMessage.addListener(function(message, _, sendResponse) {
        if (message.data) {
            let inputsAvaliacoes = document.querySelectorAll('[id^=nota_]');
            let inputsRecuperacoes = document.querySelectorAll('[name^=aval_subst]');
            let index = 0;

            //TODO: parametrizar
            let avaliacoes = 2;
            message.data.forEach(function(element){
                console.log(element);
                estudanteNotaIndex = getEstudanteIndexByName(element["Nome"], inputsAvaliacoes);
                if(estudanteNotaIndex !== false){
                    for(let nota = 1, recuperacao = 1; nota <= avaliacoes ; estudanteNotaIndex++, nota++){                      
                        inputsAvaliacoes[estudanteNotaIndex].value = element[nota];
                        inputRecuperacao = inputsAvaliacoes[estudanteNotaIndex].parentElement.nextElementSibling.nextElementSibling.firstElementChild;
                        var inputRecuperacaoClass = inputRecuperacao.className;
                        switch (inputRecuperacaoClass) {
                            // valor do SIGAA
                            case "avaliacao_substitutiva":
                                let R = 'R'+recuperacao;
                                console.log(R);
                                console.log(element[R]);
                                inputRecuperacao.value = element[R];
                                recuperacao++;
                                break;
                            }  
                    }
                }
            });   
            
            //TODO: highlight notas vazias
            //...
            //console.log(inputsNota);
            sendResponse({farewell: "goodbye"});
        } else{
           sendResponse({});
        }
    });
    
};