#!/bin/bash

rm /etc/nginx/sites-enabled/online-store
rm /etc/nginx/sites-available/online-store
cp online-store /etc/nginx/sites-available/
ln -s /etc/nginx/sites-available/online-store /etc/nginx/sites-enabled
service nginx restart