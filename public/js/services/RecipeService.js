// public/js/services/RecipeService.js
angular.module('RecipeService', []).factory('Recipe', ['$http', function($http) {

    return {
        // call to get all recipes
        get : function() {
            return $http.get('/api/recipes');
        },


                // these will work when more API routes are defined on the Node side of things
        // call to POST and create a new recipe
        create : function(recipeData) {
            return $http.post('/api/recipes', recipeData);
        },

        // call to DELETE a recipe
        delete : function(id) {
            return $http.delete('/api/recipes/' + id);
        }
    }       

}]);
