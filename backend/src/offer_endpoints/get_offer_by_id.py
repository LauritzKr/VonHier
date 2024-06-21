import sqlite3

def get_offer_by_id(id):
  connection = sqlite3.connect("../db/vonHier.db")
  cursor = connection.cursor()
  cursor.execute("SELECT * FROM Offer WHERE id = ?", (id,))
  row = cursor.fetchone()
  columns = [column[0] for column in cursor.description]
  connection.close()

  offer = dict(zip(columns, row))

  return {"data": offer}
