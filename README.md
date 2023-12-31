# G-Frame
<strong>G-Frame: Mini-Framework para aprender y desarrollar con PHP</strong>

G-Frame es un mini framework PHP que utiliza jQuery y Bootstrap y está diseñado facilitar y simplificar el desarrollo de pequeños proyectos. Sigue la arquitectura MVC con un patrón fácil de entender y adaptar.Además, integra MySQL para la gestión de bases de datos.

Este proyecto surge en primer lugar de la necesidad de querer entender la Programación Orientada a Objetos y la arquitectura MVC; y de el deseo de poder crear soluciones simples en PHP sin invertir tiempo significativo en aprender frameworks más grandes como Laravel o CakePHP. Incluso si tienes conocimientos básicos de PHP este "framework" te será fácil de entender y de utilizar para lanzar tus primeros MVP.


<h2>Estado del Proyecto:</h2>
El proyecto está actualmente en desarrollo. Se han tenido en cuenta muchas de las mejores prácticas de seguridad y de validación de datos. 

<h3>Seguridad:</h3>
<ul>
<li>Validación de datos en el lado del cliente y en el lado del servidor</li>
<li>Validación de las peticiones de los formularios con Tokens CSRF</li>
<li>Validación de acciones vs roles de usuario</li>
</ul>

<h3>Control Auth:</h3>
<ul>
<li>Login</li>
<li>Registro de usuario con validación por correo electrónico</li>
<li>Recuperar contraseña</li>
<li>Logout por inactividad</li>
<li>Validación de fortaleza de contraseña</li>
</ul>

<h3>Correos:</h3>
<ul>
<li>Uso de PHP Mailer para el envío seguro de correos</li>
</ul>

<h3>Notificaciones y alertas:</h3>
<ul>
<li>Notificaciones y alertas con Sweetalert2</li>
</ul>


<h2>Instalación:</h2>
<ul>
<li>1- Copia los archivos de G-Frame en tu servidor PHP.</li>
<li>2- Crea una Base de Datos vacía.</li>
<li>3- Abre el navegador y en la url de tu proyecto escribe <code>install.php</code> y sigue las instrucciones del asistente.</li>
</ul>
Al ejecutar el <code>install.php</code> se creará un archivo Config.php con las constantes necesarias para ejecutar correctamente las conexiones a la Base de Datos entre otras funionalidades como crear las primeras tablas necesarias de G-Frame (control de usuarios, etc).

    


<h2>Si deseas contribuir al desarrollo de G-Frame:</h2>

    Haz un fork del repositorio.
    Crea tu rama de características (git checkout -b feature/nueva-caracteristica).
    Realiza tus cambios y haz commit (git commit -am 'Añadir nueva característica').
    Haz push a la rama (git push origin feature/nueva-caracteristica).
    Abre un Pull Request.

<h2>Licencia</h2>

Este proyecto aún no está bajo ninguna licencia por lo que puedes colonarlo y utilizarlo a tu gusto.
 
