-- Migration number: 0003 	 2025-06-20T14:50:33.157Z

CREATE TABLE IF NOT EXISTS users (
    id TEXT PRIMARY KEY ,
    name TEXT NOT NULL,
    phone TEXT NOT NULL,
    email TEXT NOT NULL,
    address TEXT NOT NULL,
    school TEXT NOT NULL,
    time TEXT NOT NULL
);

INSERT INTO users(id, name, phone, email, address, school, time) VALUES ('1', 'ahmed', '085732257048', 'ahmed@example.com', 'Pasuruan', 'SMK 1', '08:00');