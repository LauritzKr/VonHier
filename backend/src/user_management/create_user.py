import sqlite3
import uuid
import bcrypt

from models.user import User


def create_user(user: User, password: str): 
  conn = sqlite3.connect('../db/vonHier.db')
  c = conn.cursor()
  sql = f'''
      INSERT INTO {User} (
          id, userName, image, firstName, name, email, telnr, street, housenr, postalcode, city, pwHash, salt
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  '''
  salt = bcrypt.gensalt()
  pwhash = bcrypt.hashpw(password.encode('utf-8'), salt)
  user_id = uuid.uuid4()

  values = (
    user.id, user.username, user.image, user.firstName, 
    user.lastName, user.email, user.telNr, user.street, 
    user.housenr, user.postalCode, user.city, pwhash.decode('utf-8'), 
    salt.decode('utf-8')
  )
  c.execute(sql, values)
  conn.commit()
  conn.close()
  return {"id": user_id, "message": "User created successfully!"}
