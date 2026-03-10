import os

class Config:
    SECRET_KEY = "mtaathrifting_secret"
    SQLALCHEMY_DATABASE_URI = "mysql+pymysql://mtaathrifting_user:mtaathrifting_secret@localhost:3306/mtaathrifting"
    SQLALCHEMY_TRACK_MODIFICATIONS = False