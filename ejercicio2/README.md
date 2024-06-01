# Ejercicio 2

En este ejercicio se solicita completar la implementación de la página de **reservas** de un restaurante.

## Estructura del proyecto

- `reservations.html`: plantilla HTML que muestra la lista de reservas y un formulario para agregar una nueva reserva (mediante el `navbar-item` **Agregar reserva**).
- `reservations.js`: archivo JavaScript que contiene la lógica para agregar y mostrar las reservas a través de las clases `Customer`, `Reservation` y `Restaurant`.

## Instrucciones

Para completar la implementación, se solicita realizar las siguientes tareas:

1. Definir una clase `Customer` en el archivo `reservations.js` que permita representar un cliente.
    - La clase debe tener las siguientes propiedades:
        - `id`: Identificador del cliente.
        - `name`: Nombre del cliente.
        - `email`: Correo electrónico del cliente.
    - La clase debe tener un constructor.
    - Se debe implementar una propiedad computada `info` que retorne una cadena con el nombre y el correo electrónico del cliente.
2. Definir una clase `Reservation` en el archivo `reservations.js` que permita representar una reserva.
    - La clase debe tener las siguientes propiedades:
        - `id`: Identificador de la reserva.
        - `customer`: instancia de la clase `Customer` que realiza la reserva.
        - `date`: Fecha y hora de la reserva.
        - `guests`: Número de comensales de la reserva.
    - La clase debe tener un constructor.
    - Se debe implementar una propiedad computada `info` que retorne una cadena con la fecha y hora de la reserva, la información del cliente y el número de comensales.
    - Se debe implementar un método estático `validateReservation` que reciba un objeto con la información de la reserva y retorne `true` si la información es válida y `false` en caso contrario. Si la fecha de la reserva es anterior a la fecha actual y la cantidad de comensales es menor o igual a 0, la reserva no es válida.

Adicionalmente, se cuenta con la clase `Restaurant` que se encuentra completa y que permite agregar y renderizar reservas. 

La implementación solicitada debe integrarse adecuadamente con la clase `Restaurant` para que la página de **reservas** funcione correctamente.

No se admiten cambios en la clase `Restaurant`.
