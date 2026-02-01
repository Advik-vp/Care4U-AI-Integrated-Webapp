from pymongo import MongoClient, ReturnDocument
from flask import current_app

_client = None


def _get_client():
    global _client
    if _client is None:
        uri = current_app.config.get('MONGODB_URI', 'mongodb://localhost:27017')
        _client = MongoClient(uri)
    return _client


def get_db():
    db_name = current_app.config.get('MONGODB_DB', 'care4u')
    return _get_client()[db_name]


def get_collection(name):
    return get_db()[name]


def get_next_sequence(name):
    counters = get_collection('counters')
    doc = counters.find_one_and_update(
        {'_id': name},
        {'$inc': {'value': 1}},
        upsert=True,
        return_document=ReturnDocument.AFTER
    )
    return doc['value']
