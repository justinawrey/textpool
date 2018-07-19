import os
from flask import Flask, redirect
from flask_cors import CORS

app = Flask(__name__)
app.config['SPOTIFY_CLIENT_ID'] = os.environ['SPOTIFY_CLIENT_ID']

# enable CORS for now, for easier testing of react / flask services running on different ports
CORS(app)

@app.route('/api/login')
def login():
    client_id = app.config['SPOTIFY_CLIENT_ID']
    auth_endpoint = 'https://accounts.spotify.com/authorize'
    response_type = 'code'
    redirect_uri = 'http://localhost:3000/'
    return redirect(f"{auth_endpoint}?client_id={client_id}&response_type={response_type}&redirect_uri={redirect_uri}")
