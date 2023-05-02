# Guaraní Myths
Free REST API to practice and prototyping

## Example
```js
fetch('https://guarani-myths.up.railway.app/v1/myths/1')
  .then(res => res.json())
  .then(data => console.log(data))
```

## Response
```json
{
  "id": 1,
  "name": "Taú and Keraná",
  "description": "This causes deep sadness and...",
  "image": "https://guarani-myths.up.railway.app/images/...",
}
```

## Features
- HTTPS
- Supports GET, PUT, POST and DELETE
- [Report an issue](https://github.com/emrocode/guarani-myths-api/issues)
