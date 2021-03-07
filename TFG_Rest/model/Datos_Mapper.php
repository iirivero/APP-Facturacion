<?php
require_once(__DIR__."/../core/PDOConnection.php");
// Mapeador para las acciones relacionadas con los datos
class Datos_Mapper {  
    private $db;
    public function __construct() {
        $this->db = PDOConnection::getInstance();
    }
    
    //Permite editar los datos de la empresa.
    public function editarDatos($datos){
        $stmt = $this->db->prepare("UPDATE datos_empresa SET nombre=? , direccion=? , ciudad=? , codigo_postal=? , telefono=? , nif=? , email=? WHERE id = ?");
        $resul = $stmt->execute(array($datos->getNombre(), $datos->getDireccion(),$datos->getCiudad(), $datos->getCodigo_postal(), $datos->getTelefono(), $datos->getCif(), $datos->getEmail(),$datos->getId()));
        return $resul;

    }

    //Devuelve los datos de la empresa.
    public function getDatos() {
        $stmt = $this->db->prepare("SELECT * from datos_empresa");
        $stmt->execute();
        $resul = $stmt->fetchAll(PDO::FETCH_ASSOC);
        return $resul;

    } 
}