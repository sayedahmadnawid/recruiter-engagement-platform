# AWS Deployment

## Environment

* Project: recruiter-platform-prod
* Cloud Provider: AWS
* Region: us-east-1 (N. Virginia)
* Deployment Date: 2026-06-12

---

## EC2 Instance

| Property          | Value                      |
| ----------------- | -------------------------- |
| Instance Name     | recruiter-platform-prod    |
| AMI               | Ubuntu Server 26.04-amd64  |
| Instance Type     | t3.micro                   |
| Availability Zone | us-east-1a                 |
| VPC               | Custom VPC                 |
| Subnet            | hiresignal-public-subnet-1 |
| Public IP         | 54.205.203.88                   |
| Key Pair          | hiresignal-key             |

---

## Security Group

### Security Group Name

hiresignal-app-sg

### Inbound Rules

| Type  | Port | Source       |
| ----- | ---- | ------------ |
| SSH   | 22   | 54.205.203.88|
| HTTP  | 80   | 0.0.0.0/0    |
| HTTPS | 443  | 0.0.0.0/0    |

### Outbound Rules

| Type        | Destination |
| ----------- | ----------- |
| All Traffic | 0.0.0.0/0   |


## Server Software

- PHP Version: 8.5.4
- Composer Version: 2.10.1
- Nginx Version: nginx/1.28.3 (Ubuntu)
- Node.js Version: v22.22.3
- NPM Version: 10.9.8
- MySQL Version: 8.4.9-0
- Supervisor Installed: Yes
- Docker Installed: Yes

## Install Production Software Stack

### Install PHP
```
sudo apt update
```

### Install PHP
```
sudo apt install -y \
php \
php-cli \
php-fpm \
php-mysql \
php-curl \
php-mbstring \
php-xml \
php-zip \
php-bcmath \
php-intl \
php-gd
```

### Install Composer
```
cd ~
curl -sS https://getcomposer.org/installer -o composer-setup.php
php composer-setup.php
sudo mv composer.phar /usr/local/bin/composer
```


### Install Nginx
```
sudo apt install -y nginx
sudo systemctl enable nginx
sudo systemctl start nginx
sudo systemctl status nginx
```

### Install Node.js
```
curl -fsSL https://deb.nodesource.com/setup_22.x | sudo -E bash -
sudo apt install -y nodejs
```

### Install 
```

```
### Install 
```

```
### Install 
```

```
### Install 
```

```
### Install 
```

```