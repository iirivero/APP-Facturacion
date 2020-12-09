<?php
// file: model/Usuario_Mapper.php
require_once(__DIR__."/../core/PDOConnection.php");
// Mapeador para las acciones relacionadas con los usuarios
class Cliente_Mapper {	
	private $db;
	public function __construct() {
		$this->db = PDOConnection::getInstance();
	}
	// Para insertar un nuevo usuario en el sistema
	public function insertarcliente($cliente) {
		$stmt = $this->db->prepare("INSERT INTO clientes values('',?,?,?,?,?,?)"); 
		$stmt->execute(array($cliente->getNombre(), $cliente->getApellidos(), $cliente->getDni(), $cliente->getEmail(),$cliente->getdireccion(),$cliente->getTelefono()));
	}

	// Para saber si ya existe un usuario registrado en el sistema con el email indicado (sólo un usuario por email)
	public function clienteExiste($emailCliente) {
		$stmt = $this->db->prepare("SELECT count(email) FROM clientes where email=?");
		$stmt->execute(array($emailCliente));
		if ($stmt->fetchColumn() > 0) {
			return true;
		}
	}
/*	
	// Para validar la autenticación de un usuario en el sistema
	public function validarCliente($email, $password) {
		$stmt = $this->db->prepare("SELECT count(email) FROM usuario where email=? and password=?");
		$stmt->execute(array($email, $password));
		if ($stmt->fetchColumn() > 0) {
			return true;
		}
	}*/
}