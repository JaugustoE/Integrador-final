-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 21-04-2022 a las 23:00:19
-- Versión del servidor: 10.4.22-MariaDB
-- Versión de PHP: 8.1.2

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `users`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `autorizados`
--

CREATE TABLE `autorizados` (
  `username` varchar(100) NOT NULL,
  `email` varchar(60) NOT NULL,
  `userpass` varchar(60) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `autorizados`
--

INSERT INTO `autorizados` (`username`, `email`, `userpass`) VALUES
('José Escobar ', 'augusto1979@hotmail.com', '044968981d35c947958587517ae8a454');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `products`
--

CREATE TABLE `products` (
  `id` int(11) NOT NULL,
  `nombre` varchar(5000) NOT NULL,
  `descripción` text NOT NULL,
  `image` varchar(5000) NOT NULL,
  `precio` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `products`
--

INSERT INTO `products` (`id`, `nombre`, `descripción`, `image`, `precio`) VALUES
(1, 'Mueble organizador', 'Realizamos diseños en autocad a medidas y personalizados en todos los motivos y colores disponibles en el mercado', 'IMG-20211122-WA0056organizador_dqvnyw', 50000),
(2, 'Muebles para tv1', 'Realizamos diseños en autocad a medidas y personalizados en todos los motivos y colores disponibles en el mercado', 'IMG-20211201-WA0035mueble_para_tv2_uijvvj', 35000),
(4, 'cama de 1 plaza', 'Realizamos diseños en autocad a medidas y personalizados en todos los motivos y colores disponibles en el mercado', 'IMG-20211122-WA0058cama1plazafuncional_fkgqwi', 65000),
(5, 'cama de cucheta funcional', 'Realizamos diseños en autocad a medidas y personalizados en todos los motivos y colores disponibles en el mercado', 'cama_cuchetas_yy94xg', 75000),
(6, 'Cama de 2 plazas funcionales', 'Realizamos diseños en autocad a medidas y personalizados en todos los motivos y colores disponibles en el mercado', 'IMG-20211201-WA0033_cama_de_2_plazas_funcionales_prrdnt', 85000),
(7, 'Vestidor', 'Realizamos diseños en autocad a medidas y personalizados en todos los motivos y colores disponibles en el mercado', 'IMG-20211122-WA0048vestidor2_yf8r8v', 150000),
(8, 'Muebles para la cocina', 'Realizamos diseños en autocad a medidas y personalizados en todos los motivos y colores disponibles en el mercado', 'kitchen-g88c9b5611_1280_q8l6he', 130000),
(9, 'Placares', 'Realizamos diseños en autocad a medidas y personalizados en todos los motivos y colores disponibles en el mercado', 'IMG-20211201-WA0041placar_zagskp', 150000),
(10, 'Vanitori', 'Realizamos diseños en autocad a medidas y personalizados en todos los motivos y colores disponibles en el mercado', 'IMG-20211119-WA0111vanitori2_ylgno9', 40000),
(11, 'Muebles para negocios', 'Realizamos diseños en autocad a medidas y personalizados en todos los motivos y colores disponibles en el mercado', 'IMG-20211201-WA0062mueblesparanegocios_l0wxbi', 100000);

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `products`
--
ALTER TABLE `products`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
