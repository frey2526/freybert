#!/usr/bin/env bash
# Avisa a Bing/Yandex/Naver de que la página cambió.
# Solo sirve cuando la web está publicada y el archivo de clave es accesible.
set -euo pipefail

KEY="2366afa0c7ccfc4a2e38eb9c342dd4c4"
HOST="frey2526.github.io"
URL="https://$HOST/freybert/"

curl -sS -o /dev/null -w "IndexNow: %{http_code}\n" \
  -X POST "https://api.indexnow.org/indexnow" \
  -H "Content-Type: application/json" \
  -d "{\"host\":\"$HOST\",\"key\":\"$KEY\",\"keyLocation\":\"https://$HOST/freybert/$KEY.txt\",\"urlList\":[\"$URL\"]}"
