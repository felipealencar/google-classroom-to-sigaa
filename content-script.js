const INPUTS_NOTAS_MEDIO = 4;
const INPUTS_NOTAS_SUPERIOR = 2;
const NIVEL_MEDIO = 1;
const NIVEL_GRADUACAO = 2;

function getEstudanteIndexByName(name, inputs, disciplina){
    // 4 é o número de avaliações cadastradas no SIGAA para o- TODO: parametrizar
    if (disciplina == NIVEL_MEDIO) {
        inputsNotas = INPUTS_NOTAS_MEDIO;
    } else if (disciplina == NIVEL_GRADUACAO) {
        inputsNotas = INPUTS_NOTAS_SUPERIOR;
    }

    for (let index = 0; index < inputs.length; index += inputsNotas){
        if (inputs[index].parentElement.previousElementSibling.innerText.toUpperCase().includes(name.toUpperCase())){
            return index;
        }
    }
    return false;
}

window.onload = function() {
    chrome.runtime.onMessage.addListener(function(message, _, sendResponse) {
        if (message.data) {
            let inputsAvaliacoes = document.querySelectorAll('[id^=nota_]');
            //let inputsRecuperacoes = document.querySelectorAll('[name^=aval_subst]');
            //let index = 0;

            //TODO: parametrizar
            let avaliacoes = 2;

            // definição de evento para atualizar o cálculo das médias finais
            let keyupEvent = new Event('keyup');
            message.data.forEach(function(element){
                console.log(element);
                // as linhas abaixo mapeiam a posição do aluno na lista do SIGAA com a lista de alunos do CSV
                // e mapeiam as notas do CSV com os campos input do SIGAA
                estudanteNotaIndex = getEstudanteIndexByName(element["Nome"], inputsAvaliacoes, element["Disciplina"]);
                if(estudanteNotaIndex !== false){
                    for(let nota = 1, recuperacao = 1; nota <= avaliacoes ; estudanteNotaIndex++, nota++){                      
                        inputsAvaliacoes[estudanteNotaIndex].value = element[nota];

                        // isso aqui pode ser simplificado com recursividade
                        if(nota % 2 == 0){
                            inputRecuperacao = inputsAvaliacoes[estudanteNotaIndex].parentElement.nextElementSibling.nextElementSibling.firstElementChild;
                            var inputRecuperacaoClass = inputRecuperacao.className;
                            switch (inputRecuperacaoClass) {
                                // valor do input no SIGAA
                                case "avaliacao_substitutiva":
                                    // definição da R1 ou R2
                                    let R = 'R'+recuperacao;
                                    inputRecuperacao.value = element[R];
                                    recuperacao++;
                                    break;
                            }
                        }
                        // regra específica para a graduação dada a menor quantidade de campos input
                        if(element["Disciplina"] == NIVEL_GRADUACAO && nota > 1){
                            inputRecuperacaoFinal = inputsAvaliacoes[estudanteNotaIndex].parentElement.nextElementSibling.nextElementSibling.nextElementSibling.firstElementChild;
                            var inputRecuperacaoFinalClass = inputRecuperacaoFinal.className;
                            //console.log(inputRecuperacaoFinalClass.className);
                            switch (inputRecuperacaoFinalClass) {
                                // valor do SIGAA
                                case "recuperacao":
                                    let R = 'FINAL';
                                    console.log(R);
                                    console.log(element[R]);
                                    inputRecuperacaoFinal.value = element[R];
                                    break;
                            }
                        }

                        inputsAvaliacoes[estudanteNotaIndex].dispatchEvent(keyupEvent);
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