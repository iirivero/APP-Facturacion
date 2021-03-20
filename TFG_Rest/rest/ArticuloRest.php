<?php
require_once(__DIR__."/../model/Articulo.php");
require_once(__DIR__."/../model/Articulo_Mapper.php");
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
class ArticuloRest extends BaseRest {
	private $articuloMapper;

	public function __construct() {
		parent::__construct();
		$this->articuloMapper = new Articulo_Mapper();
	}
	// Para registrar un nuevo artículo en el sistema
	public function añadirArticulo() {
		$currentUser = parent::auntenticarUsuario();
		parent::isAdmin();
		$data = $_POST['articulo'];
		$data = json_decode($data,true);
		$articulo = new Articulo_Model($data['codigo'],$data['nombre'],$data['descripcion'],$data['proveedor'],$data['precio_compra'],$data['rentabilidad'],$data['precio_venta'],$data['iva'],$data['stock']);


			if($this->articuloMapper->articuloExiste($articulo->getCodigo())){
		
	            http_response_code(400);
	            header('Content-Type: application/json');
	            echo(json_encode("El codigo ya existe"));
	            exit();
			}
	        try{

				$this->articuloMapper->insertarArticulo($articulo);
	            http_response_code(201);
	            header('Content-Type: application/json');
	            echo(json_encode("Articulo creado"));
			
		}catch(ValidationException $e) {
			http_response_code(400);
			header('Content-Type: application/json');
			echo(json_encode($e->getErrors()));
		}
	
	}

	//Para editar un artículo.
	public function editarArticulo() {
		$currentUser = parent::auntenticarUsuario();
		parent::isAdmin();
        $data = json_decode($_POST['articulo'],true);
        $articulo = new Articulo_Model($data['codigo'],$data['nombre'],$data['descripcion'],$data['proveedor'],$data['precio_compra'],$data['rentabilidad'],$data['precio_venta'],$data['iva'],$data['stock']);
        $resul = $this->articuloMapper->editarArticulo($articulo);
        if($resul == 1){
            header($_SERVER['SERVER_PROTOCOL'].' 200 Ok');
            header('Content-Type: application/json');
            echo(json_encode("Articulo editado"));

        }
        else{
            http_response_code(400);
            header('Content-Type: application/json');
            echo(json_encode("Error al editar el articulo"));
        }
		
	}


	//Devuelve todos los artículo del sistema
	public function getArticulos(){
		$currentUser = parent::auntenticarUsuario();
		parent::isAdmin();
        $articuloArray = $this->articuloMapper->getArticulos();
        header($_SERVER['SERVER_PROTOCOL'].' 200 Ok');
        header('Content-Type: application/json');
        echo(json_encode($articuloArray));
    }


    //Devuelve un único artículo.
	public function getArticulo($codigo){
		$currentUser = parent::auntenticarUsuario();
		parent::isAdmin();
		if(!$this->articuloMapper->articuloExiste($codigo)){
	
            http_response_code(400);
            header('Content-Type: application/json');
            echo(json_encode("El codigo no existe"));
            exit();
		}

        $articuloArray = $this->articuloMapper->getArticulo($codigo);
        header($_SERVER['SERVER_PROTOCOL'].' 200 Ok');
        header('Content-Type: application/json');
        echo(json_encode($articuloArray));
    }


    //Elimina un artículo de la base de datos.
    public function eliminarArticulo($codigo){
    	$currentUser = parent::auntenticarUsuario();
    	parent::isAdmin();
        $articulo = $this->articuloMapper->eliminarArticulo($codigo);
        if($articulo == 1){
            header($_SERVER['SERVER_PROTOCOL'].' 200 Ok');
            header('Content-Type: application/json');
            echo(json_encode(true));
        }else{
            http_response_code(400);
            header('Content-Type: application/json');
            echo(json_encode("Error al eliminar el articulo"));
        }
    }
}
// URI-MAPPING for this Rest endpoint
$articuloRest = new ArticuloRest();
URIDispatcher::getInstance()
->map("GET",	"/articulo", array($articuloRest,"getArticulos"))
->map("GET",	"/articulo/$1", array($articuloRest,"getArticulo"))
->map("POST", "/articulo", array($articuloRest,"añadirArticulo"))
->map("POST", "/articulo/editar", array($articuloRest,"editarArticulo"))
->map("DELETE","/articulo/eliminar/$1", array($articuloRest,"eliminarArticulo"));
 