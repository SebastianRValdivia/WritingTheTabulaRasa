FROM python:3.11

# Install dependencies
COPY requirements.txt .
RUN pip install --user -r requirements.txt

# Python globals
ENV PIP_DISABLE_PIP_VERSION_CHECK 1
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

WORKDIR /opt/app

# Move sourcefiles
COPY . .
