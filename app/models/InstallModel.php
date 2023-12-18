<?php
// InstallModel.php

require_once "../../core/Utils.php";

class InstallModel {


	public function	if_db() {

		try {
			$pdo = getPDOInstance();
// Obtener la lista de tablas en la base de datos
			$tablesQuery = "SHOW TABLES";
			$tablesStmt = $pdo->query($tablesQuery);
			$tables = $tablesStmt->fetchAll(PDO::FETCH_COLUMN);
			if ($tables) {
				$response = array('success'=> true,);
			} else {
				$response = array('success'=> false);
			}
		}   
		catch (PDOException $e) {
			$response = array('status' => 'error', 'message' => $e->getCode());
		}
		$pdo = null;
		return $response;
	}



	public function testDBConnection() {
	$dbName = $_POST["dbName"];
    $dbUser = $_POST["dbUser"];
    $dbPass = $_POST["dbPass"];
    $dbServer = $_POST["dbServer"];

		try {
		$pdo = new PDO("mysql:host=$dbServer;dbname=$dbName", $dbUser, $dbPass);
    	$pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
			$response = array('status' => 'success', 'message' => 'La conexión a la base de datos se ha establecido con éxito.');
		} catch(PDOException $e) {
			$response = array('status' => 'error', 'message' => $e->getCode());
		}
		$pdo = null;
		return $response;
	}

	public function configCreate(){
		try {
			$dbName = $_POST["dbName"];
			$dbUser = $_POST["dbUser"];
			$dbPass = $_POST["dbPass"];
			$dbServer = $_POST["dbServer"];
			$site_url= guess_url();

			$file = fopen("../../core/Config.php", "w");
			fwrite($file, "<?php\n\n");
			fwrite($file, "/** Database settings - You can get this info from your web host **/\n\n");
			fwrite($file, "/** The name of the database for G-Frame */\n");
			fwrite($file, "define( 'DB_NAME', '$dbName' );\n\n");
			fwrite($file, "/** Database username */\n");
			fwrite($file, "define( 'DB_USER', '$dbUser' );\n\n");
			fwrite($file, "/** Database password */\n");
			fwrite($file, "define( 'DB_PASSWORD', '$dbPass' );\n\n");
			fwrite($file, "/** Database hostname */\n");
			fwrite($file, "define( 'DB_HOST', '$dbServer' );\n\n");
			fwrite($file, "/** Database charset to use in creating database tables. */\n");
			fwrite($file, "define( 'DB_CHARSET', 'utf8mb4' );\n\n");
			fwrite($file, "/** Absolute path to G-Frame directory. */\n define( 'ABSPATH', __DIR__ .'/../');\n\n");
			fwrite($file, "/** Site URL. */\n");
			fwrite($file, "define( 'site_url', '$site_url' );\n\n");
			fwrite($file, "/** Mailer settings - You can get this info from your web host **/\n\n");
			fwrite($file, "/** Mail smtp Host*/\n");
			fwrite($file, "define( 'M_Host', 'smtp.yourmailhost.com' );\n\n");
			fwrite($file, "/** Mail smtp port */\n");
			fwrite($file, "define( 'M_Port', 587 );\n\n");
			fwrite($file, "/** Mail username */\n");
			fwrite($file, "define( 'M_Username', 'yname@yourmailhost.com' );\n\n");
			fwrite($file, "/** Mail Password */\n");
			fwrite($file, "define( 'M_Password', 'YourPassword' );\n\n");
			fwrite($file, "/** Mail Secure Protocol */\n");
			fwrite($file, "define( 'M_Secure', 'tls' );\n\n");
			fwrite($file, "/** Mail Sender Address username */\n");
			fwrite($file, "define( 'M_From', 'yname@yourmailhost.com' );\n\n");
			fwrite($file, "/** Mail Sender Name */\n");
			fwrite($file, "define( 'M_Name', 'YourName' );\n\n");
			fclose($file);

			$response = array('status' => 'success', 'message' => 'Config.php creado con éxito.');
		}
		catch(PDOException $e) {
			$response = array('status' => 'error', 'message' => $e->getCode());
		}
		return $response;
	}

	public function installer(){
		$uMail = $_POST["uMail"];
		$uPass = $_POST["uPass"];
		$site_url= guess_url();
		$options = ['cost' => 12, // el número de rondas de cifrado (cuanto mayor sea, más lento será el cifrado)
];
		$hashed_password = password_hash($uPass, PASSWORD_BCRYPT, $options);
		$token = bin2hex(random_bytes(32));
	try {
	 	$pdo = getPDOInstance();
	// Ejecutamos el SQL
	$pdo->exec("
		CREATE TABLE users (
		user_id INT(11) NOT NULL AUTO_INCREMENT,
		email VARCHAR(255) NOT NULL,
		user_password VARCHAR(255) NOT NULL,
		user_role ENUM('admin', 'owner', 'gestor', 'client') NOT NULL DEFAULT 'owner',
		user_status ENUM('suspended','unverify', 'verify') NOT NULL DEFAULT 'unverify',
		user_token VARCHAR(255) NOT NULL,
		last_login TIMESTAMP on update CURRENT_TIMESTAMP NULL DEFAULT NULL,
		created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
		updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
		PRIMARY KEY (user_id),
		UNIQUE KEY (email)
	);
	CREATE TABLE shop_categories (
	category_id INT(11) NOT NULL AUTO_INCREMENT,
	name VARCHAR(50) NOT NULL,
	descripcion VARCHAR(255),
	created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	PRIMARY KEY (category_id)
	);
	CREATE TABLE shops (
	shop_id INT(11) NOT NULL AUTO_INCREMENT,
	owner_id INT(11) NOT NULL,
	name VARCHAR(50) NOT NULL,
	category INT(11) NOT NULL, 
	url VARCHAR(50) UNIQUE,
	descripcion VARCHAR(255),
	logo_id INT(11),
	banner_id INT(11),
	shop_styles LONGTEXT DEFAULT '{\"backgroundColor\": \"#FFFFFF\", \"textColor\": \"d333\", \"fontFamily\": \"Arial\", \"fontSize\": \"d14\"}',
	is_active TINYINT(1) NOT NULL DEFAULT 0,
	is_blocked TINYINT(1) NOT NULL DEFAULT 0, 
	opening  VARCHAR(255),
	currency VARCHAR(3) NOT NULL DEFAULT 'CUP',
	disk_capacity INT(4) NOT NULL DEFAULT 50,
	created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
	PRIMARY KEY (shop_id),
	FOREIGN KEY (owner_id) REFERENCES users(user_id) ON DELETE CASCADE,
	FOREIGN KEY (category) REFERENCES shop_categories(category_id) ON DELETE CASCADE
	);

	CREATE TABLE product_categories (
	category_id INT(11) NOT NULL AUTO_INCREMENT,
	shop_id INT NOT NULL,
	name VARCHAR(50) NOT NULL,
	description VARCHAR(255),
	cat_order INT(11), 
	is_default TINYINT(1) NOT NULL DEFAULT 0,
	parent_category_id INT(11),
	banner_id INT(11),
	created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
	PRIMARY KEY (category_id),
	FOREIGN KEY (parent_category_id) REFERENCES product_categories(category_id) ON DELETE SET NULL,
	FOREIGN KEY (shop_id) REFERENCES shops(shop_id) ON DELETE CASCADE
	);

	CREATE TABLE products (
	product_id INT(11) NOT NULL AUTO_INCREMENT,
	shop_id INT NOT NULL,
	category_id INT(11) NOT NULL,
	sku VARCHAR(50), -- Código SKU
	name VARCHAR(255) NOT NULL,
	short_description VARCHAR(255),
	description TEXT,
	price DECIMAL(10, 2), 
	discount_price DECIMAL(10, 2), 
	inventory INT(11) NOT NULL,
	min_stock INT(11),
	rating DECIMAL(3, 2), 
	rating_average DECIMAL(3, 2),
	download_url VARCHAR(255),
	is_active TINYINT(1) NOT NULL DEFAULT 1,
	main_image_id INT(11),
	created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
	PRIMARY KEY (product_id),
	FOREIGN KEY (shop_id) REFERENCES shops(shop_id) ON DELETE CASCADE,
	FOREIGN KEY (category_id) REFERENCES product_categories(category_id) ON DELETE CASCADE
	);



	CREATE TABLE product_categorie_mapping (
	mapping_id INT(11) NOT NULL AUTO_INCREMENT,
	product_id INT(11) NOT NULL,
	category_id INT(11) NOT NULL,
	PRIMARY KEY (mapping_id),
	FOREIGN KEY (product_id) REFERENCES products(product_id) ON DELETE CASCADE,
	FOREIGN KEY (category_id) REFERENCES product_categories(category_id) ON DELETE CASCADE
	); 

	CREATE TABLE medias (
	media_id INT(11) NOT NULL AUTO_INCREMENT,
	shop_id INT(11) NOT NULL, 
	name VARCHAR(50) NOT NULL,   
	media_url VARCHAR(255) NOT NULL, 
	alt_text VARCHAR(50) NOT NULL,  
	created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	PRIMARY KEY (media_id),
	FOREIGN KEY (shop_id) REFERENCES shops(shop_id) ON DELETE CASCADE
	);
	CREATE TABLE product_images (
	product_image_id INT(11) NOT NULL AUTO_INCREMENT,
	product_id INT(11) NOT NULL,
	media_id INT(11) NOT NULL,  -- ID de la imagen adicional relacionada
	created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	PRIMARY KEY (product_image_id),
	FOREIGN KEY (product_id) REFERENCES products(product_id) ON DELETE CASCADE,
	FOREIGN KEY (media_id) REFERENCES medias(media_id) ON DELETE CASCADE
	);



	CREATE TABLE orders (
	order_id INT(11) NOT NULL AUTO_INCREMENT,
	shop_id INT(11) NOT NULL,
	order_status ENUM('pendiente', 'procesando', 'espera', 'completado','cancelado','reembolsado','fallido','completado') NOT NULL DEFAULT 'pendiente',
	total_amount DECIMAL(10, 2) NOT NULL,
	customer_name VARCHAR(255) NOT NULL,  
	customer_phone VARCHAR(20), 
	customer_address VARCHAR(255),  
	order_note TEXT, 
	follow_url VARCHAR(255) NOT NULL, 
	created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
	PRIMARY KEY (order_id),
	FOREIGN KEY (shop_id) REFERENCES shops(shop_id) ON DELETE CASCADE
	);



	CREATE TABLE memberships (
	membership_id INT(11) NOT NULL AUTO_INCREMENT,
	user_id INT(11) NOT NULL,
	name ENUM('basic', 'pro', 'extended','infinite') NOT NULL DEFAULT 'basic',
	start_date DATE DEFAULT CURRENT_TIMESTAMP,  
	end_date DATE DEFAULT NULL,
	prod_limit INT(11) DEFAULT 10,
	cat_limit INT(2) DEFAULT 5,
	shop_limit INT(2) DEFAULT 1,
	gestor_limit INT(2) DEFAULT 0,
	is_active TINYINT(1) NOT NULL DEFAULT 1,
	created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
	PRIMARY KEY (membership_id),
	FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE
	);
	CREATE TABLE membership_history (
	membership_history_id INT(11) NOT NULL AUTO_INCREMENT,
	user_id INT(11) NOT NULL,
	membership_type ENUM('basic', 'pro', 'extended', 'infinite') NOT NULL,
	start_date DATE NOT NULL,
	end_date DATE,
	cost DECIMAL(10, 2) NOT NULL,
	created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	PRIMARY KEY (membership_history_id),
	FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE
	);

	CREATE TABLE user_permissions (
	id INT AUTO_INCREMENT PRIMARY KEY,
	user_id INT NOT NULL,
	shop_id INT NOT NULL,
	permission_level ENUM('admin', 'owner', 'gestor') NOT NULL,
	created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	FOREIGN KEY (user_id) REFERENCES users(user_id),
	FOREIGN KEY (shop_id) REFERENCES shops(shop_id)
	);

	CREATE TABLE statistics (
	statistic_id INT(11) NOT NULL AUTO_INCREMENT,
	shop_id INT(11) NOT NULL,
	total_sales DECIMAL(10, 2),
	total_p_sales INT(11),
	total_order_completes INT(11),
	most_sold_product_id INT(11),
	most_sold_product_quantity INT(11),
	highest_revenue_product_id INT(11),
	highest_revenue DECIMAL(10, 2),
	total_orders INT(11),
	created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	PRIMARY KEY (statistic_id),
	FOREIGN KEY (shop_id) REFERENCES shops(shop_id) ON DELETE CASCADE
	);


	CREATE TABLE options (
	option_id bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT,
	option_name varchar(191) NOT NULL DEFAULT '',
	option_value longtext NOT NULL,
	autoload varchar(20) NOT NULL DEFAULT 'yes',
	PRIMARY KEY (option_id),
	UNIQUE KEY option_name (option_name)
	);
	INSERT INTO users (email, user_password, user_role, user_status, user_token)
	VALUES ('$uMail', '$hashed_password', 'admin', 'verify' ,'$token');

	INSERT INTO options (option_name, option_value)
	VALUES ('site_url', '$site_url');

	INSERT INTO shop_categories (name, descripcion) VALUES
	('Alimentos y Bebidas Especiales', 'Alimentos orgánicos, alimentos étnicos, vinos y licores, etc.'),
	('Arte y Fotografía', 'Obras de arte, suministros de arte, equipo fotográfico, impresiones artísticas, etc.'),
	('Automoción', 'Piezas y accesorios para automóviles'),
	('Bebés y Niños', 'Productos para bebés, ropa infantil, artículos para el cuidado del bebé, juguetes para niños, etc.'),
	('Belleza y Cuidado Personal', 'Maquillaje, productos de cuidado de la piel, perfumes, afeitado, etc.'),
	('Comida', 'Alimentos y productos comestibles'),
	('Deportes y Fitness', 'Equipos y artículos deportivos'),
	('Electrónica', 'Productos electrónicos y dispositivos tecnológicos'),
	('Electrónica de Consumo', 'Dispositivos electrónicos como teléfonos, tabletas, cámaras, auriculares, etc.'),
	('Herramientas y Equipamiento', 'Herramientas de bricolaje, equipamiento para actividades al aire libre, etc.'),
	('Hogar y Jardín', 'Artículos para el hogar y productos de jardinería'),
	('Joyería y Accesorios', 'Joyas, relojes, carteras, gafas de sol, etc.'),
	('Juguetes y Juegos', 'Juguetes para niños, juegos de mesa, videojuegos, etc.'),
	('Libros y Entretenimiento', 'Libros, música, películas y entretenimiento'),
	('Moda', 'Ropa, calzado y accesorios de moda'),
	('Muebles y Decoración', 'Mobiliario para el hogar, decoración de interiores, iluminación, etc.'),
	('Música y Instrumentos', 'Instrumentos musicales, accesorios musicales, partituras, etc.'),
	('Otros', 'Otras categorías'),
	('Ropa Deportiva', 'Ropa y accesorios deportivos, calzado deportivo, equipos de ejercicio, etc.'),
	('Salud y Belleza', 'Productos de cuidado personal y salud'),
	('Tecnología de Oficina', 'Suministros de oficina, productos de impresión, accesorios de computadora, etc.'),
	('Viajes y Equipaje', 'Equipaje, accesorios de viaje, reservas de viaje, etc.');

	CREATE INDEX idx_owner_id ON shops (owner_id);
	CREATE INDEX idx_is_active ON shops (is_active);
	CREATE INDEX idx_is_blocked ON shops (is_blocked);
	CREATE INDEX idx_shop_id ON product_categories (shop_id);
	CREATE INDEX idx_shop_id ON products (shop_id);
	CREATE INDEX idx_shop_id ON orders (shop_id);
	CREATE INDEX idx_user_id ON membership_history (user_id);
	CREATE INDEX idx_shop_id ON statistics (shop_id);

	"
	);

	// Enviamos la respuesta por AJAX
	$response = array('status' => 'success', 'message' => 'La instalación fue completada con éxito');
	} catch (PDOException $e) {
	// Si ocurre un error, mostramos el mensaje de error
		$response = array('status' => 'error', 'message' => $e->getCode());
	}
	$pdo = null;
    return $response;

}




}