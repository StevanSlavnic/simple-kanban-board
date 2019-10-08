# a51-kanban-test

## Server installing instructions:

1. Clone this repo using git clone https://github.com/StevanSlavnic/a51-kanban-test.git <YOUR_PROJECT_NAME>
2. Move to the appropriate directory: cd <YOUR_PROJECT_NAME>.
3. Run following command in terminal 'cp config/parameters.yml.disc config/parameters.yml'
4. Run in terminal '(sudo) docker-compose up --build'
5. Out of docker container (into project folder) start only this command - sudo chown <your_user>:<your_user> -R ./*
6. After successfully building images, run in terminal 'sudo docker exec -it a51-kanban_php7 bash' to access Docker machine.
7. Run 'composer install'.
8. Create new database by executing following command from project root: bin/console doctrine:database:create
9. Migrate schema changes by executing following command from project root: bin/console do:sc:up --force

10. At the end add into /etc/hosts file (out of docker container) 
127.0.0.1     http://a51-kanban-dev.com

11. Api doc is accessable on this URL: http://a51-kanban-dev.com/api/doc/

## Frontend app installing instructions:

1. Open new tab in terminal and navigate to frontend directory: cd frontend
2. Run 'yarn install' in order to install dependencies.
3. From comand line run 'cp .env.dist .env'
4. In .env file add: 
    - your URL of your app under parameter REACT_APP_DOMAIN='http://localhost:3000' (or localhost with available port)
    - your API base URL under parameter REACT_APP_BACKEND_API_ENDPOINT='http://a51-kanban-dev.com/api/v1'
5. At this point you can run 'yarn start' to see the app at http://localhost:3000
