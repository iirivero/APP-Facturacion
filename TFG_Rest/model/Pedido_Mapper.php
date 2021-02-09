<?php
require_once(__DIR__."/../core/PDOConnection.php");
// Mapeador para las acciones relacionadas con los datoss
class Pedido_Mapper {  
    private $db;
    public function __construct() {
        $this->db = PDOConnection::getInstance();
    }
    

	public function insertarPedido($pedido) {
		$stmt = $this->db->prepare("INSERT INTO pedidos values('',?,?,0,0,0,'No',null)"); 
		$stmt->execute(array($pedido->getId_cliente(), $pedido->getFecha()));
	}

	public function getIdPedido($id,$fecha) {
		$stmt = $this->db->prepare("SELECT id FROM pedidos where id_cliente=? and fecha=?");
		$stmt->execute(array($id,$fecha));
        $resul = $stmt->fetchAll(PDO::FETCH_ASSOC);
        return $resul;

    }

	public function getPedidos() {

        $stmt = $this->db->prepare("SELECT c.razon_social,c.nombre_comercial,p.* FROM pedidos p,clientes c WHERE p.id_cliente = c.id");
        $stmt->execute();
        $resul = $stmt->fetchAll(PDO::FETCH_ASSOC);
        return $resul;

    }

    public function getPedido($id) {

        $stmt = $this->db->prepare("SELECT * FROM pedidos WHERE id =?");
        $stmt->execute(array($id));
        $resul = $stmt->fetchAll(PDO::FETCH_ASSOC);
        return $resul;

    }    

    public function eliminarPedido($id){
        $stmt = $this->db->prepare("DELETE from pedidos WHERE id = ?");
        $resul = $stmt->execute(array($id));
        return $resul;
    }

    public function actualizarPedido($base_imponible,$iva,$total,$id){
        $stmt = $this->db->prepare("UPDATE pedidos SET base_imponible = ?, iva = ?, total = ? WHERE id= ?");
        $resul = $stmt->execute(array($base_imponible,$iva,$total,$id));
        return $resul;
    }
}