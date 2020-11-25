This is Emilio Venegas's project for the 2nd technical screening interview for TopTal.

## Running the project locally

Clone the repository into your machine.

The frontend comes ready out of the box. Simply open a terminal window in the `/front` folder, and then run:

```bash
yarn && yarn build && yarn start
```

Your frontend should be ready in your [http://localhost:3000](http://localhost:3000). It should also be giving you a connection error because the backend isn't running.

For the backend, you'll need a MongoDB cluster. Once you have it, create a `.env` file inside the `/back` folder with the following content:

```bash
NODE_ENV="development"
PORT=4000
FRONTEND_URL="http://localhost:3000"
BACKEND_URL="http://localhost:4000"

MONGO_URI="(your entire mongodb uri connection string)"

APP_SECRET="whateverYouWant"
```

Once that's done, run the following command inside the `/back` folder:

```bash
yarn && yarn start
```

You should see a message in your terminal confirming your connection to the database. If that doesn't happen, check your `.env` file.

Once you see the "Connected to database" message, open the frontend again [http://localhost:3000](http://localhost:3000). Now you should see the login screen and be able to access the app.

## Live test app

If you don't want to install and run the project locally, the app is also available at [https://timemanager.emiliovenegas.me/](https://timemanager.emiliovenegas.me/).
