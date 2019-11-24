FROM python:2

RUN apt-get update
RUN apt-get install pandoc -y

## cd and move directory
WORKDIR /app
COPY . .

RUN pip install -r requirements.txt

## expose 5000 port
EXPOSE 6000

## start 
CMD [ "python", "main.py" ]
