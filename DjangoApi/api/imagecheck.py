import os
import requests
from PIL import Image
from io import BytesIO


# class Resolution()





class AspectRatio(): 
    def __init__(self, x ,y ):
        self.x = x
        self.y = y; 

    def check_aspect_ratio(self): 
        is_mobile = self.is_mobile()
        is_wide = self.is_wide()
        is_landscape = self.is_landscape() 
        data = {"isMobile": is_mobile, 
            "isWide": is_wide, 
            "isLandscape": is_landscape
        }

    
    def is_mobile(self): 
        if self.y > self.x: 
            return True 
        else: 
            return False

    def is_wide(self):
        #21:9 aspect ratio 
        if self.x / self.y > 2.3: 
            return True 
        else: 
            return False

    def is_landscape(self):
        # 16:9 aspect ratio 
        if self.x / self.y > 1.7: 
            return True 
        else: 
            return False
     
        
         
def get_resolution(link): 
    image_raw = requests.get(link)
    image = Image.open(BytesIO(image_raw.content))
    width, height = image.size
    return width, height