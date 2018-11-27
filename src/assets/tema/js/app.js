var app = angular.module("eduplan", ['ngRoute', 'angularUtils.directives.dirPagination']);

app.controller("PessoaController", ['$scope', '$location', 'PessoaService', function ($scope, $location, PessoaService) {

    listarPessoas();
    
    function listarPessoas() {
        PessoaService.listar().then(function (resposta) {
            if(resposta.data.length === 0){
                alert("Nenhuma Pessoa foi encontrada.");
                //limpar();
            }else {
                $scope.pessoas = resposta.data;
            }
        });
    };
    
    
    $scope.alterar = function (pessoa) {
        $location.path('/alterar/' + pessoa.id);
    }
    
    $scope.incluir = function () {
        $location.path('/nova');
    }
    
    excluir = function (pessoa) {
        PessoaService.excluir(pessoa);
    }
    
    $scope.excluir = function (pessoa) {
        if(confirm("Tem certeza que deseja excluir a pessoa: \"" + pessoa.nome + "\"?"))
            excluir(pessoa);
    }
    
    //DAQUI PARA BAIXO APAGA
    /*
    esconderTabela();

    function esconderTabela() {
        document.getElementById("fieldTabela").style.display = 'none';
    }

    function mostrarTabela() {
        document.getElementById("fieldTabela").style.display = 'block';
    }

    function limpar() {
        $scope.sistemas = {};
        $scope.pesquisa = {};
    }

    $scope.pesquisar = function (pesquisa) {
        if ($scope.pesquisarForm.email.$invalid) {
            alert("E-mail inválido.");
        } else {
            pesquisa = {
                descricao: document.getElementById("descricao").value,
                sigla: document.getElementById("sigla").value,
                email: document.getElementById("email").value
            }
            listar(pesquisa);
        }
    };

    function listar(pesquisa) {
        SsdService.listar(pesquisa).then(function (resposta) {
            if(resposta.data.length === 0){
                alert("Nenhum Sistema foi encontrado. Favor revisar os critérios da sua pesquisa!");
                limpar();
                esconderTabela();
            }else {
                $scope.sistemas = resposta.data;
                mostrarTabela()
            }
        });
    }

    $scope.limpar = function () {
        limpar();
        esconderTabela();
    }

    $scope.incluir = function () {
        $location.path('/incluir');
    }

    $scope.alterar = function (sistema) {
        $location.path('/alterar/' + sistema.id);
    }
*/
}]);

app.controller("IncluirController", ['$scope', '$location', 'PessoaService', function ($scope, $location, PessoaService) {
    
    $scope.voltar = function () {
        $location.path('/pessoa');
    }
    
    $scope.validar = function (pessoa) {
        if ($scope.pessoaForm.email.$invalid) {
            alert("E-mail inválido.");
        } else if ($scope.pessoaForm.$error.required) {
            alert("Dados obrigatórios não informados.");
            $scope.pessoaForm.$setDirty();
        } else {
            salvar(pessoa).then(function () {
                $location.path('/pessoa');
                $.snackbar({content: "Operação realizada com sucesso.", timeout: 10000});
            });
        }
    }
    
    function salvar(pessoa) {
        return PessoaService.salvar(pessoa);
    }

    /*$scope.salvar = function (pessoa) {
        salvar(pessoa).then($location.path('/pessoa'));
    }*/

}]);

app.controller("AlterarController", function ($scope, $location, $routeParams, PessoaService) {
    
    var id = $routeParams.id;

    carregar();

    function carregar() {
        PessoaService.getPessoa(id).then(function (resposta) {
            $scope.pessoa = resposta.data;
        });
    }
    
    $scope.validar = function (pessoa) {
        if ($scope.pessoaForm.email.$invalid) {
            alert("E-mail inválido.");
        } else if ($scope.pessoaForm.$error.required) {
            alert("Dados obrigatórios não informados.");
            $scope.pessoaForm.$setDirty();
        } else {
            $scope.pessoa.data = null;
            salvar(pessoa).then(function () {
                $location.path('/pessoa');
                $.snackbar({content: "Operação realizada com sucesso.", timeout: 10000});
            });
        }
    }
    
    $scope.voltar = function () {
        $location.path('/pessoa');
    };

    function salvar(pessoa) {
        return PessoaService.salvar(pessoa);
    }

    /*$scope.salvar = function (pessoa) {
        $scope.pessoa.data = null;
        salvar(pessoa).then($location.path('/pessoa'));
    };*/

});

app.service('PessoaService', function ($http) {

    var api = 'http://localhost:9090/pessoa';

    this.listar = function () {
        return $http.get(api + "/");
    };
    
    this.getPessoa = function (id) {
        return $http.get(api + "/" + id);
    }
    
    this.salvar = function (pessoa) {
        if (pessoa.id) {
            return $http.put(api + "/" + pessoa.id, pessoa);
        } else {
            return $http.post(api, pessoa);
        }
    }
    
    this.excluir = function (pessoa) {
        return $http.delete(api + "/" + pessoa.id, pessoa);
    };
});
/*
// the following method will run at the time of initializing the module. That
// means it will run only one time.
app.run(function(AuthService, $rootScope, $state) {
	// For implementing the authentication with ui-router we need to listen the
	// state change. For every state change the ui-router module will broadcast
	// the '$stateChangeStart'.
	$rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams) {
		// checking the user is logged in or not
		if (!AuthService.user) {
			// To avoiding the infinite looping of state change we have to add a
			// if condition.
			if (toState.name != 'login' && toState.name != 'register') {
				event.preventDefault();
				$state.go('login');
			}
		} else {
			// checking the user is authorized to view the states
			if (toState.data && toState.data.role) {
				var hasAccess = false;
				for (var i = 0; i < AuthService.user.roles.length; i++) {
					var role = AuthService.user.roles[i];
					if (toState.data.role == role) {
						hasAccess = true;
						break;
					}
				}
				if (!hasAccess) {
					event.preventDefault();
					$state.go('access-denied');
				}

			}
		}
	});
});*/