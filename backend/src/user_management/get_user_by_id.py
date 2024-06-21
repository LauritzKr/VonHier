import sqlite3
import uuid
import pydantic
from vonHier.backend.src.models.user import User


def get_user_by_id(user_id: uuid.UUID)->user:
    conn = sqlite3.connect('../../db/vonHier.db')
    cursor = conn.cursor()
    cursor.execute('SELECT * FROM users WHERE id = ?', (user_id,))
    user = cursor.fetchone()
    conn.close()
    if user is None:
        raise pydantic.ValidationError('User nicht gefunden')
    return user

if __name__ == '__main__':
    user = get_user_by_id(uuid.UUID('uuid-user-1'))
    print(user)
