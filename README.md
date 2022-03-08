# ontology-mapper-ui

### Running Locally via Node + Python

##### Requirements

-   Node >= 16.0.0
-   npm >= 8.0.0
-   Python >= 3.9.0
-   pip >=21.0.0

(_Note:_ these are the versions I have that work; while I know Python 3.9 or higher is necessary, the others may not strictly require the listed versions.)

#### Instructions

##### Initial Setup

When first cloned, run the command:

```
git submodule init
```

to initialize the contained [`ontology-mapper`](https://github.com/ccb-hms/ontology-mapper) repository.
Then, after initialization run the command

```
git submodule update
```

to update the local version of that submodule.

Then, run the command:

```
npm install
```

to install all necessary packages for the React frontend.

Next, go into the `flask-api` folder (perhaps by running `cd flask-api`) and run

```
pip install -r requirements.txt
```

to install necessary packages for the Flask api.
Afterards, navigate into the `ontology-mapper` submodule (like by running `cd ontology-mapper`) and run

```
pip install .
```

to install the necessary packages for the mapper itself.

##### Running

To run, make sure you are in the root of the repository and run, in two separate command line instances, the command

```
npm start
```

to start the front-end, which can be seen at `localhost:3000`, and the command

```
npm run flask-api
```

to start the back-end, which can be interacted with at `localhost:5000`.

### Running Locally via Docker

#### Requirements

-   Docker

#### Instructions

##### Initial Setup

When first cloned, run the command:

```
git submodule init
```

to initialize the contained [`ontology-mapper`](https://github.com/ccb-hms/ontology-mapper) repository.
Then, after initialization run the command

```
git submodule update
```

to update the local version of that submodule.

Before running, make sure you have the latest version of the repository built by running the command"

```
docker-compose build
```

Docker should build two images:

-   `ontology-mapper-api`: the Flask backend API
-   `ontology-mapper-client`: the React frontend

##### Running

To run the website, run the command:

```
docker-compose up
```

Docker should build two containers corresponding to the two images.

In a browser, navigate to `localhost:3000` to see the front-end.

### Acknowledgements

Initial setup of React and Flask and Dockerization aided by an [article series](https://blog.miguelgrinberg.com/post/how-to-dockerize-a-react-flask-project) by Miguel Grinberg.
