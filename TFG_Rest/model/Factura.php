<?php

require_once(__DIR__."/../core/ValidationException.php");
// Modelo de la entidad factura de la BD
class Factura_Model implements JsonSerializable{
	private $id;
	private $id_cliente;
	private $fecha_factura;
	private $pagado;
	private $fecha_pagado;
	private $generado;

	// Constructor de factura
	public function __construct($id=NULL,$id_cliente=NULL,$fecha_factura=NULL, $pagado=NULL, $fecha_pagado=NULL,$generado=NULL) {
		$this->id = $id;
		$this->id_cliente = $id_cliente;
		$this->fecha_factura = $fecha_factura;
		$this->pagado = $pagado;
		$this->fecha_pagado = $fecha_pagado;
		$this->generado = $generado;
	}

// Métodos observadores y modificadores de los atributos de la entidad factura
	public function getId() {
		return $this->id;
	}

	public function setId($id) {
		$this->id = $id;
	}	

	public function getId_cliente() {
		return $this->id_cliente;
	}
	
	public function setId_cliente($id_cliente) {
		$this->id_cliente = $id_cliente;
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

	public function getGenerado() {
		return $this->generado;
	}	

	public function setGenerado($generado) {
		$this->generado = $generado;
	}


    public function jsonSerialize()
    {
        $vars = get_object_vars($this);
        return $vars;
    }
	
} // Fin del modelo de factura
