<?php
require_once(__DIR__."/../model/Pedido.php");
require_once(__DIR__."/../model/Pedido_Mapper.php");
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
class PedidoRest extends BaseRest {
	private $pedidoMapper;

	public function __construct() {
		parent::__construct();
		$this->pedidoMapper = new Pedido_Mapper();
	}
	// Para registrar un nuevo pedido en el sistema
	public function crearPedido() {
		$data = $_POST['id_cliente'];
		$data = json_decode($data,true);
		$fecha = date("Y-m-d H:i:s");
		$pedido = new Pedido_Model(null,$data,$fecha);

	        try{
				//$pedido->validacionRegistro();
				//die('si valida');

				$this->pedidoMapper->insertarPedido($pedido);
				$id_pedido = $this->pedidoMapper->getIdPedido($data,$fecha);
	            http_response_code(201);
	            header('Content-Type: application/json');
	            echo(json_encode($id_pedido));
			
		}catch(ValidationException $e) {
			http_response_code(400);
			header('Content-Type: application/json');
			echo(json_encode($e->getErrors()));
		}
	
	}

	public function getPedidos(){
        $pedidoArray = $this->pedidoMapper->getPedidos();
        header($_SERVER['SERVER_PROTOCOL'].' 200 Ok');
        header('Content-Type: application/json');
        echo(json_encode($pedidoArray));
    }

    public function eliminarPedido($id){
        $pedido = $this->pedidoMapper->eliminarPedido($id);
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
$pedidoRest = new PedidoRest();
URIDispatcher::getInstance()
->map("GET",	"/pedido", array($pedidoRest,"getPedidos"))
->map("POST", "/pedido", array($pedidoRest,"crearPedido"))
->map("DELETE","/pedido/eliminar/$1", array($pedidoRest,"eliminarPedido"));
 