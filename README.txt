Buenas tardes.

La apricacion la desarrolle en la parte del back, con el framework de express hice 3 respectivos controladores para las 3 puntos de la prueba, un controlador de
registro donde lee el json que es enviado desde el front y lo almacena en la base de datos, tambien hice las respectivas validaciones para que solo pueda registrarse,
una vez con cedula, correo y celular, y pues la consulta al id respectivo para tener encuenta a la hora del login, en el siguiente controlador del login, se hace la 
validacion del usuario en la base datos, para esta parte desencripto la clave, la cual fue encriptada en el registro, hace una respectiva validacion tanto de correo
existente como de clave y correo iguales, tambien una peticion de logout para pues salir de la aplicacion como tal. en el contralador final donde se realiza el rango 
aleatorio dependiendo el salario ingresado.

la parte del front se desarrollo en angular, lo divide en 4 componentes para que la aplicacion fuese modular, un header con la barra de navegacion, un footer con el 
pie de pagina, un login donde hace la peticion en el back para lo mencionado anteriormente, y un registro el cual tambien hace conexion con el back para consulta y 
modificacion de informacion a la base de datos. tambien se crearon los respectivos servicios y modelos lo cual fue requerido para el desempeño de la prueba, se uso 
bootstrap y materialize en algunas ocaciones para facilidad de la solucion, se implemento de forma responsive.

para la parte de la base de datos se realizo en un cloud de ibm gratuito DB2 para realizar todo el proceso, esto se maneja en sql, decidi la parte del back hacerlo de 
esta forma para demostrar el dominio tambien de bases de datos relacionales, pero pues tambien manejo consultas por ORM. 

para el 3 punto de la consulta de rangos deje un boton al usuario logearse el cual permite la consulta de este punto para visualizarlo deje un console.log.

para iniciar la aplicacion solo se debe instalar las dependecias tanto en el back como en el front con npm install, y ejecutarlo en el back con npm run dev y en el 
front npm start. 