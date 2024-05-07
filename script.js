document.addEventListener('DOMContentLoaded', function() {
    var map = L.map('map').setView([40.7128, -74.0060], 11); // New York City coordinates

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '© OpenStreetMap'
    }).addTo(map);

    var subwayData = {
        "type": "FeatureCollection",
        "features": [
            // Add your GeoJSON features here
        ]
    };

    L.geoJson(subwayData, {
        pointToLayer: function (feature, latlng) {
            return L.circleMarker(latlng, {
                radius: 8,
                fillColor: "#3388ff",
                color: "#3388ff",
                weight: 1,
                opacity: 1,
                fillOpacity: 0.8
            });
        }
    }).addTo(map);
});
