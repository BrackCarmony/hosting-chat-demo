# Digital Ocean Hosting Demo

## Hosting your node projects on Digital Ocean.

  This tutorial is for setting up small personal sites on Digital Ocean, it does not cover the myriad of topics that will be important to long term system management.  But if you're wanting to host personal projects, or portfolio pieces it will help get you started.

### Create Project To Host
  So you've created your awesome project. The creation of which is left as an exercise for the reader.

  Now to share with the world.  At this point it is **highly** recommended that you've set your project to work with either system variables or config files that are either in your .gitignore file, or are stored outside of your project. You will either need to be able to run your server on port 80, or setup a server that will route your webtraffic to different ports.   

  We will cover nginx at the end of this setup if you want to go the later route.

### Register for Digital Ocean

  If you've not already created a Digital Ocean Account, you can sign up through [this](https://m.do.co/c/8ea79fee4894) link to get $10 free.

### Create SSH Keys

  If you've never set up SSH keys, it is highly recommended that you create some, it will make working with your server much easier.  

  ```ssh-keygen -t rsa```

This will start a process to step you through the key generation process.  The default location and filename are probably best for your first key.

Take note that after asking for the file, it will ask for a passphrase.  There is no way to recover this passphrase.  So make it something that you will remember.  

  ```sh
Generating public/private rsa key pair.
Enter file in which to save the key (/Users/username/.ssh/id_rsa):
Enter passphrase (empty for no passphrase):
Enter same passphrase again:
Your identification has been saved in demo_rsa.
Your public key has been saved in demo_rsa.pub.
The key fingerprint is:
cc:28:30:44:01:41:98:cf:ae:b6:65:2a:f2:32:57:b5 user@user.local
The key's randomart image is:
+--[ RSA 2048]----+
|=*+.             |
|o.               |
| oo              |
|  oo  .+         |
| .  ....S        |
|  . ..E          |
| . +             |
|*.=              |
|+Bo              |
+-----------------+
```

This will create two files on your computer.  ```id_rsa``` and ```id_rsa.pub``` if you used the default. They will be in your ```~/.ssh``` folder.
The one with .pub is your public key, this is what you can give to services like Digital Ocean and Github to identify your computer.  

Go ahead and cat your public key.

```cat ~/.ssh/id_rsa.pub```

It looks like a long string of goblity goop. It is the contents of the whole file.  Starting with the ```ssh-rsa``` and all the way to the ```User@Computer.local``` at the end

```sh
ssh-rsaAABC3NzaC1yc2EAAAADAQABAAABAQDR5ehyadT9unUcxftJOitl5yOXgSi2Wj/s6ZBudUS5Cex56LrndfP5Uxb8+Qpx1D7gYNFacTIcrNDFjdmsjdDEIcz0WTV+mvMRU1G9kKQC01YeMDlwYCopuENaas5+cZ7DP/qiqqTt5QDuxFgJRTNEDGEebjyr9wYk+mveV/acBjgaUCI4sahij98BAGQPvNS1xvZcLlhYssJSZrSoRyWOHZ/hXkLtq9CvTaqkpaIeqvvmNxQNtzKu7ZwaYWLydEKCKTAe4ndObEfXexQHOOKwwDSyesjaNc6modkZZC+anGLlfwml4IUwGv10nogVg9DTNQQLSPVmnEN3Z User@Computer.local
```

Copy the whole thing.  
### Adding your SSH Key to Digital Ocean

You'll need to go to your [Securit Settings.](https://cloud.digitalocean.com/settings/security)

Click on Add SSH key, paste your **public** SSH key into the box.  You can give the key a name to remember which key it is.  I usually recommend a combination of your name, and which computer the key is on.  So something like Brack Macbook.  

### Create Droplet

Now we can spin up a [droplet.](https://cloud.digitalocean.com/droplets)  Click Create Droplet.  Here we can choose what OS we want our server to be, as well as choose some default software to install.  

Unless you have a reason not to, I suggest Ubuntu for the operation system.  Then you can click One-click Apps, and select MEAN. This will install, node and MongoDB for you by default.

Select your droplet size $5.  Select a data center, probably San Francisco or New York. You can select additional services, though some of these cost extra.  Make sure to select the SSH key you registered earlier. Name your droplet, it doesn't really matter what you call it, but you can put multiple projects on a single droplet, so you may not want it to be named after any specific project.

### Connect to your Server

After your droplet has spun up, you'll know your ip address.  We'll connect to the droplet through the ssh (Secure SHell) command

```ssh root@222.222.222.222```

root is the user that you will connect as.  You  an optionally set up [different users](https://www.digitalocean.com/community/tutorials/initial-server-setup-with-ubuntu-14-04) with their own ssh keys in case you want others to share the server, or connecting to a system as the root user all the time makes you queasy.   

### Update Node

Initially an older version of Node is installed on the server, let's go ahead and update it real quick.  

```
apt-get update && apt-get dist-upgrade
npm i -g n ; n latest ; npm i -g npm

```

## Swap -- Optional
Swap instructions from [Zac Anger's](https://github.com/zacanger) wonderful [documentation](https://github.com/zacanger/doc). 

The most limited resource on your droplet will be RAM. They don't come with much on the $5 tier.
You probably don't need a whole lot to run your apps, but npm, grunt, gulp, or webpack take their fair share. You could pay for more RAM, but you could also just set up a swapfile.

This should

```
touch /swapfile
fallocate -l 1G /swapfile
chmod 600 /swapfile
mkswap /swapfile
swapon /swapfile
```

* The swapfile will only be in use till the droplet restarts.
* If you want to make it so the dorplet loads with the swapfile one
* `nano /etc/fstab`. add the following to the bottom:
  `/swapfile   none    swap    sw    0   0`
* We can also tell the server to use the swap file less frequently by lowering the swapiness
* We should adjust swappiness closer to 0 (from the default 60). `nano /etc/sysctl.conf`
  and add `vm.swappiness=10` to the bottom.

--------

### Clone Project

Now we can get your project cloned to your repo. Make sure you're at your home directory  
```
cd ~
```
Then we can clone the project from Github.  (You'll need to use the https version of the link, unless you create an ssh key on your server to use.)

cd into your project, npm install, and any preprocessing (gulp, grunt, webpack) that you need to do. Also create and setup any config files that were in your .gitignore.    

```
git clone https://github.com/Kedirech/hosting-chat-demo.git
cd hosting-chat-demo/git
npm install
touch server_config.js
nano server_config.js
```

Now run node to check for any server load errors (in case you forgot to --save all your dependencies.)

```
node server/server.js
```

If you get any errors, npm install those packages, and repeat till the server runs.  

You should now be able to go to ipaddrress:port in your browser to see your project.
```126.152.73.125:8082```

If your server is running on port 80, you can drop specifying the port number.  

### Install forever

Terminate your node server if it's still running.   We're going to install a forever, a program that will keep your server running after you log out of the server, and will auto restart the server if it crashes.  (unless it's crashing too quickly.)  

We can also set up the forever list to show the folder the script was ran from.  Useful if you have several projects running on one droplet.

Then we will start the process running.

```sh
npm install -g forever
forever columns add dir
forever server/server.js
```

To see the currently running processes: ```forever list```
To restart all forever processes: ```forever restartall```
To restart a specific process: ```forever restart X``` where X is a pid, uid, or process index.

### Setting Up Domains

Unless you have lots of friends that enjoy accessing websites by ip (You know they exist) You'll want to route your domain to point at your server.  This is slightly different for each register.  Or you can tell the reigstrar to let Digital Ocean manage your routes.  [Here](https://github.com/zacanger/doc/blob/master/digital-ocean.md#domains) is a short description of how to set up Domain records.  

### NGINX

If you don't want to use port 80, or you want to put multiple projects on one droplet, we can do that with nginx

```
apt install nginx

cd /etc/nginx/sites-available/
```

We can set up each individual servers by editing the default file in this folder.  ```nano default``` Feel free to use vim, or another command line editor if you want.  

This example sets up 3 different servers listening for different domains/subdomains.

They should all listen to port 80, that's the default for web-traffic. The server_name should be changed for each server, this is the domain that you want associated with each server.  Also the proxy_pass needs to be changed to match the port each is running on.

```
server {
    listen 80;

    server_name eloeverything.com;

    location / {
        proxy_pass http://127.0.0.1:8081;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}

server {
    listen 80;

    server_name brackcarmony.com;

    location / {
        proxy_pass http://127.0.0.1:8083;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}

server {
    listen 80;

    server_name data.brackcarmony.com;

    location / {
        proxy_pass http://127.0.0.1:8084;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```
