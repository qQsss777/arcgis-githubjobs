# arcgis-githubjobs

## Description
For my own practice, this is a fullstack application.

For back, it's a node server with cron process to fetch jobs from github. Results are written in redis database each hour.

For front, it's a react application with ArcGIS API for Javascript for the map. The results are geocoded on the fly once when click "Afficher la carte". The first display could be slow, it's normal.

There no real logic in the app : you will notice that each time that Joblist is mounted, it fetches the node API while EsriMapView geocode once time. But this application is just for fun and practice. 

It was also my first time with material UI. I uses react boostrap usually.

## Requirements
Docker

ArcGIS account to use geocode service and basemap.
- more informations about ArcGIS : https://developers.arcgis.com/
- features for free : https://developers.arcgis.com/pricing/ (1 million transactions on basemap and geocode service per month!!!)
- create a free account : https://developers.arcgis.com/sign-up/

Then you must to replace "YOUR_URL" line 21 in client/src/data/index.ts

## Requirements
Docker

## TODO
write properly Typescript
Change docker configuration (practice too)
service worker
real PWA
more jobs for fun ?
cron process to mail