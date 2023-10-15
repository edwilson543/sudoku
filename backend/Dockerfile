FROM python:3.11-alpine
ENV PYTHONUNBUFFERED 1
WORKDIR /backend
COPY requirements/app-requirements.txt requirements.txt
RUN pip install -r requirements.txt
COPY ./sudoku .
