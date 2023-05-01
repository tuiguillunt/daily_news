import requests

url = "https://news.google.com/rss/search?q=coupe+de+france&hl=fr&gl=FR&ceid=FR:fr"
response = requests.get(url)

if response.status_code == 200:
    data = response.json()
    first_article = data["articles"][0]
    print(first_article)
else:
    print("Error: Could not retrieve data from the API")
