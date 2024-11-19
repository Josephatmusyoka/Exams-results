import os
from flask import Blueprint, request, flash, redirect, url_for, render_template, current_app, send_from_directory
from .utils import save_file
from .models import Result  # Assuming you have a Result model for the database
from . import db  # Import db from __init__.py for database access

# Define the 'main' blueprint
main = Blueprint('main', __name__)

# Upload Route
@main.route('/admin/upload', methods=['POST'])
def upload():
    student_id = request.form['student_id']
    semester = request.form['semester']
    year = request.form['year']
    file = request.files['result']

    # Save the file
    filepath = save_file(file, 'results')

    # Add entry to database
    new_result = Result(student_id=student_id, semester=semester, year=year, file_path=filepath)
    db.session.add(new_result)
    db.session.commit()

    flash('Result uploaded successfully!', 'success')
    return redirect(url_for('main.upload'))

# Results Route
@main.route('/student/results', methods=['GET'])
def results():
    student_id = request.args.get('student_id')  # Fetch logged-in user's ID
    results = Result.query.filter_by(student_id=student_id).all()
    return render_template('student/results.html', results=results)

# Download Route
@main.route('/download/<filename>', methods=['GET'])
def download(filename):
    return send_from_directory(current_app.config['UPLOAD_FOLDER'], filename)
