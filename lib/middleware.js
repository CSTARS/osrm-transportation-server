var osrm = require('./osrm')();
var polyUtil = require('polyline-encoded');

// module.exports = function(req, res) {
//     var query = req.method === 'GET' ? req.query : req.body;
    
//     var sources = query.sources ? JSON.parse(query.sources) : [];
//     var destination = query.destination ? JSON.parse(query.destination) : [];
    
//     var osrmQuery = {
//         coordinates : prepare(sources, destination),
//         alternatives: false,
//         steps : query.steps ? true : false,
//         overview: 'false'
//     }
    
//     console.log('Routing '+ (osrmQuery.coordinates.length/2) + ' routes');
//     osrm.route(osrmQuery, (err, result) => {
//         console.log('Routing complete');

//         if( err ) {
//             console.error(1, err);
//             console.log(result);
//             return res.send({error: true, message: err});
//         }
        
//         try {
//             result = finalize(result.routes[0], osrmQuery.steps);
//             console.log('Route success');
//             res.send(result);
//         } catch(e) {
//             console.error(2, e);
//             res.send({error: true, message: e});
//         }
//     });
// }

async function routeIndividual(req, res) {
    var query = req.method === 'GET' ? req.query : req.body;
    
    var sources = query.sources ? JSON.parse(query.sources) : [];
    var destination = query.destination ? JSON.parse(query.destination) : [];
    console.log('Routing '+ (sources.length) + ' routes');


    var results = [];
    for( var i = 0; i < sources.length; i++ ) {
        try {
            var result = await route(sources[i], destination, query.steps);
            results.push(finalize(result, query.steps));
        } catch(e) {
            var error = {
                error: true,
                message: 'No route',
                details: e,
                src : sources[i],
                dst : destination
            };

            console.error(error);
            results.push(error);
        }
    }

    res.send(results);
}

module.exports = routeIndividual;

function route(src, dst, steps) {
    var osrmQuery = {
        coordinates : [src, dst],
        alternatives: false,
        steps : steps ? true : false,
        overview: 'false'
    }

    return new Promise((resolve, reject) => {
        osrm.route(osrmQuery, (err, result) => {
            if( err ) reject(err);
            else resolve(result);
        });
    });
}

// function finalize(results, showSteps) {
//     var resp = [];
//     var item, geom;

//     for( var i = 0; i < results.legs.length; i += 2 ) {
//         item = results.legs[i];
        
//         if( showSteps ) {
//           item.steps = toGeoJson(item.steps);
//         } else {
//           delete item.steps;
//         }
        
//         resp.push(item);
//     }
    
//     return resp;
// }

function finalize(result, showSteps) {
    var item = result.routes[0].legs[0];
        
    if( showSteps ) {
        item.steps = toGeoJson(item.steps);
    } else {
        delete item.steps;
    }
    
    return item;
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