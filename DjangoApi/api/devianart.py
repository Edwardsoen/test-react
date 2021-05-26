
import requests
from PIL import Image
from io import BytesIO
from api.imagecheck import get_resolution
from api.imagecheck import AspectRatio

class DevianartSearch():
    def __init__(self, search, page, sort):
        self.search = search 
        self.page = page #page starts at 0 
        self.sort = sort
        # "order": "most-recent"
        self.dict = {"recent":"most-recent"} 

    def getData(self):
        try: 
            raw_data = self.devianart_request()
            cleandata = self.parse_response_devianart(raw_data)
            return cleandata
        except: 
            return []
            
    def devianart_request(self):
        data = { 
        "q": self.search,
        # "expand": "user.watch", 
        "page": self.page, 
        }   

        if self.sort == "recent": 
            data["order"] = self.dict[self.sort]

        url = "https://www.deviantart.com/_napi/da-browse/api/networkbar/search/deviations?"
        res = requests.get(url, params = data)
        return res.json()
     

    def parse_response_devianart(self, rawdata):
        # hashData = JSON.parse(rawdata)
        imagesData = []
        mainData = rawdata["deviations"]
        # print(mainData)
        for i in mainData:
            try:
                hashMap = {}
                url = i["url"] #NP
                media = i["media"]
                baseuri = media["baseUri"]
                prettyName = media["prettyName"]
                token = media["token"][0]
                types = media["types"][-1]["c"] #icon image resolution
                types = types.replace("<prettyName>", prettyName)
                iconLink = baseuri +"/"+ types + "?token=" + token
                hashMap["url"] = url 
                hashMap["icon"] = iconLink 

               

                imagesData.append(hashMap)
            except Exception as e: 
                # print(e)
                pass
        return imagesData
     


def test():
    
    a = DevianartSearch("cyberpunk", 1, "recent")
    d = a.getData()
    print(d[1]["icon"])
    image_raw = requests.get(d[1]["icon"])
    image = Image.open(BytesIO(image_raw.content))
    width, height = image.size
    print(width, height)
    
