<?php
require_once(__DIR__."/../core/PDOConnection.php");
// Mapeador para las acciones relacionadas con los artículos
class Articulo_Mapper {	
	private $db;
	public function __construct() {
		$this->db = PDOConnection::getInstance();
	}
	// Para insertar un nuevo artículo en el sistema
	public function insertarArticulo($articulo) {
		$stmt = $this->db->prepare("INSERT INTO articulos values(?,?,?,?,?,?,?,?,?)"); 
		$stmt->execute(array($articulo->getCodigo(),$articulo->getNombre(), $articulo->getDescripcion(), $articulo->getProveedor(), $articulo->getPrecio_compra(), $articulo->getRentabilidad(), $articulo->getPrecio_venta(), $articulo->getIva(), $articulo->getStock()));
	}

    //Para editar un artículo en el sistema
    public function editarArticulo($articulo){
        $stmt = $this->db->prepare("UPDATE articulos SET nombre=? , descripcion=?, proveedor=?, precio_compra=?, rentabilidad=?, precio_venta=?, iva=?, stock=? WHERE codigo = ?");
        $resul = $stmt->execute(array($articulo->getNombre(), $articulo->getDescripcion(), $articulo->getProveedor(), $articulo->getPrecio_compra(), $articulo->getRentabilidad(), $articulo->getPrecio_venta(), $articulo->getIva(), $articulo->getStock(),$articulo->getCodigo()));
        return $resul;

    }
	// Para saber si ya existe un articulo registrado en el sistema con el email indicado (sólo un articulo por email)
	public function articuloExiste($codigoArticulo) {
		$stmt = $this->db->prepare("SELECT count(codigo) FROM articulos where codigo=?");
		$stmt->execute(array($codigoArticulo));
		if ($stmt->fetchColumn() > 0) {
			return true;
		}
	}

    //Devuelve todos los artículos del sistema
	public function getArticulos() {
        $stmt = $this->db->prepare("SELECT * from articulos");
        $stmt->execute();
        $resul = $stmt->fetchAll(PDO::FETCH_ASSOC);
        return $resul;
    } 


    //Devuelve los datos de un unico artículo.
	public function getArticulo($codigo) {
        $stmt = $this->db->prepare("SELECT * from articulos where codigo=?");
        $stmt->execute(array($codigo));
        $resul = $stmt->fetchAll(PDO::FETCH_ASSOC);
        return $resul;
    } 

    //Elimina un artículo de la base de datos.
    public function eliminarArticulos($codigo)
    {
        $stmt = $this->db->prepare("DELETE from articulos WHERE codigo = ?");
        $resul = $stmt->execute(array($codigo));
        return $resul;
    }
}