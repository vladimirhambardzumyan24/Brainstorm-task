# Task Description

We have a simple admin panel where we can add, remove or update users.

Here you can find designs https://www.figma.com/file/w8OrXqDb7QnmDN8yeSlJ4S/Brainstorm-task?node-id=1%3A85

Your task is to create a react app with all the pages that are defined in the designs and integrate them with our backend.

All required backend endpoints are already implemented.

_Please note that on users page, you have buttons for sorting in the header, and sorting functionality should be implemented too_

# Endpoints

All endpoints start with https://brainstorm-interview-task.herokuapp.com prefix

## Available CRUD routes for users

```
GET    /users?_page=1&_limit=20
GET    /users/1
POST   /users
PUT    /users/1
PATCH  /users/1
DELETE /users/1
```

### Paginate

Use `_page` and optionally `_limit` to paginate returned data.

In the `Link` header you'll get `first`, `prev`, `next` and `last` links.

```
GET /users?_page=7
GET /users?_page=7&_limit=20
```

### Sort

Add `_sort` and `_order` (ascending order by default)

```
GET /users?_sort=email&_order=asc
```

For multiple fields, use the following format:

```
GET /users?_sort=email,name&_order=desc,asc
```

## Routes for uploading user photo

The body should be **multipart/form-data** and the file key should be **file**

Here you can find more about it https://stackoverflow.com/questions/4526273/what-does-enctype-multipart-form-data-mean

```
POST /images
```

## User info

```json
{
  "id": 261750412017102,
  "name": "Dj Snake",
  "email": "djsnake_1@gmail.com",
  "photo": "https://cdn140.picsart.com/261917471014202.jpg",
  "location": "New York",
  "registeredDate": "2020-10-22T06:47:56.065Z",
  "lastActiveDate": "2020-10-22T06:47:56.065Z",
  "disabled": false
}
```
