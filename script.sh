
# wget --content-disposition https://bridrive.bri.co.id/f/0dcec450884e493aaa6c/?dl=1

image_name=image-repo.bri.co.id/cbp-dev/ui-brimasspro-mcr-mdb:manual-1
image_name_qa=image-repo.bri.co.id/cbp-dev/ui-brimasspro-mcr-mdb-qa:manual-1


# docker tags superset-superset:latest image-repo.bri.co.id/cbp-dev/superset-superset:latest
# docker tags superset-superset-init:latest image-repo.bri.co.id/cbp-dev/superset-superset-init:latest
# docker tags superset-superset-worker-beat:latest image-repo.bri.co.id/cbp-dev/superset-superset-worker-beat:latest
# docker tags superset-superset-worker:latest image-repo.bri.co.id/cbp-dev/superset-superset-worker:latest
# docker tags superset-superset-node:latest image-repo.bri.co.id/cbp-dev/superset-superset-node:latest

zip (){
    tar -czvf node_module.tar.gz ./node_modules

}
qa_push() {
        set -e
        rm -rf .env
        cp deployment/env/.env.qa ./.env
        git push origin development
        npm run build
        docker build --platform linux/amd64 -t $image_name_qa .
        docker push $image_name_qa
        rm -rf .env
        cp ./.env.development ./.env
        echo "build and docker image successfully"
}


qa_pull() {
    set -e
    git pull origin development 
    docker-compose down
    docker pull $image_name_qa
    docker-compose up -d 
}

push() {
        set -e
        rm -rf .env
        cp deployment/env/.env.stagging ./.env
        git push origin development
        npm run build
        docker build --platform linux/amd64 -t $image_name .
        docker push $image_name
        rm -rf .env
        cp deployment/env/.env.development ./.env
        echo "build and docker image successfully"
}


pull() {
    set -e
    git pull origin development 
    docker-compose down
    docker pull $image_name
    docker-compose up -d 
}

usage (){
    echo "command not found, avialable command [pull, push]"
}

if [ $# -eq 0 ]; then
    usage
fi
usage() {
    echo "Usage: $0 {push|pull|push_qa|pull_qa}"
    exit 1
}

# Case statement to handle the input argument
case $1 in
    zip)
        zip
        ;;
    push)
        push
        ;;
    pull)
        pull
        ;;
    qa_push)
        qa_push
        ;;
    qa_pull)
        qa_pull
        ;;
    *)
        usage
        ;;
esac