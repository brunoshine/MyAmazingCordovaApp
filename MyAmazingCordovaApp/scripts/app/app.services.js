// Azure Mobile Services
notifyApp.factory('$mobileServices', function ($q) {
    console.log("service");
    var MobileServiceClient = WindowsAzure.MobileServiceClient;
    var client = new MobileServiceClient(
        "<AZURE_MOBILE_SERVICES_URL>",
        "<AZURE_MOBILE_SERVICES_KEY>"
    );
    return client;
})

// Authentication Storage
.factory('$auth0Store', function (store) {

    var $auth0Store = function store$auth0Store() {
        this.store = store.getNamespacedStore('auth0');
        this.isAuthenticated = function store$auth0Store$IsAuthenticated() {
            return this.store.get("currentUser") != null;
        };
        this.save = function store$auth0Store$save(token) {
            this.store.set("currentUser", token);
        };
        this.getToken = function store$auth0Store$getToken() {
            return this.store.get("currentUser");
        };
    }

    return new $auth0Store();
});