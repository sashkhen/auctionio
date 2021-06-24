<!-- TITLE -->
<p align="center">
  <h3 align="center">Auctionion</h3>

  <p align="center">Socket React App</p>
</p>

<!-- TABLE OF CONTENTS -->
<details open="open">
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li>
      <a href="#usage">Usage</a>
      <ul>
        <li><a href="#functionality">Functionality</a></li>
        <li><a href="#notes">Notes</a></li>
      </ul>
    </li>
  </ol>
</details>

<!-- GETTING STARTED -->
## Getting Started

### Installation

1. Clone the repo

   ```sh
   git clone https://github.com/sashkhen/auctionio.git
   ```

2. Update network address for client and server to point at each other: [./client/src/consts.js](./client/src/consts.js), [./server/variables.env](./client/src/consts.js)

3. Start a project

   ```sh
   # to run server
   cd server
   npm i
   npm run start

   # to run client
   cd client
   npm i
   npm run start
   ```


<!-- USAGE EXAMPLES -->
## Usage

Navigate to the link displayed in the terminal (💻 / client).

### Functionality

- Create [/asset](http://localhost:3000/asset)

- Browse [/assets](http://localhost:3000/assets)

- Create [/auction](http://localhost:3000/auction)

- Browse [/auctions](http://localhost:3000/auctions)

- Browse [/auction/:id](http://localhost:3000/auction/:id)

- Update [/auction/:id](http://localhost:3000/auction/:id)

- Delete [/auction/:id](http://localhost:3000/auction/:id)

- Make a bid when [/auction/:id](http://localhost:3000/auction/:id) is active

### Notes

Auctions are implemented as socket.io rooms. This means you need to be browsing a room to see auction updates realtime.
