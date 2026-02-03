# Progetto-cloud
## Setup of the project

Create an .env file inside the main folder, this env file needs to contain the CLIENT_ID for the OAUTH app, the CLIENT_SECRET tied to the OAUTH app, the Riot API_KEY to access to exeternal APIs and the JWT_SECRET used to sign and chekc JWT tokens.  
Create an .env file inside the postegres folder, this env file needs to contain the POSTGRES_USER, POSTGRES_PASSWORD and the POSTEGRES_DB variables.  
Create an .env file inside the pgadmin folder, this env file needs to contain the PGADMIN_DEFAULT_EMAIL, PGADMIN_DEFAULT_PASSWORD.  
And a file key.json in the main folder that contains the access information for the google bucket that acts as a cdn on the google cloud service

## How to use
  
To start up the docker containers run:
```
Docker compose up
```

