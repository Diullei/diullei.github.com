## Introdução

Como sabemos o JavaScript não implementa um conceito de sobrecarga de funções. O que costumamos fazer quando precisamos de uma função que pode ter mais de uma assinatura padrão é emular de algum modo este comportamento. 

Podemos fazer isso de várias maneiras diferentes. Vou aprensentar neste artigo algumas dessas maneiras para que possamos refletir sobre o tema.

### Um cenário comum

Vamos imaginar que gostariamos de ter uma função capaz de aceitar diferentes tipos argumentos e ter como resultado algo de acordo com o que a sobrecarga invocada se propõe a retornar. 

> NOTA: Normalmente em OOP clássico uma sobrecarga não pode redefinir o tipo retornado mas em JavaScript temos a possibilidade de retornar o que quisermos de uma função.

Então vamos a um exemplo bem básico de uso de um objeto que contém uma função com sobrecarga:

<pre><code>// criando uma instância do nosso objeto
var eu = new Pessoa;

// adicionando valores ao nosso objeto. Veja que as funções nome e idade estão retornando como 
// resultado o proprio objeto e é isso que nos permite fazer o encadeamento da função 
// nome e idade de forma sequencial.
eu.nome('Diullei').idade(29);

// aqui estou acessando uma sobre carga da função nome que para este objeto "Pessoa" 
// está definida para que quando nenhum argumento for passado esta retorne o valor da 
// propriedade nome e não a instância do proprio objeto.
console.log(eu.nome());
//=> Diullei</code></pre>

Como já foi dito nos comentários o objeto Pessoa no código acima possui uma função nome que possui duas assinaturas diferentes. Na primenria passamos um nome e esperamos a partir daí que a propria instância do objeto seja retornada e na segunda não passamos nenhum valor esperando que o valor da propriedade nome seja retornado.

## Implementando a classe Pessoa

Vamos exibir então am alguns exemplos algumas diferentes formas de implementar a classe pessoa para que esta possa atender o código acima.

O javascript nos dá dentro do contexto de uma função uma instância de objeto muito interessante chamada arguments. Graças a este objeto conseguiremos simular a sobrecarga. Com ele podemos descobrir quais os valores dos argumentos que foram passados para nossa função mesmo que não tenhamos nomeado estes argumentos. Veja um exemplo:

<pre data-stjf='data-stjf' data-js="function log(msg){ document.write('<div>' + msg + '</div>'); }

function teste(){
	log(arguments.length);
}

teste(1,2,3,4);"><code>...
function teste(){
	// exibindo no console a quantidade de argumentos passados para a função
	console.log(arguments.length);
}

// ao passar quatro argumentos para a função teremos a saída de console: 4
teste(1,2,3,4);
//=> 4
...</code></pre>

Se quisermos por exemplo recuperar o valor so primeiro argumento passado para a função podemos fazer deste jeito:

<pre data-stjf='data-stjf' data-js="function log(msg){ document.write('<div>' + msg + '</div>'); }

function teste(){
	console.log(arguments[0]);
}

teste('Diullei Gomes');"><code>...
function teste(){
	// exibindo no console a quantidade de argumentos passados para a função
	console.log(arguments[0]);
}

// ao passar quatro argumentos para a função teremos a saída de console: 4
teste('Diullei Gomes');
//=> Diullei Gomes
...</code></pre>

Entendendo isso podemos concluir que basta uma análize dos argumentos passados para a função para decidir qual comportamento executar.

### Uma implementação simples

<pre data-stjf='data-stjf' data-js="function Pessoa(){}

Pessoa.prototype.nome = function(){
	if(arguments.length > 0){
		this._nome = arguments[0];
		return this;
	} else {
		return this._nome;
	}
}"><code>function Pessoa(){}
...
Pessoa.prototype.nome = function(){
	if(arguments.length > 0){
		this._nome = arguments[0];
		return this;
	} else {
		return this._nome;
	}
}</code></pre>

**Onde está a sobrecarga?** Sempre que falamos de sobrecarga de métodos ou funções em linguagens que permitem este recurso vemos vários métodos/funções com assinatura de argumentos e implementação de código diferentes. No nosso caso como javascript não permite isso tivemos que 'simular' este comportamento utilizando o objeto arguments para identificar os argumentos passados para o contexto da função.

Até aqui você já deve ter notado que trabalhar com sobrecarga em javascript deixa o código do nosso método um pouco complexo e dificil de se manter por causa das verificações e condições que precisam ser incluidas no bloco de código. Vamos ver alguns padrões que poderão nos ajudar a manter o código menos confuso quando estivermos trabalhando com simulação de sobrecarga.

### Primeira abordagem (Objeto parâmetro) 

Uma forma bastante encontrada para resolução deste problema é o uso de um objeto parâmetro. Trata-se de uma função que recebe por argumento um objeto e verifica as propriedades deste objeto como se estivesse verificando os argumentos da função. Imagine uma função que pode receber uma combinação dos parâmetros A, B e C. Para tal esta poderia ser implementada da seguinte forma:

<pre data-stjf="" data-js="function log(msg){ document.write('<div>' + msg + '</div>'); }

MeuObjeto = function(){}

MeuObjeto.prototype.myfunc = function(args){
	if(args.A && args.B){
		log('Sobercarga: Apenas os parametros A e B');
		return;
	} else if(args.C){
		log('Sobercarga: Apenas o parametro C');
		return;
	}
	log('Erro: Parametros invalidos');
}"><code>MeuObjeto = function(){}

MeuObjeto.prototype.myfunc = function(args){
	// aqui dentro da função verificamos se o objeto contêm ou não a combinação de propriedades 
	// desejada e redirecionamos a execução do código
	if(args.A && args.B){
		// faça algo
	} else if(args.C){
		// faça algo
	}
	...
}</code></pre>

Um exemplo disso na prática seria a função [ajax](http://api.jquery.com/jQuery.ajax/) do jQuery. Esta pode receber uma combinação de argumentos a partir de um objeto para configurar e executar as requisições.

### Segunda abordagem (Funções de apoio)

<pre data-stjf='data-stjf' data-js="content"><code>function Pessoa(){}

Pessoa.prototype.nome = function(){
	return (arguments[0] == null ? getNome : setNome).call(this, arguments[0]);
}

function getNome(){
	return this._nome;
}

function setNome(nome){
	this._nome = nome;
	return this;
}</code></pre>

Aqui continuamos com a verificação condicional mais veja que separamos a sobrecarga em duas outras funções (getNome e setNome). Isso nos ajuda a manter a simplicidade do código dentro das funções de sobrecarga sem ter que ficar se preocupando com a verificação dos argumentos para descobrir que codigo executar, antes deixamos este trabalho com a função 'nome' que é a função que será invocada para decide sobre qual função de apoio (getNome ou setNome) deverá ser utilizada.

Note que na função 'nome' verificamos se o primeiro argumento foi ou não passado para a função. Em caso positivo retornamos a funçao setNome e caso contrario retornamos a funçao getNome. Como estas funções utilizam o identificador de contexto 'this' para tentar recuperar o valor de '_nome' precisamos utilizar a função especial 'call' para passar o contexto como argumento. Se você não está familiarizado com as funções especiais call e apply sugiro pesquisar sobre o assunto para entender melhor o código acima.

Aqui podemos ver alguns problemas nesta abordagem. As funções 'getNome' e 'setNome' estão no contexto global do código. Isso é ruim por que estas funções dizem respeito apenas ao objeto 'Pessoa'. Uma forma de tentar amenizar isso é utilizarmos um closure. Segue código reescrito:

<pre data-stjf='data-stjf' data-js="content"><code>Pessoa = (function(){
	function Pessoa(){}
	
	Pessoa.prototype.nome = function(){
		return (arguments[0] == null ? getNome : setNome).call(this, arguments[0]);
	}

	function getNome(){
		return this._nome;
	}

	function setNome(nome){
		this._nome = nome;
		return this;
	}
	
	return Pessoa;
})();</code></pre>

Dessa forma as funções getNome e setNome estão 'privadas' acessiveis apenas de dentro do closure sem poluir o contexto global do aplicativo.

### Terceira abordagem (Funções de apoio em closures)

No primeiro exemplo da primeira abordagem vimos um problema. As funções de apoio para a sobrecarga do método 'nome' estavam poluindo o contexto global. Assim reescrevemos o código colocando toda a classe 'Pessoa' dentro de um closure. Ok, mais da mesma forma que as funções de apoio getNome e setNome não precisam ser conhecidas pelo contexto global estas também não precisam ser conhecidas no contexto da class Pessoa, antes estas dizem respeito apenas à função 'nome'. Vamos reescrever mais uma vez este código diminuindo o escopo do closure que mantém privados estes métodos de apoio (getNome e setNome).

<pre data-stjf='data-stjf' data-js="content"><code>Pessoa = (function(){
    function Pessoa(){}
    
    Pessoa.prototype.nome = (function(){
        function nome(){
            return (arguments[0] == null ? get : set).call(this, arguments[0]);
        }
        
        function get(){
            return this._nome;
        }
        
        function set(nome){
            this._nome = nome;
			return this;
        }
        
        return nome;
    })();
    
    return Pessoa;
})();</code></pre>

Note que reduzimos o escopo do closure. Com isso conseguimos simplificar o nome das funções de apoio sem com isso perder o entendimento do código. Os nomes 'get' e 'set' fazem total sentido dentro do closure que define a função 'nome'. 

Legal, até aqui vimos algumas abordagens interessantes. Mais daí perguntamos: O que fazer quando a sobrecarga é mais complexa do que um simples get/set? Como ficaria uma função que tivesse por exemplo até 4 opções de sobrecarga com número diferente de parâmetros?

Para entender melhor vamos a um exemplo: Imagine uma função para retornar o html de uma tag qualquer. Para isso este método teria 4 sobrecargas diferentes onde:

* Nenhum argumento -> retorna uma string com o codigo da tag 'div'.
* Apenas o primeiro parâmetro -> Nome da tag html, deve retornar uma string com o código da tag passado por parâmetro.
* O primeiro e o segundo parâmetro -> Nome da tag html e um objeto com os atributos desta tag, deve retornar uma string com o código da tag passado por parâmetro incluindo nesta tag os atributos passados no segundo parâmetro.
* O primeiro, segundo e terceiro parâmetro -> Nome da tag html, um objeto com os atributos desta tag e o conteudo desta tag, deve retornar uma string com o código da tag passado por parâmetro incluindo nesta tag os atributos passados no segundo parâmetro e  como conteudo o texto do terceiro parâmetro.

Vou implementar a especificação acima usando uma das abordagens apresentadas até agora. Veja que como temos mais de 2 opções de sobrecarga a tomada de decisão sobre qual método de apoio chamar começa a se complicar.

<pre data-stjf='data-stjf' data-js="content"><code>CriaHtml = (function(){
	function CriaHtml(){}
	
	CriaHtml.prototype.criaTag = (function(){
		function criaTag(){
            if(arguments.length == 3)
                return tag3args.apply(this, arguments);
            else if(arguments.length == 2)
                return tag2args.apply(this, arguments);
            else if(arguments.length == 1)
                return tag1args.apply(this, arguments);
            else
                return tag0args.call(this);
		}
		
		// função de apoio - privada
		function recuperaAtributos(attrs){
			var str = ' ';
			for(var att in attrs){ str += att + '="' + attrs[att] + '" '; }
			return str;
		}
		
		function tag3args(tag, attrs, content)
			return '&lt;' + tag + recuperaAtributos(attrs) + '&gt;' + content + '&lt;/' + tag + '&gt;';
		}
		
		function tag2args(tag, attrs){
			return '&lt;' + tag + recuperaAtributos(attrs) + '/&gt;';
		}

		function tag1args(tag){
			return '&lt;' + tag + '/&gt;';
		}
		
		function tag0args(){
			return '&lt;div&gt;&lt;/div&gt;';
		}

		return criaTag;
	})();
	
	return CriaHtml;
})();</code></pre>

Veja que neste caso tivemos que utilizar uma cadeia de 'ifs' para verificar a quantidade de argumentos passados para a função. Caso nossa função tivesse como requisito da sovbrecarga tipos deferentes de argumentos teríamos de adicionar muitas outras condições dexando nosso código cada vez mais complexo. Vamos ver abaixo algumas outras abordagem com o objetivo de facilitar um pouco mais este trabalho removendo a complexidade das verificações condicionais.

### Quarta abordagem (Utilizando indices para mapeamento de funções)

Nesta quarta abordagem iremos utilizar um dicionário para verificar as sobrecargas. Antes de implementar o ultimo código da seção anterior vamos voltar ao nosso exemplo get/set para assimilar o conceito:

<pre data-stjf='data-stjf' data-js="content"><code>Pessoa = (function(){
    function Pessoa(){}
    
    Pessoa.prototype.nome = (function(){
        var overloads = {};
        
        overloads[0] = function(){
            return this._nome;
        }
        
        overloads[1] = function(nome){
            this._nome = nome;
			return this;
        }

        return function(){
            return overloads[arguments.length].apply(this, arguments)
        }
    })();
    
    return Pessoa;
})();</code></pre>

Veja que criamos um dicionário 'overloads' e adicionamos nele as funções de sobrecarga utilizando neste caso o número de argumentos como indice para recupera-las. Assim se não passarmos nenhum arqumento iremos acessar a chave zero correspondente a função 'get' e caso passemos um valor iremos acessar a função armazenada na chave 1 que corresponde a função 'set'.

Agora que vimos um exemplo simples vamos ao nosso exemplo mais complexo para este caso:

<pre data-stjf='data-stjf' data-js="content"><code>CriaHtml = (function(){
	function CriaHtml(){}
	
	CriaHtml.prototype.criaTag = (function(){
        var overloads = {};
		
		// função de apoio - privada		
		function recuperaAtributos(attrs){
			var str = ' ';
			for(var att in attrs){ str += att + '="' + attrs[att] + '" '; }
			return str;
		}
		
		overloads[3] = function(tag, attrs, content){
			return '&lt;' + tag + recuperaAtributos(attrs) + '&gt;' + content + '&lt;/' + tag + '&gt;';
		}
		
		overloads[2] = function(tag, attrs){
			return '&lt;' + tag + recuperaAtributos(attrs) + '/&gt;';
		}

		overloads[1] = function(tag){
			return '&lt;' + tag + '/&gt;';
		}
		
		overloads[0] = function(tag){
			return '&lt;div&gt;&lt;/div&gt;';
		}

        return function(){
            return overloads[arguments.length].apply(this, arguments);
        }
	})();
	
	return CriaHtml;
})();</code></pre>

Como podemos ver esta abordagem elimina por completo as verificações condicionais que tinhamos antes além de deixar o código mais fácil de ler e evitar que fiquemos criando nomes diferentes para cada função de sobrecarga.

### Quarta abordagem (Usando mapeamento de tipo)

Agora suponha que a nossa sobrecarga não diz respeito mais ao número de argumentos passado para a função mais sim ao tipo destes argumentos. Imagine uma função em nossa classe Pessoa chamda 'informe' que caso seja passado uma string ele retorne o texto 'você informou o nome &lt;string passada por argumento&gt;' e caso seja passado um numero ele retorne 'você informou a idade &lt;numero passada por argumento&gt;'. Para isso utilizaremos uma abordagem parecida com a anterior só que no dicionário ao invés de termos o número de argumentos como chave vamos ter o tipo do argumento.

<pre data-stjf='data-stjf' data-js="content"><code>Pessoa = (function(){
    function Pessoa(){}
    ...
    Pessoa.prototype.informe = (function(){
        var overloads = {};
        
        overloads['string'] = function(nome){
			return 'você informou o nome ' + nome;
        }
        
        overloads['number'] = function(idade){
			return 'você informou a idade ' + idade;
        }

        return function(){
            return overloads[typeof arguments[0]].apply(this, arguments)
        }
    })();
    ...
    return Pessoa;
})();</code></pre>

Simples não é? Com isso evitamos utilizar 'ifs' para ter que descobrir o tipo dos argumentos para então invocar a função de apoio correspondente. Tendo esta abodagem em mente podemos reescrever o código da classe 'CriaHtml' da seguinte forma:

<pre data-stjf='data-stjf' data-js="content"><code>CriaHtml = (function(){
	function CriaHtml(){}
	
	CriaHtml.prototype.criaTag = (function(){
        var overloads = {};
		
		// função de apoio - privada
		function recuperaAtributos(attrs){
			var str = ' ';
			for(var att in attrs){ str += att + '="' + attrs[att] + '" '; }
			return str;
		}
		
		overloads['string_object_string'] = function(tag, attrs, content){
			return '&lt;' + tag + recuperaAtributos(attrs) + '&gt;' + content + '&lt;/' + tag + '&gt;';
		}
		
		overloads['string_object'] = function(tag, attrs){
			return '&lt;' + tag + recuperaAtributos(attrs) + '/&gt;';
		}

		overloads['string'] = function(tag){
			return '&lt;' + tag + '/&gt;';
		}
		
		overloads[''] = function(tag){
			return '&lt;div&gt;&lt;/div&gt;';
		}

        return function(){
			var sign = '';
			for(var i=0; i&lt;arguments.length; i++) { sign += (sign == ''? '' : '_') + typeof arguments[i]; }
            return overloads[sign].apply(this, arguments);
        }
	})();
	
	return CriaHtml;
})();</code></pre>

Veja que o código das sobrecargas fica mais fácil de entender pois destacamos o tipo de sobrecarga tratado por cada função de apoio.

## Quinta abordagem (Cadeia de Responsabilidades)

Algumas das abordagens apresentadas acima podem ser simplificadas se utilizarmos uma função de apoio para criar as sobrecargas utilizando o conceito do padrão da Cadeia de Responsabilidades [(Chain of Responsibility)](http://en.wikipedia.org/wiki/Chain-of-responsibility_pattern). Note que não vamos implementar o padrão em sua forma sugerida, vamos apenas se utilizar do conceito dele para nossa implementação que será com funções e não com classes. Você pode acessar o link anterior para entender melhor este padrão. Explicando de forma bam rapida trata-se de um padrão onde escrevemos algumas classes para tratar um determinado contexto, cada uma com uma implementação especifica. Estas classes são alinhadas uma após a outra referenciando quem está acima dela para tentar processar o contexto caso esta não consiga processa-lo. Daí quando solicitamos uma das classes da cadeia um determinado processamento, caso esta não consiga responder esta solicitação esta irá passar a responsabilidade deste processamento para quem estiver encadeado acima dele, caso exista alguém. Isso é feito sucessivamente até que alguem consiga aceitar e processar a requisição.

A idéia aqui é utilizar uma abordagem sugeria por [John Resig](http://ejohn.org/blog/javascript-method-overloading/) para solução de sobrecargas mesclando esta solução com as abordagens apresentadas neste artigo até aqui (as que permitem esta implementação).

John Resig sugeriu escrevermos a seguinte função de apoio:

<pre data-stjf='data-stjf' data-js="function log(msg){ document.write('<div>' + msg + '</div>'); }

// addMethod - By John Resig (MIT Licensed)
function addMethod(object, name, fn){
    var old = object[ name ];
    object[ name ] = function(){
        if ( fn.length == arguments.length )
            return fn.apply( this, arguments );
        else if ( typeof old == 'function' )
            return old.apply( this, arguments );
    };
}

function Users(){
  addMethod(this, 'find', function(){
    log('Find all users...');
  });
  addMethod(this, 'find', function(name){
    log('Find a user by name');
  });
  addMethod(this, 'find', function(first, last){
    log('Find a user by first and last name');
  });
}

var user = new Users();

user.find();
user.find('name');
user.find('name', 'last');"><code>// addMethod - By John Resig (MIT Licensed)
function addMethod(object, name, fn){
    var old = object[ name ];
    object[ name ] = function(){
        if ( fn.length == arguments.length )
            return fn.apply( this, arguments );
        else if ( typeof old == 'function' )
            return old.apply( this, arguments );
    };
}</code></pre>

Esta função seria utilizada da seguinte forma:

<pre><code>function Users(){
  addMethod(this, "find", function(){
    // Find all users...
  });
  addMethod(this, "find", function(name){
    // Find a user by name
  });
  addMethod(this, "find", function(first, last){
    // Find a user by first and last name
  });
}</code></pre>

Vamos tentar entender o que está acontecendo. A função 'addMethod' recebe por argumento um objeto (o objeto ao qual queremos adicionar a função de sobrecarga), um nome (o nome da função a ser adicionada) e uma função anônima com o código da implementação da sobrecarga. Esta função armazena o conteudo da função anterior de mesmo nome caso exista em uma variável chamada old e coloca uma nova função no lugar da anterior. Daí é feito um teste que verifica se a quantidade de argumentos passados para a função é igual a quantidade de argumentos que a função de sobrecarga adicionada se propõe a tratar. Caso positivo a função de sobrecarga é chamada e a requisição é passada. Caso contrário verificamos se a função que outrora estava armazenada no lugar desta existe e caso exista passamos para ela a responsabilidade de execução da chamada.

Entendendo isso podemos reescrever a nossa *quarta abordagem* da seguinte forma:

<pre data-stjf='data-stjf' data-js="content"><code>// repare que alteramos um pouco esta função de apoio
// em relação ao que foi sugerido por Resig
function adicioneSobrecarga(objeto, nome, fn){
    var anterior = objeto.prototype[ nome ];
    objeto.prototype[ nome ] = function(){
        if ( fn.length == arguments.length )
            return fn.apply( this, arguments );
        else if ( typeof anterior == 'function' )
            return anterior.apply( this, arguments );
    };
}

CriaHtml = (function(){
	function CriaHtml(){}

	// função de apoio - privada		
	function recuperaAtributos(attrs){
		var str = ' ';
		for(var att in attrs){ str += att + '="' + attrs[att] + '" '; }
		return str;
	}
	
	adicioneSobrecarga(CriaHtml, 'criaTag', function(tag, attrs, content){
		return '&lt;' + tag + recuperaAtributos(attrs) + '&gt;' + content + '&lt;/' + tag + '&gt;';
	});

	adicioneSobrecarga(CriaHtml, 'criaTag', function(tag, attrs){
		return '&lt;' + tag + recuperaAtributos(attrs) + '/&gt;';
	});

	adicioneSobrecarga(CriaHtml, 'criaTag', function(tag){
		return '&lt;' + tag + '/&gt;';
	});

	adicioneSobrecarga(CriaHtml, 'criaTag', function(tag){
		return '&lt;div&gt;&lt;/div&gt;';
	});
	
	return CriaHtml;
})();</code></pre>

Agora com um pouco de alteração podemos implementar nossa *quarta abordagem* como no código que se segue:

<pre data-stjf='data-stjf' data-js="content"><code>// repare que alteramos um pouco esta função de apoio
// em relação ao que foi sugerido por Resig
function adicioneSobrecarga(objeto, tipos, nome, fn){
	function recuperaAssinatura(){
		var sign = '';
		for(var i=0; i&lt;arguments.length; i++) { sign += (sign == ''? '' : '_') + typeof arguments[i]; }
		return sign;
	}

    var anterior = objeto.prototype[ nome ];
    objeto.prototype[ nome ] = function(){
        if ( recuperaAssinatura(fn) == recuperaAssinatura(this) )
            return fn.apply( this, arguments );
        else if ( typeof anterior == 'function' )
            return anterior.apply( this, arguments );
    };
}

CriaHtml = (function(){
	function CriaHtml(){}

	// função de apoio - privada
	function recuperaAtributos(attrs){
		var str = ' ';
		for(var att in attrs){ str += att + '="' + attrs[att] + '" '; }
		return str;
	}
	
	adicioneSobrecarga(CriaHtml, 'string_object_string', 'criaTag', function(tag, attrs, content){
		return '&lt;' + tag + recuperaAtributos(attrs) + '&gt;' + content + '&lt;/' + tag + '&gt;';
	});
	
	adicioneSobrecarga(CriaHtml, 'string_object_string', 'criaTag', function(tag, attrs){
		return '&lt;' + tag + recuperaAtributos(attrs) + '/&gt;';
	});

	adicioneSobrecarga(CriaHtml, 'string_object_string', 'criaTag', function(tag){
		return '&lt;' + tag + '/&gt;';
	});

	adicioneSobrecarga(CriaHtml, 'string_object_string', 'criaTag', function(tag){
		return '&lt;div&gt;&lt;/div&gt;';
	});
	
	return CriaHtml;
})();</code></pre>

## Conclusão

Qual abordagem utilizar?

Isso vai depender da complexidade da implementação. O padrão é manter o senso e utilizar sempre uma abordagem de código que não complique sua vida e nem a leitura e manutenção do código.

Abraços!