import os
from flask import current_app
from werkzeug.utils import secure_filename

def save_file(file, folder):
    """Save a file to the specified folder."""
    filename = secure_filename(file.filename)
    filepath = os.path.join(current_app.config['UPLOAD_FOLDER'], folder, filename)
    os.makedirs(os.path.dirname(filepath), exist_ok=True)
    file.save(filepath)
    return filepath
