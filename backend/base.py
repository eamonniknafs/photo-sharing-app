from datetime import timedelta
from flask import Flask, Response, request, jsonify
from flaskext.mysql import MySQL
from passlib.hash import sha256_crypt
from flask_jwt_extended import create_access_token, unset_jwt_cookies, get_jwt_identity, jwt_required, JWTManager, verify_jwt_in_request
import werkzeug.formparser
from werkzeug.utils import secure_filename
import time
from PIL import Image
from io import BytesIO

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
		else:
			return jsonify('wrong password'), 401
	else:
		return jsonify('user not found'), 401

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
	cursor.execute("SELECT imgdata, picture_id, caption FROM Pictures WHERE username = '{0}'".format(uid))
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
	username = getUsernameFromEmail(email)
	print(email)
	cursor.execute("SELECT COUNT(*) FROM Pictures WHERE username = '{0}'".format(username))
	numphotos = cursor.fetchall()[0][0]
	if cursor.execute("SELECT first_name, last_name, dob, email, hometown, gender, date_created, username FROM Users WHERE username = '{0}'".format(username)):
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
		'username': data[0][7],
		'numphotos': numphotos
		})
	else:
		return 'Internal error', 500

@app.route('/api/users', methods=['POST'])
@jwt_required()
def users():
	_, cursor = connectToDB()
	#get email
	email = get_jwt_identity()
	username = getUsernameFromEmail(email)
	if cursor.execute("SELECT username FROM Users WHERE username != '{0}'".format(username)):
		data = cursor.fetchall()
		return jsonify(data)
	else:
		return 'Internal error', 500

@app.route('/api/friends', methods=['POST'])
@jwt_required()
def fetchFriends():
	_, cursor = connectToDB()
	#get email
	email = get_jwt_identity()
	username = getUsernameFromEmail(email)
	cursor.execute("SELECT friend_username FROM Friend_Of WHERE username = '{0}'".format(username))
	data = cursor.fetchall()
	print(data)
	return jsonify(data)

@app.route('/api/addremovefriend', methods=['POST'])
@jwt_required()
def addremovefriend():
	conn, cursor = connectToDB()
	#get email
	email = get_jwt_identity()
	username = getUsernameFromEmail(email)
	print(username)
	friend_username = request.json.get('friend_username')
	print(friend_username)
	if cursor.execute("SELECT friend_username FROM Friend_Of WHERE username = '{0}' AND friend_username = '{1}'".format(username, friend_username)):
		#this means there are greater than zero entries with that email
		cursor.execute("DELETE FROM Friend_Of WHERE username = '{0}' AND friend_username = '{1}'".format(username, friend_username))
		conn.commit()
		return 'removed'
	else:
		cursor.execute("INSERT INTO Friend_Of (username, friend_username) VALUES ('{0}', '{1}')".format(username, friend_username))
		conn.commit()
		return 'added'
	return 'not implemented', 200


#begin photo uploading code
# photos uploaded using base64 encoding so they can be directly embeded in HTML
ALLOWED_TYPES = set(['image'])
def allowed_file(mimetype):
	return (('/' in mimetype and mimetype.split('/')[0] in ALLOWED_TYPES), mimetype)

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
		allowed, mimetype = allowed_file(files[f].content_type)
		if not allowed:
			return Response(status=400)
		photo_data = files[f].read()
		cursor.execute('''INSERT INTO Pictures (imgdata, username, type) VALUES (%s, %s, %s)''',(photo_data,username,mimetype))
		conn.commit()
		print("Saved file: "+secure_filename(files[f].filename)+" of type: "+files[f].mimetype)
	return Response(status=200)

@app.route('/api/explore/<start>&<count>', defaults={'username': None},  methods=['GET'])
@app.route('/api/explore/<start>&<count>/<username>',  methods=['GET'])
def explore(start, count, username):
	_, cursor = connectToDB()
	cursor.execute("SELECT picture_id FROM Pictures ORDER BY picture_id DESC LIMIT 0, 1")
	last_id = cursor.fetchone()[0]
	if username == None:
		cursor.execute("SELECT picture_id, type FROM Pictures WHERE picture_id < '{0}' ORDER BY picture_id DESC LIMIT {1}".format(int(last_id+1) - int(start), count))
	else:
		cursor.execute("SELECT picture_id, type FROM Pictures WHERE picture_id < '{0}' AND username = '{1}' ORDER BY picture_id DESC LIMIT {2} ".format(int(last_id+1) - int(start), username, count))
	output = cursor.fetchall()
	if len(output) == 0:
		return 'no more data', 200
	return jsonify(output)

@app.route('/api/photo/<id>', methods=['GET'])
def get_photo(id):
	_, cursor = connectToDB()
	cursor.execute("SELECT imgdata, type, username, caption FROM Pictures WHERE picture_id = '{0}'".format(id))
	output = cursor.fetchone()
	imgdata = output[0]
	mimetype = output[1]
	username = output[2]
	caption = output[3]
	im = Image.open(BytesIO(imgdata))
	width, height = im.size
	return imgdata, 200, {'Content-Type': mimetype, 'width': width, 'height': height, 'username': username, 'caption': caption}

@app.route('/api/comments/<id>', methods=['GET'])
def get_comments(id):
	_, cursor = connectToDB()
	cursor.execute("SELECT content, username, comment_id FROM Comments WHERE picture_id = '{0}' AND is_like = false ORDER BY date_edited".format(id))
	output = cursor.fetchall()
	return jsonify(output)

@app.route('/api/comments/<id>', methods=['POST'])
def post_comment(id):
	conn, cursor = connectToDB()
	comment = request.json['comment']
	if(request.headers.get('Authorization') != "Bearer null"):
		verify_jwt_in_request()
		email = get_jwt_identity()
		username = getUsernameFromEmail(email)
		cursor.execute("INSERT INTO Comments (picture_id, username, content, is_like) VALUES ('{0}', '{1}', '{2}', false) ".format(id, username, comment))
	else:
		cursor.execute("INSERT INTO Comments (picture_id, content, is_like) VALUES ('{0}', '{1}', false)".format(id, comment))
	conn.commit()
	return 'success', 200

@app.route('/api/likes/<id>', methods=['GET'])
def get_likes(id):
	_, cursor = connectToDB()
	cursor.execute("SELECT COUNT(*) FROM Comments WHERE picture_id = '{0}' AND is_like = true".format(id))
	output = cursor.fetchall()
	return jsonify(output)

@app.route('/api/liked/<id>', methods=['GET'])
@jwt_required()
def isLiked(id):
	_, cursor = connectToDB()
	email = get_jwt_identity()
	username = getUsernameFromEmail(email)
	cursor.execute("SELECT COUNT(*) FROM Comments WHERE picture_id = '{0}' AND is_like = true AND username = '{1}'".format(id, username))
	output = cursor.fetchall()
	return jsonify(output)

@app.route('/api/newlike/<id>', methods=['POST'])
@jwt_required()
def newLike(id):
	conn, cursor = connectToDB()
	email = get_jwt_identity()
	username = getUsernameFromEmail(email)
	cursor.execute("SELECT COUNT(*) FROM Comments WHERE picture_id = '{0}' AND is_like = true AND username = '{1}'".format(id, username))
	isliked = cursor.fetchall()
	if isliked[0][0] == 0:
		cursor.execute("INSERT INTO Comments (picture_id, username, is_like) VALUES ('{0}', '{1}', true) ".format(id, username))
	else:
		cursor.execute("DELETE FROM Comments WHERE picture_id = '{0}' AND is_like = true AND username = '{1}'".format(id, username))
	conn.commit()
	return 'success', 200

if __name__ == "__main__":
	#this is invoked when in the shell  you run
	#$ python app.py
	app.run(port=5000, debug=True)
