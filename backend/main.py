from flask import Flask, request, render_template
from threading import Thread
from time import sleep
from json import dumps, loads
from os import urandom

app = Flask(__name__)

mapping: dict[str, dict[str, str]] = {}

@app.route("/create", methods=["POST"])
def create():
	data = request.get_json()
	name = data["name"] if "name" in data else ""
	phone = data["phone"] if "phone" in data else ""
	email = data["email"] if "email" in data else ""
	description = data["description"] if "description" in data else ""
	linkedin = data["linkedin"] if "linkedin" in data else ""
	instagram = data["instagram"] if "instagram" in data else ""
	github = data["github"] if "github" in data else ""
	facebook = data["facebook"] if "facebook" in data else ""
	twitter = data["twitter"] if "twitter" in data else ""

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
