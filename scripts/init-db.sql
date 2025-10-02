-- Initialize School Management Database
-- This script creates the necessary databases for the microservices

-- Create databases for each service
CREATE DATABASE IF NOT EXISTS user_service_db;
CREATE DATABASE IF NOT EXISTS academic_service_db;

-- Grant permissions
GRANT ALL PRIVILEGES ON DATABASE user_service_db TO postgres;
GRANT ALL PRIVILEGES ON DATABASE academic_service_db TO postgres;

-- Create a unified database for development
CREATE DATABASE IF NOT EXISTS school_management;

-- Grant permissions
GRANT ALL PRIVILEGES ON DATABASE school_management TO postgres;

-- Create extensions if needed
\c school_management;
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
