import type BetterSqlite3 from 'better-sqlite3';
import path from 'node:path';
import fs from 'node:fs';
import {rooms} from '@/data/rooms';

type SqliteDb = BetterSqlite3.Database;
let db: SqliteDb | undefined;

function isBuildPhase() {
  return process.env.NEXT_PHASE === 'phase-production-build';
}

function seed(database: SqliteDb) {
  database.transaction(() => {
    const count = (database.prepare('SELECT COUNT(*) count FROM room_types').get() as {count: number}).count;
    if (count) return;
    const insertType = database.prepare('INSERT INTO room_types(room_type,slug,description,total_rooms,capacity_adults,capacity_children,base_price,images,features) VALUES(?,?,?,?,?,?,?,?,?)');
    const insertRoom = database.prepare('INSERT INTO rooms(room_type_id,room_number) VALUES(?,?)');
    let seq = 101;
    for (const r of rooms) {
      const info = insertType.run(r.name, r.slug, r.description, r.totalRooms, r.capacityAdults, r.capacityChildren, r.basePrice, JSON.stringify([r.image]), JSON.stringify(r.features));
      for (let i = 0; i < r.totalRooms; i++) insertRoom.run(info.lastInsertRowid, String(seq++));
    }
  })();
}

export function getDb(): SqliteDb {
  if (db) return db;
  if (isBuildPhase()) throw new Error('Veritabanı derleme sırasında açılmaz.');
  const Database = require('better-sqlite3') as typeof import('better-sqlite3');
  const serverless = Boolean(process.env.VERCEL);
  const dbDir = serverless ? path.join('/tmp', 'mavi-kadraj-data') : path.join(process.cwd(), 'data');
  fs.mkdirSync(dbDir, {recursive: true});
  const instance = new Database(path.join(dbDir, 'booking.sqlite'));
  instance.pragma(serverless ? 'journal_mode = DELETE' : 'journal_mode = WAL');
  instance.pragma('foreign_keys = ON');
  instance.pragma('busy_timeout = 5000');
  instance.exec(`
CREATE TABLE IF NOT EXISTS room_types(id INTEGER PRIMARY KEY AUTOINCREMENT,room_type TEXT NOT NULL,slug TEXT NOT NULL UNIQUE,description TEXT NOT NULL,total_rooms INTEGER NOT NULL CHECK(total_rooms>=0),capacity_adults INTEGER NOT NULL,capacity_children INTEGER NOT NULL,base_price INTEGER NOT NULL,active INTEGER NOT NULL DEFAULT 1,images TEXT NOT NULL,features TEXT NOT NULL,created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP);
CREATE TABLE IF NOT EXISTS rooms(id INTEGER PRIMARY KEY AUTOINCREMENT,room_type_id INTEGER NOT NULL,room_number TEXT NOT NULL UNIQUE,active INTEGER NOT NULL DEFAULT 1,FOREIGN KEY(room_type_id) REFERENCES room_types(id));
CREATE TABLE IF NOT EXISTS reservations(id INTEGER PRIMARY KEY AUTOINCREMENT,reservation_number TEXT NOT NULL UNIQUE,room_type_id INTEGER NOT NULL,room_id INTEGER NOT NULL,check_in TEXT NOT NULL,check_out TEXT NOT NULL,adults INTEGER NOT NULL,children INTEGER NOT NULL DEFAULT 0,status TEXT NOT NULL CHECK(status IN ('PENDING','CONFIRMED','CANCELLED')),payment_status TEXT NOT NULL DEFAULT 'UNPAID',payment_method TEXT,total_amount INTEGER NOT NULL,currency TEXT NOT NULL DEFAULT 'TRY',notes TEXT,created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,FOREIGN KEY(room_type_id) REFERENCES room_types(id),FOREIGN KEY(room_id) REFERENCES rooms(id),CHECK(check_out>check_in));
CREATE TABLE IF NOT EXISTS reservation_guests(id INTEGER PRIMARY KEY AUTOINCREMENT,reservation_id INTEGER NOT NULL,first_name TEXT NOT NULL,last_name TEXT NOT NULL,phone TEXT NOT NULL,email TEXT NOT NULL,is_primary INTEGER NOT NULL DEFAULT 1,FOREIGN KEY(reservation_id) REFERENCES reservations(id) ON DELETE CASCADE);
CREATE TABLE IF NOT EXISTS blocked_dates(id INTEGER PRIMARY KEY AUTOINCREMENT,room_id INTEGER,room_type_id INTEGER,start_date TEXT NOT NULL,end_date TEXT NOT NULL,reason TEXT,created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,FOREIGN KEY(room_id) REFERENCES rooms(id),FOREIGN KEY(room_type_id) REFERENCES room_types(id),CHECK(end_date>start_date));
CREATE INDEX IF NOT EXISTS idx_reservation_dates ON reservations(room_id,check_in,check_out,status);CREATE INDEX IF NOT EXISTS idx_blocked_dates ON blocked_dates(room_id,start_date,end_date);
`);
  seed(instance);
  db = instance;
  return db;
}
