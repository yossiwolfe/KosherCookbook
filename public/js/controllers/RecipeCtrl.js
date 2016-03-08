// public/js/controllers/RecipeCtrl.js
angular.module('RecipeCtrl', []).controller('RecipeController', ["$routeParams", "$scope", "$http", "$location", function($routeParams, $scope, $http, $location) {

    $scope.showLoading = false;
    $scope.tagline = 'Nothing beats a pocket protector!';
    $scope.postUrl = '/api/recipes';
    $scope.formData = {};
    $scope.viewData = {};

    $scope.categories = Array();
    $scope.ingredients = Array();
    $scope.instructions = Array();
    $scope.formData.prepTimeMinutes = 0;
    $scope.formData.cookTimeMinutes = 0;
    $scope.formData.authorRating = 5;
    $scope.formData.kosherStatus = "pareve";

    $scope.numberOfSteps = 1;
    $scope.numberOfIngredients = 1;
    $scope.getNumber = function(num) {
        return new Array(num);
    }

    $scope.init = function(){
        $scope.getCategories();
        $scope.recipeId = $routeParams.recipeId;
        $scope.recipeMethod = $routeParams.method;
        if(!angular.isUndefined($scope.recipeId) && !angular.isUndefined($scope.recipeMethod)){
            if($scope.recipeMethod == "update"){
                $scope.postUrl = '/api/recipes/' + $scope.recipeId;
                $scope.getRecipe();
            }
            else if($scope.recipeMethod == "delete"){
                $scope.showLoading = true;
                $scope.deleteRecipe();
            }
        }
        else if(!angular.isUndefined($scope.recipeId)){
            $scope.getViewableRecipe();
        }
        else{
            $scope.recipeMethod = "add";
        }
    };

    $scope.getCategories = function(){
        $scope.categories.push({name: "Appetizer"});
        $scope.categories.push({name: "Salad"});
        $scope.categories.push({name: "Soup"});
        $scope.categories.push({name: "Main Dish"});
        $scope.categories.push({name: "Dessert"});
        $scope.categories.push({name: "Bread"});
    };

    $scope.removeIngredient = function(){
        if($scope.numberOfIngredients == 1){
            return false;
        }
        $scope.numberOfIngredients--;
    }

    $scope.addIngredient = function(){
        $scope.numberOfIngredients++;
    }

    $scope.removeInstruction = function(){
        if($scope.numberOfSteps == 1){
            return false;
        }
        $scope.numberOfSteps--;
    }

    $scope.addInstruction = function(){
        $scope.numberOfSteps++;
    }

    $scope.getAllRecipes = function(){
        $http({
            method  : 'GET',
            url     : '/api/recipes'
        })
            .success(function(data) {
                $scope.recipes = data;
            });
    }

    $scope.getRecipe = function(){
        $http({
            method  : 'GET',
            url     : '/api/recipes/' + $scope.recipeId
        })
            .success(function(data) {
                console.log(data);
                $scope.formData = data;

                $scope.numberOfIngredients = $scope.formData.ingredients.length;
                $scope.numberOfSteps = $scope.formData.instructions.length;

                var temp_cats = $scope.formData.categories;
                $scope.formData.categories = Array();
                for(cat in temp_cats){
                    $scope.formData.categories.push(temp_cats[cat].name);
                }

            });

    }

    $scope.getViewableRecipe = function(){
        $http({
            method  : 'GET',
            url     : '/api/recipes/' + $scope.recipeId
        })
            .then(function successCallback(response) {
                $scope.viewData = response.data;
            }, function errorCallback(response) {
                console.log("ERRRORRR: " + response);
            });
        ;

    }

    $scope.deleteRecipe = function(){
        $http({
            method  : 'GET',
            url     : '/api/recipes/delete/' + $scope.recipeId
        })
            .success(function(data) {
                console.log(data);
                $location.path( "/view-all-recipes" );
            });
    }

    $scope.processForm = function() {

        var temp_cats = $scope.formData.categories;
        $scope.formData.categories = Array();
        for(cat in temp_cats){
            $scope.formData.categories.push({name: temp_cats[cat]});
        }

        $http({
            method  : 'POST',
            url     : $scope.postUrl,
            data    : $.param($scope.formData),  // pass in data as strings
            headers : { 'Content-Type': 'application/x-www-form-urlencoded' }  // set the headers so angular passing info as form data (not request payload)
        })
            .success(function(data) {
                $location.path( "/view-all-recipes" );
                /*
                if (!data.success) {
                    // if not successful, bind errors to error variables
                    $scope.errorName = data.errors.name;
                } else {
                    // if successful, bind success message to message
                    $scope.message = data.message;
                }
                */
            });
    };

    $scope.getRecipes = function(){
        $http({
            method  : 'GET',
            url     : '/api/recipes'
        })
        .success(function(data) {
            console.log(data);
        });
    }


}])
    .filter('displayFraction', function() {
        return function(input, uppercase) {
            input = input || '';

            var out = "";
            if(input == .25){
                out = "&frac14;";
            }
            else if(input == .5){
                out = "&frac12;";
            }
            else if(input == .75){
                out = "&frac34;";
            }
            else if(input == .33){
                out = "&frac13;";
            }

            // conditional based on optional argument
            if (uppercase) {
                out = out.toUpperCase();
            }
            return out;
        };
    });
