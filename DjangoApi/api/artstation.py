import requests
import json
from hashlib import md5
import urllib3
import _thread
import threading
import time
import queue
import asyncio



class ArtstationSearch():
    def __init__(self, search, page, showAdult, sort): #search = string , amount = integer
        self.search = search 
        self.page = page 
        self.showAdult = showAdult 
        self.sort = sort #relevance, likes, latest
        self.dict = {"recent": "date", "popular": "likes"}

    def getDataN(self):
        try: 
            raw_data = self.artstation_request()
            cleanData = self.parse_response(raw_data)
            return cleanData
        except: 
            return []


    def getData(self):
        try: 
            raw_data = self.artstation_request()
            cleanData = self.parse_response(raw_data)
            return cleanData
        except: 
            return []

    def artstation_request(self):
        data = {
            "additional_fields" :"[]", 
            "filters" :"[]", 
            "page" : self.page, #max 50 per page 
            "per_page": "50", 
            "pro_first": "0", 
            "query": self.search, 
            "sorting": self.dict[self.sort]
        }
        u = "https://www.artstation.com/api/v2/search/projects.json"
        res = requests.get(u, data = data)
        return res.json()



    def parse_response(self, rawdata):
        # hashData = eval(rawdata)
        mainData = rawdata["data"]
        imagesData = []
        for i in mainData: 
            hash = {}
            url = i["url"]
            icon = i["smaller_square_cover_url"]
            preserved_aspect_ratio_icon = icon.replace("smaller_square", "large")
            isAdult = i["hide_as_adult"]


            hash["url"] = url 
            hash["icon"] = icon 
            hash["isAdult"] = isAdult
            if self.showAdult:
                imagesData.append(hash)
            elif not self.showAdult and isAdult == False:
                imagesData.append(hash)
        return imagesData


async def test(search):
    print(search)
    a = ArtstationSearch(search, 1 , True, "popular")
    data = await a.getData()
    print(data[1])



def testn():
    a = ArtstationSearch("Cyberpunk", 1 , True, "popular")
    data = a.getDataN()
    print(data[1])




def test2(): 
    s = requests.session()
    url = "https://www.artstation.com/artwork/L3l1mP"
    headers = {
    "referer":'https://www.google.com/',
    "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8",
    "Accept-Encoding": "gzip, deflate, br",
    "Accept-Language": "en-US,en;q=0.5",
    "Connection": "keep-alive",
    "Cache-Control": "no-cache",
    "TE": "Trailers",
    "DNT":"1",
    "Host":"www.artstation.com",
    "Upgrade-Insecure-Requests":"1",
    "User-Agent":"Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:81.0) Gecko/20100101 Firefox/81.0"
    }

    r = s.get('https://www.artstation.com').cookies.get_dict
    r2 = s.get(url, headers = headers)
    print(r2.status_code)


async def main(): 
    print(f" ASYNC started at {time.strftime('%X')}")
    task1 = asyncio.create_task(test("cyberpunk"))
    task2 = asyncio.create_task(test("landscape"))
    await task1
    await task2
    print(f" ASYNC finished at {time.strftime('%X')}")
