Restmap is built on a MERN stack with functionality that enables remapping the keys in JSON data. 

The idea is that a user submits JSON data through the web application. The application provides a simple interface where the user can edit the keys as they wish. When ready the user saves the key remapping and the data is sent to a MongoDB collection, the user is returned a rule id which can later be used to apply the rule to any JSON data. It is also possible to browse through the rules for a given user in the application and delete any rules as needed.

Follow the instructions to setup the necessary environment to run the server and client side applications: https://www.mongodb.com/languages/mern-stack-tutorial

The one thing to configure is the database access, which is done in: server\config.env
Configure according to details provided in MongoDB, ATLAS_URI="<mongodb_access_information>"

Currently the variable USER in config.env decides what MongoDB collection will be used. I.e. if the user is "Rasmus" then a collection "Rasmus_rules" will be used.

Starting page

![image](https://user-images.githubusercontent.com/34237768/222953739-24abfed3-2946-4457-95a9-122f5939d9ed.png)

Add page after submitting some JSON (see resources/input.json)

![image](https://user-images.githubusercontent.com/34237768/222953731-a4e9b7c2-35b8-4e8b-9a49-d0e22fa493fc.png)

Feedback if rule is added successfully

![image](https://user-images.githubusercontent.com/34237768/222953736-9f81a837-87d6-4793-86c8-2682f747a4a3.png)

If attempting to add an identical rule again the program will stop you

![image](https://user-images.githubusercontent.com/34237768/222953737-16b1d155-02ba-493c-ae6b-fceb64e37bce.png)

The get rule page allows the user to get apply a rule to a json string, see resources/output.json

![image](https://user-images.githubusercontent.com/34237768/222953734-6dfdb916-88db-4a61-b8b5-2a24adb665a3.png)

It is also possible to list the existing rules within the app and delete them using the application if desired.

![image](https://user-images.githubusercontent.com/34237768/222953735-d9364032-3643-49a6-891f-13ec9943544e.png)



