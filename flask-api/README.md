# Flask API

## Endpoints

| Method | Endpoint                 | Description                        |
| ------ | ------------------------ | ---------------------------------- |
| POST   | /api/upload_file         | allows user to upload file         |
| GET    | /api/download_csv        | allows user to download csv        |
| GET    | /api/download_graph_json | allows user to download json graph |

## Features

- Developed the front end of our application using React to take as input two files as well as three optional parameters
- Developed the back end of our application using Flask and set up an endpoint that collects our file data and stores it locally
- Users have the option between uploading a file from local storage or linking to a file directly through URL input
- Optional parameters are stored as variables and can be used as CLI inputs if necessary
- Application is styled using CSS and flexbox to match the wireframe provided for UI/UX
- Optional parameter inputs can be set to hidden or visible by clicking a button on the front end
- React library set up for implementing a tree structure visually if necessary
- Files are uploaded directly into our flask-api directory
