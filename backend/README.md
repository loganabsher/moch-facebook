# backend API guide


## notes for devs:

* this app requires a .env file to run properly
* this file must be at the base of the 'backend' directory
* it must include a PORT, a MONGODB_URI, and a APP_SECRET
* your port should be 8080
* the MONGODB_URI must be brought in from a mongodb database
* the APP_SECRET can be any string


## using httpie:

* http POST localhost:8080/api/signup username=Logan password=123 email=absherlogan@gmail.com
* http -a Logan:123 GET localhost:8080/api/login
* http GET localhost:8080/api/allaccounts
* http -a Logan:123 PUT localhost:8080/api/editaccount/5b6e269334b9e1b935402da9 username=New+User password=321 email=newemail@new.com
