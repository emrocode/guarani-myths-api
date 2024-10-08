# Guaraní Myths
Explore _Guaraní_ myths through this API, which offers seamless access to a wealth of mythical narratives and cultural knowledge.

## Example
```js
// v1
fetch("https://warani.vercel.app/api/v1/myths/1")
  .then(res => res.json())
  .then(data => console.log(data))

// v2
fetch("https://warani.vercel.app/api/v2/myths?id=1")
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
- Supports languages [en, es] (note: not supported in v1 requests)
- [Report an issue](https://github.com/emrocode/guarani-myths-api/issues)
