var flg = 1;

require(["esri/map","dojo/on"], function(Map,on) {
	aMap = new Map("arcgisMap", {
		center: [-123.000769, 49.248471],
		zoom: 15,
		basemap: "streets"
	});

	aMap.on('pan-end', function (evt) {
		var ext = evt.target.geographicExtent;
		var lng = (ext.xmax + ext.xmin) / 2;
		var lat = (ext.ymax + ext.ymin) / 2;
		moveConcurrent('gg', lat, lng, aMap.getZoom());
	})

	aMap.on('zoom-end', function (evt) {
		var ext = evt.target.geographicExtent;
		var lng = (ext.xmax + ext.xmin) / 2;
		var lat = (ext.ymax + ext.ymin) / 2;
		moveConcurrent('gg', lat, lng, aMap.getZoom());
	})
});

function initMap() {
	gMap = new google.maps.Map(document.getElementById('googleMap'), {
		center: {lat: 49.248471, lng: -123.000769},
		zoom: 15,
		fullscreenControl: false
	});

	gMap.addListener('dragend', function(evt) {
		flg *= -1;
		moveConcurrent('arc', gMap.center.lat(), gMap.center.lng(), gMap.zoom);
	});

	gMap.addListener('zoom_changed', function(evt) {
		var valid = -1;
		if(flg !== valid){
			flg *= valid;
			moveConcurrent('arc', gMap.center.lat(), gMap.center.lng(), gMap.zoom);
		}else{
			flg *= valid;
		}
	});
}

function moveConcurrent(map,lat,lng,zoom){
	if(map === 'gg'){
		gMap.setOptions({
			center: {lat: lat, lng: lng},
			zoom: zoom
		});
	}
	if(map === 'arc'){
		aMap.centerAndZoom(new esri.geometry.Point(lng, lat, new esri.SpatialReference({ wkid: 4326 })),zoom);
	}
}