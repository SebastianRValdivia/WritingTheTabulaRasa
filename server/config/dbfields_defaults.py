import environ
import os
from config.settings import BASE_DIR 

# Load and set environment variables
env = environ.Env()
environ.Env.read_env(os.path.join(BASE_DIR, '.env'))

CHARFIELD_SHORT = env('CHARFIELD_SHORT')
CHARFIELD_LONG = env('CHARFIELD_LONG')

