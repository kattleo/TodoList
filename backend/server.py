from flask import Flask, jsonify
from flask_restful import reqparse
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.orm import DeclarativeBase, Mapped, mapped_column
from flask_cors import CORS
import os


class Base(DeclarativeBase):
    pass


db = SQLAlchemy(model_class=Base)

# create the Flask app
app = Flask(__name__)
# configure the SQLite database, relative to the app instance folder
file_name = "database.sqlite"
app.config["SQLALCHEMY_DATABASE_URI"] = f"sqlite:///{file_name}"
# handle CORS (for simplicity, every origin is allowed)
CORS(app)
db.init_app(app)


class Task(db.Model):
    id: Mapped[int] = mapped_column(primary_key=True, autoincrement=True)
    taskText: Mapped[str] = mapped_column(nullable=False)
    isComplete: Mapped[bool] = mapped_column(nullable=False, default=False)

    def to_dict(self):
        return {
            'id': self.id,
            'taskText': self.taskText,
            'isComplete': self.isComplete
        }


# check if /isntance/database_file_name already exists to initialize Data Base with its Model only once
file_path = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'instance', file_name)
if os.path.exists(file_path):
    with app.app_context():
        db.create_all()


# create Request Parsers
request_parser = reqparse.RequestParser()
request_parser.add_argument("taskText", type=str, help="Task Text")
request_parser.add_argument("id", type=str, help="Task ID")


@app.route("/tasks")
def get_tasks():
    try:
        tasks = Task.query.all()
        return jsonify([task.to_dict() for task in tasks]), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500


@app.route("/tasks/create", methods=["POST"])
def create_task():
    try:
        args = request_parser.parse_args()
        new_task = Task(taskText=args['taskText'])
        db.session.add(new_task)
        db.session.commit()
        return new_task.to_dict(), 201
    except Exception as e:
        return jsonify({"error": str(e)}), 500


@app.route("/tasks/remove", methods=["DELETE"])
def remove_task():
    try:
        args = request_parser.parse_args()
        task_id = args['id']
        task = db.session.execute(db.select(Task).filter_by(id=task_id)).scalar_one()
        db.session.delete(task)
        db.session.commit()
        return jsonify({"Removed Task": task.to_dict()}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500


@app.route("/tasks/update", methods=["POST"])
def update_task():
    try:
        args = request_parser.parse_args()
        task_id = args['id']
        task = db.session.execute(db.select(Task).filter_by(id=task_id)).scalar_one()
        task.isComplete = not task.isComplete
        db.session.commit()
        return jsonify({"Updated Task": task.to_dict()}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500


if __name__ == "__main__":
    app.run(debug=False)
