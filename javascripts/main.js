app.run((FIREBASE_CONFIG) => {
	firebase.initializeApp(FIREBASE_CONFIG);
});

app.controller("ShroomTypes", ($http, $q, $scope, FIREBASE_CONFIG) => {

	$scope.filters = {};

	$scope.toadstools = [];

	let getShroomsList = () => {
		let fungi = [];
		return $q((resolve, reject) => {
			$http.get(`${FIREBASE_CONFIG.databaseURL}/mushrooms.json`)
			.then((fbItems) => {
			var itemCollection = fbItems.data;
	        Object.keys(itemCollection).forEach((key) => {
				itemCollection[key].id=key;
				fungi.push(itemCollection[key]); 
			});
			resolve(fungi);
			console.log(fungi);
		})
			.catch((error) => {
				reject(error);
			});
		});
	};

	let getShrooms = () => {
		getShroomsList().then((fungi) => {
			$scope.toadstools = fungi;
		}).catch((error) => {
			console.log("get error", error);
		});
	};


	getShrooms();




});