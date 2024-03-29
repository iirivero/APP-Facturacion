<?php

require_once(__DIR__."/../core/ValidationException.php");
// Modelo de la entidad pedido de la BD
class Pedido_Model implements JsonSerializable{
	private $id;
	private $id_cliente;
	private $fecha;
	private $base_imponible;
	private $iva;
	private $total;
	private $facturado;
	private $id_factura;
	private $generado;

	// Constructor de pedido
	public function __construct($id=NULL,$id_cliente=NULL, $fecha=NULL, $base_imponible=NULL, $iva=NULL, $total=NULL, $facturado=NULL,$id_factura=NULL,$generado=NULL) {
		$this->id = $id;
		$this->id_cliente = $id_cliente;
		$this->fecha = $fecha;
		$this->base_imponible = $base_imponible;
		$this->iva = $iva;
		$this->total = $total;
		$this->facturado = $facturado;
		$this->id_factura = $id_factura;
		$this->generado = $generado;
	}
// Métodos observadores y modificadores de los atributos de la entidad pedido
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

	public function getFecha() {
		return $this->fecha;
	}	

	public function setFecha($fecha) {
		$this->fecha = $fecha;
	}

	public function getBase_imponible() {
		return $this->base_imponible;
	}	

	public function setBase_imponible($base_imponible) {
		$this->base_imponible = $base_imponible;
	}

	public function getIva() {
		return $this->iva;
	}	

	public function setIva($iva) {
		$this->iva = $iva;
	}

	public function getTotal() {
		return $this->total;
	}	

	public function setTotal($total) {
		$this->total = $total;
	}

	public function getFacturado() {
		return $this->facturado;
	}	

	public function setFacturado($facturado) {
		$this->facturado = $facturado;
	}

	public function getId_factura() {
		return $this->id_factura;
	}	

	public function setId_factura($id_factura) {
		$this->id_factura = $id_factura;
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
	
} // Fin del modelo de pedido
