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


### Get the backend (If not using docker)

Go to the [backend](https://github.com/carloscastrodev/task-list-api) repository and follow the installation instructions there.


### Clone

Clone this repository to your local machine:

```bash
git clone https://github.com/carloscastrodev/task-list.git
cd task-list
```


### Environment Setup

The API requires a `.env.local` file to store configuration variables. Create a `.env.local` file in the root directory of the project and fill it with the necessary values. You can use the `.env.example` file as a template:

```dotenv
# .env.example
VITE_BACKEND_URL=http://api-address
```

Change the url from http://api-address to the [backend](https://github.com/carloscastrodev/task-list-api) address (http://localhost:3333 if running locally).

### Running with Docker

To run the application using Docker, make sure you have Docker installed and running on your system. Then, do the following:

1. Install the dependencies using npm or Yarn:

Using npm:

```bash
npm install
```

Using Yarn:

```bash
yarn
```

2. Run with Docker Compose
```bash
docker-compose up -d
```

This command will bootup a postgres container, along with the api image and start the frontend application, listening at port 5173. This might take a few minutes.

It then can be accessed at http://localhost:5173

### Running without Docker

To run the API without Docker, [install the backend](https://github.com/carloscastrodev/task-list-api) and then use the following commands:

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