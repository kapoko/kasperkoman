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

    # Backup database
    mongodump "${params[@]}" \
        --db strapi \
        --quiet \
        --out ./backups/$FOLDERNAME
    if [ $? -eq 0 ]; then
        echo "Succesfully backup up database in $FOLDERNAME"
    else
        echo $?
        exit
    fi

    # Backup uploads folder
    echo "Backing up files from upload folder"
    rsync -chavzPq --stats $SSH_USER@$SSH_HOST:$REMOTE_DIR/volumes/uploads/ ./backups/uploads
    if [ $? -eq 0 ]; then
        echo "All OK."
    else
        echo $?
        exit
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
        if [ $? -eq 0 ]; then
            echo "Succesfully restored database on remote"
        else
            echo $?
            exit
        fi

        # Restore uploads folder
        echo "Restoring uploads folder"
        rsync -chavzPq -e ssh ./backups/uploads/ $SSH_USER@$SSH_HOST:$REMOTE_DIR/volumes/uploads
        if [ $? -eq 0 ]; then
            echo "All OK."
        else
            echo $?
            exit
        fi
    else 
        echo "Backup does not exist. Available backups are:"
        ls -d ./backups/*/ | xargs -n 1 basename | awk '{print "- "$1}'
    fi
    ;;
*)
    echo "Give task as argument."
    ;;
esac