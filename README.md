# Google Classroom to SIGAA
Extensão que realiza a importação das notas do Google Classroom para o sistema acadêmico SIGAA, utilizado por diversas IFES. A extensão é compatível com o navegador Google Chrome e *possivelmente* com o Mozilla Firefox.

Versão atual: 1.1.

### Instalação
#

**Passo 1**

Você precisa do arquivo .crx que contém a extensão: [clique aqui para baixar](https://github.com/felipealencar/google-classroom-to-sigaa/blob/main/1.1/google-classroom-to-sigaa.crx?raw=true). 

**Passo 2**

Após obter o arquivo da extensão, extraia ele em algum local do seu sistema (ex.: C:/google-classroom-to-sigaa).

**Passo 3**

Abra o Google Chrome, digite:
`chrome://extensions/` e habilite o *Modo do Desenvolvedor*.

![Passo 3](https://raw.githubusercontent.com/felipealencar/google-classroom-to-sigaa/documentation/readme/passo3.png?raw=true)


**Passo 4**

Navegue até o local onde você extraiu o .crx e selecione a pasta.

Neste ponto, a extensão deve estar adicionada à sua lista de extensões:

![Passo 4](https://raw.githubusercontent.com/felipealencar/google-classroom-to-sigaa/documentation/readme/passo4.png?raw=true)


### Manual de Uso
#
A extensão segue o regulamento padrão do Instituto Federal de Alagoas (IFAL) para associar as avaliações e notas das disciplinas. Desta forma, é possível migrar as notas de até 8 avaliações e 3 recuperações.
#
**Pré-Condições**

Para ser possível de realizar a importação, as notas da disciplina no Google Classroom devem seguir uma ordem e padrão de nomenclatura para serem associadas com as notas do SIGAA. Assim:

- Avaliação 1;
- Avaliação 2;
- Avaliação 3*;
- Avaliação 4*;
- Recuperação 1*;
- Avaliação 5*;
- Avaliação 6*;
- Avaliação 7*;
- Avaliação 8*;
- Recuperação 2*;
- Recuperação Final.

*Itens relativos ao Ensino Médio Integrado. ___Não__ é necessário ter todas as avaliações e notas cadastradas_.

Caso este padrão seja adotado, no Google Classroom, navegue até uma de suas avaliações de determinada disciplina, e faça download de todas as notas lançadas. Exemplo:

![Passo 5](https://raw.githubusercontent.com/felipealencar/google-classroom-to-sigaa/documentation/readme/passo5.png?raw=true)

Um arquivo .csv será gerado e habilitado para download.
#
**Importando o arquivo .csv**

Após o download do arquivo .csv com todas as notas das suas avaliações, você irá utilizar este arquivo diretamente na extensão. Para isso, abra o SIGAA na disciplina em questão, e acione a extensão, assim:

![Passo 6](https://raw.githubusercontent.com/felipealencar/google-classroom-to-sigaa/documentation/readme/passo6.png?raw=true)

Com a extensão aberta, selecione o arquivo .csv da disciplina que você baixou e pressione o botão Importar.

![Passo 7](https://raw.githubusercontent.com/felipealencar/google-classroom-to-sigaa/documentation/readme/passo7.png?raw=true)

![Passo 8](https://raw.githubusercontent.com/felipealencar/google-classroom-to-sigaa/documentation/readme/passo8.png?raw=true)

Após esse passo, suas notas já devem ter sido importadas para o SIGAA.

![Passo 9](https://raw.githubusercontent.com/felipealencar/google-classroom-to-sigaa/documentation/readme/passo9.png?raw=true)
