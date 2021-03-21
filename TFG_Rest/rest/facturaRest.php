<?php
require_once(__DIR__."/../model/Factura.php");
require_once(__DIR__."/../model/Factura_Mapper.php");
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
class FacturaRest extends BaseRest {
	private $facturaMapper;

	public function __construct() {
		parent::__construct();
		$this->facturaMapper = new Factura_Mapper();
	}
	// Para registrar un nuevo factura en el sistema
	public function crearFactura() {
		$currentUser = parent::auntenticarUsuario();
		parent::isAdmin();
        $id = $this->facturaMapper->getIdMaximo();

		$comprobacion = substr($id, 0,4);
		$id = substr($id, 5);
		//Comprobación para cuando se cambia de año.
		if($comprobacion != date("Y")){
			$id = NULL;
		}

		//If para poner el formato del id de la factura.
        if($id == NULL){
        	$id_nuevo = date("Y") . '0' . '1';
        }else{
        	$id = ($id+1);
        	$id_nuevo = date("Y") . '0' . $id;
        }
		$data = $_POST['id_cliente'];
		$data = json_decode($data,true);
		$fecha = date("Y-m-d H:i:s");
		$factura = new Factura_Model($id_nuevo,$data,$fecha);

	        try{

				$this->facturaMapper->insertarFactura($factura);
				$id_factura = $this->facturaMapper->getIdFactura($data,$fecha);
	            http_response_code(201);
	            header('Content-Type: application/json');
	            echo(json_encode($id_factura));
			
		}catch(ValidationException $e) {
			http_response_code(400);
			header('Content-Type: application/json');
			echo(json_encode($e->getErrors()));
		}
	
	}

	// Para modificar una factura del sistema.
	public function actualizarFactura() {
		$currentUser = parent::auntenticarUsuario();
		parent::isAdmin();
		$data = $_POST['factura'];
		$data = json_decode($data,true);


	        try{
				$this->facturaMapper->actualizarFactura($data['pagado'],$data['fecha_pagado'],$data['generado'],$data['id']);
	            http_response_code(201);
	            header('Content-Type: application/json');
	            echo(json_encode("Cliente creado"));
			
		}catch(ValidationException $e) {
			http_response_code(400);
			header('Content-Type: application/json');
			echo(json_encode($e->getErrors()));
		}
	
	}

	//Devuelve todas las facturas de la base de datos.
	public function getFacturas(){
		$currentUser = parent::auntenticarUsuario();
		parent::isAdmin();
        $facturaArray = $this->facturaMapper->getFacturas();
        header($_SERVER['SERVER_PROTOCOL'].' 200 Ok');
        header('Content-Type: application/json');
        echo(json_encode($facturaArray));
    }

    

    //Devuelve una única factura pasandole el id.
	public function getFactura($id){
		$currentUser = parent::auntenticarUsuario();
		parent::isAdmin();
        $factura = $this->facturaMapper->getFactura($id);
        header($_SERVER['SERVER_PROTOCOL'].' 200 Ok');
        header('Content-Type: application/json');
        echo(json_encode($factura));
    }


    //Elimina una factura de la base de datos.
    public function eliminarFactura($id){
    	$currentUser = parent::auntenticarUsuario();
    	parent::isAdmin();
        $factura = $this->facturaMapper->eliminarFactura($id);
        if($factura == 1){
            header($_SERVER['SERVER_PROTOCOL'].' 200 Ok');
            header('Content-Type: application/json');
            echo(json_encode(true));
        }else{
            http_response_code(400);
            header('Content-Type: application/json');
            echo(json_encode("Error al eliminar el factura"));
        }
    }
}
// URI-MAPPING for this Rest endpoint
$facturaRest = new FacturaRest();
URIDispatcher::getInstance()
->map("GET",	"/factura", array($facturaRest,"getFacturas"))
->map("GET",	"/factura/$1", array($facturaRest,"getFactura"))
->map("POST", "/factura", array($facturaRest,"crearFactura"))
->map("POST", "/factura/actualizar", array($facturaRest,"actualizarFactura"))
->map("DELETE","/factura/eliminar/$1", array($facturaRest,"eliminarFactura"));
 