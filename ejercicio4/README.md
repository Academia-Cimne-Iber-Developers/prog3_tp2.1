# Ejercicio 4

En este ejercicio se solicita completar la implementación de un **juego de memoria**. Un juego donde se deben emparejar cartas con imágenes iguales.

## Estructura del proyecto

- `memory.html`: plantilla HTML que contiene la estructura básica del juego con un contenedor para las cartas.
- `memory.js`: archivo JavaScript que implementa la lógica del juego, incluyendo la mezcla de cartas y la verificación de coincidencias.
- `memory.css`: archivo CSS para estilizar el juego.
- `img/`: carpeta que contiene las imágenes de las cartas.

### Clase `Card`

La clase `Card` representa una carta del juego. Cada carta tiene un nombre, una imagen, un estado de volteo y un elemento HTML asociado.

```javascript
class Card {
    constructor(name, img) {
        this.name = name;
        this.img = img;
        this.isFlipped = false;
        this.element = this.#createCardElement();
    }
}
```

Adicionalmente, se proporcionan los métodos:

- `createCardElement()`: un método privado que crea un elemento HTML para la carta.
- `flip()`: un método privado que voltea el elemento HTML de la carta mediante una animación CSS.
- `unflip()`: un método privado que desvoltea el elemento HTML de la carta mediante una animación CSS.

### Clase `Board`

La clase `Board` representa el tablero de juego. Cada tablero tiene un conjunto de cartas y un par de elementos HTML asociados.

```javascript
class Board {
    constructor(cards) {
        this.cards = cards;
        this.fixedGridElement = document.querySelector(".fixed-grid");
        this.gameBoardElement = document.getElementById("game-board");
    }
}
```

Adicionalmente, se proporcionan los métodos:

- `calculateColumns()`: un método privado que calcula el número de columnas del tablero en función del número de cartas.
- `setGridColumns()`: un método privado que establece el número de columnas del tablero.
- `render()`: un método que renderiza las cartas en el tablero.
- `onCardClicked()`: un método que maneja el evento de clic en una carta.

### Clase `MemoryGame`

La clase `MemoryGame` representa el juego de memoria. Cada juego tiene un tablero, un conjunto de cartas volteadas, un conjunto de cartas emparejadas y una duración de animación para voltear las cartas.

```javascript
class MemoryGame {
    constructor(board, flipDuration = 500) {
        this.board = board;
        this.flippedCards = [];
        this.matchedCards = [];
        if (flipDuration < 350 || isNaN(flipDuration) || flipDuration > 3000) {
            flipDuration = 350;
            alert(
                "La duración de la animación debe estar entre 350 y 3000 ms, se ha establecido a 350 ms"
            );
        }
        this.flipDuration = flipDuration;
        this.board.onCardClick = this.#handleCardClick.bind(this);
        this.board.reset();
    }
}
```

Adicionalmente, se proporcionan los métodos:

- `#handleCardClick()`: un método privado que define la interacción del usuario con las cartas, evitando que se volteen más de dos cartas a la vez. Además, verifica si las cartas volteadas coinciden.

## Instrucciones

Para completar la implementación, se solicita realizar las siguientes tareas:

1. Se solicita completar la implementación de la clase `Card`.

    - Definir el método `toggleFlip()` que cambia el estado de volteo de la carta en función de su estado actual.
    - Implementar el método `matches(otherCard)` que verifica si la carta actual coincide con otra carta.

2. Se solicita completar la implementación de la clase `Board`.

    - Implementar el método `shuffleCards()` que mezcla las cartas del tablero. El criterio de mezcla esta dispuesto a elección del estudiante.
    - Implementar el método `reset()` que reinicia el tablero.
    - Implementar el método `flipDownAllCards()` que posiciona todas las cartas en su estado inicial. Es necesario para reiniciar el tablero.
    - Implementar el método `reset()` que reinicia el tablero. Debe emplear otros métodos de la clase `Board` para realizar esta tarea.

3. Se solicita completar la implementación de la clase `MemoryGame`.

    - Implementar el método `checkForMatch()` que verifica si las cartas volteadas coinciden. En caso de coincidir, las cartas deben ser añadidas al conjunto de cartas emparejadas. Es fundamental para que el método `#handleCardClick()` funcione correctamente.
    - Implementar el método `resetGame()` que reinicia el juego. Debe emplear otros métodos de la clase `MemoryGame` para realizar esta tarea.

## Adicionales

Implementar cualquier funcionalidad adicional entre las siguientes opciones otorgará puntos adicionales:

- Implementar un contador de movimientos para llevar un registro de los intentos realizados por el jugador.
- Implementar un temporizador para llevar un registro del tiempo que tarda el jugador en completar el juego. Este debe ser llevado a cabo en la clase `MemoryGame` mediante una función asíncrona. Queda a su elección si utilizar promesas, `async/await` o cualquier otro método.
- Implementar un sistema de puntuación que tome en cuenta el tiempo y los movimientos realizados por el jugador. La puntuación debe ser calculada en función de estos dos factores.