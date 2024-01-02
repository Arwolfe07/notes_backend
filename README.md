# Notes Backend (Authentication and CRUD operations)

## Features

* Authentication:
    * Using JWT token authentication, the user will create a new account using email and password to get access to protected routes. 
    * The token will be checked before the user can create, edit or delete any note.
    * If a request is made without an authorization header, the server responds with a 401 status code and "Not authorized, token not present".
    * If a request is made without an authorization header containing a valid JWT, the server responds with status 401 "Not authorized, token not present".
    * Can check the `middlewares/authMiddleware.js`.

* Notes:
    * The notes can be created by a particular user.
    * He or she can create, update, delete or retrieve exiting notes.
    * User first need to be authenticated before doing any if above operations.

* Data Validation:
    * [joi](https://joi.dev/) has been used for validation of the Notes Schema before data is stored in mongoDB.
    * All fields in request body are required.
    * All fields in request body are validated for empty values.
    * Title should be exceed 10 characters and less than 50 characters.
    * Description field is limited to 2000 characters.
    * Can be found in `middlewares/schemaValidation.js`.

* Error Handling:
    * If there is an error while creating, updating or deleting a note, a valid error will be thrown.
    * This can be seen at `/controllers/notesController.js` file.
    * If any error is thrown in the server like wrong endpoint in api, it will be caught and will be caught by custom error middleware at `/middlewares/errorMiddleware.js`.

* Jest testing:
    * There are tests written using jest framework which covers all of the features mentioned above.
    * You can run them with command `npm test` from your terminal.


## Note
* This project contains some info (.env file) that has been hidden for security purposes so please enter your credentials on cloning the repo.
* Web service can be tested on POSTMAN- [Here](https://lunar-crescent-380874.postman.co/workspace/bd52e6d1-b8ca-4e00-bace-05ac35adbbcf/collection/21424091-a3c04279-2d94-46a5-9fd5-839c71619ade?action=share&source=collection_link&creator=21424091)
* Please follow the below instructions for using API safely.

## Installation & Usage