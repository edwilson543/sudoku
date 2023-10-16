# Using an amd64 build is essential, so the container can execute the COIN API binary
FROM --platform=linux/amd64 python:3.12-slim-bookworm
ENV PYTHONUNBUFFERED 1
WORKDIR /backend
COPY requirements/app-requirements.txt requirements.txt
RUN pip install -r requirements.txt
COPY ./sudoku .
