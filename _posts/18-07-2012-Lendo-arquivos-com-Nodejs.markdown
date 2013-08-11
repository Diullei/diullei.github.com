---
layout: post
title: Lendo arquivos com Nodejs
category: NodeJs
tags : [NodeJs]
---

Existem algumas formas diferentes de ler arquivos usando node.js. Existem métodos síncronos e métodos assíncronos que nos permitem realizar este trabalho. Vou exibir e explicar estas diversas formas no decorrer deste post.

Vamos ao nosso primeiro exemplo:

{% highlight javascript %}
var fs = require('fs');

fs.readFile('TEST.txt', function(err,data){
    if(err) {
        console.error("Could not open file: %s", err);
        process.exit(1);
    }
	
	console.log(data);
});
{% endhighlight %}

Precisamos primeiro de tudo carregar o módulo fs pois é a partir deste módulo que teremos acesso aos métodos de leitura e escrita de arquivos. Logo em seguida fazemos uma chamada ao método: [fs.readFile](http://nodejs.org/docs/v0.4.8/api/fs.html#fs.readFile). Esta função recebe na assinatura o nome do arquivo, um parâmetro opcional que define o encoding que será utilizado durante a leitura do arquivo e um método de callback que será utilizado para manipular os dados lidos do disco. Esse método recebe 2 parâmetros *err* e *data*. Sempre que ocorrer um erro durante a leitura do arquivo o parâmetro *err* virá preenchido com as informações referente ao erro. Se o parametro *err* vier vazio significa que a leitura do arquivo ocorreu sem problemas e então poderemos manipular o pârametro *data* que possui o conteúdo do arquivo que está sendo lido. Note que fazemos primeiro a verificação de erros antes de prosseguir com a manipulados dos dados.

Vamos ver o resultado deste código:

![Valid XHTML](/images/lendo_arquivos/Capture_2012-07-18_203709.png)

Veja que quando escrevemos o conteúdo de *data* no console vemos muitos números estranhos. Esse conteúdo é totalmente diferente do arquivo que estou tentando ler. A documentação nos passa uma dica do que está ocorrendo:

> If no encoding is specified, then the raw buffer is returned.

Ou seja, se não passarmos um valor para o parâmetro encoding (segundo parâmetro da função readFile) o resultado é retornado da forma em que está gravado no disco. 

O node nos dá ainda a chance de utilizar o método [toString](http://nodejs.org/docs/v0.4.8/api/buffers.html#buffer.toString) no buffer(variável que contém o resultado da leitura do arquivo) passando como parâmetro o encoding desejado.

Vejamos os exemplos abaixo:

*passando o encoding*:
{% highlight javascript %}
var fs = require('fs');

fs.readFile('TEST.txt', 'utf8', function(err,data){
    if(err) {
        console.error("Could not open file: %s", err);
        process.exit(1);
    }
	
	console.log(data);
});
{% endhighlight %}

![Valid XHTML](/images/lendo_arquivos/Capture_2012-07-18_203739.png)

*usando o método toString(...)*

{% highlight javascript %}
var fs = require('fs');

fs.readFile('TEST.txt', function(err,data){
    if(err) {
        console.error("Could not open file: %s", err);
        process.exit(1);
    }
	
	console.log(data.toString('utf8'));
});
{% endhighlight %}

![Valid XHTML](/images/lendo_arquivos/Capture_2012-07-18_203850.png)

A decisão sobre o tipo de encoding utilizar vai depender de que manipulação precisaremos realizar com o conteúdo do arquivo que estamos lendo. Se queremos enviar este conteúdo pela rede para um cliente manter o buffer do jeito que está armazenado no disco é a melhor escolha. Desse jeito podemos utilizar a propriedade length para para pegar o tamanho do arquivo em bytes por exemplo. Isso é muito útil quando queremos por exemplo enviar o tamanho do nosso arquivo no *Content-Length* no cabeçalho HTTP.

Se o que queremos fazer é manipulação de strings a melhor escolha é passar um encoding.

Um ponto importante a se notar é que da forma em que estamos lendo o arquivo temos os dados do arquivo todo armazenado em memória. Em algum momento o garbage collector irá decidir por remover estes dados da memória caso não exista mais nenhuma referência para o mesmo. Outro ponto é que esta operação é uma operação assíncrona.

Vamos ver agora uma implementação síncrona de leitura de arquivos utilizando o método [fs.readFileSync](http://nodejs.org/docs/v0.4.8/api/fs.html#fs.readFileSync). Este método bloqueia o bloco de código e não permite que o código avance sem que a leitura do arquivo seja finalizada. Segue um exemplo:

{% highlight javascript %}
var fs = require('fs');

try {
    var data = fs.readFileSync('TEST.txt', 'ascii');
    console.log(data);
}
catch (err) {
    console.error("There was an error opening the file:");
    console.log(err);
}
{% endhighlight %}

![Valid XHTML](/images/lendo_arquivos/Capture_2012-07-18_225647.png)

Aqui podemos destacar duas grandes diferenças. A primeiro é que não temos mais o nosso método de callback. Não precisamos mais dele já que a execução da leitura será realizada de forma síncrona. A outra diferença é que precisamos gerenciar as exeções por nós mesmo, por isso colocamos o código dentro de um bloco *try...catch*.

Até agora vimos métodos de leitura que funcionam muito bem para leitura de arquivos de tamanho razoável. Como todos os dados do arquivo são armazenados por completo na memória se quiséssemos ler um arquivo com alguns *gigas* de tamanho por exemplo teríamos alguns sérios problemas. Para essa situação de leitura de arquivos maiores iremos utilizar o método [fs.createReadStream](http://nodejs.org/docs/v0.4.8/api/fs.html#fs.createReadStream). Com esse método podemos ler o arquivo definindo um tamanho de memória máximo a ser utilizado. As opções de configuração para utilização deste método são:

{% highlight javascript %}
{ 
	flags: 'r',
	encoding: null,
	fd: null,
	mode: 0666,
	bufferSize: 64 * 1024
}
{% endhighlight %}

Os atributos principais nos quais devemos nos concentrar é o encoding e o bufferSize. Com o atributo bufferSize dizemos o volume de dados que será lido por vez. O valor padrão como exibido acima é 64 kb. Como esse método é assíncrono nós iremos manipular o resultado monitorando alguns eventos específicos. Vamos a um exemplo:

{% highlight javascript %}
var fs = require('fs');

var read_stream = fs.createReadStream('TEST.txt', {encoding: 'ascii'});
read_stream.on("data", function(data){
    process.stdout.write(data);
});
read_stream.on("error", function(err){
    console.error("An error occurred: %s", err)
});
read_stream.on("close", function(){
    console.log("File closed.")
});
{% endhighlight %}

Repare que temos 3 eventos. *data* que é chamado cada vez que um trecho do arquivo com o tamanho definido no bufferSize for carregado em memória, *error* que é chamado sempre que um erro ocorrer durante a leitura e *close* que será chamado quando a leitura for finalizada. Aqui vale notar que trabalhamos com o arquivo pedaço por pedaço e por isso não usamos console.log(...) para não colocar uma quebra de linha a cada leitura de trecho do arquivo. Usamos no lugar o método process.stdout.write  para que a cada final e trecho de leitura não tenhamos nenhum caracter de quebra de linha inserido alterando o conteúdo do nosso arquivo.

Hoje ficamos por aqui.

Um abraço pra todos!
