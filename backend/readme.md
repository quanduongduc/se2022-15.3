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

**\*Create permission require**

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

| Parameter | Type     | Description                 |
| :-------- | :------- | :-------------------------- |
| `title`   | `string` | **Required**. track's title |

### Request

`GET /api/track/search/?title`

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

## Add Track to favourite list

add track to user's favourite list

| Parameter | Type     | Description              |
| :-------- | :------- | :----------------------- |
| `id`      | `string` | **Required**. track's id |

### Request

`Patch /api/user/addFavourite/:id`

### Response Example

```json
{
    "message": "add track to favourite successfully",
    "user": {
        "_id": "63a9d390b71c2a8dd1467f53",
        "userName": "admin_permission1",
        "role": {
            "trackPermission": {
                "create": true,
                "delete": true,
                "update": true,
                "read": true
            },
            "name": "admin",
            "_id": "63a9d390b71c2a8dd1467f52"
        },
        "firstName": "admin",
        "lastName": "admin",
        "gender": "female",
        "playlists": [],
        "favouriteTracks": [
            {
                "_id": "63aad3d9da1616c18264e576",
                "title": "HelloWold",
                "storageName": "831e411ea5edfb06e2dd9faf2259961d1cc268843b9560498791b9d2a8727153",
                "theme": "e62b505e26c9635c489b3e6f8115dd30fa211fece1354a103612767a037ff82f",
                "description": "HelloWodl13123214",
                "artists": ["63aad07da14ea04ded568570"],
                "duration": 204,
                "created_at": "2022-12-27T11:15:37.942Z",
                "updated_at": "2022-12-27T11:15:37.942Z",
                "__v": 0
            }
        ],
        "isDeleted": false,
        "created_at": "2022-12-26T17:02:08.669Z",
        "updated_at": "2022-12-27T11:50:42.021Z",
        "__v": 0,
        "lastPlay": {
            "_id": "63aad3d9da1616c18264e576",
            "title": "HelloWold",
            "storageName": "831e411ea5edfb06e2dd9faf2259961d1cc268843b9560498791b9d2a8727153",
            "theme": "e62b505e26c9635c489b3e6f8115dd30fa211fece1354a103612767a037ff82f",
            "description": "HelloWodl13123214",
            "artists": ["63aad07da14ea04ded568570"],
            "duration": 204,
            "created_at": "2022-12-27T11:15:37.942Z",
            "updated_at": "2022-12-27T11:15:37.942Z",
            "__v": 0
        }
    }
}
```

## Tracking user's last play track

add track to user's favourite list

| Parameter | Type     | Description              |
| :-------- | :------- | :----------------------- |
| `id`      | `string` | **Required**. track's id |

### Request

`Patch api/user/tracking/lastPlay/:id`

### Response Example

```json
{
    "message": "get user successfully",
    "user": {
        "_id": "63a9d390b71c2a8dd1467f53",
        "userName": "admin_permission1",
        "role": {
            "trackPermission": {
                "create": true,
                "delete": true,
                "update": true,
                "read": true
            },
            "name": "admin",
            "_id": "63a9d390b71c2a8dd1467f52"
        },
        "firstName": "admin",
        "lastName": "admin",
        "gender": "female",
        "playlists": [],
        "favouriteTracks": ["63aad3d9da1616c18264e576"],
        "isDeleted": false,
        "created_at": "2022-12-26T17:02:08.669Z",
        "updated_at": "2022-12-27T12:08:01.092Z",
        "__v": 0,
        "lastPlay": "63aad3d9da1616c18264e576"
    }
}
```

## add track to favourites

add track to authenticated user's favourite

| Parameter | Type     | Description              |
| :-------- | :------- | :----------------------- |
| `id`      | `string` | **Required**. track's id |

### Request

`Patch /api/user/add-favourite/:id`

### Response Example

```json
{
    "message": "add track from favourite successfully",
    "user": {
        "_id": "63a9d390b71c2a8dd1467f53",
        "userName": "admin_permission1",
        "role": {
            "trackPermission": {
                "create": true,
                "delete": true,
                "update": true,
                "read": true
            },
            "name": "admin",
            "_id": "63a9d390b71c2a8dd1467f52"
        },
        "firstName": "admin",
        "lastName": "admin",
        "gender": "female",
        "playlists": ["63abe4f63590a6a3bc3e0642"],
        "favouriteTracks": [
            "63aad3d9da1616c18264e576",
            "63aad694940222700515caf3"
        ],
        "isDeleted": false,
        "created_at": "2022-12-26T17:02:08.669Z",
        "updated_at": "2022-12-28T06:55:49.772Z",
        "__v": 0,
        "lastPlay": "63aad3d9da1616c18264e576"
    }
}
```

## remove track from favourites

remove a track from authenticated user's favourite

| Parameter | Type     | Description              |
| :-------- | :------- | :----------------------- |
| `id`      | `string` | **Required**. track's id |

### Request

`Patch /api/user/remove-favourite/:id`

### Response Example

```json
{
    "message": "remove track to favourite successfully",
    "user": {
        "_id": "63a9d390b71c2a8dd1467f53",
        "userName": "admin_permission1",
        "role": {
            "trackPermission": {
                "create": true,
                "delete": true,
                "update": true,
                "read": true
            },
            "name": "admin",
            "_id": "63a9d390b71c2a8dd1467f52"
        },
        "firstName": "admin",
        "lastName": "admin",
        "gender": "female",
        "playlists": ["63abe4f63590a6a3bc3e0642"],
        "favouriteTracks": ["63aad3d9da1616c18264e576"],
        "isDeleted": false,
        "created_at": "2022-12-26T17:02:08.669Z",
        "updated_at": "2022-12-28T06:59:45.517Z",
        "__v": 0,
        "lastPlay": "63aad3d9da1616c18264e576"
    }
}
```

## Create new Artist

Create new Artist

**\*Create permission require**

| Parameter  | Type     | Description                                 |
| :--------- | :------- | :------------------------------------------ |
| `name`     | `string` | **Required**.                               |
| `location` | `string` | **Required**.                               |
| `gender`   | `string` | **Required**. ['male','female','undefined'] |

### Request

`Post /api/artist/register`

### Response Example

```json
{
    "message": "Register new artist successfully",
    "artist": {
        "name": "Hana122",
        "location": "us",
        "gender": "male",
        "tracks": [],
        "_id": "63aae12d8926e992c080e1c3",
        "created_at": "2022-12-27T12:12:29.782Z",
        "updated_at": "2022-12-27T12:12:29.782Z",
        "__v": 0
    }
}
```

## find Artist by Id

Find artist by id

| Parameter | Type     | Description               |
| :-------- | :------- | :------------------------ |
| `id`      | `string` | **Required**. artist's id |

### Request

`Get /api/artist/:id`

### Response Example

```json
{
    "message": "get artist successfully",
    "artist": {
        "_id": "63aad07da14ea04ded568570",
        "name": "Hana",
        "location": "us",
        "gender": "male",
        "tracks": ["63aad694940222700515caf3"],
        "created_at": "2022-12-27T11:01:17.520Z",
        "updated_at": "2022-12-27T11:27:16.952Z",
        "__v": 0
    }
}
```

## Find Artist by Name

Find artist by name

| Parameter | Type     | Description                 |
| :-------- | :------- | :-------------------------- |
| `name`    | `string` | **Required**. artist's name |

### Request

`Get /api/artist/search/?name`

### Response Example

```json
{
    "message": "get artists successfully",
    "users": [
        {
            "_id": "63aad07da14ea04ded568570",
            "name": "Hana",
            "location": "us",
            "gender": "male",
            "tracks": ["63aad694940222700515caf3"],
            "created_at": "2022-12-27T11:01:17.520Z",
            "updated_at": "2022-12-27T11:27:16.952Z",
            "__v": 0
        },
        {
            "_id": "63aad21adab06405a755ba24",
            "name": "Hana1",
            "location": "us",
            "gender": "male",
            "tracks": ["63aad694940222700515caf3"],
            "created_at": "2022-12-27T11:08:10.037Z",
            "updated_at": "2022-12-27T11:27:16.954Z",
            "__v": 0
        },
        {
            "_id": "63aad21ddab06405a755ba28",
            "name": "Hana12",
            "location": "us",
            "gender": "male",
            "tracks": [],
            "created_at": "2022-12-27T11:08:13.018Z",
            "updated_at": "2022-12-27T11:08:13.018Z",
            "__v": 0
        },
        {
            "_id": "63aae12d8926e992c080e1c3",
            "name": "Hana122",
            "location": "us",
            "gender": "male",
            "tracks": [],
            "created_at": "2022-12-27T12:12:29.782Z",
            "updated_at": "2022-12-27T12:12:29.782Z",
            "__v": 0
        }
    ]
}
```

## Create playlist

create a new playist for authenticated user

| Parameter | Type     | Description                    |
| :-------- | :------- | :----------------------------- |
| `title`   | `string` | **Required**. playlist's title |

### Request

`POST api/playlist/create`

### Response Example

```json
{
    "message": "create playlist successfully",
    "playlist": {
        "title": "Hello12",
        "tracks": [],
        "_id": "63abecb5aca248e163c60cca",
        "created_at": "2022-12-28T07:13:57.610Z",
        "updated_at": "2022-12-28T07:13:57.610Z",
        "__v": 0
    }
}
```

## Search playlist by title

Search Playlists by title(nearly like "included" search)

| Parameter | Type     | Description                    |
| :-------- | :------- | :----------------------------- |
| `title`   | `string` | **Required**. playlist's title |

### Request

`GET /api/playlist/search/?title`

### Response Example

```json
{
    "message": "get playlist successfully",
    "playlists": [
        {
            "_id": "63abe4f63590a6a3bc3e0642",
            "title": "Hello",
            "tracks": [],
            "created_at": "2022-12-28T06:40:54.887Z",
            "updated_at": "2022-12-28T06:40:54.887Z",
            "__v": 0
        },
        {
            "_id": "63abeb88aca248e163c60c8d",
            "title": "Hello12",
            "tracks": [],
            "created_at": "2022-12-28T07:08:56.764Z",
            "updated_at": "2022-12-28T07:08:56.764Z",
            "__v": 0
        },
        {
            "_id": "63abecb5aca248e163c60cca",
            "title": "Hello12",
            "tracks": [],
            "created_at": "2022-12-28T07:13:57.610Z",
            "updated_at": "2022-12-28T07:13:57.610Z",
            "__v": 0
        }
    ]
}
```

## Get playlist by id

Search Playlists by title(nearly like "included" search)

| Parameter | Type     | Description                 |
| :-------- | :------- | :-------------------------- |
| `id`      | `string` | **Required**. playlist's id |

### Request

`GET /api/playlist/:id`

### Response Example

```json
{
    "message": "Get playlist successfully",
    "playlist": {
        "_id": "63abe4f63590a6a3bc3e0642",
        "title": "Hello",
        "tracks": [],
        "created_at": "2022-12-28T06:40:54.887Z",
        "updated_at": "2022-12-28T06:40:54.887Z",
        "__v": 0
    }
}
```

## delete playlist by id

delete a playlist and remove from user's playlist

| Parameter | Type     | Description                 |
| :-------- | :------- | :-------------------------- |
| `id`      | `string` | **Required**. playlist's id |

### Request

`DELETE /api/playlist/delete/:id`

### Response Example

```json
{
    "message": "delete playlist sucessfully",
    "deletedPlaylist": {
        "_id": "63abe4f63590a6a3bc3e0642",
        "title": "Hello",
        "tracks": [],
        "created_at": "2022-12-28T06:40:54.887Z",
        "updated_at": "2022-12-28T06:40:54.887Z",
        "__v": 0
    }
}
```

## add track to playlist

add a track to playlist

| Parameter    | Type     | Description                 |
| :----------- | :------- | :-------------------------- |
| `trackId`    | `string` | **Required**. track's id    |
| `playlistId` | `string` | **Required**. playlist's id |

### Request

`PATCH /api/playlist/:playlistId/add-track/:trackId`

### Response Example

```json
{
    "message": "add track to playlist successfully",
    "playlist": {
        "_id": "63abeb88aca248e163c60c8d",
        "title": "Hello12",
        "tracks": ["63aad3d9da1616c18264e576"],
        "created_at": "2022-12-28T07:08:56.764Z",
        "updated_at": "2022-12-28T07:26:08.458Z",
        "__v": 0
    }
}
```

## remove track from playlist

remove a track from a playlist

| Parameter    | Type     | Description                 |
| :----------- | :------- | :-------------------------- |
| `trackId`    | `string` | **Required**. track's id    |
| `playlistId` | `string` | **Required**. playlist's id |

### Request

`PATCH /api/playlist/:playlistId/remove-track/:trackId`

### Response Example

```json
{
    "message": "remove track from playlist successfully",
    "playlist": {
        "_id": "63abeb88aca248e163c60c8d",
        "title": "Hello12",
        "tracks": [],
        "created_at": "2022-12-28T07:08:56.764Z",
        "updated_at": "2022-12-28T07:28:32.356Z",
        "__v": 0
    }
}
```
