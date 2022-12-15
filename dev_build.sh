# Build and deploy client into django to run tests
# Requires npm, quasar cli, python3 and pip3 installed
DJANGO_SUPERUSER_PASSWORD=password

cd ./client/ # Goes to client/ to build spa
npm install
quasar build
cd ../ # Back to root and moves files to server
mv -v ./client/dist/spa/index.html ./server/webapp/templates/webapp/
mv -v ./client/dist/spa/css ./server/webapp/staticfiles/
mv -v ./client/dist/spa/fonts ./server/webapp/staticfiles/
mv -v ./client/dist/spa/icons ./server/webapp/staticfiles/
mv -v ./client/dist/spa/img ./server/webapp/staticfiles/
mv -v ./client/dist/spa/js ./server/webapp/staticfiles/
mv -v ./client/dist/spa/favicon.ico ./server/webapp/staticfiles/
cd ./server/ # Goes to server and install dependencies
pip3 install -r requirements.txt
python3 ./manage.py createsuperuser --no-input --username admin --email admin@mail.com # Create admin user
python3 ./manage.py runserver & # Run server in localhost on debug mode
