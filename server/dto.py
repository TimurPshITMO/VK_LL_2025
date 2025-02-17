from typing import List
from pydantic import BaseModel

class Request(BaseModel):
    cpm: int
    hour_start: int
    hour_end: int
    publishers: List[int]
    audience_size: int
    user_ids: List[int]


class Response(BaseModel):
    at_least_one: int
    at_least_two: int
    at_least_three: int
    
