# Buzzvel John Task List

This is the frontend for Buzzvel Mid Level React Developer hiring test. 

It consists of a simple task list application with the followings functionalities:

1. Display Task List
2. Add New Task
3. Add Subtask
4. Mark Task as Completed
5. Delete Task
6. Order Tasks

The application can be accessed online at https://john-task-list.web.app

## Getting Started

Follow the instructions below to set up and run the application on your local machine.

### Prerequisites

Before running the application, make sure you have the following installed on your system:

- [Node.js](https://nodejs.org/en) (version >=16)
- [Docker](https://www.docker.com/get-started/) (if you want to use docker-compose)
- [npm](https://docs.npmjs.com/getting-started) or [Yarn](https://yarnpkg.com/getting-started) (latest version)


### Get the backend

1. Go to the [backend](https://github.com/carloscastrodev/task-list-api) repository and follow the installation instructions there:


### Clone

1. Clone this repository to your local machine:

```bash
git clone https://github.com/carloscastrodev/task-list.git
cd task-list
```


### Environment Setup

The API requires a `.env.local` file to store configuration variables. Create a `.env.local` file in the root directory of the project and fill it with the necessary values. You can use the `.env.example` file as a template:

```dotenv
# .env.example
VITE_BACKEND_URL=http://host.docker.internal:3333
```

The address `host.docker.internal` expects that you're running the [backend](https://github.com/carloscastrodev/task-list-api) with port 3333 exposed to your host machine.
Change the url to http://localhost:3333 if running this application outside docker.

### Running with Docker

To run the application using Docker, make sure you have Docker installed and running on your system. Then, use the following command:

```bash
docker-compose up -d
```

This command will start the application, listening at port 5173. This might take a few seconds.

It then can be accessed at http://localhost:5173

### Running without Docker

To run the API without Docker, use the following commands:

1. Install the dependencies using npm or Yarn:

Using npm:

```bash
npm install
```

Using Yarn:

```bash
yarn
```

2. Run the app

Using npm:

```bash
npm run dev
```

Using Yarn:

```bash
yarn dev
```

Make sure to configure the `VITE_BACKEND_URL` variable at the `.env.local` file

### Running Tests

The APP includes some basic unit tests. To run the do the following:

Using npm:

```bash
npm run test
```

Using Yarn:

```bash
yarn test
```