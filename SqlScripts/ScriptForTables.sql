 CREATE TABLE users(
    userID BIGSERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    DOB DATE NOT NULL,
    gender VARCHAR(10) CHECK (gender IN ('Male', 'Female', 'Other')),
    bloodGroup VARCHAR(5) CHECK (bloodGroup IN ('A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-')),
    contact VARCHAR(15) UNIQUE NOT NULL,
    email VARCHAR(150) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    address TEXT NOT NULL,
    city VARCHAR(50) NOT NULL,
    state VARCHAR(50) NOT NULL,
    zipCode VARCHAR(10) NOT NULL,
    eligible BOOLEAN DEFAULT TRUE,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP(0)
);

 CREATE TABLE hospitals(
    hospitalID BIGSERIAL PRIMARY KEY,
    name VARCHAR(150) NOT NULL,
    address TEXT NOT NULL,
    city VARCHAR(50) NOT NULL, 
    state VARCHAR(50) NOT NULL,
    zipCode VARCHAR(10),
    contact VARCHAR(15) NOT NULL,
    email VARCHAR(100) UNIQUE
 );

 CREATE TABLE bloodStock(
    hospitalID BIGINT,
    bloodGroup VARCHAR(5) CHECK (bloodGroup IN ('A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-')),
    quantity INT NOT NULL CHECK( quantity >= 0),
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP(0),
    PRIMARY KEY (hospitalID, bloodGroup),
    FOREIGN KEY (hospitalID) REFERENCES hospitals(hospitalID) ON DELETE CASCADE
 );

 CREATE TABLE donations(
    donationID BIGSERIAL PRIMARY KEY,
    userID BIGINT REFERENCES users(userID) ON DELETE CASCADE,
    donatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP(0),
    quantity INT NOT NULL CHECK( quantity>0),
    hospitalID BIGINT REFERENCES hospitals(hospitalID) ON DELETE CASCADE
 );

 CREATE TABLE requests(
    reqID BIGSERIAL PRIMARY KEY,
    userID BIGINT REFERENCES users(userID) ON DELETE CASCADE,
    requestedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP(0),
    quantity INT CHECK (quantity > 0),
    hospitalID BIGINT REFERENCES hospitals(hospitalID) ON DELETE CASCADE,
    status VARCHAR(10) DEFAULT 'Pending' CHECK (status IN('Pending', 'Approved', 'Rejected')),
 );