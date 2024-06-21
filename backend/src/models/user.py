from pydantic import BaseModel
from typing import Optional

class User(BaseModel):
  id: str
  username: str
  image: Optional[str] = None
  firstName: str
  lastName: str
  email: str
  telNr: Optional[str] = None
  street: Optional[str] = None
  houseNr: Optional[str] = None
  postalCode: Optional[str] = None
  city: Optional[str] = None
  pwhash: Optional[str] = None
  salt: Optional[str] = None
