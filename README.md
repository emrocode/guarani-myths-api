# Guaraní Myths
Explore Guaraní myths through an API. Perfect for practice and simple prototyping.

## Example
```js
fetch("https://warani.vercel.app/api/v1/myths/1")
  .then(res => res.json())
  .then(data => console.log(data))
```

## Response
```json
{
  "id": 1,
  "name": "Taú and Keraná",
  "description": "This causes deep sadness and...",
  "image": "https://warani.vercel.app/images/...",
}
```

## Features
- HTTPS
- Supports GET, PUT, POST and DELETE
- [Report an issue](https://github.com/emrocode/guarani-myths-api/issues)
