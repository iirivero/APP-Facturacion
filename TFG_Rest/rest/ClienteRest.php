<?php
require_once(__DIR__."/../model/Cliente.php");
require_once(__DIR__."/../model/Cliente_Mapper.php");
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
class ClienteRest extends BaseRest {
	private $clienteMapper;

	public function __construct() {
		parent::__construct();
		$this->clienteMapper = new Cliente_Mapper();
	}
	// Para registrar un nuevo cliente en el sistema
	public function añadirCliente() {
		$currentUser = parent::auntenticarUsuario();
		$data = $_POST['cliente'];
		$data = json_decode($data,true);
		$cliente = new Cliente_Model($data['id'],$data['razon_social'],$data['nombre_comercial'],$data['direccion'],$data['ciudad'],$data['codigo_postal'],$data['telefono'],$data['cif'],$data['email']);


			if($this->clienteMapper->clienteExiste($cliente->getEmail())){
		
	            http_response_code(400);
	            header('Content-Type: application/json');
	            echo(json_encode("El email ya existe"));
	            exit();
			}
	        try{
				//$cliente->validacionRegistro();
				//die('si valida');

				$this->clienteMapper->insertarCliente($cliente);
	            http_response_code(201);
	            header('Content-Type: application/json');
	            echo(json_encode("Cliente creado"));
			
		}catch(ValidationException $e) {
			http_response_code(400);
			header('Content-Type: application/json');
			echo(json_encode($e->getErrors()));
		}
	
	}

	public function editarCliente() {
		$currentUser = parent::auntenticarUsuario();
        $data = json_decode($_POST['cliente'],true);
        $cliente = new Cliente_Model($data['id'],$data['razon_social'],$data['nombre_comercial'],$data['direccion'],$data['ciudad'],$data['codigo_postal'],$data['telefono'],$data['cif'],$data['email']);
        $resul = $this->clienteMapper->editarCliente($cliente);
        if($resul == 1){
            header($_SERVER['SERVER_PROTOCOL'].' 200 Ok');
            header('Content-Type: application/json');
            echo(json_encode("Cliente editado"));

        }
        else{
            http_response_code(400);
            header('Content-Type: application/json');
            echo(json_encode("Error al editar el cliente"));
        }
		
	}

	public function getClientes(){
		$currentUser = parent::auntenticarUsuario();
        $clienteArray = $this->clienteMapper->getClientes();
        header($_SERVER['SERVER_PROTOCOL'].' 200 Ok');
        header('Content-Type: application/json');
        echo(json_encode($clienteArray));
    }

	public function getCliente($id){
		$currentUser = parent::auntenticarUsuario();
        $clienteArray = $this->clienteMapper->getCliente($id);
        header($_SERVER['SERVER_PROTOCOL'].' 200 Ok');
        header('Content-Type: application/json');
        echo(json_encode($clienteArray));
    }

    public function eliminarCliente($id){
    	$currentUser = parent::auntenticarUsuario();
        $cliente = $this->clienteMapper->eliminarCliente($id);
        if($cliente == 1){
            header($_SERVER['SERVER_PROTOCOL'].' 200 Ok');
            header('Content-Type: application/json');
            echo(json_encode(true));
        }else{
            http_response_code(400);
            header('Content-Type: application/json');
            echo(json_encode("Error al eliminar el cliente"));
        }
    }
}
// URI-MAPPING for this Rest endpoint
$clienteRest = new ClienteRest();
URIDispatcher::getInstance()
->map("GET",	"/cliente", array($clienteRest,"getClientes"))
->map("GET",	"/cliente/$1", array($clienteRest,"getCliente"))
->map("POST", "/cliente", array($clienteRest,"añadirCliente"))
->map("POST", "/cliente/editar", array($clienteRest,"editarCliente"))
->map("DELETE","/cliente/eliminar/$1", array($clienteRest,"eliminarCliente"));
 