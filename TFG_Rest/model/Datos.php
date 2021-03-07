<?php

require_once(__DIR__."/../core/ValidationException.php");
// Modelo de la entidad datos de la BD
class Datos_Model implements JsonSerializable{
	private $id;
	private $nombre;
	private $direccion;
	private $ciudad;
	private $codigo_postal;
	private $telefono;
	private $nif;
	private $email;

	// Constructor de datos
	public function __construct($id=NULL,$nombre=NULL, $direccion=NULL, $ciudad=NULL, $codigo_postal=NULL, $telefono=NULL, $nif=NULL, $email=NULL) {
		$this->id = $id;
		$this->nombre = $nombre;
		$this->direccion = $direccion;
		$this->ciudad = $ciudad;
		$this->codigo_postal = $codigo_postal;
		$this->telefono = $telefono;
		$this->nif = $nif;
		$this->email = $email;
	}
// Métodos observadores y modificadores de los atributos de la entidad datos
	public function getId() {
		return $this->id;
	}

	public function setId($id) {
		$this->id = $id;
	}	

	public function getNombre() {
		return $this->nombre;
	}
	
	public function setNombre($nombre) {
		$this->nombre = $nombre;
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
		return $this->nif;
	}	

	public function setCif($nif) {
		$this->nif = $nif;
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
	
} // Fin del modelo de datos
