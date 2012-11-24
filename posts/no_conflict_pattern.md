Você já deve ter visto exemplos de código *JQuery*, *Underscore*, *Backbone* ou outros que utilizassem um método chamado ```noConflict()```. Vamos entender para que serve este método.

Como o próprio nome já diz este método é colocado na biblioteca para permitir que seu código coexista com outros códigos sem a ocorrência de conflitos. 

Vamos a um exemplo utilizando duas bibliotecas que utilizam o mesmo nome:

<pre><code>// libA
(function(exports){
	function LibA(){}
	LibA.prototype.Execute = function(){
		console.log('lib A');
	}
	
	exports.$ = new LibA();
})(window);

// libB
(function(exports){
	function LibB(){}
	LibB.prototype.Execute = function(){
		console.log('lib B');
	}
	
	exports.$ = new LibB();
})(window);

$.Execute();
//=> lib B
</code></pre>

Note que no exemplo acima estamos criando duas bibliotecas e dando a elas o mesmo alias '$'. Quando a libA é criada ela cria uma instância global chamada $. Caso executemos $.Execute() teremos como resultado o texto 'lib A' no console. Mais veja que logo em seguida criamos a libB. A libB também está utilizando o mesmo nome para sua instância global '$' fazendo com que a instância da libA seja sobrescrita. Assim quando chamamos $.Execute() temos como resultado o texto 'lib B'.

Uma forma elegante de permitir que o problema acima seja contornado é utilizar um método ```noConflict()```. Veja o exemplo reescrito:

<pre><code>// lib A
(function(exports){
	var oldLib = exports.$;
	
	function LibA(){}
	LibA.prototype.Execute = function(){
		console.log('lib A');
	}

	LibA.prototype.noConflict = function(){
		exports.$ = oldLib;
		return this;
	}
	
	exports.$ = new LibA();
})(window);

// lib B
(function(exports){
	var oldLib = exports.$;

	function LibB(){}
	LibB.prototype.Execute = function(){
		console.log('lib B');
	}
	
	LibB.prototype.noConflict = function(){
		exports.$ = oldLib;
		return this;
	}
	
	exports.$ = new LibB();
})(window);

$libB = $.noConflict();

$.Execute();
//=> lib A

$libB.Execute();
//=> lib B
</code></pre>

Note que no exemplo acima fizemos em libB um 'backup' do valor de '$' antes de altera-lo. Adicionamos uma função chamada ```noConflict()``` com o objetivo de restaurar o antigo valor de '$' e retornar a propria libB como resultado. Isso permite a quem estiver utilizando o código renomear a instância de libB. Veja que no código acima alteramos o nome de $ para $libB.

Usando este artificio poderíamos também fazer com que 2 ou mais versões de uma mesma biblioteca coexistissem no mesmo código.

Seguem algumas referências a trechos de códigos reais que utilizam este padrão:

**jQuery**
<pre><code>...
_$ = window.$,
...
noConflict: function( deep ) {
	if ( window.$ === jQuery ) {
		window.$ = _$;
	}

	if ( deep && window.jQuery === jQuery ) {
		window.jQuery = _jQuery;
	}

	return jQuery;
},
...</code></pre>

**Backbone**
<pre><code>...
var previousBackbone = root.Backbone;
...
Backbone.noConflict = function() {
    root.Backbone = previousBackbone;
    return this;
};
...</code></pre>

**Underscore**
<pre><code>...
var previousUnderscore = root._;
...
_.noConflict = function() {
    root._ = previousUnderscore;
    return this;
  };
  ...</code></pre>
  
Esses são só alguns exemplos.

Abraços!