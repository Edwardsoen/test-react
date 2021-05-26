from django.shortcuts import render
from django.http import HttpResponse, JsonResponse
# from api.models import Accounts
from api.artstation import ArtstationSearch
from api.devianart import DevianartSearch 
from django.contrib.auth.models import User
from django.contrib.auth import authenticate
import json
from django.contrib.auth import logout as auth_logout
import queue
import asyncio
import threading



def taglist(): 
    return ["Artstation", "Devianart"]



def create_dictionary(title, url): 
    return {"title": title, "url": url}


def buttons(req): 
    data = {"data":[
        create_dictionary("Landscape", "https://cdna.artstation.com/p/assets/images/images/014/178/488/large/arthur-bourgeais-monowheel-landscape-global.jpg?1542822313"),
        create_dictionary("Concept Art", "https://www.cgspectrum.com/hubfs/xiaoya-lin-1200x630.jpg"), 
        create_dictionary("Fantasy", "https://images.template.net/wp-content/uploads/2016/12/17104201/Fantasy-Landscape-Illustrations.jpg")
    ]
    }

    return JsonResponse(data) 







def login(req): 
    data = {}
    if "isLoggedIn" in req.session: 
        data["isLoggedIn"] = "true"
        data["username"] = req.session["username"] 
        return JsonResponse(data) 
    else: 
        try: 
            userId = json.loads(req.body.decode("utf-8"))
            # remember = userId["rememberMe"]
            req_username = userId["username"]
            req_password = userId["password"]
            user = authenticate(username = req_username, password = req_password)
            if user is not None: 
                data["isLoggedIn"] = True
                # if remember == "true": 
                req.session["username"] = req_username
                req.session["isLoggedIn"] = "true"
            else: 
                data["isLoggedIn"] = "false"
        except: 
            pass
    return JsonResponse(data)




def register(req): 
    userId = json.loads(req.body.decode("utf-8"))
    req_username = userId["username"]
    req_password = userId["password"]
    data = {"data":str(req.body.decode("utf-8"))}
    for key, val in req.POST.items(): 
        data[key] = val
    data = {}
    try: 
        user = User.objects.create_user(username = req_username, password = req_password)
        user.save()
        data["registered"] = "true"
    except: 
        data["registered"] = "false"
    return JsonResponse(data)
 

def tabs(req): 
    data = {"tabs":["popular", "recent"]}
    return JsonResponse(data)


def tags(req): 
    data = {"tags": taglist()}
    return JsonResponse(data)
    

def session(req): 
    req.session.clear() 
    req.session.flush()
    return HttpResponse("Logged out")

def changepassword(req): 
    username = req.session["username"]
    passwords = json.loads(req.body.decode("utf-8"))
    old_password = passwords["oldPassword"]
    new_password = passwords["newPassword"]
    user = authenticate(username = username, password = old_password)
    data = {}
    if user == None: 
        data["passwordIsChanged"]  = "false"
    else: 
        user.set_password(new_password)
        user.save()
        data["passwordIsChanged"]  = "true"

    # breakpoint()
    return JsonResponse(data)


def search(req): 
    search = req.GET["search"]


    if "isLoggedIn" in req.session and req.session["isLoggedIn"] == "true" and search != "landscape":
        username = req.session["username"]
        a = History.objects.create(username = req.session["username"], search_item = req.GET["search"])
        a.save()

    try: 
        sort = req.GET["sort"]
    except: 
        sort = "0"
    try: 
        page = int(req.GET["page"])
    except: 
        page = 1 
    try: 
        selected_tag = eval(req.GET["tag"])
        if type(selected_tag) == int: 
            selected_tag = [selected_tag]
    except: 
        selected_tag = None
    data = Request(search, page, sort, selected_tag).grabData()
    return JsonResponse({"data":data})


def history(req):
    username = req.GET["username"] 
    data = History.objects.filter("username") 






class Request(): 
    def __init__(self, search, page, sort, site = None):
        self.search = search 
        self.page = page
        self.sorting = sort 
        self.site = site
        self.arraylist =[
            self.artstation_request, 
            self.devianart_request
        ]
        self.sortDict = {"0": "popular", "1": "recent"}
        self.queue = queue.Queue()
        self.data = []
    
    

    def create_function(self, func): 
        async def task(): 
            loop = asyncio.get_running_loop()
            await loop.run_in_executor(None, func)
        return task
    

    
    async def createTask(self): 
        functions =[]
        tasks = []
        if self.site is None: 
            for i in self.arraylist: 
                print("added")
                func = self.create_function(i)
                functions.append(func)
        
        for i in functions: 
            t = asyncio.create_task(i())
            tasks.append(t)
        
        for i in tasks: 
            await i 
                
                    


    def grabData(self):
        asyncio.run(self.createTask())

        data = self.Queue_to_array()
        self.data = data


        # data = []
        # if self.site is None: 
        #     for i in self.arraylist: 
        #         t = threading.Thread(target = i, args = ())
        #         t.start()
        #         t.join()
                


        # else: 
        #     for i in self.site: 
        #         t = threading.Thread(target = self.arraylist[i], args = ())
        #         t.start()
        #         t.join()
        # data = self.Queue_to_array()
        return self.data
        


    def Queue_to_array(self): 
        data  = []
        for i in range(self.queue.qsize()): 
            data.append(self.queue.get())
        return data

    

    def artstation_request(self):
        search = ArtstationSearch(self.search, self.page, False, self.sortDict[self.sorting])
        data = search.getData()
        for i in data: 
            self.queue.put(i)
        # return search.getData()

    def devianart_request(self):
        search  = DevianartSearch(self.search, self.page, self.sortDict[self.sorting]) 
        data = search.getData()
        for i in data: 
            self.queue.put(i)
        
        # return search.getData()

    



