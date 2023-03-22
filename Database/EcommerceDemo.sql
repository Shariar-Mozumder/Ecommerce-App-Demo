USE [master]
GO

/****** Object:  Database [EcommerceDemo]    Script Date: 3/23/2023 3:29:13 AM ******/
CREATE DATABASE [EcommerceDemo]
 CONTAINMENT = NONE
 ON  PRIMARY 
( NAME = N'EcommerceDemo_Data', FILENAME = N'C:\Program Files\Microsoft SQL Server\MSSQL16.SQLEXPRESS\MSSQL\DATA\EcommerceDemo.mdf' , SIZE = 8192KB , MAXSIZE = UNLIMITED, FILEGROWTH = 1024KB )
 LOG ON 
( NAME = N'EcommerceDemo_Log', FILENAME = N'C:\Program Files\Microsoft SQL Server\MSSQL16.SQLEXPRESS\MSSQL\DATA\EcommerceDemo.ldf' , SIZE = 8192KB , MAXSIZE = 2048GB , FILEGROWTH = 10%)
 WITH CATALOG_COLLATION = DATABASE_DEFAULT, LEDGER = OFF
GO

IF (1 = FULLTEXTSERVICEPROPERTY('IsFullTextInstalled'))
begin
EXEC [EcommerceDemo].[dbo].[sp_fulltext_database] @action = 'enable'
end
GO

ALTER DATABASE [EcommerceDemo] SET ANSI_NULL_DEFAULT OFF 
GO

ALTER DATABASE [EcommerceDemo] SET ANSI_NULLS OFF 
GO

ALTER DATABASE [EcommerceDemo] SET ANSI_PADDING OFF 
GO

ALTER DATABASE [EcommerceDemo] SET ANSI_WARNINGS OFF 
GO

ALTER DATABASE [EcommerceDemo] SET ARITHABORT OFF 
GO

ALTER DATABASE [EcommerceDemo] SET AUTO_CLOSE OFF 
GO

ALTER DATABASE [EcommerceDemo] SET AUTO_SHRINK OFF 
GO

ALTER DATABASE [EcommerceDemo] SET AUTO_UPDATE_STATISTICS ON 
GO

ALTER DATABASE [EcommerceDemo] SET CURSOR_CLOSE_ON_COMMIT OFF 
GO

ALTER DATABASE [EcommerceDemo] SET CURSOR_DEFAULT  GLOBAL 
GO

ALTER DATABASE [EcommerceDemo] SET CONCAT_NULL_YIELDS_NULL OFF 
GO

ALTER DATABASE [EcommerceDemo] SET NUMERIC_ROUNDABORT OFF 
GO

ALTER DATABASE [EcommerceDemo] SET QUOTED_IDENTIFIER OFF 
GO

ALTER DATABASE [EcommerceDemo] SET RECURSIVE_TRIGGERS OFF 
GO

ALTER DATABASE [EcommerceDemo] SET  DISABLE_BROKER 
GO

ALTER DATABASE [EcommerceDemo] SET AUTO_UPDATE_STATISTICS_ASYNC OFF 
GO

ALTER DATABASE [EcommerceDemo] SET DATE_CORRELATION_OPTIMIZATION OFF 
GO

ALTER DATABASE [EcommerceDemo] SET TRUSTWORTHY OFF 
GO

ALTER DATABASE [EcommerceDemo] SET ALLOW_SNAPSHOT_ISOLATION OFF 
GO

ALTER DATABASE [EcommerceDemo] SET PARAMETERIZATION SIMPLE 
GO

ALTER DATABASE [EcommerceDemo] SET READ_COMMITTED_SNAPSHOT OFF 
GO

ALTER DATABASE [EcommerceDemo] SET HONOR_BROKER_PRIORITY OFF 
GO

ALTER DATABASE [EcommerceDemo] SET RECOVERY SIMPLE 
GO

ALTER DATABASE [EcommerceDemo] SET  MULTI_USER 
GO

ALTER DATABASE [EcommerceDemo] SET PAGE_VERIFY CHECKSUM  
GO

ALTER DATABASE [EcommerceDemo] SET DB_CHAINING OFF 
GO

ALTER DATABASE [EcommerceDemo] SET FILESTREAM( NON_TRANSACTED_ACCESS = OFF ) 
GO

ALTER DATABASE [EcommerceDemo] SET TARGET_RECOVERY_TIME = 60 SECONDS 
GO

ALTER DATABASE [EcommerceDemo] SET DELAYED_DURABILITY = DISABLED 
GO

ALTER DATABASE [EcommerceDemo] SET ACCELERATED_DATABASE_RECOVERY = OFF  
GO

ALTER DATABASE [EcommerceDemo] SET QUERY_STORE = OFF
GO

ALTER DATABASE [EcommerceDemo] SET  READ_WRITE 
GO
