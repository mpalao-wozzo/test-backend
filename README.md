# graphql-back-boilerplate

graphql-back-boilerplate is a NodeJS project created by Wozzo [![Wozzo](https://www.wozzo.es/favicon.ico 'Wozzo')](https://www.wozzo.es) using Node JS and GraphQL.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and ready to start a new project.

### Clone the project with ssh

⚠️ If you have not ssh configured on you github look at [this](https://help.github.com/en/articles/generating-a-new-ssh-key-and-adding-it-to-the-ssh-agent).

Open your terminal, go to the folder where you want to clone the project and use the following code

```
git clone git@github.com:wozzocomp/graphql-back-boilerplate.git
```

### Prerequisites

1. Install Homebrew

   Open terminal and paste this command

   ```
   /usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"
   ```

2. Install Node and NPM

   First Install XCode development software.

   Open Terminal and run this command:

   ```
   brew install node
   ```

   Check is Node is installed with this command

   ```
   node -v
   ```

   Check is NPM is installed with this command

   ```
   npm -v
   ```

3. Install MongoDB

   Open Terminal and paste this command:

   ```
   brew install mongodb
   ```

   After downloading Mongo, create the 'db' directory. This is where the Mongo data files will live. You can create the directory in the default location by running

   ```
   mkdir -p /data/db
   ```

   Make sure that the /data/db directory has the right permissions by running

   ```
   sudo chown -R `id -un` /data/db
   ```

   Run the Mongo daemon

   ```
   mongod
   ```

   Run the Mongo shell, with the Mongo daemon running in one terminal, type mongo in another terminal window. This will run the Mongo shell which is an application to access data in MongoDB.

   To exit the Mongo shell run `quit()`

   To stop the Mongo daemon hit ctrl-c

4. Create the .env files

   You need to create the **.env** file in the root of the project

   ```
   /graphql-back-boilerplate/.env
   ```

   and now add this lines to the file:

   ```
   SECRET=secret
   FRONTEND_URL=http://YOUR_IP:FONTEND_PORT (Example: http://192.168.1.35:3001)
   MONGO_URI=localhost:27017
   ```


    ⚠️ Contact with a project admin to know the correct credentials.

### Installing

Open your terminal, go to te project folder and install de packages running the following command

```
npm install
```

### Run on Visual Studio Code

In order to run and debug the backend server add a debugger configuration on VSC.

```
{
  "version": "0.2.0",
  "configurations": [
    {
      "type": "node",
      "request": "launch",
      "name": "Backend",
      "protocol": "inspector",
      "program": "${workspaceFolder}/src/start.js",
      "console": "integratedTerminal",
      "restart": true,
    }
  ]
}
```

### Starting the new project

1. Open the package.json file and change the following lines replacing PROJECT_NAME and PROJECT_DESCRIPTION:

```
"name": PROJECT_NAME,
"version": "1.0.0",
"bugs": {
  "url": "https://github.com/wozzocomp/PROJECT_NAME/issues"
},
"description": PROJECT_DESCRIPTION,
"homepage": "https://github.com/wozzocomp/PROJECT_NAME#readme",
"repository": {
  "type": "git",
  "url": "git+https://github.com/wozzocomp/PROJECT_NAME.git"
},
```

2. Create a new README.md file following this README structure.

3. Open the `/src/config/config.development` and `/src/config/config.production` files and rename the db.

4. Open the `src/populate/populate_mongo.js` file and change the admin and superadmin emails.

5. Ejecute the following command to populate the DB and create the default userRoles and users:

```
  npm run populate-dev
```

> #### Congratulations! The new project is up and running! ☕️🎉🍻

## Add a new DB Model to the project:

### 1. Add the new model.

Add the new model to the models folder with all the needed fields. Then import the model to `models/index.js` file.

### 2. Add the new type.

Add the new type to the types folder with all the needed fields (Don`t forget to add createdAt, updatedAt and _id if it's needed)`. Then import the type to `types/index.js` file.

### 3. Add actions.

Add the new model actions to the actions folder with the needed actions. Then import the action to `actions/index.js` file.

### 4. Add Queries, Mutations and Subscriptions.

Add the needed Queries, Mutations and Subscriptions. Don't forget to import the Queries, Mutations and Subscriptions to the index file.

## Built With

- [Node JS](https://nodejs.org/en/docs/guides/getting-started-guide/) - The framework used

## Contributing

Please read [CONTRIBUTING.md](https://github.com/wozzocomp/graphql-back-boilerplate/blob/development/CONTRIBUTING.md) for details on our code of conduct, and the process for submitting pull requests to us.

## Versioning

We use [SemVer](http://semver.org/) for versioning. For the versions available, see the [tags on this repository](https://github.com/wozzocomp/graphql-back-boilerplate/tags).

## Authors

- **Leandro Gartner** - _Initial work_ - [LeandroGartner](https://github.com/LeandroGartner)

See also the list of [contributors](https://github.com/wozzocomp/graphql-back-boilerplate/contributors) who participated in this project.

## License

This project is a private software created by [Wozzo](https://github.com/wozzocomp)
