# TRUSAEL

TRUSAEL combines technology, real estate, and marketing to modernize the real estate business. We have created an online marketplace where real estate agents compete against each other by bidding to represent sellers in transactions. TRUSAL brings agents to clients, and clients to agents.

## Getting Started
You need to set up your MySQL database before you can run the code. 

    1. Download and unzip the code, and install the prerequisites, as explained in the "Installing" section of this README.
    2. In your "TRUS-L-master" directory there is a "db" directory. In that directory there are two files: schema.sql and seed.sql. 
        a. Open your MySQL Workbench and run schema.sql to create the database and tables.
        b. Then run seed.sql to populate the database with some data.
    3. Now that your database is ready to be queried, create a .env file in the same directory as server.js. Enter you MySQL root password like below:
       SQL_PASSWORD='myR00tPassword'
    4. Open a Git terminal. Type "node server.js". 

### Prerequisites

   * Git terminal
   * Node
   * MySQL and MySQL Workbench (or the SQL terminal instead of MySQL Workbench)
     * Express
     * dotenv (to pass your SQL root password into this application)
     * MySQL 

### Installing
    1. Go to https://github.com/BCButcher/TRUS-L and click on the "Clone or Download" button. 
    2. Choose "Download ZIP". 
    3. Unzip into a directory. If you're on Windows, open File Explorer and navigate to the download directory. Select the ZIP file, right click, and choose "Extract All". Accept the default location.
    4. Once the file is unzipped, navigate to TRUS-L-master.
    5. If you don't have the prerequisites installed, type the following:
       * npm install express
       * npm install dotenv
       * npm install mysql
    6. Use your Git terminal to execute server.js. 
    7. Open a browser and open localhost:3000


## Running the tests
There is no automated test suite for this application. Instead, we ran the following manual tests. 

### Manual tests
#### USER
    1. New user clicks "Sell a house" > creates a profile and listing > redirected to login > redirected to dashboard.
      a. Seeing dashboard for first time, user sees their listing on the top and no bids below.
    2. Existing user logs in, sees the dashboard. They have bids. They click on a bid > taken to biddetails > They accept or reject the bid.
      a. If reject, they are prompted for a reason. Whether they provide one or not, the bid is rejected in the database. User is taken back to the dashboard.
      b. If accept, this bid is updated to Signed, every other bid on the listing is rejected with automatic reason "Awarded to another agent" and the listing is updated to Signed. User is taken back to the dashboard.

#### AGENT
    1. New agent clicks "I am an agent" > creates a profile > redirected to login then dashboard.
      a. Seeing dashboard for the first time, the agent sees all Active listings that they can bid on. They click on a listing to open the page where they can create a bid. Once they create a bid, they are sent back to the dashboard where they see the listings on the top and their bid on the bottom.
    2. Existing agent logs in, sees the dashboard. They have listings that are signed and bids that are pending.
      a. If they click on a listing then the user's contact information is displayed.
      b. If they click on a Rejected bid then they can counter UNLESS the reason is "Signed to another agent".
        i. When they counter, their bid is marked Active again and they are taken back to the dashboard.
        ii. When "Signed to another agent", only DELETE is available.

#### NAVIGATION
    1. User clicks on nav bar
      a. Home > taken to home page
      b. About > taken to about page
      c. Contact > taken to contact page
      d. Dashboard > taken to dashboard page
      e. Logout > user logged out, taken to login page
      e2. Login > user taken to login page
    
You can see this code live at 
![Trusael](https://murmuring-cove-22350.herokuapp.com/)

### Break down into end to end tests

These tests test a few things, starting with CRUD:

    1. Create a user, agent, listing, or bid
    2. Retrieve a user's or agent's listings and bids
    3. Update a listing or bid
    4. Delete a bid

The tests also demonstrate the navigation of the UI, deployment to Heroku, interaction with a server (Node, Express), and SQL queries for MySQL.

## Deployment
To deploy this on a live system, follow the instructions in "Getting Started" and "Installing". To view this code on a live system, look at ![Trusael](https://murmuring-cove-22350.herokuapp.com/) 

## Built 
*  [Visual Studio Code](https://code.visualstudio.com/docs/setup/setup-overview)
*  [Visual Studio Code Extension "Open in Browser"] 
    * Open VS Code.
    * Open the extensions pane and search for open in browser.
    * Select the version written by TechER and click Install.
*  [Git Terminal](https://git-scm.com/downloads)
*  [Node](https://nodejs.org/en/download/)
     * express
     * path
     * dotenv
     * mysql
*  [Heroku](https://www.heroku.com/) - Deployed to Heroku, a cloud platform service (PaaS). It supports Node, MySQL, and more.

## Contributing

This project is not open to contributions.

## Authors

* **Brian C Butcher** - *Bootstrap, CSS, JavaScript* - [BCButcher](https://github.com/BCButcher)
* **Ruth Lee** - *MySQL (including dotenv), deploytment to Heroku, server (Node, Express), JavaScript, jQuery, CSS, and Bootstrap* - [ruthtech](https://github.com/ruthtech)
* **Chris Pong** - *Bootstrap, JavaScript, jQuery, and AJAX* - [cheachster](https://github.com/cheachster)

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details

## Acknowledgments

* Filipe Laborde - [codefreeze8](https://github.com/codefreeze8) Instructor at the U of T coding bootcamp who wrote the code in connection.js
* David Bland = [thatdevguy1](https://github.com/thatdevguy1) Assistant instructor at the U of T coding bootcamp. This code would not have been deployed to Heroku without him. 
* ![Photo by Jeffrey Czum from Pexels](https://www.pexels.com/photo/brown-and-white-concrete-building-2727483/) Background of image used on home page.
* ![Photo by Binyamin Mellish from Pexels](https://www.pexels.com/photo/home-real-estate-106399/) House on home page. 

