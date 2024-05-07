document.addEventListener('DOMContentLoaded', function() {
    var map = L.map('map').setView([40.7128, -74.0060], 10); // Coordinates for NYC

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors'
    }).addTo(map);

    function loadData() {
        fetch('https://data.cityofnewyork.us/resource/yjub-udmw.json')
            .then(response => response.json())
            .then(data => {
                const geoJson = {
                    type: "FeatureCollection",
                    features: data.map(item => ({
                        type: "Feature",
                        geometry: {
                            type: "Point",
                            coordinates: [
                                parseFloat(item.longitude),
                                parseFloat(item.latitude)
                            ]
                        },
                        properties: item
                    }))
                };
                L.geoJson(geoJson, {
                    onEachFeature: function(feature, layer) {
                        if (feature.properties) {
                            let popupContent = `<div><strong>Location:</strong> ${feature.properties.name}</div>`;
                            layer.bindPopup(popupContent);
                        }
                    }
                }).addTo(map);
            })
            .catch(error => console.error('Error loading data:', error));
    }

    loadData();
});
