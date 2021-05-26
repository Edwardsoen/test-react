import json
import time
from channels.generic.websocket import WebsocketConsumer
import datetime 

class ChatConsumer(WebsocketConsumer):
    
    def connect(self):
        self.accept()


    def disconnect(self, close_code):
        pass

    def receive(self, text_data):
        d = datetime.datetime.now()
        self.send(str(d))
        pass
    

