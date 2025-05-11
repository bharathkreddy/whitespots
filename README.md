# Setting up & Securing VPS

### 🔌 Connect to VPS

1. Create a keypair & copy the public key to VPS during VPS creation on VPS vendor website.
2. `ssh root@147.93.84.39 -i ~/.ssh/<privateKey>`
3. Alternate -
   1. Create a file `config` on `.ssh` folder below are contents of file
      > Host my_vps_host
      > HostName 147.93.84.39
      > user root
      > IdentifyFile ~/.ssh/<privateKey>
   2. `ssh my_vps_host`
4. ssh connections usually time out after 5 minutes so to fix that add a global configuration on config file.
   1. Right at top of config file add this
      > ServerAliveIngterval 120 : sends an empty SSH signal to remote machine to keep it alive
      > ServerAliveCountMax 3 : retries if above signal fails. these signals are sent over SSH.

### 🔑 Generate Keys on VPS

1. One pair would be used to connect to github. Generate a pair and throw public part to github.

### ⛄️ Non-Root user

1. Root user previliges are not safe. Create an additional user `adduser <user>`. This creates a new user home as well.
2. Delete a user `deluser <user> --remove-home`
3. We now need to create a SSH key for this user on our local - `ssh-keygen` but give it a different file name.
4. Copy public part of this key to VPS machines users: `/home/<user>/.ssh/authorized_keys`
5. Update the config file in .ssh folder of local machine and login.
6. Add this user to sudo group. Login as root & `adduser <user> sudo`.
7. Now each time we do sudo, we mock root access. Try running `sudo ssh -T git@github.com` This now would use the root key we generated earlier to authenticate to github.

### 💀 Disable Root access to the system.

1. Login as user & exit `/etc/ssh/sshd_config`
2. Search (`\` search pattern , `n` for next match `N` previous match) & Change `PermitRootLogin` to `no` (small case).
3. reload ssh config `sudo systemctl reload ssh.service`
4. now if we try to login to this vps machine as root - we wont be able to. Even using root key on our local machine.

### 🧱 Add & Configure Firewall

1. Check status : `ufw status`, if inactive then `ufw enable`
2. ufw app list >> ufw allow OpenSSH >> (ufw app info OpenSSH would give you more details about what this app is.)
   ufw enable, now check ufw status / ufw status verbose ( to get rules.)

### 🛑 Fail2Ban

1. is a package which allows to block users/bots after certain failed attempts. We are going to use this to protect our SSH service.
2. All processes found in `/etc`. It is here where fail2ban gets installed.
3. `jail.conf` defines config about , attempts after which what action to take. Open the file and see, file clearly states that it should not be modified as this file gets overwritten with each update of package.
4. Create a file `/etc/fail2ban/jail.local` with below config

   > [DEFAULT]
   > bantime = 3h
   > maxretry = 5

   > [sshd]
   > enabled = true

5. Restart fail2ban service `sudo systemctl restart fail2ban.service`
6. We can check all jails `sudo fail2ban-client status`
7. check the jail `sudo fail2ban-client status sshd`
8. To unban an ip `sudo fail2ban-client set sshd unbanip <ipaddrr>`

# 🎬 NGINX

1. sudo apt install nginx
2. sudo systemctl status nginx.service
