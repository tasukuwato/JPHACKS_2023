import uvicorn

if __name__ == "__main__":
    uvicorn.run("api.main:app", host="0.0.0.0", reload=False)
