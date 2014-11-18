notifyApp.controller('homeCtrl', function ($scope, $state, $ionicModal, $mobileServices, $location, $window, $ionicLoading, $auth0Store) {
    $scope.logoff = function () {
        $state.transitionTo("logoff");
    }
})

.controller('signinCtrl', function ($state, $scope, $mobileServices, $ionicLoading, $auth0Store) {
    $mobileServices.currentUser = $auth0Store.getToken();
    if ($mobileServices.currentUser != null) {
        $state.transitionTo("home");
    }

    $scope.show = function () {
        $scope.loading = $ionicLoading.show({
            content: 'Loading feed...'
        });
    };

    $scope.hide = function () {
        $scope.loading.hide();
    };

    $scope.login = function () {
        $scope.show();
        $mobileServices.login("facebook").then(function () {
            $auth0Store.save($mobileServices.currentUser);
            $scope.hide();
            $state.transitionTo("home");
        }, function (error) {
            alert(error);
            $scope.hide();
        });
    }

})

.controller('logoffCtrl', function ($state, $mobileServices, $auth0Store) {
    $auth0Store.save($mobileServices.currentUser = null);
    $state.transitionTo("home");
});