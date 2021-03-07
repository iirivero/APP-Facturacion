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
		$stmt = $this->db->prepare("INSERT INTO facturas values('',?,?,?,?,?,?,?,?)"); 
		$stmt->execute(array($factura->getRazon_social(), $factura->getNombre_comercial(), $factura->getDireccion(), $factura->getCiudad(),$factura->getCodigo_postal(),$factura->getTelefono(),$factura->getCif(),$factura->getEmail()));
	}

    //Para editar los datos de una factura.
    public function editarFactura($factura){
        $stmt = $this->db->prepare("UPDATE facturas SET razon_social = ? , nombre_comercial=?, direccion=?, ciudad=?, codigo_postal=?, telefono=?, cif=?, email=? WHERE id = ?");
        $resul = $stmt->execute(array($factura->getRazon_social(), $factura->getNombre_comercial(), $factura->getDireccion(), $factura->getCiudad(),$factura->getCodigo_postal(),$factura->getTelefono(),$factura->getCif(),$factura->getEmail(),$factura->getId()));
        return $resul;

    }

	// Para saber si ya existe un factura registrado en el sistema con el email indicado (sólo un factura por email)
	public function facturaExiste($emailfactura) {
		$stmt = $this->db->prepare("SELECT count(email) FROM facturas where email=?");
		$stmt->execute(array($emailfactura));
		if ($stmt->fetchColumn() > 0) {
			return true;
		}
	}

    //Devuelve todas las facturas del sistema.
	public function getFacturas() {
        $stmt = $this->db->prepare("SELECT * from facturas");
        $stmt->execute();
        $resul = $stmt->fetchAll(PDO::FETCH_ASSOC);
        return $resul;

    } 

    //Devuelve los datos de una única factura.
	public function getFactura($id) {
        $stmt = $this->db->prepare("SELECT * from facturas where id=?");
        $stmt->execute(array($id));
        $resul = $stmt->fetchAll(PDO::FETCH_ASSOC);
        return $resul;

    } 

    //Elimina una factura del sistema.
    public function eliminarFactura($id)
    {
        $stmt = $this->db->prepare("DELETE from facturas WHERE id = ?");
        $resul = $stmt->execute(array($id));
        return $resul;
    }
}