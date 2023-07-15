from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

# 選んだプレイヤーが誰かを取得する(例: Player1)
@app.route('/imageSelected', methods=['POST'])
def handle_image_selected():
    data = request.get_json()
    print("Received image selected: ", data)
    return jsonify({'message': 'success'}), 200

@app.route('/vote', methods=['GET'])
def get_vote():
    # 返り値はもっとも大きい票を獲得した人にしてください
    return jsonify('Player5'), 200

if __name__ == '__main__':
    app.run(port=5000)
