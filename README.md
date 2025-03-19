---

# AngularAthendat - API Mock

Este proyecto utiliza un servicio mock proporcionado por [MockAPI](https://mockapi.io/) para simular una API. A continuación se detallan las instrucciones para ejecutar y probar la API.

## Descripción

La API utilizada en este proyecto está alojada en **[MockAPI](https://mockapi.io/)**. Este servicio simula una API que puede ser utilizada para hacer pruebas sin necesidad de tener un backend real.

## Endpoint

La URL base de la API es:

```
https://mockapi.io/your-endpoint
```

Asegúrate de reemplazar `your-endpoint` con el endpoint específico que estás utilizando en tu proyecto. Esta URL es donde se realizan las peticiones para obtener, crear, actualizar y eliminar datos.

## Instrucciones para probar la API

1. **Acceder a la API**: La API ya está configurada y funcionando en el servicio de MockAPI. Para acceder, simplemente realiza peticiones HTTP a los siguientes endpoints:

    - **GET /products**: Obtiene todos los productos.
    - **POST /products**: Crea un nuevo producto.
    - **PUT /products/{id}**: Actualiza un producto específico por su ID.
    - **DELETE /products/{id}**: Elimina un producto específico por su ID.

2. **Probar los Endpoints**: Puedes utilizar herramientas como [Postman](https://www.postman.com/) o `curl` en la terminal para realizar peticiones a la API.

    - Para hacer una petición `GET` para obtener productos:
    ```bash
    curl https://mockapi.io/your-endpoint/products
    ```

    - Para crear un producto utilizando una petición `POST`:
    ```bash
    curl -X POST https://mockapi.io/your-endpoint/products -d '{"name": "Nuevo Producto", "price": 100}' -H "Content-Type: application/json"
    ```

3. **Pruebas automáticas**: Si el proyecto tiene pruebas automatizadas configuradas (como en el caso de usar un framework de testing en Angular o Node.js), simplemente ejecuta el comando adecuado para correr las pruebas de integración.

    - Para pruebas en Node.js:
    ```bash
    npm test
    ```

    - Para pruebas en Angular:
    ```bash
    ng test
    ```

## Configuración

Si necesitas configurar o cambiar cualquier detalle de la URL o los endpoints, abre el archivo donde se define el servicio y ajusta la URL base.

### Ejemplo de servicio en Angular:

```typescript
@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private apiUrl = 'https://mockapi.io/your-endpoint/products';

  constructor(private http: HttpClient) {}

  getProducts() {
    return this.http.get<Product[]>(this.apiUrl);
  }

  // Otros métodos como POST, PUT, DELETE
}
```

Reemplaza `https://mockapi.io/your-endpoint/products` con la URL que corresponda a tu proyecto.

## Notas

- **MockAPI** ofrece un servicio gratuito con ciertas limitaciones de uso. No se pueded hacer que los productos sean random sino que vienen los mismos en cada petición.

---
