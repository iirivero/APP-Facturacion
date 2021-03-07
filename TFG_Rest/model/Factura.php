<?php

require_once(__DIR__."/../core/ValidationException.php");
// Modelo de la entidad factura de la BD
class Factura_Model implements JsonSerializable{
	private $id;
	private $fecha_factura;
	private $pagado;
	private $fecha_pagado;

	// Constructor de factura
	public function __construct($id=NULL,$fecha_factura=NULL, $pagado=NULL, $fecha_pagado=NULL) {
		$this->id = $id;
		$this->fecha_factura = $fecha_factura;
		$this->pagado = $pagado;
		$this->fecha_pagado = $fecha_pagado;
	}

// Métodos observadores y modificadores de los atributos de la entidad factura
	public function getId() {
		return $this->id;
	}

	public function setId($id) {
		$this->id = $id;
	}	

	public function getFecha_factura() {
		return $this->fecha_factura;
	}
	
	public function setFecha_factura($fecha_factura) {
		$this->fecha_factura = $fecha_factura;
	}

	public function getPagado() {
		return $this->pagado;
	}	

	public function setPagado($pagado) {
		$this->pagado = $pagado;
	}

	public function getFecha_pagado() {
		return $this->fecha_pagado;
	}	

	public function setFecha_pagado($fecha_pagado) {
		$this->fecha_pagado = $fecha_pagado;
	}


    public function jsonSerialize()
    {
        $vars = get_object_vars($this);
        return $vars;
    }
	
} // Fin del modelo de factura
