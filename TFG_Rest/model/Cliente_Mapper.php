<?php
require_once(__DIR__."/../core/PDOConnection.php");
// Mapeador para las acciones relacionadas con los clientes
class Cliente_Mapper {	
	private $db;
	public function __construct() {
		$this->db = PDOConnection::getInstance();
	}
	// Para insertar un nuevo cliente en el sistema
	public function insertarCliente($cliente) {
		$stmt = $this->db->prepare("INSERT INTO clientes values('',?,?,?,?,?,?,?,?)"); 
		$stmt->execute(array($cliente->getRazon_social(), $cliente->getNombre_comercial(), $cliente->getDireccion(), $cliente->getCiudad(),$cliente->getCodigo_postal(),$cliente->getTelefono(),$cliente->getCif(),$cliente->getEmail()));
	}


    public function editarCliente($cliente){
        $stmt = $this->db->prepare("UPDATE clientes SET razon_social = ? , nombre_comercial=?, direccion=?, ciudad=?, codigo_postal=?, telefono=?, nif=?, email=? WHERE id = ?");
        $resul = $stmt->execute(array($cliente->getRazon_social(), $cliente->getNombre_comercial(), $cliente->getDireccion(), $cliente->getCiudad(),$cliente->getCodigo_postal(),$cliente->getTelefono(),$cliente->getCif(),$cliente->getEmail(),$cliente->getId()));
        return $resul;

    }
	// Para saber si ya existe un cliente registrado en el sistema con el email indicado (sólo un cliente por email)
	public function clienteExiste($emailcliente) {
		$stmt = $this->db->prepare("SELECT count(email) FROM clientes where email=?");
		$stmt->execute(array($emailcliente));
		if ($stmt->fetchColumn() > 0) {
			return true;
		}
	}


	public function getClientes() {
        $stmt = $this->db->prepare("SELECT * from clientes");
        $stmt->execute();
        $resul = $stmt->fetchAll(PDO::FETCH_ASSOC);
        return $resul;

    } 

	public function getCliente($id) {
        $stmt = $this->db->prepare("SELECT * from clientes where id=?");
        $stmt->execute(array($id));
        $resul = $stmt->fetchAll(PDO::FETCH_ASSOC);
        return $resul;

    } 


    public function eliminarCliente($id)
    {
        $stmt = $this->db->prepare("DELETE from clientes WHERE id = ?");
        $resul = $stmt->execute(array($id));
        return $resul;
    }
}