import os
import sqlite3

from fastapi import HTTPException
from fastapi.responses import FileResponse


def get_offerimage_by_offerid(offer_id):
  connection = sqlite3.connect("../db/vonHier.db")
  cursor = connection.cursor()
  cursor.execute("SELECT image FROM Offer WHERE id = ?", (offer_id,))
  row = cursor.fetchone()
  connection.close()

  image_path = row[0]
  if image_path and os.path.exists(image_path):
    return FileResponse(image_path)
  else:
    raise HTTPException(status_code=404, detail="Image not found")
