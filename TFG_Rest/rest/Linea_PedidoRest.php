<?php
require_once(__DIR__."/../model/Linea_Pedido.php");
require_once(__DIR__."/../model/Linea_Pedido_Mapper.php");
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
class Linea_PedidoRest extends BaseRest {
	private $pedidoMapper;

	public function __construct() {
		parent::__construct();
		$this->pedidoMapper = new Linea_Pedido_Mapper();
	}
	// Para registrar un nuevo pedido en el sistema
	public function añadirLinea_Pedido() {
		$data = $_POST['pedido'];
		$data = json_decode($data,true);
		$pedido = new Linea_Pedido_Model($data['codigo'],$data['nombre'],$data['descripcion'],$data['proveedor'],$data['precio_compra'],$data['rentabilidad'],$data['precio_venta'],$data['iva'],$data['stock']);


			if($this->pedidoMapper->pedidoExiste($pedido->getCodigo())){
		
	            http_response_code(400);
	            header('Content-Type: application/json');
	            echo(json_encode("El codigo ya existe"));
	            exit();
			}
	        try{
				//$pedido->validacionRegistro();
				//die('si valida');

				$this->pedidoMapper->insertarLinea_Pedido($pedido);
	            http_response_code(201);
	            header('Content-Type: application/json');
	            echo(json_encode("Linea_Pedido creado"));
			
		}catch(ValidationException $e) {
			http_response_code(400);
			header('Content-Type: application/json');
			echo(json_encode($e->getErrors()));
		}
	
	}

	public function editarLinea_Pedido() {
        $data = json_decode($_POST['pedido'],true);
        $pedido = new Linea_Pedido_Model($data['codigo'],$data['nombre'],$data['descripcion'],$data['proveedor'],$data['precio_compra'],$data['rentabilidad'],$data['precio_venta'],$data['iva'],$data['stock']);
        $resul = $this->pedidoMapper->editarLinea_Pedido($pedido);
        if($resul == 1){
            header($_SERVER['SERVER_PROTOCOL'].' 200 Ok');
            header('Content-Type: application/json');
            echo(json_encode("Linea_Pedido editado"));

        }
        else{
            http_response_code(400);
            header('Content-Type: application/json');
            echo(json_encode("Error al editar el pedido"));
        }
		
	}

	public function getLinea_Pedidos(){
        $pedidoArray = $this->pedidoMapper->getLinea_Pedidos();
        header($_SERVER['SERVER_PROTOCOL'].' 200 Ok');
        header('Content-Type: application/json');
        echo(json_encode($pedidoArray));
    }

	public function getLinea_Pedido($codigo){
        $pedidoArray = $this->pedidoMapper->getLinea_Pedido($codigo);
        header($_SERVER['SERVER_PROTOCOL'].' 200 Ok');
        header('Content-Type: application/json');
        echo(json_encode($pedidoArray));
    }

    public function eliminarLinea_Pedido($codigo){
        $pedido = $this->pedidoMapper->eliminarLinea_Pedido($codigo);
        if($pedido == 1){
            header($_SERVER['SERVER_PROTOCOL'].' 200 Ok');
            header('Content-Type: application/json');
            echo(json_encode(true));
        }else{
            http_response_code(400);
            header('Content-Type: application/json');
            echo(json_encode("Error al eliminar el pedido"));
        }
    }
}
// URI-MAPPING for this Rest endpoint
$lineaPedidoRest = new Linea_PedidoRest();
URIDispatcher::getInstance()
->map("GET",	"/linea_pedido", array($lineaPedidoRest,"getLinea_Pedidos"))
->map("GET",	"/linea_pedido/$1", array($lineaPedidoRest,"getLinea_Pedido"))
->map("POST", "/linea_pedido", array($lineaPedidoRest,"añadirLinea_Pedido"))
->map("POST", "/linea_pedido/editar", array($lineaPedidoRest,"editarLinea_Pedido"))
->map("DELETE","/linea_pedido/eliminar/$1", array($lineaPedidoRest,"eliminarLinea_Pedido"));
 