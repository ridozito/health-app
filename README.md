
# Health-app

## Environment
Update environment in file .env

**Example**
```sh
PORT=3100
NODE_ENV=dev
SECRET=health-app-key
# DB MySQL
DB_MYSQL_HOST=localhost
DB_MYSQL_PORT=3306
DB_MYSQL_USER=root
DB_MYSQL_PASSWD=secret
DB_MYSQL_NAME=health-app
DB_MYSQL_TIMEZONE=+07:00


```


## Initialize database strucuture

```sh
  npm run initdb
```

## Initialize dummy data 

```sh
  npm run dummydata
```

## Start project

```sh
  npm start
```

## API Reference

#### Token for testing
```sh
eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJoZWFsdGgtYXBwIiwiaWF0IjoxNjcwNzcxOTUzLCJleHAiOjE3MDIzMDc5NTMsImF1ZCI6ImhlYWx0aC1hcHAiLCJzdWIiOiIxIiwiZW1haWwiOiJ1c2VyMS50ZXN0QGhlYWx0aGFwcC5jb20iLCJzZXgiOiJtYWxlIiwibmFtZSI6Ikh1bmcifQ.sSwwlk726ka4jlK-H5Yg3UH4LrLjMxgf05FhqeX8DW8
```


#### Get diaries

```http
  GET /diaries
```

#### Get body records

```http
  GET /body-records
```
| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `type` | `number` | **Optional**. 1 : Day , 2 : Week , 3; Month , 4:Year |

#### Get excercise history

```http
  GET /excercise-histories
```

#### Get meal history

```http
  GET /meal-histories
```
## Authors
- [hungnv](https://github.com/ridozito)