# Mitos Guaraníes
Explora la mitología **Guaraní** a través de esta API. Accederás a los siete monstruos legendarios, su historia resumida e imágenes relacionadas.

## Para empezar
La url base contiene información sobre todos los recursos disponibles de la API. Todas las peticiones son `GET` y van sobre `https`. Todas las respuestas devolverán datos en formato `JSON`.

- Base url: https://warani.vercel.app/api

### Ejemplo de uso
```js
fetch("https://warani.vercel.app/api/myths/1?lang=es")
  .then(res => res.json())
  .then(data => console.log(data))
```

### Respuesta
```json
{
  "id": 1,
  "name": "Taú and Keraná",
  "description": "Taú era un espíritu maléfico que...",
  "image": "https://warani.vercel.app/images/...",
}
```

## Contribuir al proyecto
Si tienes alguna sugerencia que podría mejorar el proyecto, por favor haz un [fork] del repositorio y crea una [pull_request] o puedes simplemente abrir una [issue] con la etiqueta «*enhancement*».

**¡Gracias a todos los colaboradores!**

[![colaboradores]](https://github.com/emrocode/guarani-myths-api/graphs/contributors)

[colaboradores]: https://contrib.rocks/image?repo=emrocode/guarani-myths-api&max=500&columns=20
[fork]: https://github.com/emrocode/guarani-myths-api/fork
[pull_request]: https://github.com/emrocode/guarani-myths-api/pulls
[issue]: https://github.com/emrocode/guarani-myths-api/issues