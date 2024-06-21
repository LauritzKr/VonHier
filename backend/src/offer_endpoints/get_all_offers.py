import sqlite3
from typing import Optional

def get_all_offers(title: Optional[str] = None):
  connection = sqlite3.connect('../db/vonHier.db')
  cursor = connection.cursor()
  if title:
    cursor.execute('SELECT * FROM Offer WHERE title LIKE ?', ('%' + title + '%',))
  else:
    cursor.execute('SELECT * FROM Offer')
  rows = cursor.fetchall()
  columns = [column[0] for column in cursor.description]
  connection.close()

  offers = []
  for row in rows:
    offer = dict(zip(columns, row))
    offers.append(offer)
  
  return {"data": offers}
