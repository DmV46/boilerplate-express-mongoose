# Boilerplate express-mongoose

![Typescript](https://img.shields.io/badge/Typescript-gray?logo=Typescript)
![Express](https://img.shields.io/badge/Express-gray?logo=Express)
![MongoDB](https://img.shields.io/badge/MongoDB-gray?logo=MongoDB)
![Passport](https://img.shields.io/badge/Passport-gray?logo=Passport)

![Nginx](https://img.shields.io/badge/Nginx-gray?logo=Nginx)
![PM2](https://img.shields.io/badge/PM2-gray?logo=PM2)
![Docker](https://img.shields.io/badge/Docker-gray?logo=Docker)

![Eslint](https://img.shields.io/badge/Eslint-gray?logo=Eslint)
![Prettier](https://img.shields.io/badge/Prettier-gray?logo=Prettier)
---

# Models
## User
```ts
type TUserProvider = {
  id: string;
  provider: string;
};

type TUserModel = {
  first_name?: string;
  last_name?: string;
  role?: 'admin' | 'user';
  email?: string;
  providers: TUserProvider[];
  avatar?: string;
  date_of_creation?: Date;
};
```

# REST API
The REST API to the example app is described below.
Private routes are protected by `checkAuth`.
## Login with OAuth
If an error occurs, redirect to `/login`

### Request
`GET /auth/google`
```
curl -i -H 'Accept: application/json' http://localhost:3000/auth/google
```

`GET /auth/github`
```
curl -i -H 'Accept: application/json' http://localhost:3000/auth/github
```

### Response
```json
{
  "user":
    {
      "id":"634af9651af079447365e73e",
      "first_name":"your first name",
      "last_name":"your last name",
      "role":"user",
      "email":"test@test.com",
      "providers":[{
          "id":"155044208256887784432",
          "provider":"google"
        },
        {
          "id":"31614565",
          "provider":"github"
        }],
      "date_of_creation":"2022-10-15T18:18:13.681Z",
      "avatar":"https://lh3.googleusercontent.com/a/ALm5wu2FQRpPSy3wCfBC6m6ttuuRJ6vKdDxbxKvYeibF=s96-c"
    }
}
```

## Logout
Redirect to `/`

### Request
`POST /auth/logout`
### Response
Invoking `/auth/logout` will remove the req.user property and clear the login session.



## Usage
#### Before running the project, configure the `.env` file at the root of the project.
```
PORT=3000 (default)

MONGODB_URI=mongodb://localhost:27017/your-database

Linux: `openssl rand -hex 32` or go to https://generate-secret.now.sh/32
EXPESS_SESSION_SECRET=this-secret-rocks

PATH_LOG_ERROR_FILE=your pass to request-file.log (default path: request.log)
PATH_LOG_REQUEST_FILE=your pass to error-file.log (default path: error.log) 

OAUTH_CALLBACK_URL=http://localhost:$PORT

GOOGLE_ID=
GOOGLE_SECRET=

GITHUB_ID=
GITHUB_SECRET=

FACEBOOK_ID=
FACEBOOK_SECRET=
```

#### Starting the server in development mode

```
npm run dev
```

#### Starting the server in production
```
npm run start
```