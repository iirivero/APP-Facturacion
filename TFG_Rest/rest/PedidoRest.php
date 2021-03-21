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
		$currentUser = parent::auntenticarUsuario();
		$id = $this->pedidoMapper->getIdMaximo();
		
		$comprobacion = substr($id, 0,4);
		$id = substr($id, 5);
		//Comprobación para cuando se cambia de año.
		if($comprobacion != date("Y")){
			$id = NULL;
		}

		//If para poner el formato del id del albarán.
        if($id == NULL){
        	$id_nuevo = date("Y") . '0' . '1';
        }else{
        	$id = ($id+1);
        	$id_nuevo = date("Y") . '0' . $id;
        }

		$data = $_POST['id_cliente'];
		$data = json_decode($data,true);
		$fecha = date("Y-m-d H:i:s");
		$pedido = new Pedido_Model($id_nuevo,$data,$fecha);

	        try{

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

	// Para modificar un cliente en el sistema
	public function actualizarPedido() {
		$currentUser = parent::auntenticarUsuario();
		$data = $_POST['pedido'];
		$data = json_decode($data,true);


	        try{
				$this->pedidoMapper->actualizarPedido($data['base_imponible'],$data['iva'],$data['precio_total'],$data['facturado'],$data['id_factura'],$data['generado'],$data['id']);
	            http_response_code(201);
	            header('Content-Type: application/json');
	            echo(json_encode("Cliente creado"));
			
		}catch(ValidationException $e) {
			http_response_code(400);
			header('Content-Type: application/json');
			echo(json_encode($e->getErrors()));
		}
	
	}

	//Devuelve todos los pedidos del sistema.
	public function getPedidos(){
		$currentUser = parent::auntenticarUsuario();		
        $pedidoArray = $this->pedidoMapper->getPedidos();
        header($_SERVER['SERVER_PROTOCOL'].' 200 Ok');
        header('Content-Type: application/json');
        echo(json_encode($pedidoArray));
    }


    //Devuelve los datos de un único pedido.
	public function getPedido($id){
		$currentUser = parent::auntenticarUsuario();
        $pedido = $this->pedidoMapper->getPedido($id);
        header($_SERVER['SERVER_PROTOCOL'].' 200 Ok');
        header('Content-Type: application/json');
        echo(json_encode($pedido));
    }

    //Devuelve todos los pedidos que estan sin facturar para un cliente.
	public function getPedidoSinFacturar($id_cliente){
		$currentUser = parent::auntenticarUsuario();
        $pedidoArray = $this->pedidoMapper->getPedidoSinFacturar($id_cliente);
        header($_SERVER['SERVER_PROTOCOL'].' 200 Ok');
        header('Content-Type: application/json');
        echo(json_encode($pedidoArray));
    }

    //Devuelve todos los pedidos de una factura.
	public function getPedidoFacturado($id_factura){
		$currentUser = parent::auntenticarUsuario();
        $pedidoArray = $this->pedidoMapper->getPedidoFacturado($id_factura);
        header($_SERVER['SERVER_PROTOCOL'].' 200 Ok');
        header('Content-Type: application/json');
        echo(json_encode($pedidoArray));
    }


    //Elimina un pedido de la base de datos.
    public function eliminarPedido($id){
    	$currentUser = parent::auntenticarUsuario();
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
->map("GET",	"/pedido/$1", array($pedidoRest,"getPedido"))
->map("GET",	"/pedido/sin-facturar/$1", array($pedidoRest,"getPedidoSinFacturar"))
->map("GET",	"/pedido/facturado/$1", array($pedidoRest,"getPedidoFacturado"))
->map("POST", "/pedido", array($pedidoRest,"crearPedido"))
->map("POST", "/pedido/actualizar", array($pedidoRest,"actualizarPedido"))
->map("DELETE","/pedido/eliminar/$1", array($pedidoRest,"eliminarPedido"));
 