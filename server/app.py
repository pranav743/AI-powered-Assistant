from fastapi import FastAPI, File, UploadFile, Form
from fastapi.responses import JSONResponse
from pydantic import BaseModel
from typing import Dict
from fastapi.middleware.cors import CORSMiddleware
import os

app = FastAPI()

# Allow all origins, or specify allowed origins in a list
origins = [
    "http://localhost:3000",  # React frontend
    "http://localhost:8000",  # FastAPI backend, if accessed via browser
    "http://localhost:5173"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class Item(BaseModel):
    data: Dict

# Create the uploads directory if it doesn't exist
if not os.path.exists("uploads"):
    os.makedirs("uploads")

@app.get("/")
async def read_root():
    return {"message": "Hello, World!"}

@app.post("/upload-single/")
async def upload_file(file: UploadFile = File(...), data: str = Form(...)):
    try:
        # Save the file to the uploads directory
        file_location = f"uploads/{file.filename}"
        with open(file_location, "wb+") as file_object:
            file_object.write(file.file.read())
        print(data)
        # Process the JSON data if needed   
        # You can use json.loads(data) if you need to parse it

        return JSONResponse(status_code=200, content={"message": "File uploaded successfully"})
    except Exception as e:
        return JSONResponse(status_code=500, content={"message": f"An error occurred: {str(e)}"})

@app.post("/upload-many/")
async def upload_files(files: list[UploadFile] = File(...), data: str = Form(...)):
    try:
        for file in files:
            file_location = f"uploads/{file.filename}"
            with open(file_location, "wb+") as file_object:
                file_object.write(file.file.read())

        # Process the JSON data if needed
        # You can use json.loads(data) if you need to parse it

        return JSONResponse(status_code=200, content={"message": "Files uploaded successfully"})
    except Exception as e:
        return JSONResponse(status_code=500, content={"message": f"An error occurred: {str(e)}"})
    
if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="localhost", port=5000)
