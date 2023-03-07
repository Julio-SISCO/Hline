import pyrebase

firebaseConfig = {

    "apiKey": "AIzaSyAmpVRT92LQA3rXOORdJ2inDk0Q9GPwNgA",
    "authDomain": "innoviai.firebaseapp.com",
    "databaseURL": "https://innoviai-default-rtdb.firebaseio.com",
    "projectId": "innoviai",
    "storageBucket": "innoviai.appspot.com",
    "messagingSenderId": "186502307391",
    "appId": "1:186502307391:web:f3a27a951b032e65a9628a",
    "measurementId": "G-2440B5SYYB"
}

firebase = pyrebase.initialize_app(firebaseConfig)

db = firebase.database()

# data = {"name": "Jason", "age": "12", "addresses": ["Lomé", "Nyékonakpoè", "TOGO"]}
# db.child("innovIAI").set(data)

data1 = {"name": "Olivia ADAMAH", "age": "18", "addresses" : ["Avédji", "13ème Rue des Amoureux", "BP : 1515-Lomé"]}
data2 = {"name": "Sam Arris PIRALI", "age": "19", "addresses" : ["Léo 2000", "14ème Rue des Codeurs", "BP : 1516-Lomé, TOGO"]}
data3 = {"name": "Lorentze BARANDAO", "age": "18", "addresses" : ["Tokoin", "Colombe de la paix", "BP : 1216-Lomé, TOGO"]}
# db.child("Info Etudiant").child("Masculin").child("TC2-B").remove(data1)
# db.child("Info Etudiant").child("Masculin").child("TC2-B").remove(data2)
# db.child("Info Etudiant").child("Masculin").child("TC2-B").remove(data3)
data = [data1, data2, data3]
db.child("Info Etudiant").child("TC2-B").set(data)