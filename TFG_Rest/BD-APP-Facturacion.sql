-- phpMyAdmin SQL Dump
-- version 4.9.0.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 09-12-2020 a las 03:09:51
-- Versión del servidor: 10.4.6-MariaDB
-- Versión de PHP: 7.3.9

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

CREATE DATABASE appFacturacion;
USE appFacturacion;
--
-- Base de datos: `app-facturacion`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `clientes`
--

CREATE TABLE IF NOT EXISTS `clientes` (
  `id` int(11) NOT NULL,
  `razon_social` varchar(60) NOT NULL,
  `nombre_comercial` varchar(60) NOT NULL,
  `direccion` varchar(50) NOT NULL,
  `ciudad` varchar(20) NOT NULL,
  `codigo_postal` int(5) NOT NULL,
  `telefono` int(9) NOT NULL,
  `nif` varchar(20) NOT NULL,
  `email` varchar(65) NOT NULL,
  `numero_cuenta` varchar(24) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Estructura de tabla para la tabla `datos`
--

CREATE TABLE IF NOT EXISTS `datos_empresa` (
  `id` int(11) NOT NULL,
  `nombre` varchar(60) NOT NULL,
  `direccion` varchar(50) NOT NULL,
  `ciudad` varchar(20) NOT NULL,
  `codigo_postal` int(5) NOT NULL,
  `telefono` int(9) NOT NULL,
  `nif` varchar(20) NOT NULL,
  `email` varchar(65) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Estructura de tabla para la tabla `articulos`
--

CREATE TABLE IF NOT EXISTS `articulos` (
  `codigo` varchar(36) NOT NULL,
  `nombre` varchar(60) NOT NULL,
  `descripcion` varchar(600) NULL,
  `proveedor` varchar(30) NOT NULL,
  `precio_compra` decimal(10,2) NOT NULL,
  `rentabilidad` int(5) NOT NULL,
  `precio_venta` decimal(10,2) NOT NULL,
  `iva` int(2) NOT NULL,
  `stock` int(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Estructura de tabla para la tabla `pedidos`
--

CREATE TABLE IF NOT EXISTS `facturas` (
  `id` int(11) NOT NULL,
  `id_cliente` int(11) NOT NULL,
  `fecha_factura` DATETIME NOT NULL,
  `pagado` ENUM('Si','No') NOT NULL,
  `fecha_pagado` DATETIME DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;


--
-- Estructura de tabla para la tabla `pedidos`
--

CREATE TABLE IF NOT EXISTS `pedidos` (
  `id` int(11) NOT NULL,
  `id_cliente` int(11) NOT NULL,
  `fecha` DATETIME NOT NULL,
  `base_imponible` decimal(10,2) NOT NULL,
  `iva` decimal(10,2) NOT NULL,
  `total` decimal(10,2) NOT NULL,
  `facturado` ENUM('Si','No') NOT NULL,
  `id_factura` int(11) NULL  
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Estructura de tabla para la tabla `linea_pedido`
--

CREATE TABLE IF NOT EXISTS `linea_pedido` (
  `id` int(11) NOT NULL,
  `id_pedido` int(11) NOT NULL,
  `codigo_articulo` varchar(36) NOT NULL,
  `cantidad` int(10) NOT NULL,
  `precio` decimal(10,2) NOT NULL,
  `iva` int(2) NOT NULL,
  `importe_iva` decimal(10,2) NOT NULL,
  `descuento` decimal(10,2) NOT NULL,
  `importe` decimal(10,2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Estructura de tabla para la tabla `usuarios`
--

CREATE TABLE IF NOT EXISTS `usuarios` (
  `uuid` varchar(36) NOT NULL,
  `email` varchar(65) NOT NULL,
  `password` varchar(128) NOT NULL,
  `nombre` varchar(25) NOT NULL,
  `apellidos` varchar(45) NOT NULL,
  `administrador` ENUM('Si','No') NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;



-- --------------------------------------------------------

--
-- Volcado de datos para la tabla `usuarios`
--

INSERT INTO `usuarios` (`uuid`, `email`, `password`, `nombre`, `apellidos`,`administrador`) VALUES
(1, 'admin@gmail.com', '1f17a3253fa9090f21f48f6aa64909a4', 'admin', 'admin','Si');
INSERT INTO `usuarios` (`uuid`, `email`, `password`, `nombre`, `apellidos`,`administrador`) VALUES
(2, 'ivan@gmail.com', '1f17a3253fa9090f21f48f6aa64909a4', 'ivan', 'iglesias','No');
INSERT INTO `datos_empresa` (`id`,`nombre`,`direccion`,`ciudad`,`codigo_postal`,`telefono`,`nif`,`email`) VALUES
(1,'COFFEE GROUP 1889 BY GALICIA, S.L.','CL. VELÁZQUEZ, Nº 15 BAJO D','OURENSE',32002,660407908,'B-32497455','coffeegroup1889bygalicia@gmail.com');


--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `clientes`
--
ALTER TABLE `clientes`
  ADD PRIMARY KEY (`id`),
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1,
  ADD UNIQUE KEY `email` (`email`);

--
-- Indices de la tabla `datos`
--
ALTER TABLE `datos_empresa`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- Indices de la tabla `articulos`
--
ALTER TABLE `articulos`
  ADD PRIMARY KEY (`codigo`);

--
-- Indices de la tabla `facturas`
--
ALTER TABLE `facturas`
  ADD PRIMARY KEY (`id`),
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1,
  ADD FOREIGN KEY (`id_cliente`) REFERENCES `clientes`(`id`);

--
-- Indices de la tabla `pedidos`
--
ALTER TABLE `pedidos`
  ADD PRIMARY KEY (`id`),
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1,
  ADD FOREIGN KEY (`id_cliente`) REFERENCES `clientes`(`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD FOREIGN KEY (`id_factura`) REFERENCES `facturas`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Indices de la tabla `linea_pedido`
--
ALTER TABLE `linea_pedido`
  ADD PRIMARY KEY (`id`),
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1,
  ADD FOREIGN KEY (`id_pedido`) REFERENCES `pedidos`(`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD FOREIGN KEY (`codigo_articulo`) REFERENCES `articulos`(`codigo`) ON DELETE CASCADE ON UPDATE CASCADE;


--
-- Indices de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`uuid`),
  ADD UNIQUE KEY `email` (`email`);



--
-- AUTO_INCREMENT de las tablas volcadas
--



COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
