COOKIE="groomingAppCookie={\"name\": \"$1\", \"avatar\": \"$2\"}"
curl -X POST -v -H 'Content-Type: application/json' --cookie "$COOKIE" http://127.0.0.1:8888/vote -d "{\"vote\": \"$3\"}"