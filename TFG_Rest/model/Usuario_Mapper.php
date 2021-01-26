<?php
require_once(__DIR__."/../core/PDOConnection.php");
// Mapeador para las acciones relacionadas con los usuarios
class Usuario_Mapper {	
	private $db;
	public function __construct() {
		$this->db = PDOConnection::getInstance();
	}
	// Para insertar un nuevo usuario en el sistema
	public function insertarUsuario($usuario) {
		$stmt = $this->db->prepare("INSERT INTO usuarios values(?,?,?,?,?)"); 
		$stmt->execute(array($usuario->getUuid(),$usuario->getEmail(), $usuario->getPassword(), $usuario->getNombre(), $usuario->getApellidos()));
	}

    public function editarUsuario($usuario){
        $stmt = $this->db->prepare("UPDATE usuarios SET email = ? , nombre=?, apellidos=? WHERE uuid = ?");
        $resul = $stmt->execute(array($usuario->getEmail(),$usuario->getNombre(),$usuario->getApellidos(), $usuario->getUuid()));
        return $resul;

    }
	// Para saber si ya existe un usuario registrado en el sistema con el email indicado (sólo un usuario por email)
	public function usuarioExiste($emailusuario) {
		$stmt = $this->db->prepare("SELECT count(email) FROM usuarios where email=?");
		$stmt->execute(array($emailusuario));
		if ($stmt->fetchColumn() > 0) {
			return true;
		}
	}

	// Para validar la autenticación de un usuario en el sistema
	public function validarUsuario($email, $password) {
		$stmt = $this->db->prepare("SELECT count(email) FROM usuarios where email=? and password=?");
		$stmt->execute(array($email, $password));
		if ($stmt->fetchColumn() > 0) {
			return true;
		}
	}

	public function getUsuarios() {
        $stmt = $this->db->prepare("SELECT * from usuarios");
        $stmt->execute();
        $resul = $stmt->fetchAll(PDO::FETCH_ASSOC);
        return $resul;

    } 

	public function getUsuario($uuid) {
        $stmt = $this->db->prepare("SELECT * from usuarios where uuid=?");
        $stmt->execute(array($uuid));
        $resul = $stmt->fetchAll(PDO::FETCH_ASSOC);
        return $resul;

    } 

    public function getUsuarioByEmail($email)
    {
        $stmt = $this->db->prepare("SELECT * FROM usuarios where email=?");
        $stmt->execute(array($email));
        $resul = $stmt->fetch(PDO::FETCH_ASSOC);
        return $resul;
    }

    public function eliminarUsuario($uuid)
    {
        $stmt = $this->db->prepare("DELETE from usuarios WHERE uuid = ?");
        $resul = $stmt->execute(array($uuid));
        return $resul;
    }
}