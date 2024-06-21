import sqlite3

def delete_offer_by_id(id):
  connection = sqlite3.connect("../db/vonHier.db")
  cursor = connection.cursor()
  cursor.execute("DELETE FROM Offer WHERE id = ?", (id,))
  connection.commit()
  rows_deleted = cursor.rowcount
  connection.close()
  
  if rows_deleted == 0:
    return {"Error": "No offer found with the given ID."}
  else:
    return {"Success": "Offer deleted successfully!"}
