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
	private $lineaPedidoMapper;

	public function __construct() {
		parent::__construct();
		$this->lineaPedidoMapper = new Linea_Pedido_Mapper();
	}
	// Para registrar un nuevo pedido en el sistema
	public function añadirLinea_Pedido() {
		$data = $_POST['pedido'];
		$data = json_decode($data,true);
		if($data['descuento']==null){
		$linea_pedido = new Linea_Pedido_Model($data['id'],$data['id_pedido'],$data['codigo_articulo'],$data['cantidad'],$data['precio'],$data['iva'],$data['importe_iva'],0,$data['importe']);
		}else{
		$linea_pedido = new Linea_Pedido_Model($data['id'],$data['id_pedido'],$data['codigo_articulo'],$data['cantidad'],$data['precio'],$data['iva'],$data['importe_iva'],$data['descuento'],$data['importe']);
		}


			if($this->lineaPedidoMapper->lineaPedidoExiste($linea_pedido->getId_pedido(),$linea_pedido->getCodigo_articulo())){
		
	            http_response_code(400);
	            header('Content-Type: application/json');
	            echo(json_encode("El articulo ya esta introducido"));
	            exit();
			}
	        try{

				$this->lineaPedidoMapper->insertarLinea_Pedido($linea_pedido);
	            http_response_code(201);
	            header('Content-Type: application/json');
	            echo(json_encode("Linea del pedido creado"));
			
		}catch(ValidationException $e) {
			http_response_code(400);
			header('Content-Type: application/json');
			echo(json_encode($e->getErrors()));
		}
	
	}

	public function getLinea_Pedido($id_pedido){
        $pedidoArray = $this->lineaPedidoMapper->getLinea_Pedidos($id_pedido);
        header($_SERVER['SERVER_PROTOCOL'].' 200 Ok');
        header('Content-Type: application/json');
        echo(json_encode($pedidoArray));
    }

    public function eliminarLinea_Pedido($id){
        $lineaPedido = $this->lineaPedidoMapper->eliminarLinea_Pedido($id);
        if($lineaPedido == 1){
            header($_SERVER['SERVER_PROTOCOL'].' 200 Ok');
            header('Content-Type: application/json');
            echo(json_encode(true));
        }else{
            http_response_code(400);
            header('Content-Type: application/json');
            echo(json_encode("Error al eliminar la linea del pedido"));
        }
    }
}
// URI-MAPPING for this Rest endpoint
$lineaPedidoRest = new Linea_PedidoRest();
URIDispatcher::getInstance()
->map("GET",	"/linea_pedido/$1", array($lineaPedidoRest,"getLinea_Pedido"))
->map("POST", "/linea_pedido", array($lineaPedidoRest,"añadirLinea_Pedido"))
->map("DELETE","/linea_pedido/eliminar/$1", array($lineaPedidoRest,"eliminarLinea_Pedido"));
 