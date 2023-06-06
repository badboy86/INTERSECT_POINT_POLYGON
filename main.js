// Charger le découpage administratif de la France (GeoJSON)
fetch('./maroc.geojson')
  .then(function(response) {
    return response.json();
  })
  .then(function(data) {
    // Convertir le GeoJSON en objets géométriques JSTS
    var jstsParser = new jsts.io.OL3Parser();

    // Itérer sur les régions et effectuer les opérations nécessaires
    data.features.forEach(function(region, regionIndex) {
      var jstsRegion = new jsts.io.GeoJSONReader().read(region.geometry);

      // Charger les points (GeoJSON)
      fetch('./points.geojson')
        .then(function(response) {
          return response.json();
        })
        .then(function(data) {
          // Itérer sur les points et vérifier s'ils intersectent la région
          data.features.forEach(function(point, pointIndex) {
            var jstsPoint = new jsts.io.GeoJSONReader().read(point.geometry);
            if (jstsRegion.intersects(jstsPoint)) {
              // Le point intersecte la région, afficher l'indice du point et la région
              console.log('Le point', pointIndex, 'intersecte la région', regionIndex);
            }
          });
        });
    });
  });
