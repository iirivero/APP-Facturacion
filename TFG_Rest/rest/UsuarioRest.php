<?php
require_once(__DIR__."/../model/Usuario.php");
require_once(__DIR__."/../model/Usuario_Mapper.php");
require_once(__DIR__."/../core/ValidationException.php");
require_once(__DIR__."/BaseRest.php");
/**
* Class UserRest
*
* It contains operations for adding and check users credentials.
* Methods gives responses following Restful standards. Methods of this class
* are intended to be mapped as callbacks using the URIDispatcher class.
*
*/
class UsuarioRest extends BaseRest {
	private $usuarioMapper;

	public function __construct() {
		parent::__construct();
		$this->usuarioMapper = new Usuario_Mapper();
	}
	// Para registrar un nuevo usuario en el sistema
	public function añadirUsuario() {
		$currentUser = parent::auntenticarUsuario();
		$data = $_POST['usuario'];
		$data = json_decode($data,true);
		$usuario = new Usuario_Model($data['uuid'],$data['email'],$data['password'],$data['nombre'],$data['apellidos'],$data['administrador']);


			if($this->usuarioMapper->usuarioExiste($usuario->getEmail())){
		
	            http_response_code(400);
	            header('Content-Type: application/json');
	            echo(json_encode("El email ya existe"));
	            exit();
			}
	        try{
				//$usuario->validacionRegistro();
				//die('si valida');

				$this->usuarioMapper->insertarUsuario($usuario);
	            http_response_code(201);
	            header('Content-Type: application/json');
	            echo(json_encode("Usuario creado"));
			
		}catch(ValidationException $e) {
			http_response_code(400);
			header('Content-Type: application/json');
			echo(json_encode($e->getErrors()));
		}
	
	}


	//Para editar los datos de un usuario.
	public function editarUsuario() {
		$currentUser = parent::auntenticarUsuario();
        $data = json_decode($_POST['usuario'],true);
        $usuario = new Usuario_Model($data['uuid'],$data['email'],$data['password'],$data['nombre'],$data['apellidos']);
        $resul = $this->usuarioMapper->editarUsuario($usuario);
        if($resul == 1){
            header($_SERVER['SERVER_PROTOCOL'].' 200 Ok');
            header('Content-Type: application/json');
            echo(json_encode("Usuario editado"));

        }
        else{
            http_response_code(400);
            header('Content-Type: application/json');
            echo(json_encode("Error al editar el usuario"));
        }
		
	}

	// Para loguearse en el sistema
	public function login($email) {
		$currentLogged = parent::auntenticarUsuario();
		if ($currentLogged->getEmail() != $email) {
			header($_SERVER['SERVER_PROTOCOL'].' 403 Forbidden');
			echo("Improsible identificarse con ese email.");
		} else {
			header($_SERVER['SERVER_PROTOCOL'].' 200 Ok');
            header('Content-Type: application/json');
            echo(json_encode($currentLogged->jsonSerialize()));
		}
	}

	//Devuelve todos los usuarios almacenados en el sistema.
	public function getUsuarios(){
		$currentUser = parent::auntenticarUsuario();
        $userArray = $this->usuarioMapper->getUsuarios();
        header($_SERVER['SERVER_PROTOCOL'].' 200 Ok');
        header('Content-Type: application/json');
        echo(json_encode($userArray));
    }

    //Devuelve los datos de un único usuario del sistema.
	public function getUsuario($uuid){
		$currentUser = parent::auntenticarUsuario();
        $userArray = $this->usuarioMapper->getUsuario($uuid);
        header($_SERVER['SERVER_PROTOCOL'].' 200 Ok');
        header('Content-Type: application/json');
        echo(json_encode($userArray));
    }


    //Elimina un usario de la base de datos.
    public function eliminarUsuario($uuid){
    	$currentUser = parent::auntenticarUsuario();
        $user = $this->usuarioMapper->eliminarUsuario($uuid);
        if($user == 1){
            header($_SERVER['SERVER_PROTOCOL'].' 200 Ok');
            header('Content-Type: application/json');
            echo(json_encode(true));
        }else{
            http_response_code(400);
            header('Content-Type: application/json');
            echo(json_encode("Error al eliminar el usuario"));
        }
    }
}
// URI-MAPPING for this Rest endpoint
$usuarioRest = new UsuarioRest();
URIDispatcher::getInstance()
->map("GET",	"/usuario/login/$1", array($usuarioRest,"login"))
->map("GET",	"/usuario", array($usuarioRest,"getUsuarios"))
->map("GET",	"/usuario/$1", array($usuarioRest,"getUsuario"))
->map("POST", "/usuario", array($usuarioRest,"añadirUsuario"))
->map("POST", "/usuario/editar", array($usuarioRest,"editarUsuario"))
->map("DELETE","/usuario/eliminar/$1", array($usuarioRest,"eliminarUsuario"));
 