# javascript-form-validation
Validation on client side using JavaScript.   
### We have a simple signup form with four input fields:  
- username
- email
- password  
- confirm-password.

When you click the sign up button without filling anything or
filling incorrect data format, the form will show error messages.

### We validate the following:  
* Username cannot be blank:
  * Should have at least 3 characters
  * Cannot be longer than 25 characters.
* Email is mandatory and should be of a valid format.
* Password has eight characters or longer. It must contain at least: 
  * 1 lowercase character (`a-z`)
  * 1 uppercase character (`A-Z`)
  * 1 number (`0-9`)
  * 1 special character in set {`!`, `@`, `#`, `$`, `%`, `^`, `&`, `*`}.
* The confirm-password field must have the same value as the password field.
