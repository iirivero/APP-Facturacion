<?php
require_once(__DIR__."/../model/Usuario.php");
require_once(__DIR__."/../model/Usuario_Mapper.php");
/**
* Class BaseRest
*
* Superclass for Rest endpoints
*
* It simply contains a method to authenticate users via HTTP Basic Auth against
* the User database via USUARIO_Mapper.
*
* @author lipido <lipido@gmail.com>
*/
class BaseRest {
	public function __construct() { }
	/**
	* Authenticates the current request. If the request does not contain
	* auth credentials, it will generate a 401 response code and end PHP processing
	* If the request contain credentials, it will be checked against the database.
	* If the credentials are ok, it will return the User object just logged. If the
	* credentials are invalid, it will generate a 401 code as well and end PHP
	* processing.
	*
	* @return User the user just authenticated.
	*/
	public function auntenticarUsuario() {
		if (!isset($_SERVER['PHP_AUTH_USER'])) {
			header($_SERVER['SERVER_PROTOCOL'].' 401 Unauthorized');
			header('WWW-Authenticate: Basic realm="Rest API of TFG"');
			die('Necesitas estar logueado');
		}
		else {
			$usuarioMapper = new Usuario_Mapper();
			if ($usuarioMapper->validarUsuario(
				$_SERVER['PHP_AUTH_USER'], 
				$_SERVER['PHP_AUTH_PW'])) {
				$userArray = $usuarioMapper->getUsuarioByEmail($_SERVER['PHP_AUTH_USER']);
                return new Usuario_Model($userArray['uuid'],$userArray['email'],$userArray['password'],$userArray['nombre'],$userArray['apellidos'],$userArray['administrador']);
			} else {
				header($_SERVER['SERVER_PROTOCOL'].' 401 Unauthorized');
				header('WWW-Authenticate: Basic realm="Rest API of TFG"');
				die('El email o la contraseña no es valida');
			}
		}
	}


	public function isAdmin(){
		$usuarioMapper = new Usuario_Mapper();
		if($usuarioMapper->isAdmin($_SERVER['PHP_AUTH_USER'])){

			return true;

		}else {
			header($_SERVER['SERVER_PROTOCOL'].' 401 Unauthorized');
			header('WWW-Authenticate: Basic realm="Rest API of TFG"');
			die('No tienes permiso para realizar esta acción');
		}
	}
}
