[![Build Status](https://travis-ci.org/abidex4yemi/Basic-user-auth.svg?branch=develop)](https://travis-ci.org/abidex4yemi/Basic-user-auth)

# Introduction

You need to design and build an authentication module as part of a larger system. The system has the following entities - a User with identification attributions and credentials to verify. A User will belong to one or more group. A User will also belong to one or more Roles. Each User, Role or Group will have Permissions. A User permission is the sum of all permissions it has from its itself, its groups and its role. Define the permissions format.

---

## API Spec

Endpoint JSON response

### Users (authentication)

```source-json
{
  "token": "jwt.token",
    "username": "fake",
}
```

## Endpoints

### Authentication

`POST /api/users/auth/login`

Example response body:

```source-json
{
    "success": true,
    "message": "Log in successful",
    "body": {
        "firstName": "fake",
        "role": "their role",
        "token": "jwt.token"
    }
}
```

### Registration:

`POST /api/users/auth/signup`

Example response body:

```source-json
{
    "success": true,
    "message": "Account created successfully, please check your email for account verification",
    "body": []
}
```

### Account verification:

`POST /api/users/auth/confirm/token`

Example response body:

```source-json
{
    "success": true,
    "message": "Account created successfully, please check your email for account verification",
    "body": []
}
```

### Get user permission

`GET /api/user/auth/permissions/:username`

Example response body:

```source-json
{
    "success": true,
    "message": "user permission",
    "body": {
        "role": ""
    }
}
```
