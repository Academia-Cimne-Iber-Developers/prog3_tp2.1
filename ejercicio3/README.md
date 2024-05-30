# Ejercicio 3

En este ejercicio se solicita completar la implementación de una aplicación web de **conversión de monedas**.

Para esto será necesario emplear la API pública de [Frankfurter](https://www.frankfurter.app/), que permite obtener tasas de cambio de monedas. La documentación de la API se encuentra disponible en [este enlace](https://www.frankfurter.app/docs/).

Particularmente, necesitaremos los siguientes endpoints:

- `GET /currencies`: Obtiene la lista de códigos de monedas disponibles.
- `GET /latest?amount=<input_amount>&from=<from_currency>&to=<target_currency>`: Obtiene la conversión de una moneda a otra.

## Estructura del proyecto

- `converter.html`: plantilla HTML que contiene un formulario para realizar la conversión de monedas. En este formulario se debe ingresar el monto a convertir, la moneda de origen y la moneda de destino. Estas últimas se deben seleccionar a través de un `select`, cuyas opciones se deben cargar dinámicamente con los códigos de monedas disponibles mediante una API call al endpoint `/currencies`.
- `converter.js`: archivo JavaScript que contiene la lógica para realizar la conversión de monedas. 

### Clase `Currency`

Se proporciona la clase `Currency` en el archivo `converter.js`, la cual permite representar una moneda. Cada moneda tiene un código y un nombre.

```javascript
class Currency {
    constructor(code, name) {
        this.code = code;
        this.name = name;
    }
}
```

## Instrucciones

Además, se solicita que la clase `CurrencyConverter` sea implementada. La clase debe contar con los siguientes atributos:

- `apiUrl`: URL base de la API de Frankfurter.
- `currencies`: arreglo que almacenará instancias de la clase `Currency`. Al instanciar un objeto de esta clase, el arreglo `currencies` debe estar vacío.

Para su correcto funcionamiento, la clase `CurrencyConverter` debe implementar los siguientes métodos:

1. `constructor`: Constructor de la clase que inicializa el atributo `apiUrl` con la URL base de la API de Frankfurter.

    - El constructor recibe un parámetro `apiUrl` que corresponde a la URL base de la API de Frankfurter.
    - El constructor debe inicializar el atributo `currencies` como un arreglo vacío.

2. `getCurrencies`: Método asíncrono que realiza una petición al endpoint `/currencies` de la API de Frankfurter para obtener la lista de códigos de monedas disponibles.

    - El método no recibe parámetros.
    - El método debe almacenar las monedas obtenidas en el atributo `currencies` como instancias de la clase `Currency`.
    - El método no retorna nada.

3. `convertCurrency`: Método asíncrono que realiza una petición al endpoint `/latest` de la API de Frankfurter para obtener la conversión de una moneda a otra.

    - El método recibe los siguientes parámetros:
        - `amount`: monto a convertir, un número.
        - `fromCurrency`: código de la moneda de origen, una instancia de la clase `Currency`.
        - `toCurrency`: código de la moneda de destino, una instancia de la clase `Currency`.
    - Dependiendo de los parámetros recibidos, el método debe realizar diferentes acciones:
        - Si el atributo `code` de `fromCurrency` es igual al atributo `code` de `toCurrency`, el método debe retornar el monto sin realizar ninguna petición.
        - Si los códigos de moneda son diferentes, el método debe realizar una petición HTTP a la API y retornar el monto convertido, el cual es un número.
        - El método debe manejar errores en caso de que la petición falle y retornar `null` en caso de error.

> Pueden emplearse otros métodos y atributos en la clase `CurrencyConverter` si se considera necesario.

> Si lo considera conveniente, puede emplear una API diferente para obtener las tasas de cambio de monedas, siempre y cuando cumpla con los requerimientos del ejercicio.

## Funcionalidades adicionales

La API de Frankfurter permite conocer la tasa de cambio de monedas en una fecha específica mediante el endpoint `/<date>`. Por ejemplo, para obtener la tasa de cambio de monedas del día 2021-01-01, se debe realizar una petición a `/2021-01-01`.

Se solicita implementar una funcionalidad adicional que permita determinar la diferencia entre la tasa de cambio de monedas de dos fechas diferentes, en particular, la diferencia entre la tasa de cambio de monedas de hoy y la tasa de cambio de monedas de ayer.

Puede definir métodos adicionales en la clase `CurrencyConverter` para implementar esta funcionalidad.