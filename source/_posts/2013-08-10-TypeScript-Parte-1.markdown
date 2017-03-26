---
layout: post
title: TypeScript (Parte 1)
category: TypeScript
tags : [TypeScript, JavaScript]
---

Embora eu já tenha escrito uma introdução sobre o TypeScript em [outro artigo](/posts/Introducao-ao-TypeScript/) resolvi voltar ao tema e dessa vez escrever uma série de artigos sobre TypeScript. Neste post estarei novamente introduzindo o TypeScript.

## Introdução

Com o crescimento da internet e a necessidade cada vez maior de termos aplicações web expondo funcionalidades complexas de usabilidade no lado cliente _(FrontEnd)_, têm se ampliado cada vez mais o uso do **JavaScript** para suportar toda esta infinidade de programação diretamente no navegador web.

Nos últimos anos nossos computadores ficaram mais rápidos, nossos navegadores ficaram mais rápidos e com isso o **JavaScript** também teve seu curso de evolução natural ficando mais rápido devido ao grande investimento em tecnologia feito nos compiladores e ganhando inúmeros recursos. Hoje podemos ver uma explosão de frameworks surgindo a todo momento, falamos sobre MVC e padrões de projeto dentre outros assuntos como se estivessemos falando sobre linguagens clássicas como _C++_, _Java_ ou _C#_.

O **JavaScript** já ultrapassou as fronteiras da web e hoje podemos desenvolver aplicativos nativos para sistemas operacionais como no desenvolvimento de aplicativos para o _Windows 8_ por exemplo. Existem ainda outras tecnologias tais como [Adobe AIR](http://www.adobe.com/devnet/air/quick_start_js.html), [Titanium](http://www.appcelerator.com/platform/titanium-sdk/), [PhoneGap](http://phonegap.com/), [AppJS](http://appjs.org/), [Boot2Gecko](https://wiki.mozilla.org/B2G) e [Chromium](http://www.chromium.org/Home). Estas são apenas algumas das plataformas que nos permitem desenvolver aplicativos para diversos sistemas operacionais.

## Usando TypeScript para desenvolver aplicações de grande escala

Com todo esse crescimento provocado pela adoção do **JavaScript** vem surgindo a preocupação em como gerenciar todo o código fonte produzido permitindo escalar esta produção da mesma forma que já acontece em outras linguagens de programação. Foi pensando nisso que a Microsoft lançou o **TypeScript**. Seu intuito é de ampliar a escala de construção de aplicativos fornecendo recursos avançados de analise de tipagem estática. O **TypeScript** leva o **JavaScript** para mais próximo dos desenvolvedores familiarizados com o conceito de orientação a objetos como programadores das linguagens _C#_, _C++_, _Java_ entre outras.

O **TypeScript** é um projeto [OpenSource](https://typescript.codeplex.com/) totalmente compatível com todos os navegadores e sistemas operacionais que já suportam o **JavaScript**. Na prática qualquer código **JavaScript** pode ser utilizando dentro do **TypeScript** _(com algumas ressalvas que serão discutidas nos próximos posts)_ sendo que o resultado final será sempre **JavaScript**, com a facilidade de poder antecipar diversos erros que só pegaríamos em tempo de execução graças ao seu compilador.

## JavaScript e TypeScript

Como exemplo, considere o seguinte exemplo de código **JavaScript**:

```javascript
function Mensagem(texto) {
	this.texto = texto;
}

Mensagem.prototype.exibe = function() {
	return "Olá, " + this.texto + "!";
}

var mensagem = new Mensagem({texto: "Mundo"})

var button = document.createElement("button");
button.innerText = "Diga Olá!";

button.onclick = function() {
	alert(mensagem.exibe());
}

document.body.appendChild(button);
```

Vamos compilar este código utilizando o compilador do **TypeScrit** para visualizar o código **JavaScrit** que será gerado. Para isso vamos utilizar o [**TypeScript** Playground](http://www.typescriptlang.org/Playground/).

> [**TypeScript** Playground](http://www.typescriptlang.org/Playground/) - Trata se de um compilador **TypeScript** online onde podemos testar qualquer código **TypeScript** e visualizar a saída de código **JavaScript** em tempo real.

![](https://raw.github.com/Diullei/diullei.github.com/master/_site/images/TypeScript_Parte1/0001.png)

Veja que na caixa a esquerda temos nosso código **JavaScript** original. Já na caixa a direita temos o código gerado pelo compilador do **TypeScript**, e você vai perceber que a saída de código é essencialmente parecida com o código **JavaScript** que foi introduzido, tirando algumas pequenas diferenças de espaço em branco.

No entanto esse código **JavaScript** tem um bug. Devido a natureza dinâmica do **JavaScrpt** este bug passou despercebido durante o desenvolvimento deste código. Basta executar o código e veremos o erro ocorrendo:

![](https://raw.github.com/Diullei/diullei.github.com/master/_site/images/TypeScript_Pa
Veja que o construtor do objeto `Mensagem` esperava um argumento do tipo string mas o argumento passado foi um objeto. Esse erro poderia ter sido facilmente evitado se tivéssemos utilizado o recurso de definição de tipos do **TypeScript** (**type anotations**). Para tanto vamos alterar o código original e definir para o construtor do objeto `Mensagem` que seu argumento deverá ser sempre do tipo string. Segue abaixo o código alterado:

```javascript

function Mensagem(texto: string) {
	this.texto = texto;
}

Mensagem.prototype.exibe = function() {
	return "Olá, " + this.texto + "!";
}

var mensagem = new Mensagem({texto: "Mundo"})

var button = document.createElement("button");
button.innerText = "Diga Olá!";

button.onclick = function() {
	alert(mensagem.exibe());
}

document.body.appendChild(button);
```

Ao tentar compilar este código o compilador do **TypeScript** nos dará um erro na linha 9 por que estamos tentanto passar um objeto como argumento de um construtor que espera receber um argumento do tipo string conforme foi definido. Vamos utilizar o [**TypeScript** Playground](http://www.typescriptlang.org/Playground/) para ver isso na prática.

![](https://raw.github.com/Diullei/diullei.github.com/master/_site/images/TypeScript_Parte1/0003.png)

Ao alterarmos o código na linha 1 definindo o tipo do argumento _texto_ do **TypeScript** passou a emitir um erro na linha 9. Veja este erro com mais detalhe na imagem abaixo:

![](https://raw.github.com/Diullei/diullei.github.com/master/_site/images/TypeScript_Parte1/0004.png)

Veja que esta simples definição de tipo permitiu ao compilador nos fornecer uma experiência de codificação muito melhor do que a que tivemos antes. Agora temos uma verificação estática do nosso código e um erro totalmente detalhado. Tendo esse ferramental a disposição conseguimos facilmente identificar e resolver o problema que antes havia passado por despercebido.

Tendo uma definição de tipos bem feita podemos ter um _IntelliSense_ de qualidade se estivermos utilizando uma _IDE_ com suporte ao **TypeScript**. Veja por exemplo na imagem abaixo um _autoComplete_ gerado quando tentamos acessar os membros do argumento _texto_ da função `Mensagem`.

![](https://raw.github.com/Diullei/diullei.github.com/master/_site/images/TypeScript_Parte1/0005.png)

![](https://raw.github.com/Diullei/diullei.github.com/master/_site/images/TypeScript_Parte1/0006.png)

<h1 id="Tipos-declarados">Tipos declarados</h1>

Vimos no tópico anterior que podemos escrever um código **TypeScript** definindo tipos e vimos o quanto isso pode ser util nos fornecendo uma checagem do código em tempo de compilação. Um outro recurso muito util do **TypeScript** é a possibilidade de "tipar" um código **JavaScript** existente. Isso é feito utilizando a palavra chave `declare`.

digamos que a função `Mesagem` que estamos utilizando em nos exemplo já existisse em um arquivo **JavaScript** externo.

```javascript

function Mensagem(texto) {
    this.texto = texto
}

Mensagem.prototype.exibe = function() {
    return "Olá, " + this.texto + "!";
}
```

Agora queremo utilizar este método em nosso arquivo **TypeScript**. Sabemos que o arquivo acima será carregado em nossa página e se estivessemos escrevendo em **JavaScript** bastaria escrever um código que utilize está função e no momento em que este código fosse executado ele chamaria a função `Mensagem` como desejado. Como estamos escrevendo o código em **TypeScript** teremos um erro no momento da compilação por que a função `Mensagem` não está sendo definida no código **TypeScript**. Para resolver iremos declarar apenas a assinatura da função `Mensagem` como no código abaixo:

```javascript
declare var Mensagem: (texto: string) => any
...
```

Isso diz ao **TypeScript** que existe uma função chamada `Mensagem` que recebe um string com argumento e retorna um tipo qualquer. Note que estamos usando a palavra-chave `declare`. Esta função náo será criada quando o arquivo **JavaScript** for gerado pois serve apenas de apoio para o compilador. O código **TypeScript** poderia ficar assim:

```javascript
declare var Mensagem: (texto: string) => any

var mensagem = new Mensagem("Mundo")
```

É possível "tipar" qualquer código **JavaScript**. Podemos "tipar" por exemplo o `backbone` ou o `jquery` e utilizar todo o poder da definição de tipos e outros recursos do **TypeScript** com estas bibliotecas existentes. Com isso teremos por exemplo auto-complete se estivermos utilizando uma _IDE_ com suporte ao **TypeScript** e validação de tipos em tempo de compilação. Na realidade a comunidade **TypeScript** tem trabalhado bastante para "tipar" todas as bibliotecas **JavaScript** existentes. Existe um projeto chamado [DefinitelyTyped](https://github.com/borisyankov/DefinitelyTyped) do qual eu sou um dos administradores que mantém a maior coleção de arquivos **JavaScript** tipados para **TypeScript**. Se você der uma olhada no [www.tsdpm.com](http://www.tsdpm.com) verá que é possível recuperar estas definições via [linha de comando](https://npmjs.org/package/tsd) ou [NuGet](http://www.nuget.org/packages?q=definitelytyped).

## Melhores ferramentas

A Microsoft a tempos tem defendido a idéia de que as linguagens de programação e as ferramentas de desenvolvimento devem trabalhar juntas para criar uma boa experiência de desenvolvimento. Como já foi dito com **TypeScript** os fornecedores de _Editores_ e _IDEs_ tem a possibilidade de prover para o desenvolvedor ferramentas que proporcionam uma experiência de desenvolvimento em **TypeScript** muito rica incluindo a verificação de tipos e interfaces, navegação de código, refatoração, debug, intelliSense entre outros. A própria Microsoft está disponibilizando um plugin para o _Visual Studio 2012_ com muitos destes recursos.

![](https://raw.github.com/Diullei/diullei.github.com/master/_site/images/TypeScript_Parte1/0008.png)

Existem ainda outros editores no mercado trabalhando no suporte ao **TypeScript**. Veja mais neste [link](http://blogs.msdn.com/b/interoperability/archive/2012/10/01/sublime-text-vi-emacs-typescript-enabled.aspx).

## TypeScript vs CoffeeScript

É fácil ouvir que o **TypeScript** tem muitas semelhanças com [**CoffeeScript**](http://coffeescript.org/). Ambos são destinados a fazer a mesma coisa: tornar o desenvolvimento **JavaScript** mais fácil. O **CoffeeScript** simplifica o **JavaScript** definindo uma nova sintaxe e permitindo ao desenvolvedor fazer muitas coisas de forma simples. Já o **TypeScript** é um superconjunto do **JavaScript** e tenta facilitar as coisas dando ao **JavaScript** mais estrutura principalmente provendo os recursos de tipagem estática. Um ponto importante a ser notado é que o **TypeScript** traz uma sintaxe com uma curva de aprendizado pequena para o desenvolvedor **JavaScript** o que não acontece com o **CoffeeScript** que traz uma sintaxe bem diferente e que o **CoffeeScript** não tem checagem estatica de tipos.

Se você gosta de _Ruby_ você provavelmente vai gostar mais do **CoffeeScript** do que do **TypeScript**. Se você gosta de _C++/Java/C#_ o **TypeScript** será mais familiar.

Para uma pequena demonstração segue abaixo um exemplo do mesmo código que estávamos trabalhando nos tópicos anteriores portado para **CoffeeScript**:

```ruby
class Mensagem
  constructor: @texto ->

  exibe: ->
    "Olá, #{@texto}!"

mensagem = new Mensagem "Mundo"
button = document.createElement "button"
button.innerText = "Diga Olá!"

button.onclick = ->
  alert mensagem.exibe()

document.body.appendChild button
```

## TypeScript vs Dart

O **TypeScript** e o **Dart** são semelhantes na medida em que podem gerar **JavaScript**, mas o **Dart** é muito mais do que apenas geração de código **JavaScript**. O **Dart** pretende ser uma alternativa ao **JavaScript** com uma linguagem totalmente nova tendo sua própria _VM_ com a proposta de um melhor desempenho. O **Dart** pode ser executado diretamente no navegador utilizando um plugin, no servidor utilizando sua própria _VM_ ou em qualquer ambiente **JavaScript** utilizando o seu código **JavaScript** gerado. Já o **Typescript** sempre é traduzido para **JavaScript**.

## Por que utilizar TypeScript

Se o **CoffeeScript** e o **Dart** são pré-processadores que fazem o mesmo que o **TypeScript** se propõe por que você deveria adotar o **TypeScript**? Entenda que o **TypeScript** foi construído foco em trabalhar junto com um _Editor_ ou _IDE_ fornecendo fortes recursos para o desenvolvedor e facilitando em muito sua vida.

Vamos listar abaixo alguns pontos positivos relacionados a adoção do **TypeScript**.

* Por ser um superconjunto do **JavaScript** permite uma fácil transição de código **JavaScript** para código **TypeScript**.
* Código [open source](http://typescript.codeplex.com/license).
* A tipagem estática do **TypeScript** ajuda o desenvolvedor a detectar erros durante o desenvolvimento. Estes recursos são muito bem vindos para nós desenvolvedores. Antes precisávamos partir para soluções como: [Script#](http://scriptsharp.com/), [Google GWT](https://developers.google.com/web-toolkit/) que também tentam resolver estes problemas de tipagem estática.
* Promessa de grandes recursos como refatoração, navegação no código por referência dos tipos, debug, analises de código entre outros por parte dos _Editores_ e _IDEs_ como o _Visual Studio 2012_ por exemplo.
* Possibilidade de trabalhar com _OO_ (_classes_, _interfaces_, _herança_ etc...) sem ter que manipular diretamente os _protótipos_ **JavaScript** para reproduzir este comportamento.
* Roda em qualquer ambiente com suporte a **JavaScript** _ES3_ ou superior. Isso permitiu por exemplo uma fácil distribuição do **TypeScript** em _Node.JS_. Assim o **TypeScript** pode ser fácilmente instalado em ambientes como _Linux_ e _MacOS_.
* O _Windows 8_ está chegando pesado permitindo desenvolvimento de aplicativos utilizando _HTML/CSS/JavaScript_. Os futuros desenvolvedores de aplicativos para _Windows 8_ irão provavelmente utilizar **TypeScript** para este trabalho.

Se todo o conteúdo apresentado até aqui foi o suficiente para convence-lo a aprender esta nova linguagem espero ver você nos próximos posts.

Abraços!
