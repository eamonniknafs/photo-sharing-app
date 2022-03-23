from datetime import timedelta
from flask import Flask, Response, request, jsonify
from flaskext.mysql import MySQL
from passlib.hash import sha256_crypt
from flask_jwt_extended import create_access_token, unset_jwt_cookies, get_jwt_identity, jwt_required, JWTManager
import werkzeug.formparser
from werkzeug.utils import secure_filename
import time

#for image uploading
import os, base64

mysql = MySQL()
app = Flask(__name__)
# app.secret_key = 'super secret string'  # Change this!

#These will need to be changed according to your creditionals
app.config['MYSQL_DATABASE_USER'] = 'root'
app.config['MYSQL_DATABASE_PASSWORD'] = 'ph0tosApp!'
app.config['MYSQL_DATABASE_DB'] = 'photoshare'
app.config['MYSQL_DATABASE_HOST'] = 'localhost'
mysql.init_app(app)

# Setup the Flask-JWT-Extended extension
app.config["JWT_SECRET_KEY"] = "super-secret"  # Change this!
app.config["JWT_ACCESS_TOKEN_EXPIRES"] = timedelta(hours=2)
jwt = JWTManager(app)

def connectToDB():
	conn = mysql.connect()
	cursor = conn.cursor()
	return conn, cursor
_, cursor = connectToDB()
cursor.execute("SELECT email from Users")
users = cursor.fetchall()

def getUserList():
	cursor = conn.cursor()
	cursor.execute("SELECT email from Users")
	return cursor.fetchall()

@app.route('/api/login', methods=['POST'])
def login():
	#The request method is POST (page is recieving data)
	email = request.json.get('email')
	conn, cursor = connectToDB()
	#check if email is registered
	if cursor.execute("SELECT password_hash FROM Users WHERE email = '{0}'".format(email)):
		data = cursor.fetchall()
		pwd = str(data[0][0] )
		if sha256_crypt.verify(request.json.get('password'), pwd):
			access_token = create_access_token(identity=email)
			return jsonify(access_token=access_token)

	#information did not match
	return "<a href='/login'>Try again</a>\
			</br><a href='/register'>or make an account</a>"

@app.route('/api/logout')
def logout():
    response = jsonify({"msg": "logout successful"})
    unset_jwt_cookies(response)
    return response

@app.route("/api/register", methods=['POST'])
def register_user():
	try:
		firstname = request.json.get('firstname')
		lastname = request.json.get('lastname')
		username = request.json.get('username')
		email = request.json.get('email')
		password_hash = sha256_crypt.encrypt(request.json.get('password'))
		print(firstname, lastname, username, email, password_hash)
	except:
		print("couldn't find all tokens") #this prints to shell, end users will not see this (all print statements go to shell)
		print(request.json)
		return 'bad request!', 400
	conn, cursor = connectToDB()
	test =  isEmailUnique(email)
	if test:
		print(cursor.execute(
			"INSERT INTO Users (first_name, last_name, username, email, password_hash) VALUES ('{0}', '{1}', '{2}', '{3}', '{4}')".format(firstname, lastname, username, email, password_hash)))
		conn.commit()
		#log user ind
		access_token = create_access_token(identity=email)
		return jsonify(access_token=access_token)
	else:
		print("SQL Error")
		return 'Internal error', 500

def getUsersPhotos(uid):
	_, cursor = connectToDB()
	cursor.execute("SELECT imgdata, picture_id, caption FROM Pictures WHERE user_id = '{0}'".format(uid))
	return cursor.fetchall() #NOTE list of tuples, [(imgdata, pid), ...]

def getUsernameFromEmail(email):
	_, cursor = connectToDB()
	cursor.execute("SELECT username  FROM Users WHERE email = '{0}'".format(email))
	return cursor.fetchone()[0]

def isEmailUnique(email):
	#use this to check if a email has already been registered
	_, cursor = connectToDB()
	if cursor.execute("SELECT email  FROM Users WHERE email = '{0}'".format(email)):
		#this means there are greater than zero entries with that email
		return False
	else:
		return True
#end login code

@app.route('/api/profile', methods=['POST'])
@jwt_required()
def profile():
	_, cursor = connectToDB()
	#get email
	email = get_jwt_identity()
	print(email)
	if cursor.execute("SELECT first_name, last_name, dob, email, hometown, gender, date_created, username FROM Users  WHERE email = '{0}'".format(email)):
		data = cursor.fetchall()
		print(data)
		return jsonify({
		'firstname': data[0][0],
		'lastname': data[0][1],
		'dob': data[0][2],
		'email': data[0][3],
		'hometown': data[0][4],
		'gender': data[0][5],
		'since': data[0][6],
		'username': data[0][7]
		})
	else:
		return 'Internal error', 500

#begin photo uploading code
# photos uploaded using base64 encoding so they can be directly embeded in HTML
ALLOWED_TYPES = set(['image'])
def allowed_file(mimetype):
	return '/' in mimetype and mimetype.split('/')[0] in ALLOWED_TYPES

@app.route('/api/upload', methods=['POST'])
@jwt_required()
def upload_file():
	conn, cursor = connectToDB()
	#get user id
	email = get_jwt_identity()
	username = getUsernameFromEmail(email)
	print(request.files)
	files = request.files
	for f in files:
		if not allowed_file(files[f].mimetype):
			return Response(status=400)
		photo_data = files[f].read()
		cursor.execute('''INSERT INTO Pictures (imgdata, username) VALUES (%s, %s)''' ,(photo_data,username))
		conn.commit()
		print("Saved file: "+secure_filename(files[f].filename)+" of type: "+files[f].mimetype)
	return Response(status=200)

# @app.route('/upload', methods=['GET', 'POST'])
# @flask_login.login_required
# def upload_file():
# 	if request.method == 'POST':
# 		uid = getUserIdFromEmail(flask_login.current_user.id)
# 		imgfile = request.files['photo']
# 		caption = request.form.get('caption')
# 		photo_data =imgfile.read()
# 		cursor = conn.cursor()
# 		cursor.execute('''INSERT INTO Pictures (imgdata, user_id, caption) VALUES (%s, %s, %s )''' ,(photo_data,uid, caption))
# 		conn.commit()
# 		return render_template('hello.html', name=flask_login.current_user.id, message='Photo uploaded!', photos=getUsersPhotos(uid),base64=base64)
# 	#The method is GET so we return a  HTML form to upload the a photo.
# 	else:
# 		return render_template('upload.html')
# #end photo uploading code


# #default page
# @app.route("/", methods=['GET'])
# def hello():
# 	return render_template('hello.html', message='Welecome to Photoshare')

if __name__ == "__main__":
	#this is invoked when in the shell  you run
	#$ python app.py
	app.run(port=5000, debug=True)
