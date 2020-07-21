### Tutorial deploy to Heroku and Database of MongoDB

- Connect MongoDB Database to your backend
- Heroku login
- Setelah login, Heroku Create --> untuk create instance baru di heroku
- Setelah create, cara renamenya :
  a. heroku apps:rename newname --app oldname --> ganti sesuai newname dan oldnamemu
  b. setelah keganti, "heroku git:remote -a newname" --> newnamenya sesuaikan dgn yang dibuat
- setelah udah dapat remote untuk heroku, baru lakukan : (Setiap perubahan di backend flow pushnya harus ikut ini)
  a. git add .
  b. git commit -am "make it better"
  c. git push heroku master
  d. push sesuai git macam biasa
