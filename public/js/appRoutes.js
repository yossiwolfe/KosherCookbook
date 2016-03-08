// public/js/appRoutes.js
    angular.module('appRoutes', []).config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {

    $routeProvider

        // home page
        .when('/', {
            templateUrl: 'views/home.html',
            controller: 'MainController'
        })

        // recipes page that will use the RecipeController
        .when('/add-recipe', {
            templateUrl: 'views/recipe.html',
            controller: 'RecipeController'
        })

        .when('/recipe/:method/:recipeId', {
            templateUrl: 'views/recipe.html',
            controller: 'RecipeController'
        })

        .when('/view-recipe/:recipeId', {
            templateUrl: 'views/view_recipe.html',
            controller: 'RecipeController'
        })

        .when('/view-all-recipes', {
            templateUrl: 'views/view_all_recipes.html',
            controller: 'RecipeController'
        });


    $locationProvider.html5Mode(true);

}]);
