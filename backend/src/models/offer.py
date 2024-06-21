from pydantic import BaseModel

class Offer(BaseModel):
  id: str
  title: str
  description: str
  userId: str
  type: str
  image: str
  active: bool
  views: int
