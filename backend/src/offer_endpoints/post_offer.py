import os
import shutil
import sqlite3
from fastapi import File, Form, UploadFile
from models.offer import Offer


UPLOAD_FOLDER = "uploaded_images"

def post_offer( 
    id: str = Form(...),
    title: str = Form(...),
    description: str = Form(...),
    user_id: str = Form(...),
    type: str = Form(...),
    active: bool = Form(...),
    views: int = Form(...),
    image: UploadFile = File(...)
  ):
  # Save the uploaded file to the UPLOAD_FOLDER
  file_location = os.path.join(UPLOAD_FOLDER, image.filename)

  # Create an Offer object
  offer = Offer(
      id=id,
      title=title,
      description=description,
      userId=user_id,
      type=type,
      image=file_location,
      active=active,
      views=views
  )

  connection = sqlite3.connect("../db/vonHier.db")
  cursor = connection.cursor()

  cursor.execute("""
      INSERT INTO Offer (id, title, description, userId, type, image, active, views)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  """, (offer.id, offer.title, offer.description, offer.userId, offer.type, offer.image, offer.active, offer.views))

  connection.commit()
  offer_id = cursor.lastrowid
  connection.close()

  with open(file_location, "wb") as file_object:
    shutil.copyfileobj(image.file, file_object)

  return {"id": offer_id, "message": "Offer created successfully!"}
