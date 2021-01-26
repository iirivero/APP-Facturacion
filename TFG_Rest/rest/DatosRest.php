<?php
require_once(__DIR__."/../model/Datos.php");
require_once(__DIR__."/../model/Datos_Mapper.php");
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
class DatosRest extends BaseRest {
	private $datosMapper;

	public function __construct() {
		parent::__construct();
		$this->datosMapper = new Datos_Mapper();
	}


	public function editarDatos() {
        $data = json_decode($_POST['datos'],true);
        $datos = new Datos_Model($data['id'],$data['nombre'],$data['direccion'],$data['ciudad'],$data['codigo_postal'],$data['telefono'],$data['cif'],$data['email']);
        $resul = $this->datosMapper->editarDatos($datos);
        if($resul == 1){
            header($_SERVER['SERVER_PROTOCOL'].' 200 Ok');
            header('Content-Type: application/json');
            echo(json_encode("Datos editado"));

        }
        else{
            http_response_code(400);
            header('Content-Type: application/json');
            echo(json_encode("Error al editar el datos"));
        }
		
	}

    public function subirArchivo() {
        $data = json_decode($_POST['datos'],true);
        $dir_foto="../../../TFG-Angular/src/assets/images/".$data['nombre'];
        $resul = move_uploaded_file($data['nombre'], $dir_foto); 
        if($resul == true){
            header($_SERVER['SERVER_PROTOCOL'].' 200 Ok');
            header('Content-Type: application/json');
            echo(json_encode("Datos editado"));

        }
        else{
            http_response_code(400);
            header('Content-Type: application/json');
            echo(json_encode($dir_foto));
        }
        
    }

	public function getDatos(){
        $datosArray = $this->datosMapper->getDatos();
        header($_SERVER['SERVER_PROTOCOL'].' 200 Ok');
        header('Content-Type: application/json');
        echo(json_encode($datosArray));
    }

}

// URI-MAPPING for this Rest endpoint
$datosRest = new DatosRest();
URIDispatcher::getInstance()
->map("GET",	"/datos", array($datosRest,"getDatos"))
->map("POST",    "/datos/subirArchivo", array($datosRest,"subirArchivo"))
->map("POST", "/datos/editar", array($datosRest,"editarDatos"));
 