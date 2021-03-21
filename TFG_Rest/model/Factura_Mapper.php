<?php
require_once(__DIR__."/../core/PDOConnection.php");
// Mapeador para las acciones relacionadas con las facturas
class Factura_Mapper {	
	private $db;
	public function __construct() {
		$this->db = PDOConnection::getInstance();
	}
	// Para insertar un nuevo factura en el sistema
	public function insertarFactura($factura) {
		$stmt = $this->db->prepare("INSERT INTO facturas values(?,?,?,'No',NULL,'No')"); 
		$stmt->execute(array($factura->getId(),$factura->getId_cliente(), $factura->getFecha_factura()));
	}


    //Devuelve el id de la factura.
    public function getIdFactura($id,$fecha) {
        $stmt = $this->db->prepare("SELECT id FROM facturas where id_cliente=? and fecha_factura=?");
        $stmt->execute(array($id,$fecha));
        $resul = $stmt->fetchAll(PDO::FETCH_ASSOC);
        return $resul;

    }

    
    //Devuelve todos las facturas del sistema.
    public function getFacturas() {

        $stmt = $this->db->prepare("SELECT f.*,c.razon_social,c.nombre_comercial FROM facturas f ,clientes c WHERE f.id_cliente = c.id");
        $stmt->execute();
        $resul = $stmt->fetchAll(PDO::FETCH_ASSOC);
        return $resul;

    }

    //Devuelve los datos de una única factura.
    public function getFactura($id) {

        $stmt = $this->db->prepare("SELECT f.*,c.razon_social,c.nombre_comercial FROM facturas f ,clientes c WHERE f.id_cliente = c.id AND f.id =?");
        $stmt->execute(array($id));
        $resul = $stmt->fetchAll(PDO::FETCH_ASSOC);
        return $resul;

    }    

    //Elimina los datos de una factura del sistema.
    public function eliminarFactura($id){
        $stmt = $this->db->prepare("DELETE from facturas WHERE id = ?");
        $resul = $stmt->execute(array($id));
        return $resul;
    }

    //Modifica los datos de una factura.
    public function actualizarFactura($pagado,$fecha_pagado,$generado,$id){
        $stmt = $this->db->prepare("UPDATE facturas SET pagado = ?, fecha_pagado = ?, generado = ? WHERE id= ?");
        $resul = $stmt->execute(array($pagado,$fecha_pagado,$generado,$id));
        return $resul;
    }

    //Devuelve el ultimo id.
    public function getIdMaximo(){
        $stmt = $this->db->prepare("SELECT MAX(id) as maximo FROM facturas");
        $stmt->execute();
        $resul = $stmt->fetch(PDO::FETCH_ASSOC);
        return $resul["maximo"];
    }
    
}