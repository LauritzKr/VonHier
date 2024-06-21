from typing import Optional
from fastapi import FastAPI, File, Form, Query, UploadFile
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
import uvicorn

# from models.user import User
# from user_management.create_user import create_user
# from offer_endpoints.post_offer import post_offer
# from offer_endpoints.delete_offer_by_id import delete_offer_by_id
# from offer_endpoints.get_all_offers import get_all_offers
# from offer_endpoints.get_offer_by_id import get_offer_by_id
# from offer_endpoints.get_offerImage_by_offerId import get_offerimage_by_offerid

from models.user import User
from user_management.create_user import create_user
from offer_endpoints.post_offer import post_offer
from offer_endpoints.delete_offer_by_id import delete_offer_by_id
from offer_endpoints.get_all_offers import get_all_offers
from offer_endpoints.get_offer_by_id import get_offer_by_id
from offer_endpoints.get_offerImage_by_offerId import get_offerimage_by_offerid

# App config
app = FastAPI()

app.add_middleware(
  CORSMiddleware,
  allow_origins=["*"],
  allow_credentials=True,
  allow_methods=["*"],
  allow_headers=["*"],
)


# Get all offers
@app.get("/offers")
async def list_offers(title: Optional[str] = Query(None)):
  return JSONResponse(content=get_all_offers(title)) 

# Get offer by id
@app.get("/offer/{id}")
async def fetch_offer(id):
  return get_offer_by_id(id)

@app.get("/offer-image/{offer_id}")
async def offer_image(offer_id: str):
  return get_offerimage_by_offerid(offer_id)

# Post offer
@app.post("/offers")
async def create_offer(
    id: str = Form(...),
    title: str = Form(...),
    description: str = Form(...),
    user_id: str = Form(...),
    type: str = Form(...),
    active: bool = Form(...),
    views: int = Form(...),
    image: UploadFile = File(...)
  ):
  return post_offer(id, title, description, user_id, type, active, views, image)

# Delete offer by id
@app.delete("/offer/{id}")
async def delete_offer(id):
  return delete_offer_by_id(id)


# Post user
@app.post("/register")
async def post_user(user: User, password: str):
  return create_user(user, password)


# Run app
if __name__ == "__main__":
  uvicorn.run(app, host="0.0.0.0", port="8080")
