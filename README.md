# MERN Boilerplate
An example application demonstrating using the MERN stack (Mongodb, Express, React, Node)

## Configuration
Create a `.env` file based on the provided `.sample-env` file. Use this to provide serving details, mongo configuration and credentials.

## Running the app
### Development
```
npm run build
npm run dev
```
This will actually run 2 servers that watch for changes on the frontend and backend:
* http://localhost:3000 will hot-reload changes to the frontend (react-app)
* http://localhost:3001 will hot-reload changes to the backend - frontend changes may not be shown here as it is serving the `build` react page


### Serving Locally
NOTE: Will require a running mongodb that the app is configured to connect to (e.g. `npm run dev:mongodb`)
```
npm run build
npm run serve
```
To stop the server:
```
npm run stop
```


### Docker:
```
npm run docker-build-nc
docker compose up -d
```
