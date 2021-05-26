from django.test import TestCase
import requests
import socket
import asyncio 
import websockets
import time
from django.contrib.auth.models import User
from django.contrib.auth import authenticate

# Create your tests here.


class ApiTests(TestCase):

    def test_login(self): 
        site = "http://localhost:8000/api/login"
        unregistered_account = {"username" :"tset_register", "password":"test_password"}    
        response = requests.post(site, data = unregistered_account)
        self.assertIsNot(len(response.json()), 0)
     



    def test_register(self): 
        site = "http://localhost:8000/api/register"
        data = {"username" : "tset_register", "password" : "test_password"}
        response = requests.post(site, data = data)
        self.assertIs(response.text, False)


    def test_search(self): 
        site = "http://localhost:8000/search"
        data = {"search":"cyberpunk", "page": "1"}
        response = requests.get(site, params = data)
        data = response.json()
        images = data["data"]
        self.assertNotEqual(len(images), 0)



    def test_search_artstation(self): 
        site = "http://localhost:8000/search"
        data = {"search":"cyberpunk", "page": "1", "tag": "0"}
        response = requests.get(site, params = data)
        data = response.json()
        images = data["data"]
        self.assertNotEqual(len(images), 0)


    
    def test_search_artstation(self): 
        site = "http://localhost:8000/search"
        data = {"search":"cyberpunk", "page": "1", "tag": "1"}
        response = requests.get(site, params = data)
        data = response.json()
        images = data["data"]
        self.assertNotEqual(len(images), 0)
        



    # def test_socket(): 
    #     HOST = '127.0.0.1'  # Standard loopback interface address (localhost)
    #     PORT = 8000  
    #     s = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
    #     print("sending")
    #     s.connect((HOST, PORT))
    #     s.sendall(b"hello")
    #     # data = s.recv(1024)
    #     print("done")




    #             pass


    # asyncio.get_event_loop().run_until_complete(hello())
    # asyncio.get_event_loop().run_forever()  



    # async def testing(): 
    #     return "eh"

    # async def loopp(test): 
        
    #     print(test)
    #     await testing()
        
    #     print("done")

        

    # async def task22(test): 
    #     print(test)
    #     await asyncio.sleep(2)
    #     print("task 2 done")


    # async def main(): 
    #     task1 = asyncio.create_task(loopp("TASK1"))
    #     task2 = asyncio.create_task(loopp("TASK2"))

    #     await task1
    #     await task2


    # asyncio.run(main())



# async def hello():
#     async with websockets.connect('ws://localhost:8000/api/socket') as websocket:
#         while True: 
#             name = input("What's your name? ")
#             await websocket.send(name)
#             greeting = await websocket.recv()
#             print(greeting)


# asyncio.run(hello())

