# Music App server API

# REST API

## Register a New User

Register a new user with required data :

| Parameter   | Type     | Description                                                                                 |
| :---------- | :------- | :------------------------------------------------------------------------------------------ |
| `userName`  | `string` | **Required**. at least 8 characters and maximum 32 characters                               |
| `password`  | `string` | **Required**. at least 8 characters,1 upperscase, 1 special charactor, maxium 32 characters |
| `firstName` | `string` | **Required**. at least 8 not numberic characters                                            |
| `lastName`  | `string` | **Required**. at least 8 not numberic characters                                            |
| `gender`    | `string` | **Required**. one of ["male","female","undefined"]                                          |

### Request

`POST /api/auth/register`
`POST /api/auth/register/admin` For Admin (Request Key : admin_permission_key)

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

## Create new Track

Create new track and store audio file and theme image file to storage

| Parameter     | Type       | Description                         |
| :------------ | :--------- | :---------------------------------- |
| `title`       | `string`   | **Required**.                       |
| `description` | `string`   | **Required**.                       |
| `audio`       | `file`     | **Required**. must be mp3 file      |
| `image`       | `file`     | **Required**. must be png, jpeg,svg |
| `artistIds`   | `string[]` | **Required**.                       |
| `duration`    | `integer`  | **Required**.                       |

### Request

`POST /api/track/create`

### Response Example

```json
{
    "message": "Track add successfully",
    "track": {
        "title": "HelloWold",
        "storageName": "f152d7560dc6c1774192b2d1936ae6ecb0f231b6fad19593af34c99496b75146",
        "theme": "81ac9fbd1a091fec049ee368bf5b46678434e12b2648f22351365a3e8fe601aa",
        "description": "HelloWodl13123214",
        "artists": [],
        "duration": 204,
        "_id": "63a9d4921f9147677a231dad",
        "created_at": "2022-12-26T17:06:26.935Z",
        "updated_at": "2022-12-26T17:06:26.935Z",
        "__v": 0
    }
}
```

## Search Tracks

Search Tracks by name(nearly like "included" search)

| Parameter | Type     | Description                   |
| :-------- | :------- | :---------------------------- |
| `title`   | `string` | **Required**. query parameter |

### Request

`GET /api/track/search/?title=hello`

### Response Example

```json
{
    "message": "get tracks successfully",
    "tracks": [
        {
            "_id": "63a9938604fd0d5d1492ddd4",
            "title": "HelloWold",
            "storageName": "d65fd92d26fda4f09ab51ffbebcd89fc0908e3eea11f3704f1803002e79fca44",
            "theme": "fdd904e2a6dc9abb5e4b6dd18500ec6cdf8a8a7a7c046509cb3db4ba7a50d2be",
            "description": "HelloWodl13123214",
            "artists": [],
            "duration": 204,
            "created_at": "2022-12-26T12:28:54.490Z",
            "updated_at": "2022-12-26T12:28:54.490Z",
            "__v": 0,
            "trackUrl": "https://music-app-bucket.s3.ap-northeast-1.amazonaws.com/d65fd92d26fda4f09ab51ffbebcd89fc0908e3eea11f3704f1803002e79fca44?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAYJHUX7KGUZC2PMXM%2F20221226%2Fap-northeast-1%2Fs3%2Faws4_request&X-Amz-Date=20221226T171010Z&X-Amz-Expires=3600&X-Amz-Signature=9bd642e2523ae1f79f81e3806dabf0d9cec8b07bb11a6794911e599402df5adf&X-Amz-SignedHeaders=host&x-id=GetObject",
            "themeUrl": "https://music-app-bucket.s3.ap-northeast-1.amazonaws.com/fdd904e2a6dc9abb5e4b6dd18500ec6cdf8a8a7a7c046509cb3db4ba7a50d2be?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAYJHUX7KGUZC2PMXM%2F20221226%2Fap-northeast-1%2Fs3%2Faws4_request&X-Amz-Date=20221226T171010Z&X-Amz-Expires=3600&X-Amz-Signature=803056adca00228435d9dfdd610ecac9894bd9b3cf053329c2e0a9c07d2dfd30&X-Amz-SignedHeaders=host&x-id=GetObject"
        },
        {
            "_id": "63a9d4921f9147677a231dad",
            "title": "HelloWold",
            "storageName": "f152d7560dc6c1774192b2d1936ae6ecb0f231b6fad19593af34c99496b75146",
            "theme": "81ac9fbd1a091fec049ee368bf5b46678434e12b2648f22351365a3e8fe601aa",
            "description": "HelloWodl13123214",
            "artists": [],
            "duration": 204,
            "created_at": "2022-12-26T17:06:26.935Z",
            "updated_at": "2022-12-26T17:06:26.935Z",
            "__v": 0,
            "trackUrl": "https://music-app-bucket.s3.ap-northeast-1.amazonaws.com/f152d7560dc6c1774192b2d1936ae6ecb0f231b6fad19593af34c99496b75146?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAYJHUX7KGUZC2PMXM%2F20221226%2Fap-northeast-1%2Fs3%2Faws4_request&X-Amz-Date=20221226T171010Z&X-Amz-Expires=3600&X-Amz-Signature=53ebc5936c18274dd606a1d1380acacc1a46aba6b39186cc60868c9993e643ea&X-Amz-SignedHeaders=host&x-id=GetObject",
            "themeUrl": "https://music-app-bucket.s3.ap-northeast-1.amazonaws.com/81ac9fbd1a091fec049ee368bf5b46678434e12b2648f22351365a3e8fe601aa?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAYJHUX7KGUZC2PMXM%2F20221226%2Fap-northeast-1%2Fs3%2Faws4_request&X-Amz-Date=20221226T171010Z&X-Amz-Expires=3600&X-Amz-Signature=5bf9cc13ca8635f778e3eacb39f172f9293d9c9572060c989e99e3063c739d83&X-Amz-SignedHeaders=host&x-id=GetObject"
        }
    ]
}
```
