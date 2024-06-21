import sqlite3
import os

# Get the absolute path to your SQLite database file
database_path = 'C:/Users/A200017607/3_Hochschule/VonHier/backend/db/vonHier.db'  # Replace with your actual path
if not os.path.isfile(database_path):
    raise FileNotFoundError(f"The database file '{database_path}' does not exist.")

# Connect to the SQLite database
conn = sqlite3.connect(database_path)
cursor = conn.cursor()

# Check if the "Offer" table exists
cursor.execute("SELECT name FROM sqlite_master WHERE type='table' AND name='Offer';")
table_exists = cursor.fetchone()
if table_exists:
    # Delete all rows from the "Offer" table
    cursor.execute("DELETE FROM Offer;")
    conn.commit()
    print("All rows deleted from the 'Offer' table.")
else:
    print("The 'Offer' table does not exist in the database.")

# Close the connection
conn.close()
