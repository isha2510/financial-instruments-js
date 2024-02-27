# Financial Instruments Table
This project is a simple React app that displays a table of financial instruments.

## Prerequisites

Before you get started, make sure you have the following installed:

- Node.js
- npm
  
## Installation
To Run the application follow below mentioned steps

### `npm install`:
Clone the repository and run the 
```bash
npm install
```
It will install all the project related dependencies.

### `npm start`:
Once all the dependencies are installed run the 
```bash
npm start
```
It Runs the app in the development mode.
Open http://localhost:3000 to view it in your browser.

### `npm test`:
```bash
npm test
```
Launches the test runner in the interactive watch mode.

## What are we using
- Project was created using create-react-app
- JavaScript
- ag-grid-react

## Features:
### Sorting:
- by “Asset Class”: Commodities first, then Equities and Credit last.
- by “Price” in descending order
- by “Ticker” in alphabetical order

### Color Scheme:
The table rows are color coded on the basis of "Asset Class"
- Commodities: white
- Equities: Blue
- Credit: Green
- "Price" will be blue if positive and red if negative
