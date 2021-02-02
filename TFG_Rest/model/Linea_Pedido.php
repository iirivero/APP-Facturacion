<?php

require_once(__DIR__."/../core/ValidationException.php");
// Modelo de la entidad cliente de la BD
class Linea_Pedido_Model implements JsonSerializable{
	private $id;
	private $id_pedido;
	private $codigo_articulo;
	private $cantidad;
	private $precio;
	private $iva;
	private $importe_iva;
	private $descuento;
	private $importe;

	// Constructor de Cliente
	public function __construct($id=NULL,$id_pedido=NULL, $codigo_articulo=NULL, $cantidad=NULL, $precio=NULL, $iva=NULL, $importe_iva=NULL, $descuento=NULL, $importe=NULL) {
		$this->id = $id;
		$this->id_pedido = $id_pedido;
		$this->codigo_articulo = $codigo_articulo;
		$this->cantidad = $cantidad;
		$this->precio = $precio;
		$this->iva = $iva;
		$this->importe_iva = $importe_iva;
		$this->descuento = $descuento;
		$this->importe = $importe;

	}
// Métodos observadores y modificadores de los atributos de la entidad usurio
	public function getId() {
		return $this->id;
	}

	public function setId($id) {
		$this->id = $id;
	}	

	public function getId_pedido() {
		return $this->id_pedido;
	}
	
	public function setId_pedido($id_pedido) {
		$this->id_pedido = $id_pedido;
	}

	public function getCodigo_articulo() {
		return $this->codigo_articulo;
	}	

	public function setCodigo_articulo($codigo_articulo) {
		$this->codigo_articulo = $codigo_articulo;
	}

	public function getCantidad() {
		return $this->cantidad;
	}	

	public function setCantidad($cantidad) {
		$this->cantidad = $cantidad;
	}

	public function getPrecio() {
		return $this->precio;
	}	

	public function setPrecio($precio) {
		$this->precio = $precio;
	}

	public function getIva() {
		return $this->iva;
	}	

	public function setIva($iva) {
		$this->iva = $iva;
	}

	public function getImporte_iva() {
		return $this->importe_iva;
	}	

	public function setImporte_iva($importe_iva) {
		$this->importe_iva = $importe_iva;
	}

	public function getDescuento() {
		return $this->descuento;
	}

	public function setDescuento($descuento) {
		$this->descuento = $descuento;
	}

	public function getImporte() {
		return $this->descuento;
	}

	public function setImporte($descuento) {
		$this->descuento = $descuento;
	}


    public function jsonSerialize()
    {
        $vars = get_object_vars($this);
        return $vars;
    }
	
} // Fin del modelo de cliente
