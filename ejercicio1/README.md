# Ejercicio 1

En este ejercicio se solicita completar la implementación del sistema de **sensores**.

## Estructura del proyecto

- `sensors.html`: plantilla HTML que muestra la lista de sensores.
- `sensors.js`: archivo JavaScript que contiene la implementación de la aplicación mediante las clases `Sensor` y `SensorManager`.
- `sensors.json`: archivo JSON que contiene una lista de sensores.

Esta sencilla aplicación web permite visualizar una lista de sensores, los cuales se encuentra en el archivo `sensors.json` (que simula la respuesta de un servidor). Cada sensor tiene la siguiente estructura:

```json
{
  "id": "sensor-1",
  "name": "Sensor 1",
  "type": "temperature",
  "value": 24.5,
  "unit": "°C",
  "updated_at": "2023-06-01T12:00:00"
}
```

## Instrucciones

Para completar la implementación, se solicita realizar las siguientes tareas:

1. Definir una clase `Sensor` en el archivo `sensors.js` que permita representar un sensor.
    - Para respetar la estructura de los sensores definida en el archivo `sensors.json`, la clase debe tener las siguientes propiedades:
        - `id`: Identificador del sensor.
        - `name`: Nombre del sensor.
        - `type`: Tipo del sensor.
        - `value`: Valor del sensor.
        - `unit`: Unidad de medida del sensor.
        - `updated_at`: Fecha de actualización del sensor.
    - Implementar la propiedad computada `updateValue` mediante un *setter* que permita actualizar el valor del sensor y la fecha de actualización.
    - Los únicos valores para `type` permitidos son `temperature`, `humidity` y `pressure`.
2. Para la clase `SensorManager`, la cual se encarga de gestionar los sensores mediante un arreglo, se solicita implementar el método `loadSensors` que se encargue de cargar los sensores desde el archivo `sensors.json`.
    - El método debe ser **asíncrono**, puede utilizar `fetch` o `XMLHttpRequest`. Pueden emplear `async/await` o promesas.
    - El método debe recibir la ruta del archivo `sensors.json` como argumento.
    - El método no debe retornar nada, pero debe invocar al método `render` para mostrar los sensores en la página.