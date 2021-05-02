from selenium import webdriver
from selenium.webdriver.common.keys import Keys
import unittest
import time
import asyncio

        

    

class WebsiteTest(): 
    def __init__(self, site):
        self.site = site 
        self.driver = webdriver.Chrome("C:\\Users\\Edward\\AppData\\Local\\Programs\\Python\\Python39\\Lib\\chromedriver.exe")


    def main(self): 
        self.open_home_page()
        # self.test_page_result()
        # self.test_home_carousel()
        # self.test_web_socket()
        # self.test_web_socket_button()
        # self.test_infinite_scroll()

        self.test_search()
        self.test_page_result("search result")
        self.test_infinite_scroll("search inifnite scroll")
        

        self.test_tabs()
        self.test_page_result("tabs result")
        self.test_infinite_scroll("tabs inifnite scroll")

        self.test_recommendation_buttons()
        self.test_page_result("recommendation button result")
        self.test_infinite_scroll("recommendation button inifnite scroll")




        self.test_home_button()
        self.end_testing()

    def test_infinite_scroll(self, test_name = "infinite_scroll"): 
        try: 
            height = self.driver.execute_script("return document.documentElement.scrollHeight")
            self.driver.execute_script("window.scrollTo(0, " + str(height) + ");")
            time.sleep(3)
            new_height = self.driver.execute_script("return document.documentElement.scrollHeight")
            if new_height > height: 
                self.print_output(test_name, True)
            else:
                self.print_output(test_name, False)
        except Exception as e: 
            self.print_output(test_name, False, e )


    def print_output(self, test_name, is_pass, error = ""):
        if is_pass: 
            print(f"test: {test_name} : Pass")
        else: 
            print(f"test: {test_name} : Fail")
            print(error)


    def test_page_result(self, test_name = "home page result"):
        #check if page hv resut
        time.sleep(4)
        try: 
            images = self.driver.find_elements_by_class_name("MuiGridListTile-root")
            if len(images) > 1: 
                self.print_output(test_name, True)
            else: 
                self.print_output(test_name, False)
        except Exception as e: 
            self.print_output(test_name, False, e)

    
    def open_home_page(self): 
        self.driver.get(self.site)


    def test_home_page_result(self):
        #check if home page hv resut
        test_name = "home page result"
        try: 
            images = self.driver.find_elements_by_class_name("MuiGridListTile-root")
            if len(images) > 1: 
                self.print_output(test_name, True)
            else: 
                self.print_output(test_name, False)
        except Exception as e: 
            self.print_output(test_name, False, e)
        

    def test_home_carousel(self): 
        #check if carousel exist and  scrolling properly 
        test_name = "home carousel"
        try: 
            self.driver.find_element_by_id("carouselExampleCaptions")
            carousel_images = self.driver.find_elements_by_class_name("carousel-item")
            carousel_slide_before_click = [i.get_attribute("class") for i in carousel_images]
            
            self.driver.execute_script('document.getElementsByClassName("carousel-control-next-icon")[0].click()')
        
            new_carousel = self.driver.find_elements_by_class_name("carousel-item")
            carousel_slide_after_click = [i.get_attribute("class") for i in new_carousel]

            if  carousel_slide_before_click!= carousel_slide_after_click: 
                self.print_output(test_name, True)
            else: 
                self.print_output(test_name, False)
        except Exception as e: 
            self.print_output(test_name, False, e)        
        

    def test_web_socket(self): 
        test_name = "websocket"
        try: 
            websocket_text = self.driver.find_element_by_id("websocket").text
            if len(websocket_text.split(":")[1]) > 1: 
                self.print_output(test_name, True)
            else: 
                self.print_output(test_name, False)
        except Exception as e: 
             self.print_output(test_name, False, e )


    def test_web_socket_button(self): 
        test_name = "websocket button"
        websocket_text = self.driver.find_element_by_id("websocket").text

        try: 
            self.driver.execute_script('document.getElementById("websocketbutton").click()')
            new_websocket_text = self.driver.find_element_by_id("websocket").text
            if new_websocket_text != websocket_text: 
                self.print_output(test_name, True)
            else: 
                self.print_output(test_name, False)
        except Exception as e: 
            self.print_output(test_name, False, e )


    def test_search(self): 
        test_name = "search"
        try: 
            self.driver.execute_script('document.getElementById("Search").value = "landscape";')
            self.driver.execute_script('document.getElementsByClassName("btn btn-outline-success")[0].click()')
        except Exception as e: 
            self.print_output(test_name, False, e)


    def test_home_button(self): 
        test_name = "home_button"
        current_url = self.driver.current_url
        try: 
            self.driver.execute_script('document.getElementsByClassName("navbar-brand")[0].click()')
            self.print_output(test_name, True)
            self.driver.get(current_url)
        except Exception as e: 
            self.print_output(test_name, False, e)            


    def test_tags(self): 
        pass

    def test_tabs(self): 
        test_name = "tabs"
        try: 
            self.driver.execute_script("document.getElementById('mdc-tab-1').click()")
            self.print_output(test_name, True)
        except Exception as e:  
            self.print_output(test_name, False, e)
        


    def test_recommendation_buttons(self): 
        test_name = "recommendation button"
        try: 
            self.driver.execute_script("document.getElementsByClassName('buttons')[1].click()")
            self.print_output(test_name, True)
        except Exception as e:  
            self.print_output(test_name, False, e)
        

    def end_testing(self): 
        print("ending testing")
        self.driver.close()

        











if __name__ == "__main__": 
    test = WebsiteTest("http://localhost:3000/")
    test.main()