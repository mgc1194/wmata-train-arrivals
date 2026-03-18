# What inspired this file: https://github.com/code-dot-org/code-dot-org/blob/staging/bin/i18n/utils/crowdin_client.rb
# Where did I get the python retry logic: https://medium.com/@hudsonbrendon/using-retry-in-http-requests-with-python-5c46e3280893
# I also considered using the tenacity library, but it seemed like overkill for this use case.
# Rate limited to 10 calls/second and 50,000 calls per day
import requests
from requests.adapters import HTTPAdapter
from urllib3.util.retry import Retry

from config import Config


WMATA_BASE_URL = "https://api.wmata.com"
HEADERS = {'api_key': Config.WMATA_API_KEY}

def _create_session():
    session = requests.Session()
    retry = Retry(
        total=3,
        backoff_factor=1,
        # General retry status codes for rate limiting and server errors.
        # We could make this more specific based on WMATA API documentation, 
        # but this is a good starting point for handling common transient errors.
        status_forcelist=[429, 500, 502, 503, 504]
    )
    adapter = HTTPAdapter(max_retries=retry)
    session.mount("https://", adapter)
    return session

def get(endpoint):
    with _create_session() as session:
        response = session.get(f"{WMATA_BASE_URL}{endpoint}", headers=HEADERS)
        response.raise_for_status()
        return response.json()
    