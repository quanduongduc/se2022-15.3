# Music App server API

# REST API

## Register a New User

Register a new user with required data :

| Parameter   | Type     | Description                                        |
| :---------- | :------- | :------------------------------------------------- |
| `userName`  | `string` | **Required**.                                      |
| `password`  | `string` | **Required**.                                      |
| `firstName` | `string` | **Required**.                                      |
| `lastName`  | `string` | **Required**.                                      |
| `gender`    | `string` | **Required**. one of ["male","female","undefined"] |

### Request

`POST /api/auth/register`

### Response Example

Return access token as httponly cookies if register success

```json
{
    "message": "Register new user successfully",
    "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyTmFtZSI6InF1YW4xMTIzIiwicGFzc3dvcmQiOiIkMmIkMTAkU3FpS0dtSXBRR3VqL3NWUUpldXNDT0pnaHU4dlRiYktmY0t2RGkzN20wd1htN2xIajFqSi4iLCJmaXJzdE5hbWUiOiJIZWxsbyIsImxhc3ROYW1lIjoiV29ybGQiLCJnZW5kZXIiOiJmZW1hbGUiLCJyb2xlIjp7Im5hbWUiOiJ1c2VyIiwiX2lkIjoiNjNhODVmOGVhNGM4ZWY5ZmYwZjMzM2VjIn0sImlhdCI6MTY3MTk3ODg5NCwiZXhwIjoxNjc0NTcwODk0fQ.d3XZ7g-8KMEiq2Gk1ecURuxzh0R1pth2uaeOTFIm42U"
}
```

## User Login

Request handle user log in action

| Parameter  | Type     | Description   |
| :--------- | :------- | :------------ |
| `userName` | `string` | **Required**. |
| `password` | `string` | **Required**. |

### Request

`POST /api/auth/login`

### Response Example

Return access token as httponly cookies if login success

```json
{
    "message": "Login successfully",
    "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2M2E4NTU5ZTFhNTFjYmVmMmFkM2ViM2EiLCJ1c2VyTmFtZSI6InF1YW4xMjMiLCJwYXNzd29yZCI6IiQyYiQxMCRBVG01MGVUNEE1VDVvQ2EzZW0yOWRPa3R0M0NVNXNicU1hajM4akhZN05scnc2S095QXBtRyIsInJvbGUiOnsibmFtZSI6InVzZXIiLCJfaWQiOiI2M2E4NTU5ZTFhNTFjYmVmMmFkM2ViMzkifSwiZmlyc3ROYW1lIjoiSGVsbG8iLCJsYXN0TmFtZSI6IldvcmxkIiwiZ2VuZGVyIjoiZmVtYWxlIiwicGxheWxpc3RzIjpbXSwiZmF2b3VyaXRlVHJhY2tzIjpbXSwiaXNEZWxldGVkIjpmYWxzZSwiY3JlYXRlZF9hdCI6IjIwMjItMTItMjVUMTM6NTI6MzAuNDg1WiIsInVwZGF0ZWRfYXQiOiIyMDIyLTEyLTI1VDEzOjUyOjMwLjQ4NVoiLCJfX3YiOjAsImlhdCI6MTY3MTk3ODc1OX0.nVzzwE5baqi-JBwdhBGOHnPR4Wu2S_rdzNrDwt0LHB8"
}
```

## Authenticate User

Authenticate user using accessToken as cookies

### Request

`GET /api/auth`

### Response Example

```json
{
    "message": "Authenticate successfully",
    "user": {
        "_id": "63a8559e1a51cbef2ad3eb3a",
        "userName": "quan123",
        "password": "$2b$10$ATm50eT4A5T5oCa3em29dOktt3CU5sbqMaj38jHY7Nlrw6KOyApmG",
        "role": {
            "name": "user",
            "_id": "63a8559e1a51cbef2ad3eb39"
        },
        "firstName": "Hello",
        "lastName": "World",
        "gender": "female",
        "playlists": [],
        "favouriteTracks": [],
        "isDeleted": false,
        "created_at": "2022-12-25T13:52:30.485Z",
        "updated_at": "2022-12-25T13:52:30.485Z",
        "__v": 0,
        "iat": 1671978106
    }
}
```
