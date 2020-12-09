<?php
// file: model/USUARIO_Model.php
require_once(__DIR__."/../core/ValidationException.php");
// Modelo de la entidad usuario de la BD
class Cliente_Model {
	private $idCliente;
	private $nombre;
	private $apellidos;
	private $dni;
	private $email;
	private $direccion;
	private $telefono;

	// Constructor de Usuario
	public function __construct($idCliente=NULL,$nombre=NULL, $apellidos=NULL, $dni=NULL, $email=NULL, $direccion=NULL, $telefono=NULL) {
		$this->idCliente = $idCliente;
		$this->nombre = $nombre;
		$this->apellidos = $apellidos;
		$this->dni = $dni;
		$this->email = $email;
		$this->direccion = $direccion;
		$this->telefono = $telefono;
	}
// Métodos observadores y modificadores de los atributos de la entidad usurio
	public function getidCliente() {
		return $this->idCliente;
	}

	public function setidCliente($idCliente) {
		$this->idCliente = $idCliente;
	}	

	public function getNombre() {
		return $this->nombre;
	}

	public function setNombre($nombre) {
		$this->nombre = $nombre;
	}

	public function getApellidos() {
		return $this->apellidos;
	}
	
	public function setApellidos($apellidos) {
		$this->apellidos = $apellidos;
	}

	public function getDni() {
		return $this->dni;
	}
	
	public function setDni($dni) {
		$this->dni = $dni;
	}

	public function getEmail() {
		return $this->email;
	}	

	public function setEmail($email) {
		$this->email = $email;
	}

	public function getDireccion() {
		return $this->direccion;
	}	

	public function setDreccion($direccion) {
		$this->direccion = $direccion;
	}

	public function getTelefono() {
		return $this->telefono;
	}	

	public function setTelefono($email) {
		$this->telefono = $telefono;
	}
	
/*
	// Para validar los campos en la creación de una nuevo usuario en la BD
	public function validacionRegistro($repetir_password) {
		$errors = array();
		if (strlen($this->email) < 5) {
			$errors["email"] = "Email must be at least 5 characters length";
		}		
		if (strlen($this->password) < 2) {
			$errors["password"] = "password must be at least 5 characters length";
		}
		if ($this->password!=$repetir_password) {
			$errors["password2"] = "passwords do not match";
		}
		if (strlen($this->nombre) < 2) {
			$errors["nombre"] = "Name must be at least 5 characters length";
		}
		if (strlen($this->apellidos) < 2) {
			$errors["apellidos"] = "Surname must be at least 5 characters length";
		}
		if (strlen($this->nombre) > 25) {
			$errors["nombre"] = "The name is too long";
		}
		if (strlen($this->apellidos) > 25) {
			$errors["apellidos"] = "The surname is too long";
		}
		if (strlen($this->email) > 45) {
			$errors["email"] = "The email is too long";
		}		
		if (strlen($this->password) > 128) {
			$errors["password"] = "The password is too long";
		}
		if (strlen($repeatpassword) > 128) {
			$errors["password2"] = "The password confirmation is too long";
		}


		if(!preg_match("/^[a-z][a-z0-9]+@[a-z][a-z0-9]+[a-z]{2,}.[a-z]{2,3}$/", $this->email)){
			$errors["email2"] = "Email format is not valid";
		}

		if(!preg_match("/^[A-Za-zÁáÉéÍíÓóÚúÑñ]{1}[A-Za-zÁáÉéÍíÓóÚúÑñ ]*$/", $this->nombre)){
			$errors["nombre2"] = "Name format is not valid";
		}
		if(!preg_match("/^[A-Za-zÁáÉéÍíÓóÚúñ]{1}[A-Za-zÁáÉéÍíÓóÚúÑñ ]*$/", $this->apellidos)){
			$errors["apellidos2"] = "Surname format is not valid";
		}
		//Cuando falla una validacion entra x la exception y saca un error al no tenerla.
		if (sizeof($errors)>0){
			throw new ValidationException($errors, "user is not valid");
		}	
	}

	*/
} // Fin del modelo de usuario
