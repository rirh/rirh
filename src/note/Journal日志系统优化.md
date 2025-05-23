/etc/systemd/journald.conf

```
[Journal]
Storage=persistent
SystemMaxUse=2G
Compress=yes
MaxRetentionSec=7d
MaxLevelStore=info
```

```
sudo systemctl restart systemd-journald
```