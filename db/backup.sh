#!/bin/bash

# Setup cronjob for this script to run everyday at 15:00
# crontab -e
# 0 15 * * *  cd ~/path/to/kasperkoman/db && ./backup.sh dump >> ./backups/backup.log 2>&1
# or use launchd and setup using http://launched.zerowidth.com

export PATH=/bin:/usr/bin/:/usr/local/bin
export $(grep -v '^#' ../.env | xargs -0)

params=(
    -u $REMOTE_DB_USERNAME \
    -p $REMOTE_DB_PASSWORD
)

printf "\n[$(date +%d-%m-%Y/%H:%M:%S)] Running backup.sh\n"

case $1 in
dump)
    echo "Backing up database from server"
    FOLDERNAME=strapi-$(date +"%y%m%d-%H%M")
    REMOTE_DATABASE_DIR=/var/local/backups/$FOLDERNAME

    # Backup database
    ssh -T $SSH_USER@$SSH_HOST << EOF
        docker exec kasperkoman_db mongodump ${params[@]} \
            --db $DATABASE_NAME \
            --out $REMOTE_DATABASE_DIR
        docker cp kasperkoman_db:$REMOTE_DATABASE_DIR $REMOTE_DIR
        docker exec kasperkoman_db rm -r $REMOTE_DATABASE_DIR
        exit
EOF
    if [ $? -eq 0 ]; then
        echo "Succesfully created database on host"
    else
        echo "Error"
        exit 1
    fi
    echo "Copying from remote to local and cleanup"
    rsync --remove-source-files -chavzPq --stats $SSH_USER@$SSH_HOST:$REMOTE_DIR/$FOLDERNAME ./backups/
    if [ ${#REMOTE_DIR} -le 2 ]; then echo "REMOTE_DIR not set correctly"; exit 1; fi
    ssh -t $SSH_USER@$SSH_HOST "rm -r $REMOTE_DIR/$FOLDERNAME"

    # Backup uploads folder
    echo "Backing up files from upload folder"
    rsync -chavzPq --stats $SSH_USER@$SSH_HOST:$REMOTE_DIR/volumes/uploads/ ./backups/uploads
    if [ $? -eq 0 ]; then
        echo "All OK."
    else
        echo "Error"
        exit 1
    fi
    ;;
restore)    
    echo "Restoring database to server"
    if [ ! -d "./backups/$2" ] || [[ $2 != strapi-* ]]; then
        echo "Backup does not exist. Available backups are:"
        ls -d ./backups/strapi-*/ | xargs -n 1 basename | awk '{print "- "$1}'
        exit 1
    fi

    echo "Backup found, copying files from local to remote"
    rsync -chavzP -e ssh ./backups/$2 $SSH_USER@$SSH_HOST:$REMOTE_DIR/

    ssh -T $SSH_USER@$SSH_HOST << EOF
        docker cp $REMOTE_DIR/$2 kasperkoman_db:/var/local/backups
        docker exec kasperkoman_db mongorestore ${params[@]} \
            --authenticationDatabase $DATABASE_NAME \
            --nsInclude "$DATABASE_NAME.*" \
            --drop /var/local/backups/$2/
        docker exec kasperkoman_db rm -r /var/local/backups/$2
        exit
EOF
    if [ $? -eq 0 ]; then
        echo "Restored succesfully."
    else
        echo "Error"
        exit 1
    fi
    ssh -t $SSH_USER@$SSH_HOST "rm -r $REMOTE_DIR/$2"

    # Restore uploads folder
    echo "Restoring uploads folder"
    rsync -chavzPq -e ssh ./backups/uploads/ $SSH_USER@$SSH_HOST:$REMOTE_DIR/volumes/uploads
    if [ $? -eq 0 ]; then
        echo "All OK."
    else
        echo "Error"
        exit 1
    fi
    ;;
*)
    echo "Give task as argument."
    ;;
esac