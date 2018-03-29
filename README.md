# **Wellsent** Secure Encrypted Anonymous Messaging Application

https://wellsent.herokuapp.com

Created by Nick Wactor, Yusuf Mekias, Hillari Malle, Denis Wu, Mike Thompson

## Info:

Wellsent is an Instant-Messaging application designed to support anonymous and secure transactions. It is powered by our **own** encryption algorithm, Locksmith, which uses **xOR** hashing to encrypt the messages stored on our server. This prevents anyone from stealing information from our users' messages, even if they manage to hack our database. Locksmith will soon be released as a standalone NPM package.

## Technologies used:
[MySQL](https://www.mysql.com/),
[Passport](http://www.passportjs.org/),
[Blaze](https://www.blazeui.com/),
[Sequelize](http://docs.sequelizejs.com/),
[Express](https://expressjs.com/)


## NPM Packages used:
[Base Conversion](https://www.npmjs.com/package/base-conversion),
[Binary To String](https://www.npmjs.com/package/binary-to-string),
[Bcrypt Node.js](https://www.npmjs.com/package/bcrypt-nodejs),
[Body-Parser](https://www.npmjs.com/package/body-parser),
[Express-Session](https://www.npmjs.com/package/express-session),
[MySQL](https://www.npmjs.com/package/mysql),
[MySQL2](https://www.npmjs.com/package/mysql2),
[Passport](https://www.npmjs.com/package/passport),
[Passport Local](https://www.npmjs.com/package/passport-local),
[Sequelize](https://www.npmjs.com/package/sequelize),
[Sha.js](https://www.npmjs.com/package/sha.js),
[String To Binary](https://www.npmjs.com/package/string-to-binary),
[Validate.io Binary String](https://www.npmjs.com/package/validate.io-binary-string)

## Build:

Building this app requires node.js and mysql.

1. Open terminal with git installed

2. Navigate to folder you wish to use as the parent directory for the project

3. `git clone https://github.com/nwactor/wellsent.git`

4. `npm install` 

5. Create a mysql database to store the app's data

6. From your wellsent folder, open /config/config.json

7. Add your mysql username and password to config, as well as the name of your local database.

## Run:

In your terminal run:

`node server.js`

and open browser to:

`localhost:8080`

On the login page, login with your existing username and password, or click the signup button to make a new account.

![Screen shot1](https://github.com/nwactor/wellsent/blob/master/public/assets/images/login.png?raw=true)

On the signup page, you will prompted to enter a valid username and password if you enter an invalid one.

![Screen shot1](https://github.com/nwactor/wellsent/blob/master/public/assets/images/enteruserpassword.png?raw=true)

Once you are signed in, click:

`Search for Users`

on the lefthand side of the screen to search for a user to message. This will bring up a popup modal that allows you to search for the usernames of other users. Click a user's name to initiate conversation. If you are test running the app locally, you will have to create multiple accounts so that there are other users in your database to message.

![Screen shot1](https://github.com/nwactor/wellsent/blob/master/public/assets/images/main.png?raw=true)

When finished, simply log out and you will be brought back to the login page. 
