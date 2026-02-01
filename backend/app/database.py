from pymongo import MongoClient
from flask import current_app

class Database:
    _client = None
    _db = None
    
    @classmethod
    def initialize(cls, mongo_uri, db_name):
        """Initialize MongoDB connection"""
        cls._client = MongoClient(mongo_uri)
        cls._db = cls._client[db_name]
        
    @classmethod
    def get_db(cls):
        """Get database instance"""
        if cls._db is None:
            mongo_uri = current_app.config.get('MONGODB_URI', 'mongodb://localhost:27017')
            db_name = current_app.config.get('MONGODB_DB', 'care4u')
            cls.initialize(mongo_uri, db_name)
        return cls._db
    
    @classmethod
    def get_collection(cls, collection_name):
        """Get a specific collection"""
        db = cls.get_db()
        return db[collection_name]
