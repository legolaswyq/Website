# Website
A website for practise





Design:

1. Register page
   1. username, email, password
   2. valify data
      1. at least 6 character not null 
      2. email format using regex 
      4. password using md5
2. Login page
   1. input username and password
   2. look up data in database
   3. show welcome info and redirect to home page
   4. if login fail send error message and redirect to login page
3. Home
   1. Publish function
   2. View other article
   4. Delete and modify
   4. view article of yours
4. Logic
   1. Authority  admin
2. common
   3. different menu base on different authority
4. If the username is different from the author, then they could not modify the article 
   5. Using middleware to detect if the author is equal to username
6. When first login, the website will record the lastest article as start point, so the list of article won't auto refresh. It means when someone else was publish a new article, it won't affect your list only when you click the home button, it will refrest the whole list
   7. Pagination, each page only show 10 article, First look up how many article in the database  to calculate how many page we need, if larger than 10 page will only show 10, each page display 10 articles.

 5.Database

	1.  There are two form, one  for account and one for article
 	2.  In the account form, username was set as unique key and when someone insert a new account if there is not same username it will be success, otherwise it will sent an error message