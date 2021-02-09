<?php

require_once(__DIR__."/../core/ValidationException.php");
// Modelo de la entidad usuario de la BD
class Usuario_Model implements JsonSerializable{
	private $uuid;
	private $email;
	private $password;
	private $nombre;
	private $apellidos;
	private $administrador;
	// Constructor de Usuario
	public function __construct($uuid=NULL,$email=NULL, $password=NULL, $nombre=NULL, $apellidos=NULL, $administrador=NULL) {
		$this->uuid = $uuid;
		$this->email = $email;
		$this->password = $password;
		$this->nombre = $nombre;
		$this->apellidos = $apellidos;
		$this->administrador = $administrador;
	}
// Métodos observadores y modificadores de los atributos de la entidad usurio
	public function getUuid() {
		return $this->uuid;
	}

	public function setUuid($uuid) {
		$this->uuid = $uuid;
	}	

	public function getEmail() {
		return $this->email;
	}

	public function setEmail($email) {
		$this->email = $email;
	}

	public function getPassword() {
		return $this->password;
	}
	
	public function setPassword($password) {
		$this->password = $password;
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

	public function getAdministrador() {
		return $this->administrador;
	}	

	public function setAdministrador($administrador) {
		$this->administrador = $administrador;
	}
	

	// Para validar los campos en la creación de una nuevo usuario en la BD
	public function validacionRegistro() {
		$errors = array();
		if (strlen($this->email) < 5) {
			$errors["email"] = "Email must be at least 5 characters length";
		}		
		if (strlen($this->password) < 2) {
			$errors["password"] = "password must be at least 5 characters length";
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

    public function jsonSerialize()
    {
        $vars = get_object_vars($this);
        return $vars;
    }
	
} // Fin del modelo de usuario
