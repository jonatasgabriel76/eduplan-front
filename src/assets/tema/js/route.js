
app.config(function($routeProvider) {
    $routeProvider
        .when('/pessoa', {
          templateUrl: 'templates/pessoa.html',
          controller: 'PessoaController'
        })
        .when('/nova', {
          templateUrl: 'templates/formPessoa.html',
          controller: 'IncluirController'
        })
        .when('/alterar/:id', {
          templateUrl: 'templates/formPessoa.html',
          controller: 'AlterarController'
        })
        .otherwise({
          redirectTo: '/pessoa'
        });
});
