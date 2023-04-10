# SC2006-Project
Lab Group A36
Team Cirno (Group 3)

./Digarams	-Contains Use Case, Class, Architecture, State Machine Diagrams, and raw Visual Paradigm file

./Diagrams/Sequence Diagrams	-Contains Sequence Diagrams

./Lab Submissions	-Contains submitted Project Report drafts for each Lab

./ParkWhere	-Contains source code

# Install instructions
1. Install backend dependencies. Navigate to backend (parkwhere/backend) and install:
```
pip install django-cors-headers
pip install django-simple-history
pip install django-rest-framework
```

2. Install frontend dependencies. Navigate to frontend (parkwhere/frontend/parkwherefrontend) and install:
```
npm install
```


# Run instructions
1. Navigate to backend (parkwhere/backend) and start backend server with 
```
python manage.py runserver
```
2. Navigate to frontend (parkwhere/frontend/parkwherefrontend) and start frontend server with 
```
npm run dev
```
3. Navigate to frontend (parkwhere/frontend/parkwherefrontend) and start CORS server
```
node server.cjs
```
4. Hosted webpage is at localhost:5173