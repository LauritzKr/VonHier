import sqlite3
import bcrypt

def checkhash(email: str, password: str) -> bool:
  conn = sqlite3.connect('../../db/vonHier.db')
  cursor = conn.cursor()
  cursor.execute('SELECT pwHash, salt FROM user WHERE email = ?', (email,))
  result = cursor.fetchone()
  conn.close()
  
  stored_hash = result[0]
  salt = result[1].encode('utf-8')
  input_hash = bcrypt.hashpw(password.encode('utf-8'), salt)
  hash_match = stored_hash == input_hash
  return hash_match

if __name__ == '__main__':
  email = 'alice@example.com'
  password = 'password'
  checkhash(email, password)
