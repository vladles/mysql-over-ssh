# mysql-over-ssh

The main problem was that it was not possible to add a private database cluster to the DigitalOcean App Platform.  
[related-issue1](https://www.digitalocean.com/community/questions/how-to-add-my-digitalocean-app-as-a-trusted-resource-for-my-managed-database). 
[related-issue2](https://www.digitalocean.com/community/questions/app-platform-bug-cant-set-as-a-trusted-source-for-database-cluster). 

### Notice:
>**Proxy server must be in one VPC and allowed to the database cluster**

The problem was solved in this way.
Simple example how we can use a private network of the DigitalOcean Cluster MySql database on NodeJs.  
Based on [mysql2](https://github.com/sidorares/node-mysql2) lib and [ssh2](https://github.com/mscdex/ssh2).

You should set all params in .env file. 

- **PROXY_{}** - *params related your proxy server*
- The PROXY_FORWARDING_HOST - *is host your database .*
- The PROXY_FORWARDING_PORT  - *is port your database.*
- The DB_HOST - **should be localhost!**
- The DB_PORT - *the same PROXY_FORWARDING_PORT*
- The PROXY_KEY_PATH - *for example. ("./data/private-key")*

```
DB_USE_PROXY=true

PROXY_HOST=
PROXY_PORT=22
PROXY_USERNAME=
PROXY_PWD=
PROXY_KEY_PATH=

PROXY_FORWARDING_HOST=
PROXY_FORWARDING_PORT=

DB_HOST=127.0.0.1
DB_USER=
DB_PWD=
DB_PORT=
DB_DATABASE=
DB_DEBUG=
DB_CONNECTION_LIMIT=10
DB_SOCKET_PATH=
```


**Check connection**

```
npm run example
```
