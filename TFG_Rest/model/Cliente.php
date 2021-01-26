<?php

require_once(__DIR__."/../core/ValidationException.php");
// Modelo de la entidad cliente de la BD
class Cliente_Model implements JsonSerializable{
	private $id;
	private $razon_social;
	private $nombre_comercial;
	private $direccion;
	private $ciudad;
	private $codigo_postal;
	private $telefono;
	private $cif;
	private $email;

	// Constructor de Cliente
	public function __construct($id=NULL,$razon_social=NULL, $nombre_comercial=NULL, $direccion=NULL, $ciudad=NULL, $codigo_postal=NULL, $telefono=NULL, $cif=NULL, $email=NULL) {
		$this->id = $id;
		$this->razon_social = $razon_social;
		$this->nombre_comercial = $nombre_comercial;
		$this->direccion = $direccion;
		$this->ciudad = $ciudad;
		$this->codigo_postal = $codigo_postal;
		$this->telefono = $telefono;
		$this->cif = $cif;
		$this->email = $email;
	}
// Métodos observadores y modificadores de los atributos de la entidad usurio
	public function getId() {
		return $this->id;
	}

	public function setId($id) {
		$this->id = $id;
	}	

	public function getRazon_social() {
		return $this->razon_social;
	}
	
	public function setRazon_social($razon_social) {
		$this->razon_social = $razon_social;
	}

	public function getNombre_comercial() {
		return $this->nombre_comercial;
	}
	
	public function setNombre_comercial($nombre_comercial) {
		$this->nombre_comercial = $nombre_comercial;
	}

	public function getDireccion() {
		return $this->direccion;
	}	

	public function setDireccion($direccion) {
		$this->direccion = $direccion;
	}

	public function getCiudad() {
		return $this->ciudad;
	}	

	public function setCiudad($ciudad) {
		$this->ciudad = $ciudad;
	}

	public function getCodigo_postal() {
		return $this->codigo_postal;
	}	

	public function setCodigo_postal($codigo_postal) {
		$this->codigo_postal = $codigo_postal;
	}

	public function getTelefono() {
		return $this->telefono;
	}	

	public function setTelefono($telefono) {
		$this->telefono = $telefono;
	}

	public function getCif() {
		return $this->cif;
	}	

	public function setCif($cif) {
		$this->cif = $cif;
	}

	public function getEmail() {
		return $this->email;
	}

	public function setEmail($email) {
		$this->email = $email;
	}
	

    public function jsonSerialize()
    {
        $vars = get_object_vars($this);
        return $vars;
    }
	
} // Fin del modelo de cliente
