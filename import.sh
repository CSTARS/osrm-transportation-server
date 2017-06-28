# /bin/bash

DEST=ahb
DATAROOT="http://download.geofabrik.de/north-america/us/"
FILES=("california" "oregon" "washington" "idaho")

# prepare each state
ALL=""
for i in "${FILES[@]}"
do
	wget $DATAROOT$i-latest.osm.pbf -O data/$i.osm.pbf
done
