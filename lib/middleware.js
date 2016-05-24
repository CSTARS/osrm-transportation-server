var osrm = require('./osrm')();
var polyUtil = require('polyline-encoded');

module.exports = function(req, res) {
    var query = req.method === 'GET' ? req.query : req.body;
    
    var sources = query.sources ? JSON.parse(query.sources) : [];
    var destination = query.destination ? JSON.parse(query.destination) : [];
    
    var osrmQuery = {
        coordinates : prepare(sources, destination),
        alternatives: false,
        steps : query.steps ? true : false,
        overview: 'false'
    }
    
    osrm.route(osrmQuery, (err, result) => {
        if( err ) {
            return res.send({error: true, message: err});
        }
        
        result = finalize(result.routes[0], osrmQuery.steps);
        res.send(result);
    });
}

function finalize(results, showSteps) {
    var resp = [];
    var item, geom;

    for( var i = 0; i < results.legs.length; i += 2 ) {
        item = results.legs[i];
        
        if( showSteps ) {
          item.steps = toGeoJson(item.steps);
        } else {
          delete item.steps;
        }
        
        resp.push(item);
    }
    
    return resp;
}

function toGeoJson(steps) {
    var geom = {
        type : 'LineString',
        coordinates : []
    }
    var coords, i, j;
    
    for( i = 0; i < steps.length; i++ ) {
        coords = polyUtil.decode(steps[i].geometry);
        for( j = 0; j < coords.length; j++ ) {
            geom.coordinates.push([coords[j][1], coords[j][0]]);
        }
    }
    
    return geom;
}

function prepare(sources, destination) {
    var coords = [];
    
    for( var i = 0; i < sources.length; i++ ) {
        coords.push(sources[i]);
        coords.push(destination);
    }
    
    return coords;
}