document.addEventListener('DOMContentLoaded', function() {
    // Initialize the map on the "map" div
    var map = L.map('map').setView([40.7128, -74.0060], 10); // Coordinates for NYC

    // Load a map layer
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors'
    }).addTo(map);

    // Function to handle loading data from NYC Open Data
    function loadData() {
        fetch('https://data.cityofnewyork.us/resource/yjub-udmw.json')
            .then(response => response.json())
            .then(data => {
                // Convert the JSON data to GeoJSON format
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
                // Add the GeoJSON layer to the map
                L.geoJson(geoJson, {
                    onEachFeature: function(feature, layer) {
                        // Create a popup for each feature
                        // Customize this to include the properties you want to display
                        if (feature.properties) {
                            let popupContent = `<div><strong>Location:</strong> ${feature.properties.name}</div>`;
                            layer.bindPopup(popupContent);
                        }
                    }
                }).addTo(map);
            })
            .catch(error => console.error('Error loading data:', error));
    }

    // Call the function to load data
    loadData();
});
