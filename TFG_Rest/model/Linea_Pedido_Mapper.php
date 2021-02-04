<?php
require_once(__DIR__."/../core/PDOConnection.php");
// Mapeador para las acciones relacionadas con los datoss
class Linea_Pedido_Mapper {  
    private $db;
    public function __construct() {
        $this->db = PDOConnection::getInstance();
    }
    
	// Para insertar un nuevo cliente en el sistema
	public function insertarLinea_Pedido($linea_pedido) {
		$stmt = $this->db->prepare("INSERT INTO linea_pedido values('',?,?,?,?,?,?,?,?)"); 
		$stmt->execute(array($linea_pedido->getId_pedido(), $linea_pedido->getCodigo_articulo(), $linea_pedido->getCantidad(), $linea_pedido->getPrecio(),$linea_pedido->getIva(),$linea_pedido->getImporte_iva(),$linea_pedido->getDescuento(),$linea_pedido->getImporte()));
	}

    	// Para saber si ya existe un cliente registrado en el sistema con el email indicado (sólo un cliente por email)
	public function lineaPedidoExiste($id_pedido,$codigo_articulo) {
		$stmt = $this->db->prepare("SELECT count($id_pedido) FROM linea_pedido where id_pedido=? and codigo_articulo=?");
		$stmt->execute(array($id_pedido,$codigo_articulo));
		if ($stmt->fetchColumn() > 0) {
			return true;
		}
	}

	public function getLinea_Pedidos($id_pedido) {
        $stmt = $this->db->prepare("SELECT lp.*,a.nombre from linea_pedido lp, articulos a where lp.codigo_articulo=a.codigo and lp.id_pedido=?");
        $stmt->execute(array($id_pedido));
        $resul = $stmt->fetchAll(PDO::FETCH_ASSOC);
        return $resul;

    } 



    public function eliminarLinea_Pedido($id)
    {
        $stmt = $this->db->prepare("DELETE from linea_pedido WHERE id = ?");
        $resul = $stmt->execute(array($id));
        return $resul;
    }
}