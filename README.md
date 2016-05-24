# OSRM Multi Source Single Destination Routing

Based on: https://github.com/Project-OSRM/osrm-backend

NodeJS Binding: https://github.com/Project-OSRM/osrm-backend/wiki/node-osrm-api

## The Problem

There seems to be a fork or two that support multi source/destination routes, but these
forks are a year+ old and I can't seem to get them to run.  Making multiple requests
the the default server is slow(er).

## Hacky Solution

The route API allows for multiple point routes, so navigate to each source to destination to next
source to destination, etc.  Fastest way I can see w/o modifiation of C++ source. (Note, there is a
a table API query, but this only returns time...).

## Setup

First, like any osrm source, prepare the data (you need to [build](https://github.com/Project-OSRM/osrm-backend/wiki/Building-OSRM)
 osrm to get these tools):


```bash
# open street map protocal buffer
# Good place to get it: http://download.geofabrik.de/
osrm-extract mydata.osm.pbf
# generated above
osrm-contract mydata.osrm
```

now install

```bash
git clone https://github.com/CSTARS/osrm-transportation-server
cd osrm-transportation-server && npm install
```

finally create a config file

```js
{
    "port" : 5000,
    "data" : "/path/to/your/data.osrm" 
}
```

## Run

```
node index.js /path/to/config.json
```

## API

Requests go to /.  Can be GET or POST.

### Parameters

 - sources: [[lng, lat], [lng, lat], ...]
 - destination: [lng, lat]
 - steps : true | false
 
sources and destination should be stringify JSON.

### Response

```js
[{
    summary: 'I 5, I 5;US 12',
    duration: 1494.2, // in seconds
    steps: { // only if steps=true
        type: 'LineString', 
        coordinates: [Object] 
    },
    distance: 35535.2 // in meters
}, ...]
```


