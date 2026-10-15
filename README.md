# Aplicación de Previsión Meteorológica

## Requisitos previos

Para ejecutar la aplicación es necesario tener instalado:

- **Node.js**
- **npm** 

En mi caso he utilizado las siguientes versiones respectivamente v22.23.3 y 10.9.9

También es necesario que el backend esté arrancado y accesible, ya que el frontend realiza peticiones para obtener los municipios y sus predicciones meteorológicas.

## Instalación

Clonar o descargar el proyecto y acceder a la carpeta del frontend:

```bash
git clone https://github.com/pepeamat1996/prueba-asv-frontend.git
cd prueba-asv-frontend
```

Instalar las dependencias:

```bash
npm install
```

## Configuración del backend

La URL del backend se encuentra configurada en el archivo `environment.ts`, dentro de la carpeta `src/environments/`.

Antes de arrancar la aplicación, comprobar que la URL configurada corresponde a la dirección y al puerto en los que se está ejecutando el backend.

**Importante:** si cambia la dirección, la ruta base o el puerto del backend, es necesario actualizar la propiedad `apiUrl` del archivo `environment.ts` para que el frontend pueda realizar correctamente las peticiones HTTP.

## Arrancar la aplicación

Ejecutar el siguiente comando:

```bash
npm start
```

Una vez iniciado el servidor de desarrollo de Angular, abrir la siguiente dirección en el navegador:

**[http://localhost:4200/prevision-meteorologica](http://localhost:4200/prevision-meteorologica)**

Desde esta pantalla se puede:

- Consultar los municipios disponibles.
- Seleccionar un municipio.
- Elegir la unidad de temperatura (ºC o ºF).
- Consultar la predicción meteorológica y la probabilidad de precipitación.

## Notas
Hay que tener en cuenta que la consulta de la predicción meteorológica depende de los datos proporcionados por AEMET. 
Por tanto, si este organismo todavía no ha publicado los datos de probabilidad de lluvia para el día siguiente, estos no se mostrarán.

Actualmente, solo se tienen en cuenta los siguientes periodos horarios: «00-06», «06-12», «12-18» y «18-24». Durante las pruebas se ha observado que la disponibilidad de estos datos puede variar en función de la hora de consulta. 
Por ejemplo, si se realiza la consulta durante las primeras horas del día (a la 01:00), es posible que AEMET todavía no haya actualizado la información correspondiente a alguno de estos periodos.

