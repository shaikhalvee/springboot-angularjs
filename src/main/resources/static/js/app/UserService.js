'use strict';

angular.module('crudApp').factory('UserService',
	['$localStorage', '$http', '$q', 'urls',
		function ($localStorage, $http, $q, urls) {

			return {
				loadAllUsers: loadAllUsers,
				getAllUsers: getAllUsers,
				getUser: getUser,
				createUser: createUser,
				updateUser: updateUser,
				removeUser: removeUser
			};

			function sleep(milliseconds) {
				var start = new Date().getTime();
				for (var i = 0; i < 1e7; i++) {
					if ((new Date().getTime() - start) > milliseconds) {
						break;
					}
				}
			}

			function loadAllUsers() {
				sleep(3);
				console.log('Fetching all users');
				var deferred = $q.defer();
				$http.get(urls.USER_SERVICE_API)
					.then(
						function (response) {
							console.log('Fetched successfully all users');
							$localStorage.users = response.data;
							deferred.resolve(response);
						},
						function (errResponse) {
							console.error('Error while loading users');
							deferred.reject(errResponse);
						}
					);
				return deferred.promise;
			}

			function getAllUsers(){
				return $localStorage.users;
			}

			function getUser(id) {
				console.log('Fetching User with id :'+id);
				var deferred = $q.defer();
				$http.get(urls.USER_SERVICE_API + id)
					.then(
						function (response) {
							console.log('Fetched successfully User with id :'+id);
							deferred.resolve(response.data);
						},
						function (errResponse) {
							console.error('Error while loading user with id :'+id);
							deferred.reject(errResponse);
						}
					);
				return deferred.promise;
			}

			function createUser(user) {
				console.log('Creating User');
				var deferred = $q.defer();
				$http.post(urls.USER_SERVICE_API, user)
					.then(
						function (response) {
							loadAllUsers();
							deferred.resolve(response.data);
						},
						function (errResponse) {
						   console.error('Error while creating User : '+errResponse.data.errorMessage);
						   deferred.reject(errResponse);
						}
					);
				return deferred.promise;
			}

			function updateUser(user, id) {
				console.log('Updating User with id '+id);
				var deferred = $q.defer();
				$http.put(urls.USER_SERVICE_API + id, user)
					.then(
						function (response) {
							loadAllUsers();
							deferred.resolve(response.data);
						},
						function (errResponse) {
							console.error('Error while updating User with id :'+id);
							deferred.reject(errResponse);
						}
					);
				return deferred.promise;
			}

			function removeUser(id) {
				console.log('Removing User with id '+id);
				var deferred = $q.defer();
				$http.delete(urls.USER_SERVICE_API + id)
					.then(
						function (response) {
							loadAllUsers();
							deferred.resolve(response.data);
						},
						function (errResponse) {
							console.error('Error while removing User with id :'+id);
							deferred.reject(errResponse);
						}
					);
				return deferred.promise;
			}

		}
	]);