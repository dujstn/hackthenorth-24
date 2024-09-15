from flask import Flask, request, render_template
from threading import Thread
from time import sleep
from json import dumps, loads
from os import urandom

app = Flask(__name__)

mapping: dict[str, dict[str, str]] = {}

@app.route("/create", methods=["POST"])
def create():
	name = request.form["name"] if "name" in request.form else ""
	phone = request.form["phone"] if "phone" in request.form else ""
	email = request.form["email"] if "email" in request.form else ""
	description = request.form["description"] if "description" in request.form else ""
	linkedin = request.form["linkedin"] if "linkedin" in request.form else ""
	instagram = request.form["instagram"] if "instagram" in request.form else ""
	github = request.form["github"] if "github" in request.form else ""
	facebook = request.form["facebook"] if "facebook" in request.form else ""
	twitter = request.form["twitter"] if "twitter" in request.form else ""

	user = {
		"name": name,
		"phone": phone,
		"email": email,
		"description": description,
		"linkedin": linkedin,
		"instagram": instagram,
		"github": github,
		"facebook": facebook,
		"twitter": twitter
	}

	token = urandom(16).hex()
	mapping[token] = user
	return token

@app.route("/<token>", methods=["GET"])
def get(token):
	if token not in mapping:
		return "User not found", 404
	return render_template("view.html", user=mapping[token])

def save():
	while True:
		with open("save.json", "w") as file:
			file.write(dumps(mapping))
		sleep(5)

def load():
	global mapping
	try:
		with open("save.json", "r") as file:
			mapping = loads(file.read())
	except FileNotFoundError:
		pass

load()
Thread(target=save, daemon=True).start()

if __name__ == "__main__":
	app.run()
