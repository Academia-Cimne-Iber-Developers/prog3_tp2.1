/*
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
*/

class Sensor {
    #validTypes = ["temperature", "humidity", "pressure"];

    constructor(id, name, type, value, unit, updated_at) {

        if (typeof id !== "number") {
            throw new Error("ID debe ser un número");
        }

        if (typeof name !== "string") {
            throw new Error("Nombre debe ser una cadena de texto");
        }

        if (!this.#validTypes.includes(type)) {
            throw new Error(`Tipo de sensor no válido: ${type}`);
        }

        if (typeof value !== "number") {
            throw new Error("Valor debe ser un número");
        }

        if (typeof unit !== "string") {
            throw new Error("Unidad debe ser una cadena de texto");
        }
        if (typeof updated_at !== "string") {
            throw new Error("Fecha de actualización debe ser una cadena de texto");
        }

        this.id = id;
        this.name = name;
        this.type = type;
        this.value = value;
        this.unit = unit;
        this.updated_at = new Date(updated_at);
    }

    set updateValue(newValue) {

        if (typeof newValue !== "number") {
            throw new Error("Valor debe ser un número");
        }

        this.value = newValue;
        this.updated_at = new Date();

    }
}


class SensorManager {
    constructor() {
        this.sensors = [];
    }

    addSensor(sensor) {
        this.sensors.push(sensor);
    }

    updateSensor(id) {
        const sensor = this.sensors.find((sensor) => sensor.id === id);
        if (sensor) {
            let newValue;
            switch (sensor.type) {
                case "temperature": // Rango de -30 a 50 grados Celsius
                    newValue = (Math.random() * 80 - 30); // quitamos toFixed(2);
                    console.log(typeof(newValue));
                    break;
                case "humidity": // Rango de 0 a 100%
                    newValue = (Math.random() * 100); // quitamos toFixed(2);
                    break;
                case "pressure": // Rango de 960 a 1040 hPa (hectopascales o milibares)
                    newValue = (Math.random() * 80 + 960); //quitamos toFixed(2);
                    break;
                default: // Valor por defecto si el tipo es desconocido
                    newValue = (Math.random() * 100); // quitamos toFixed(2);
                    console.log("Tipo de sensor desconocido. Valor generado aleatoriamente.", newValue)
            }
            sensor.updateValue = newValue;
            this.render();
        } else {
            console.error(`Sensor ID ${id} no encontrado`);
        }
    }

    /*
    2. Para la clase `SensorManager`, la cual se encarga de gestionar los sensores mediante un arreglo, se solicita implementar el método `loadSensors` que se encargue de cargar los sensores desde el archivo `sensors.json`.
        - El método debe ser **asíncrono**, puede utilizar `fetch` o `XMLHttpRequest`. Pueden emplear `async/await` o promesas.
        - El método debe recibir la ruta del archivo `sensors.json` como argumento.
        - El método no debe retornar nada, pero debe invocar al método `render` para mostrar los sensores en la página.
    */

    async loadSensors(url) { 
        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error("Error al cargar los sensores");
            }

            const data = await response.json();
            console.log(data);  

            data.forEach((sensor) => {
                const newSensor = new Sensor(
                    sensor.id,
                    sensor.name,
                    sensor.type,
                    sensor.value,
                    sensor.unit,
                    sensor.updated_at
                );
                this.addSensor(newSensor);
            });
            this.render();
        } catch (error) {
            console.error("Error al cargar los sensores:", error);
        }
    }


    render() {
        const container = document.getElementById("sensor-container");
        container.innerHTML = "";
        this.sensors.forEach((sensor) => {
            const sensorCard = document.createElement("div");
            sensorCard.className = "column is-one-third";
            sensorCard.innerHTML = `
                <div class="card">
                    <header class="card-header">
                        <p class="card-header-title">
                            Sensor ID: ${sensor.id}
                        </p>
                    </header>
                    <div class="card-content has-text-primary-55">
                        <div class="content">
                            <p>
                                <strong>Tipo:</strong> ${sensor.type}
                            </p>
                            <p>
                               <strong>Valor:</strong> 
                               ${sensor.value.toFixed(2)} ${sensor.unit}
                            </p>
                        </div>
                        <time datetime="${sensor.updated_at}">
                            Última actualización: ${new Date(
                sensor.updated_at
            ).toLocaleString()}
                        </time>
                    </div>
                    <footer class="card-footer">
                        <a href="#" class="card-footer-item update-button" data-id="${sensor.id
                }">Actualizar</a>
                    </footer>
                </div>
            `;
            container.appendChild(sensorCard);
        });

        const updateButtons = document.querySelectorAll(".update-button");
        updateButtons.forEach((button) => {
            button.addEventListener("click", (event) => {
                event.preventDefault();
                const sensorId = parseInt(button.getAttribute("data-id"));
                this.updateSensor(sensorId);
            });
        });
    }
}

const monitor = new SensorManager();

monitor.loadSensors("sensors.json");
