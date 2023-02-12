# Ethereum Block Number Lookup API

This project is a simple API built using Node.js, TypeScript and Express.js that takes a timestamp in seconds as an input and returns the closest Ethereum block number that was created after the input timestamp.

## Technology Stack

- Node.js
- TypeScript
- Express.js
- Ethers.js
- Jest
- Swagger

# Getting Started

### 1 - Clone the repository to your local machine

```bash
git clone https://github.com/alexmf91/eth-block-api.git
```

### 2 - Navigate to the project directory

```bash
cd eth-block-api
```

### 3 - Install the dependencies

```bash
yarn install
```

### 4 - Set up environment

Rename .env.example to .env and add your infura project id.

```bash
RPC_URL=https://mainnet.infura.io/v3/<YOUR_INFURA_PROJECT_ID>
```

### 5 - Start the server

```bash
yarn start
```

or for dev mode:

```bash
yarn start:dev
```

### 6 - Usage

To use this API, make a GET request to the following enpoint with a valid timestamp in seconds as parameter.

```bash
 http://localhost:8000/api/v1/block-number
```

If you prefer, you can access the Swagger API documentation and test the implementation directly from there.

```bash
http://localhost:8000/api-docs
```

### 7 - Tests

```bash
yarn jest
```

## Implementation Details

The API implements a binary search algorithm to efficiently find the closest Ethereum block number that was created after the input timestamp. A cache is used to store the block timestamps and the closest block number for a given timestamp, in order to reduce the number of Ethereum blockchain queries.

## Future Improvements

1. Implement a more efficient cache system, such as Redis, to enhance the performance of the API.

2. Add more robust error handling, including specific error messages for common issues such as invalid input timestamps.

3. Allow users to query the API for multiple timestamps in a single request, and return the closest block numbers for each timestamp.

4. Deploy the API to a live environment, such as a cloud platform, and set up monitoring and logging to ensure its reliability.

## Thank you
