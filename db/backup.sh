#!/bin/bash

# Setup cronjob for this script to run everyday at 15:00
# crontab -e
# 0 15 * * *  cd ~/path/to/kasperkoman/db && ./backup.sh dump >> ./backups/backup.log 2>&1
# or use launchd and setup using http://launched.zerowidth.com

export PATH=/bin:/usr/bin/:/usr/local/bin
export $(grep -v '^#' ../.env | xargs -0)

params=(
    --host $REMOTE_DB_HOST \
    --username $REMOTE_DB_USERNAME \
    --password $REMOTE_DB_PASSWORD
)

printf "\n[$(date +%d-%m-%Y/%H:%M:%S)] Running backup.sh\n"

case $1 in
dump)
    echo "Backing up database from server"
    FOLDERNAME=strapi-$(date +"%y%m%d-%H%M")
    mongodump "${params[@]}" \
        --db strapi \
        --quiet \
        --out ./backups/$FOLDERNAME
    if [ $? -eq 0 ]; then
        echo "All OK. Succesfully created $FOLDERNAME"
    else
        echo $?
    fi
    ;;
restore)    
    echo "Restoring database to server"
    if [ -d "./backups/$2" ]; then
        echo "Backup found, backup up to server"
        mongorestore "${params[@]}" \
            --authenticationDatabase strapi \
            --nsInclude 'strapi.*' \
            --drop ./backups/$2/
    else 
        echo "Backup does not exist. Available backups are:"
        ls -d ./backups/*/ | xargs -n 1 basename | awk '{print "- "$1}'
    fi
    ;;
*)
    echo "Give task as argument."
    ;;
esac