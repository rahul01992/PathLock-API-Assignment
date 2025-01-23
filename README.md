# User Provisioning System

A Node.js-based role management system for managing roles, users, and role assignments. The application includes robust API endpoints, validation, and error handling, ensuring scalability and clean code structure.

---

## **Features**

1. **Role Management**:

   - Add, update, delete, and fetch roles.

2. **User Management**:

   - Create, update, soft-delete, and retrieve users.

3. **Role Assignment**:

   - Assign roles to users, list all assignments, and unassign roles.


******************Advanced / industry-oriented features to enhance code readability and maintain modularity*****************


4. **Utilities**:

   - Centralized error handling and consistent API responses.



5. **Environment Setup**:

   - Easily configurable via `.env` file.

---

## **Installation and Setup**

### **1. Clone the Repository**

```bash
git clone [<repository-url>](https://github.com/rahul01992/PathLock-API-Assignment)
cd <project-directory>
```

### **2. Install Dependencies**

```bash
npm install
```

### **3. Configure Environment Variables**

Create a `.env` file in the root directory and add the following:

```
DATABASE_URI=mongodb+srv://rahul01992:13KGvI9y046mbSgj@cluster0.dznyo.mongodb.net/API
PORT=4000
APP_NAME = User Provisioning System
```

### **4. Start the Server**

To start the application, run:

```bash
npm start
```

The server will start at `http://localhost:4000`.

---


## **Folder Structure** (maintain code readability and modularity)

```
/myProject-directory
|-- /controllers
|   |-- role.controllers.js
|   |-- user.controllers.js
|   |-- roleAssign.controllers.js
|
|-- /models
|   |-- role.models.js
|   |-- user.models.js
|   |-- roleAssign.models.js
|
|-- /routes
|   |-- role.routes.js
|   |-- user.routes.js
|   |-- roleAssign.routes.js
|
|-- /utils
|   |-- handler.utils.js
|   |-- responses.utils.js
|
|-- /configs
|   |-- database.configs.js
|
|-- .env
|-- server.js
```

*********************API Endpoint Documentation***********************************

This document provides a detailed explanation of each API endpoint, including its functionality, input types, parameters, and return type.

1.User Management Endpoints

     *****1.1 Create User******
  
      Method: POST
      Endpoint: /users
      Functionality: Creates a new user in the system.
      Parameters: Body (JSON):
      {
        "name": "<string>",
        "email": "<string>"
      }
      name: Name of the user (required, string).
      email: Email address of the user (required, string).

      Returns:
      Success:
      {
          "success": true,
          "message": "New user created",
          "data": {
                "_id": "<user-id>",
                "name": "<string>",
                "email": "<string>",
                "status": "Active"
           }
      }
      
      Error:
      {
        "success": false,
        "message": "User already exists"
      }


      ***1.2. retrieveAllUsers******


      Description-Fetches a list of all users.
      
      Input- No input required.
      
      Edge Cases Database has no users.
      
      Response{
      {
        "success": true,
        "data": [
          {
            "_id": "<user-id>",
            "name": "<string>",
            "email": "<string>",
            "status": "Active"
          }
        ]
      }


      *****1.3. retrieveUserDetails******

      Description- Fetches details of a specific user by their ID.
      
      Input Path Parameter: id (string): The unique identifier of the user.
      
      Edge Cases-1.Invalid id format (not a valid ObjectId). 2.User with the given id does not exist.
      
      Response
          {
          "success": true,
          "data": {
            "_id": "<user-id>",
            "name": "<string>",
            "email": "<string>",
            "status": "<Active/Inactive>"
          }
        }


      *********1.4. updateUserDetails********

      Description-Updates details of an existing user by ID.
      
      Input Path Parameter: id (string): The unique identifier of the user.
      
      Body-{
        "name": "<string>",
        "email": "<string>",
        "status": "<Active/Inactive>"
      }

      Edge Cases- 1.Invalid id format. 2. User with the given id does not exist. 3. Missing required fields (name, email, status). 4. Ensure valid status values (Active, Inactive).
      
      Response
      Success:{
        "success": true,
        "message": "Status updated successfully",
        "data": {
          "_id": "<user-id>",
          "name": "<string>",
          "email": "<string>",
          "status": "<Active/Inactive>"
        }
      }

      Error:
      404: "User not found"
      400: "Fill all the details"


      *******1.5. softDeleteUser********

      Description-Sets a user's status to Inactive without permanently deleting them from the database.
      
      Input Path Parameter: id (string): The unique identifier of the user.
      
      Edge Cases: 1.Invalid id format. 2. User with the given id does not exist. 3. User is already Inactive.
      
      Response
      
      Success:{
        "success": true,
        "message": "User set to inactive",
        "data": {
          "_id": "<user-id>",
          "name": "<string>",
          "email": "<string>",
          "status": "Inactive"
        }
      }

      Error:
      404: "User not found"
      400: "Already Inactive User"

2. Role Management Endpoints

        *****2.1 Add Role****
   
        Method: POST
        Endpoint: /roles
        Functionality: Adds a new role to the system.
         Parameter:{
        "name": "<string>",
        "description": "<string>"
         }
         name: Name of the role (required, string).
         description: Description of the role (optional, string).

         Response-{
            "success": true,
            "message": "New role added",
            "data": {
              "_id": "<role-id>",
              "name": "<string>",
              "description": "<string>"
            }
        }

         ****2.2 List All Roles***
      
            Method: GET
            Endpoint: /roles
            Functionality: Retrieves all roles stored in the database.
            Parameters: None.
            Returns:
            Success:{
                "success": true,
                "data": [
                  {
                    "_id": "<role-id>",
                    "name": "<string>",
                    "description": "<string>"
                  }
                ]
           }

         Error:{
            "success": false,
            "message": "No roles found"
          }
   
           *****2.3. Get Role Details****
        
            Method: GET
            Endpoint: /roles/:id
            Functionality: Fetches details of a specific role by its ID.
            Parameters: Path: id (string): The unique identifier of the role (required). 
            Returns:
            Success:{
                "success": true,
                "data": {
                  "_id": "<role-id>",
                  "name": "<string>",
                  "description": "<string>"
                }
              }
   
             Error:
               {
              "success": false,
              "message": "Role not found"
            }


           ***2.4. Update Role****
        
              Method: PUT
              Endpoint: /roles/:id
              Functionality: Updates details of an existing role by ID.
              Parameters-Path: id (string): The unique identifier of the role (required).
              Body (JSON):{
                    "name": "<string>",
                    "description": "<string>"
                  }
             name: Updated name of the role (required, string).
          description: Updated description of the role (optional, string)
   
               Return:{
              "success": true,
              "message": "Details updated",
              "data": {
                "_id": "<role-id>",
                "name": "<string>",
                "description": "<string>"
              }
            }

            2.5. Delete Role
        
              Method: DELETE
              Endpoint: /roles/:id
              Functionality: Deletes a role by its ID.
              Parameters:Path:id (string): The unique identifier of the role (required).
              Returns:
              Success:{
              "success": true,
              "message": "Role deleted"
            }

3.Role Assignment Endpoints

        ****3.1. Assign Role***
        
        Method: POST
        Endpoint: /user-role
        Functionality: Assigns a role to a user.
        Parameters:
        Body (JSON):{
          "userId": "<user-id>",
          "roleId": "<role-id>"
        }
        userId: ID of the user receiving the role (required, string).
        roleId: ID of the role to assign (required, string).

        return {
            "success": true,
            "message": "Role assigned",
            "data": {
              "_id": "<assignment-id>",
              "userId": "<user-id>",
              "roleId": "<role-id>"
            }
          }

          ***3.2. List Role Assignments****

            Method: GET
            Endpoint: /user-role
            Functionality: Lists all role assignments in the system
            Parameters: None.
            Returns:
            Success:{
                "success": true,
                "data": [
                  {
                    "_id": "<assignment-id>",
                    "userId": {
                      "_id": "<user-id>",
                      "name": "<string>",
                      "email": "<string>"
                    },
                    "roleId": {
                      "_id": "<role-id>",
                      "name": "<string>",
                      "description": "<string>"
                    }
                  }
                ]
              }


              ****3.3. Delete Role Assignment***

              Method: DELETE
              Endpoint: /user-role/:id
              Functionality: Deletes a role assignment by its ID.
              ParametersPath-id (string): The unique identifier of the role assignment (required) 
              Returns:
              Success:{
                  "success": true,
                  "message": "Role unassigned"
                }
        


