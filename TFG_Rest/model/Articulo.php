<?php

require_once(__DIR__."/../core/ValidationException.php");
// Modelo de la entidad artículo de la BD
class Articulo_Model implements JsonSerializable{
	private $codigo;
	private $nombre;
	private $descripcion;
	private $proveedor;
	private $precio_compra;
	private $rentabilidad;
	private $precio_venta;
	private $iva;
	private $stock;

	// Constructor de artículo
	public function __construct($codigo=NULL,$nombre=NULL, $descripcion=NULL, $proveedor=NULL, $precio_compra=NULL, $rentabilidad=NULL, $precio_venta=NULL, $iva=NULL, $stock=NULL) {
		$this->codigo = $codigo;
		$this->nombre = $nombre;
		$this->descripcion = $descripcion;
		$this->proveedor = $proveedor;
		$this->precio_compra = $precio_compra;
		$this->rentabilidad = $rentabilidad;
		$this->precio_venta = $precio_venta;
		$this->iva = $iva;
		$this->stock = $stock;
	}
// Métodos observadores y modificadores de los atributos de la entidad artículo
	public function getCodigo() {
		return $this->codigo;
	}

	public function setCodigo($codigo) {
		$this->codigo = $codigo;
	}	

	public function getNombre() {
		return $this->nombre;
	}
	
	public function setNombre($nombre) {
		$this->nombre = $nombre;
	}

	public function getDescripcion() {
		return $this->descripcion;
	}
	
	public function setDescripcion($descripcion) {
		$this->descripcion = $descripcion;
	}

	public function getProveedor() {
		return $this->proveedor;
	}	

	public function setProveedor($proveedor) {
		$this->proveedor = $proveedor;
	}

	public function getPrecio_compra() {
		return $this->precio_compra;
	}	

	public function setPrecio_compra($precio_compra) {
		$this->precio_compra = $precio_compra;
	}

	public function getRentabilidad() {
		return $this->rentabilidad;
	}	

	public function setRentabilidad($rentabilidad) {
		$this->rentabilidad = $rentabilidad;
	}

	public function getPrecio_venta() {
		return $this->precio_venta;
	}	

	public function setPrecio_venta($precio_venta) {
		$this->precio_venta = $precio_venta;
	}

	public function getIva() {
		return $this->iva;
	}	

	public function setIva($iva) {
		$this->iva = $iva;
	}

	public function getStock() {
		return $this->stock;
	}

	public function setStock($stock) {
		$this->stock = $stock;
	}
	

    public function jsonSerialize()
    {
        $vars = get_object_vars($this);
        return $vars;
    }
	
} // Fin del modelo de artículo
