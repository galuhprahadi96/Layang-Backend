-- phpMyAdmin SQL Dump
-- version 5.0.3
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Oct 23, 2020 at 03:09 PM
-- Server version: 10.4.14-MariaDB
-- PHP Version: 7.4.11

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `webchat`
--

-- --------------------------------------------------------

--
-- Table structure for table `chatroom`
--

CREATE TABLE `chatroom` (
  `chatroom_id` int(10) NOT NULL,
  `code_chatroom` varchar(5) NOT NULL,
  `receiver` int(10) NOT NULL,
  `sender` int(10) NOT NULL,
  `chatroom_created_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `friendlist`
--

CREATE TABLE `friendlist` (
  `friendlist_id` int(5) NOT NULL,
  `user_id` int(10) NOT NULL,
  `friend_id` int(10) NOT NULL,
  `friendlist_created_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `friendlist`
--

INSERT INTO `friendlist` (`friendlist_id`, `user_id`, `friend_id`, `friendlist_created_at`) VALUES
(14, 2, 3, '2020-10-23 07:27:05'),
(15, 1, 2, '2020-10-23 07:29:20'),
(16, 2, 1, '2020-10-23 10:17:35');

-- --------------------------------------------------------

--
-- Table structure for table `message`
--

CREATE TABLE `message` (
  `message_id` int(10) NOT NULL,
  `sender` int(10) NOT NULL,
  `getter` int(10) NOT NULL,
  `code_chatroom` varchar(5) NOT NULL,
  `message` mediumtext NOT NULL,
  `message_created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `user_id` int(5) NOT NULL,
  `user_name` varchar(150) NOT NULL,
  `user_email` varchar(150) NOT NULL,
  `user_password` varchar(150) NOT NULL,
  `user_phone` varchar(15) NOT NULL,
  `user_image` varchar(150) NOT NULL,
  `user_key` varchar(5) NOT NULL,
  `user_lat` varchar(30) DEFAULT NULL,
  `user_lng` varchar(30) DEFAULT NULL,
  `user_status` int(1) NOT NULL,
  `user_created_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `user_update_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`user_id`, `user_name`, `user_email`, `user_password`, `user_phone`, `user_image`, `user_key`, `user_lat`, `user_lng`, `user_status`, `user_created_at`, `user_update_at`) VALUES
(1, 'john', 'jhon@gmail.com', '$2b$10$1klY18agj98B.fC30ysJ.eKTKo98UIchNn8sWeG.12GdrIUzbCvp6', '082240157378', '2020-10-18T17-17-36.482Z-nature-3181144.jpg', '0', '-8.042982799999999', '111.659132', 1, '2020-10-23 13:07:07', '0000-00-00 00:00:00'),
(2, 'galuh', 'galuh@gmail.com', '$2b$10$zuuzKfqI.Nv8mmA8mAOm4OS/8g8kz4IFO5IWmXDAghFLScITDLtYu', '082240157378', '2020-10-23T07-28-27.141Z-jhon.jpeg', '0', '-8.0711165', '111.7331579', 1, '2020-10-23 10:16:11', '0000-00-00 00:00:00'),
(3, 'Mark', 'mark@gmail.com', '$2b$10$Koa8ghSIWR1DPDDJUnLnU.jpxhsGeP.0.D/wSg.zaxr3stYgBRL5.', '080000000000', 'profile.png', '0', '-8.0711165', '111.7331579', 1, '2020-10-23 10:23:01', '0000-00-00 00:00:00');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `chatroom`
--
ALTER TABLE `chatroom`
  ADD PRIMARY KEY (`chatroom_id`);

--
-- Indexes for table `friendlist`
--
ALTER TABLE `friendlist`
  ADD PRIMARY KEY (`friendlist_id`);

--
-- Indexes for table `message`
--
ALTER TABLE `message`
  ADD PRIMARY KEY (`message_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`user_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `chatroom`
--
ALTER TABLE `chatroom`
  MODIFY `chatroom_id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=109;

--
-- AUTO_INCREMENT for table `friendlist`
--
ALTER TABLE `friendlist`
  MODIFY `friendlist_id` int(5) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT for table `message`
--
ALTER TABLE `message`
  MODIFY `message_id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=129;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `user_id` int(5) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
