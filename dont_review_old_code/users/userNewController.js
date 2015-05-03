myApp.controller('userNewController', function($scope, usersService){

	var defaultSkill = {name: '.net', years: 1};

    $scope.newUser = {
        name:'Superman Jorikov',
        img: 'img/jane_doe.jpg',
        role: '.net',
        level: 'senior',
        skills: [defaultSkill]
    };

    $scope.creationResult = null;

    $scope.addSkill = function(){
        $scope.newUser.skills.push({name: '.net', years: 1});
    }

    $scope.removeSkill = function(i){
        $scope.newUser.skills.splice(i,1);
    }

    $scope.createUser = function(){
        $scope.creationResult = usersService.createUser($scope.newUser);
    };

    $scope.createAnotherProject = function(){
        $scope.creationResult = null;
    };

});